import Search from 'antd/es/transfer/search';
import './header.scss'
import { FaBook } from "react-icons/fa";
import { Avatar, Badge, Button, Dropdown, message, Popover, Space } from 'antd';
import { HomeTwoTone, ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { callLogout } from '../../service/api';
import { doLogoutAction } from '../../redux/account/accountSilce';
import { useState } from 'react';
const onSearch = (value, _e, info) => console.log(info?.source, value);


const Header = () => {
    let items = [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const account = useSelector(state => state.account);
    const cartItems = useSelector(state => state.order);
    const role = account.user.role;
    const image = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${account.user.avatar}`

    const handleConvert = (data) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formatter.format(data);;
    }

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success("Logout thành công");
        }
    }

    if (role === "ADMIN") {
        items.push(
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        Thông tin tài khoảng
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <Link to="/admin">
                        Quản lý hệ thống
                    </Link>
                ),
            },
            {
                key: '3',
                label: (
                    <span onClick={() => handleLogout()}>
                        Đăng xuất
                    </span>
                ),
            },
        );
    } else {
        items.push(
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        Thông tin tài khoảng
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        Đơn hàng của tôi
                    </a>
                ),
            },
            {
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        Trung tâm hỗ trợ
                    </a>
                ),
            },
            {
                key: '4',
                label: (
                    <span onClick={() => handleLogout()}>
                        Đăng xuất
                    </span>
                ),
            },
        )
    }
    const text = <span>Sản phẩm mới thêm</span>;
    const content = (
        <div>
            <div className='popover-content'>
                {cartItems.carts.map((item, index) => {
                    return (
                        <div className='popoverCard' key={index}>
                            <div>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.book?.thumbnail}`} alt="image" className='image' />
                            </div>
                            <div className='title-price'>
                                <div>{item?.detail?.book?.mainText}</div>
                                <div><span className='price'>{handleConvert(item?.detail?.book?.price)}</span></div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='popover-footer'>
                <Button className='popover-button' onClick={() => navigate('/order')}>Xem giỏ hàng</Button>
            </div>
        </div>
    );
    return (
        <div className="header-container">
            <div className="page-header">
                <div style={{
                    cursor: "pointer",
                    display: "flex"
                }}
                    onClick={() => navigate('/')}
                >
                    <div className='header-icon'>
                        <FaBook className='icon' />
                    </div>
                    <div className='header-title'>
                        TIKA
                    </div>
                </div>

                <div className='header-search'>
                    <Search
                        placeholder="Bạn tìm gì hôm nay"
                        allowClear
                        onSearch={onSearch}
                    />
                </div>

                <div className='header-home'>
                    <div className='icon-home'>
                        <HomeTwoTone />
                    </div>
                    <div className='title-home'>
                        Trang chủ
                    </div>
                </div>

                <div className='header-profile'>
                    {account.isAuthenticated === false ?
                        <span onClick={() => navigate("/login")}>
                            <Button>
                                <div className='icon-profile'>
                                    <SmileOutlined />
                                </div>
                                <div className='title-profile'>
                                    Tài Khoản
                                </div>
                            </Button>
                        </span>
                        :
                        <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} >
                            <Button>
                                <Space>
                                    <div >
                                        <Avatar size={25} src={image} />
                                    </div>
                                    <div className='title-profile'>
                                        {account.user.fullName}
                                    </div>
                                </Space>

                            </Button>
                        </Dropdown>
                    }

                </div>

                <div className='line' />

                <div className='shopping-cart'>
                    <Badge count={cartItems?.carts?.length} size="small" showZero>
                        <Popover placement="bottomRight" title={text} content={content} rootClassName='popover-carts'>
                            <ShoppingCartOutlined className="icon-Shopping" style={{ fontSize: "25px" }} />
                        </Popover>
                    </Badge>
                </div>
            </div>
        </div >
    )
}

export default Header;