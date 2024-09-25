import { Button, Divider, InputNumber } from 'antd';
import './ViewOrder.scss'
import { RestOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doRemoveOrder } from '../../redux/order/orderSilce';

const ViewOrder = () => {
    const order = useSelector(state => state.order.carts);
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState([])
    useEffect(() => {
        const init = order.map(item => item.quantity);
        setQuantity(init);
    }, [order])

    useEffect(() => {
        handleTotalPrice();
    }, [quantity, order]);

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
    return (
        <div className="order-container">
            <div className='left'>
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
                                    <InputNumber min={1} value={quantity[index]} onChange={(value) => onChange(value, index, item?.detail?.book?.quantity)} />
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
            </div>


            <div className="right">
                <div>
                    <span>Tạm Tính</span>
                </div>
                <Divider />
                <div className='tongTien'>
                    <div>
                        <span>Tổng tiền</span>
                    </div>
                    <div>
                        <span className='price'>{handleConvert(handleTotalPrice())}</span>
                    </div>
                </div>
                <Divider />
                <div>
                    <Button className='order-button'>Mua hàng ({order.length})</Button>
                </div>
            </div>
        </div>
    )
}

export default ViewOrder;