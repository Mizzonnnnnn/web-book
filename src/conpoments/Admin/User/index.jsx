import { Button, Col, Empty, message, Popconfirm, Row, Space, Table, Typography } from "antd";
import InputSearch from "./InputSearch";
import { useEffect, useState } from "react";
import { callDeleteUser, callUserPaginayion } from "../../../service/api";
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { BiRefresh } from "react-icons/bi";
import "../admin.scss";
import UserViewDetail from "./UserViewDetail";
import UserCreate from "./UserCreate";
import ImportUser from "./ImportUser";
import * as XLSX from 'xlsx';
import UserUpdate from "./UserUpdate";

const TableUser = () => {
    const [listData, setListData] = useState([]);
    const [meta, setMeta] = useState({})
    const [currentP, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSorter, setIsSorter] = useState('');
    const [open, setOpen] = useState(false);
    const [dataRecord, setDataRecord] = useState({});
    const [isShowCreate, setIsShowCreate] = useState(false);
    const [isShowImport, setIsShowImport] = useState(false)
    const [isShowUpdate, setIsShowUpdate] = useState(false);
    const columns = [
        {
            title: 'Id', dataIndex: '_id', render: (record) =>
                <Typography onClick={handleViewUser} style={{ cursor: "pointer", color: "#4096ff" }}>
                    {record}
                </Typography>
        },
        { title: 'Name', dataIndex: 'fullName', sorter: true },
        { title: 'Email', dataIndex: 'email', sorter: true },
        { title: 'Phone', dataIndex: 'phone', sorter: true },
        {
            title: 'Update gần nhất', dataIndex: 'updatedAt', sorter: true, render: (record) =>
                <Typography>
                    {
                        handleUpdateAt(record)
                    }
                </Typography>
        },
        {
            title: 'Action', dataIndex: '', key: 'x', render: (record) =>
                <div
                    style={{
                        gap: "12px",
                        display: "flex"
                    }}
                >
                    <div>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)} >
                            <DeleteOutlined style={{ color: "red" }} />
                        </Popconfirm >
                    </div>

                    <div>
                        <EditOutlined onClick={() => setIsShowUpdate(true)} style={{ color: "blue" }} />
                    </div>
                </div>
        },
    ];

    const handleUpdateAt = (data) => {
        const date = new Date(data);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getUTCFullYear();

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    const handleDelete = async (id) => {
        const res = await callDeleteUser(id);
        setIsLoading(true);
        if (res && res.data) {
            fetchListUser()
            message.success("Delele success")
        }
        setIsLoading(false);

    }

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== currentP) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }

        if (sorter && sorter.field) {
            const a = sorter.order === "ascend" ? `sort=${sorter.field}` : `sort=-${sorter.field}`
            setIsSorter(a)
        }

    };

    useEffect(() => {
        fetchListUser()
    }, [currentP, pageSize, filter, isSorter])

    const fetchListUser = async () => {
        let query = `&current=${currentP}&pageSize=${pageSize}`;

        if (filter) {
            query += `&${filter}`;
        }
        if (isSorter) {
            query += `&${isSorter}`;
        }
        const res = await callUserPaginayion(query);
        if (res.data.result.length === 0 && currentP > 1) {
            setCurrent(currentP - 1)
        }
        if (res && res.data) {
            if (res.data && res.data.result) {
                setListData(res.data.result);
            }
            if (res.data && res.data.meta) {
                setMeta(res.data.meta);
            }
        }
    }

    const handleOnSearch = (user) => {
        setFilter(user)
    }

    const handleRefesh = () => {
        setFilter("")
        setIsSorter("")
        fetchListUser()
        setIsLoading(true);
        setIsLoading(false)
    }

    const handleOnclick = () => {
        const ws = XLSX.utils.json_to_sheet(listData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Datas");
        XLSX.writeFile(wb, "data.csv", { bookType: 'csv', FS: ";" });
        message.success('File downloaded successfully.');
    }
    const renderHeader = () => {
        return (
            <div className="header-table">
                <span>
                    table
                </span>
                <span style={{
                    display: "flex",
                    gap: 15
                }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                        onClick={handleOnclick}
                    >Export</Button>

                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                        onClick={() => setIsShowImport(true)}
                    >Import</Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setIsShowCreate(true)}
                    >Thêm mới</Button>

                    <Button type="ghost" onClick={handleRefesh}>
                        <BiRefresh style={{ fontSize: "20px" }} />
                    </Button>
                </span>
            </div>
        )
    }

    const handleViewUser = () => {
        setOpen(true)
    }
    const handledataRecord = (record) => {
        setDataRecord(record)
    }

    return (
        <>
            <Row gutter={[24]}
                style={{
                    justifyContent: "center",  // Căn giữa các cột trong Row
                    display: "flex",
                    flexDirection: "column",  // Đảm bảo các cột xếp theo chiều dọc
                    alignItems: "center",  // Căn giữa các cột theo chiều ngang
                    rowGap: "50px"
                }}>
                <Col span={24}>
                    <Space
                        style={{
                            border: "1px solid #D9D9D9",  // Viền mỏng hơn với màu nhạt
                            borderRadius: "15px",
                            background: "#FAFAFA",  // Nền sáng nhẹ nhàng
                            padding: "10px",  // Thêm khoảng đệm bên ngoài
                        }}
                    >
                        <Space
                            style={{
                                borderRadius: "15px",
                                background: "#FFFFFF",  // Nền trắng tinh cho khung bên trong
                                padding: 10  // Khoảng đệm hợp lý
                            }}
                        >
                            <InputSearch
                                handleOnSearch={handleOnSearch}
                                handleRefesh={handleRefesh}

                            />
                        </Space>
                    </Space>
                </Col>

                <Col span={24}>

                    <Space
                        style={{
                            border: "1px solid #D9D9D9",  // Viền mỏng hơn với màu nhạt
                            borderRadius: "15px",
                            background: "#FAFAFA",  // Nền sáng nhẹ nhàng
                            padding: "10px"  // Thêm khoảng đệm bên ngoài
                        }}
                    >
                        <Space
                            style={{
                                borderRadius: "15px",
                                background: "#FFFFFF",  // Nền trắng tinh cho khung bên trong
                                padding: 10  // Khoảng đệm hợp lý
                            }}
                        >
                            <Table
                                title={renderHeader}
                                columns={columns}
                                dataSource={listData}
                                onChange={onChange}
                                pagination={{
                                    current: currentP,
                                    showSizeChanger: true,
                                    total: meta.total,
                                    pageSize: pageSize,
                                    showQuickJumper: true,
                                    pageSizeOptions: ['2', '5', '10', '20', '50'],
                                    style: {
                                        display: "flex",
                                        justifyContent: "center"
                                    }
                                }}
                                rowKey="_id"
                                loading={isLoading}
                                onRow={(record) => {
                                    return {
                                        onClick: () => handledataRecord(record)
                                    }
                                }}
                            />
                        </Space>
                    </Space>
                </Col>
            </Row>
            <UserViewDetail
                show={open}
                setShow={setOpen}
                data={dataRecord}
            />
            <UserCreate
                show={isShowCreate}
                setShow={setIsShowCreate}
                fetchListUser={fetchListUser}
            />
            <ImportUser
                show={isShowImport}
                setShow={setIsShowImport}
                fetchListUser={fetchListUser}
            />
            <UserUpdate
                show={isShowUpdate}
                setShow={setIsShowUpdate}
                data={dataRecord}
                fetchListUser={fetchListUser}
            />
        </>
    )
}

export default TableUser;