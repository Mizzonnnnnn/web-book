import { Button, Col, Empty, message, Popconfirm, Row, Table } from "antd";
import InputSearch from "./InputSearch";
import { useEffect, useState } from "react";
import { callDeleteUser, callUserPaginayion } from "../../../service/api";
import { CloudUploadOutlined, DeleteOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { BiRefresh } from "react-icons/bi";
import "../admin.scss";
const TableUser = () => {
    const [listData, setListData] = useState([]);
    const [meta, setMeta] = useState({})
    const [currentP, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSorter, setIsSorter] = useState('');
    const columns = [
        { title: 'Id', dataIndex: '_id' },
        { title: 'Name', dataIndex: 'fullName', sorter: true },
        { title: 'Email', dataIndex: 'email', sorter: true },
        { title: 'Phone', dataIndex: 'phone', sorter: true },
        {
            title: 'Action', dataIndex: '', key: 'x', render: (record, index) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)} >
                    <DeleteOutlined style={{ color: "red" }} />
                </Popconfirm >
        },
    ];

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

        if (sorter) {
            const a = sorter.order === "ascend" ? `&sort=${sorter.field}` : `&sort=-${sorter.field}`
            setIsSorter(a)
        }

    };

    useEffect(() => {
        fetchListUser()
    }, [currentP, pageSize, filter, isSorter])

    const fetchListUser = async () => {
        let query = `&current=${currentP}&pageSize=${pageSize}`;

        if (filter) {
            query += `${filter}`;
        }
        if (isSorter) {
            query += `${isSorter}`;
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
        setPageSize(5)
        setIsLoading(true);
        setIsLoading(false)
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
                    >Export</Button>

                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                    >Import</Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                    >Thêm mới</Button>

                    <Button type="ghost" onClick={handleRefesh}>
                        <BiRefresh style={{ fontSize: "20px" }} />
                    </Button>
                </span>
            </div>
        )
    }
    return (
        <>
            <Row gutter={[20]}>
                <Col span={24}>
                    <InputSearch
                        handleOnSearch={handleOnSearch}
                    />
                </Col>

                <Col span={24}>
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
                            pageSizeOptions: ["1", '2', "5", '10', '20', '50'],
                            style: {
                                display: "flex",
                                justifyContent: "center"
                            }
                        }}
                        rowKey="_id"
                        loading={isLoading}
                    />
                </Col>
            </Row>
        </>
    )
}

export default TableUser;