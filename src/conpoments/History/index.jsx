import { Col, Row, Table, Tag, Typography } from "antd";
import './History.scss'
import { callHistoryOrder } from "../../service/api";
import { useEffect, useState } from "react";
const Index = () => {
    const [data, setData] = useState([]);


    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: '5%',
            key: '0',
        },
        {
            title: 'Thời gian',
            dataIndex: 'updatedAt',
            width: '15%',
            key: '1',
            render: (record) =>
                <Typography>
                    {handleUpdateAt(record)}
                </Typography>
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: '2',
            width: '15%',
            render: (record) =>
                <Typography>
                    {handleConvert(record)}
                </Typography>
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: '3',
            width: '15%',
            render: (record) =>
                <Typography>
                    <Tag color="green">{record}</Tag>
                </Typography>
        },

    ];

    useEffect(() => {
        fetchOrderHistory()
    }, [])
    const fetchOrderHistory = async () => {
        const res = await callHistoryOrder();
        if (res && res.data) {

            const formatData = res.data.map((item, index) => ({
                ...item,
                stt: index + 1,
                status: "Thành công"
            }))

            setData(formatData)
        }
    };
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
    console.log(data)

    const handleConvert = (data) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formatter.format(data);
    }

    return (
        <Row style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px"
        }}>
            <Col span={24}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <b>Lịch sử đơn hàng</b>
                </div>
            </Col>
            <Col span={24}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px"
                }}>
                    <Table dataSource={data} columns={columns} key={"table"} />
                </div>
            </Col>
        </Row>
    )
}

export default Index