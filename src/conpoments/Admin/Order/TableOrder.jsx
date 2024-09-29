import { classHistoryOrder } from "../../../service/api"
import { useState } from "react"
import { useEffect } from "react"
import { Space, Table, Tag } from 'antd';
const TableOrder = () => {
    const [data, setData] = useState([])
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [meta, setMeta] = useState([]);
    useEffect(() => {
        handleFetchData()
    }, [current, pageSize])
    const handleFetchData = async () => {
        const query = `&current=${current}&pageSize=${pageSize}`
        const res = await classHistoryOrder(query);

        if (res && res.data) {
            setData(res.data.result)
            setMeta(res.data.meta)
        }
    }
    const onChange = (pagination) => {
        console.log(pagination)
        if (pagination && pagination.pages !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
    }
    console.log(meta)
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '1',
        },
        {
            title: 'Price',
            dataIndex: 'totalPrice',
            key: '2',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: '3',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: '4',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: '5',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: '6',
        }]

    console.log(meta)
    return (
        <div>
            <Table
                onChange={onChange}
                columns={columns}
                dataSource={data}
                pagination={{
                    current: +current,
                    pageSize: pageSize,
                    total: meta.total,
                    pageSizeOptions: ['2', '5', '10', '20', '50'],
                    style: {
                        display: "flex",
                        justifyContent: "center"
                    }
                }}
            />
        </div>
    )
}

export default TableOrder