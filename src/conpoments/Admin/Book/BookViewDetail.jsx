import React from 'react';
import { Badge, Col, Descriptions, Drawer, Image, Row, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const BookViewDetail = (props) => {
    const { show, setShow, data, setData } = props;
    const styles = {
        width: "120px",
        height: "120px",
        border: "1px solid #ced9ce",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
    const styleTitle = { fontSize: "20px", padding: "20px 0px 20px 30px", fontWeight: "bold" }
    const handleCreateAt = () => {
        const date = new Date(data.createdAt);

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getUTCFullYear();

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    const handleUpdateAt = () => {
        const date = new Date(data.updatedAt);

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getUTCFullYear();

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    const handleMoney = (data) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        const m = formatter.format(data);
        return m;
    };

    const items = [
        {
            key: '1',
            label: 'Id',
            children: data._id,
            span: 2
        },
        {
            key: '2',
            label: 'Tên sách',
            children: data.mainText,
            span: 1
        },
        {
            key: '3',
            label: 'Tác giả',
            children: data.author,
            span: 2
        },
        {
            key: '4',
            label: 'Giá tiền',
            children: handleMoney(data.price),
            span: 1
        },
        {
            key: '5',
            label: 'Số lượng',
            children: (data.quantity + "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
            span: 2
        },
        {
            key: '6',
            label: 'Đã bán',
            children: data.sold,
            span: 1
        },
        {
            key: '7',
            label: 'Thể loại',
            children: <Badge status="processing" text={data.category} />,
            span: 3,
        },
        {
            key: '8',
            label: 'Created At',
            children: handleCreateAt(),
            span: 2
        },
        {
            key: '9',
            label: 'Updated At',
            children: handleUpdateAt(),
            span: 1
        }
    ];

    const handleClose = () => {
        setShow(false)
        setData({})
    }
    return (
        <>
            <Drawer
                closable
                destroyOnClose
                title={<p>Chức năng xem chi tiết</p>}
                placement="right"
                open={show}
                onClose={handleClose}
                width={800}
            >
                <Typography style={{ padding: "0px 10px 30px 0px", fontSize: "17px", fontWeight: 600 }}>Thông tin Book</Typography>
                <Descriptions
                    bordered
                    size={'middle'}
                    items={items}
                />

                <Row span={24} >
                    <Col span={24} >
                        <Typography style={styleTitle}>Ảnh Books</Typography>
                    </Col>

                    <Col span={24} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        <div style={styles} >
                            <Image src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`} width={100} height={100} key={uuidv4()} />
                        </div>
                        {Array.isArray(data.slider) && data.slider.length > 0 &&
                            data.slider.map((item, index) => (
                                <div style={styles} key={index}>
                                    <Image
                                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`}
                                        alt={`Image ${index}`}
                                        width={100} height={100}
                                        key={uuidv4()}
                                    />
                                </div>
                            ))
                        }
                    </Col>
                </Row>
            </Drawer >
        </>
    );
};

export default BookViewDetail;