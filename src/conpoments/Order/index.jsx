import { Button, Checkbox, Col, Divider, Empty, Form, Input, InputNumber, message, notification, Radio, Result, Row } from 'antd';
import './ViewOrder.scss'
import { CheckOutlined, RestOutlined, SmileOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doRemoveAll, doRemoveOrder } from '../../redux/order/orderSilce';
import TextArea from 'antd/es/input/TextArea';
import { callCreateOrder } from '../../service/api';
import { NavLink, useNavigate } from 'react-router-dom';

const ViewOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const order = useSelector(state => state.order.carts);
    const account = useSelector(state => state.account.user);
    const [quantity, setQuantity] = useState([])
    const [checkOrder, setCheckOrder] = useState(false);
    const [perfect, setPerfect] = useState(false);
    const [detail, setDetail] = useState([]);
    const [form] = Form.useForm();


    useEffect(() => {
        const init = order.map(item => item.quantity);
        setQuantity(init);
        handleDetail()
    }, [order])

    useEffect(() => {
        handleTotalPrice();
    }, [quantity, order]);

    const handleDetail = () => {
        const init = order;
        const data = init.map((item, index) => ({
            bookName: item?.detail?.book?.mainText,
            quantity: item?.quantity,
            _id: item?._id
        }))
        setDetail(data)
    }
    const handleConvert = (data) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formatter.format(data);
    }

    const onChange = (value, index, q) => {
        if (value >= q) {
            const update = [...quantity];
            update[index] = q;
            setQuantity(update);
            return;
        }
        if (value >= 1) {
            const update = [...quantity];
            update[index] = value;
            setQuantity(update);
        } else {
            const update = [...quantity];
            update[index] = 1;
            setQuantity(update);
        }

    };

    const handleTotalPrice = () => {
        let total = 0;
        order.map((item, index) => {
            total += quantity[index] * item?.detail?.book?.price;
        })
        return total;
    }

    const handleRemoveCart = (data) => {
        dispatch(doRemoveOrder({ '_id': data._id }))
    }

    const onFinish = async (values) => {
        const { address, phone, username } = values;
        const data = {
            name: username,
            address: address,
            phone: phone,
            totalPrice: handleTotalPrice(),
            detail: detail
        }
        const res = await callCreateOrder(data);
        console.log(res)
        if (res && res.data) {
            setPerfect(true)
            dispatch(doRemoveAll());
            message.success("Mua hàng thành công");
        } else {
            notification.error({
                message: res.message,
                duration: 5
            })
        }
    };

    useEffect(() => {
        const init = {
            _id: account._id,
            username: account.fullName,
            phone: account.phone
        }
        form.setFieldsValue(init)
    }, [])

    return (
        <div className="order-container">
            <Row className='control'>
                <Col span={11}>
                    <div className='product'>
                        <div className='one'>
                            {order && order.length > 0 || perfect === true ?
                                <div style={{
                                    backgroundColor: "#31c3e0",
                                    width: "15px",
                                    height: "15px",
                                    borderRadius: "50%",
                                    padding: "5px"
                                }}>
                                    <CheckOutlined style={{ color: "black" }} />
                                </div>
                                :
                                1
                            }
                        </div>
                        <div className='text'>
                            Đơn hàng
                        </div>
                        <div style={{
                            width: "100%",
                            overflow: 'hidden'
                        }}>

                            {order && order.length > 0 || perfect === true ?
                                <div>
                                    <Divider style={{ backgroundColor: "#31c3e0", height: "3px" }} />
                                </div>
                                :
                                <div>
                                    <Divider className="line" />
                                </div>
                            }
                        </div>
                    </div>
                </Col>
                <Col span={11}>
                    {
                        checkOrder === false ?
                            <div className='product'>
                                <div className='one'>
                                    2
                                </div>
                                <div className='text'>
                                    Đặt hàng
                                </div>
                                <div style={{
                                    width: "100%",
                                    overflow: 'hidden'
                                }}>
                                    <div>
                                        <Divider className="line" />
                                    </div>
                                </div>
                            </div> :
                            <div className='product'>
                                <div style={{
                                    backgroundColor: "#31c3e0",
                                    width: "15px",
                                    height: "15px",
                                    borderRadius: "50%",
                                    padding: "5px",
                                }}>
                                    <CheckOutlined style={{ color: "black" }} />
                                </div>
                                <div className='text'>
                                    Đặt hàng
                                </div>
                                <div style={{
                                    width: "100%",
                                    overflow: 'hidden'
                                }}>
                                    <div>
                                        <Divider style={{ backgroundColor: "#31c3e0", height: "3px" }} />
                                    </div>
                                </div>
                            </div>
                    }

                </Col>
                <Col span={2}>
                    <div className='product' >
                        {
                            perfect === true ?
                                <>
                                    <div style={{
                                        backgroundColor: "#31c3e0",
                                        width: "15px",
                                        height: "15px",
                                        borderRadius: "50%",
                                        padding: "5px",
                                    }}>
                                        <CheckOutlined style={{ color: "black" }} />
                                    </div>
                                    <div className='text'>
                                        Xác nhận
                                    </div>
                                </>
                                :
                                <>
                                    <div className='one'>
                                        3
                                    </div>
                                    <div className='text'>
                                        Xác nhận
                                    </div>
                                </>
                        }
                    </div>
                </Col>
            </Row >
            {
                perfect === false ?
                    <div className='l-c'>
                        <div className='left'>
                            {
                                order.length === 0 ?
                                    <div className='empty'>
                                        <Empty description="Không có sản phẩm trong giỏ hàng" />
                                    </div>
                                    :
                                    <>
                                        {
                                            order.map((item, index) => (
                                                <div className='main' key={index}>
                                                    <div>
                                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.book?.thumbnail}`} alt="image" className='image' />
                                                    </div>
                                                    <div className='content'>
                                                        <div className='title'>
                                                            {item?.detail?.book?.mainText}
                                                        </div>
                                                        <div className='money'>
                                                            {handleConvert(item?.detail?.book?.price)}
                                                        </div>
                                                        <div className='quantity'>
                                                            {checkOrder === true ?
                                                                <> số lượng {quantity[index]} </>
                                                                :
                                                                <InputNumber min={1} value={quantity[index]} onChange={(value) => onChange(value, index, item?.detail?.book?.quantity)} />

                                                            }
                                                        </div>
                                                        <div className='price'>
                                                            Tổng: {handleConvert(item?.detail?.book?.price * quantity[index])}
                                                        </div>
                                                        <div className='order-btn' onClick={() => handleRemoveCart(item, index)}>
                                                            <RestOutlined />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                            }
                        </div>
                        {
                            checkOrder === false &&
                            <div className="right">
                                <div>
                                    <span>Tạm Tính</span>
                                </div>
                                <hr />
                                <div className='tongTien'>
                                    <div>
                                        <span>Tổng tiền</span>
                                    </div>
                                    <div>
                                        <span className='price'>{handleConvert(handleTotalPrice())}</span>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    {
                                        order.length === 0 ?
                                            <Button className='order-button' onClick={() => message.warning("Giỏ hàng của bạn đéo có hàng")}>Mua hàng ({order.length})</Button>
                                            :
                                            <Button className='order-button' onClick={() => setCheckOrder(true)}>Mua hàng ({order.length})</Button>

                                    }
                                </div>
                            </div>
                        }

                        {checkOrder === true &&
                            <div className="right">
                                <Form
                                    form={form}
                                    name="form-price"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        label="Tên người nhận"
                                        labelCol={{ span: 24 }}
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                        labelCol={{ span: 24 }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your phone!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Địa chỉ"
                                        name="address"
                                        labelCol={{ span: 24 }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your address!',
                                            },
                                        ]}
                                    >
                                        <TextArea rows={4} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Hình thức thanh toán"
                                        labelCol={{ span: 24 }}
                                        name="remember"
                                        valuePropName="checked"
                                    >
                                        <Radio value="apple">Thanh toán khi nhận hàng</Radio>
                                    </Form.Item>
                                    <Divider />
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "10px 0px 10px 0px"
                                    }}>
                                        <div>
                                            Tổng tiền
                                        </div>
                                        <div>
                                            {handleConvert(handleTotalPrice())}
                                        </div>
                                    </div>
                                    <Divider />

                                    <Form.Item
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Button type="primary" htmlType="submit" style={{
                                            width: "100%"
                                        }}>
                                            Đặt hàng ({order.length})
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        }
                    </div>
                    :
                    <Result
                        icon={<SmileOutlined />}
                        title="Great, we have done all the operations!"
                        extra={
                            <Button onClick={() => navigate('/history')}>Xem lịch sử</Button>
                        }
                    />

            }

        </div >
    )
}

export default ViewOrder;