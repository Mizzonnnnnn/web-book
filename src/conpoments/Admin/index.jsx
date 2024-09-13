import React, { useState } from 'react';
import {
    AppstoreOutlined,
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, message, Space, theme, } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import './admin.scss'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../service/api';
import { doLogoutAction } from '../../redux/account/accountSilce';

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const image = `http://localhost:8080/images/avatar/${user.avatar}`

    const handleLogout = async () => {
        const res = await callLogout();

        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success(res.data);
            navigate("/")
        }
    }

    const items = [
        {
            key: 'dashboard',
            icon: <AppstoreOutlined />,
            label: <Link to='/admin'>Dashboard</Link>,
        },
        {
            key: '2',
            icon: <UserOutlined />,
            label: 'Manage Users',
            children: [
                {
                    key: "11",
                    label: <Link to="/admin/user">Users</Link>,
                    icon: <TeamOutlined />,
                }
            ]
        },
        {
            key: 'book',
            icon: <VideoCameraOutlined />,
            label: <Link to="/admin/book">Manage Books</Link>,
        },
        {
            key: 'order',
            icon: <UploadOutlined />,
            label: <Link to="/admin/order">Manage Orders</Link>,
        }
    ]

    const itemsDropdown = [
        {
            label: <label>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label onClick={handleLogout}>Đăng xuất</label>,
            key: 'logout',
        },

    ];



    return (
        <Layout className='admin-container'>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, marginBottom: 17, textAlign: 'center', paddingTop: 5 }}>
                    Admin
                </div>
                <div className="demo-logo-vertical" />
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    className='admin-header'
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <Dropdown
                        menu={{
                            items: itemsDropdown
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space
                                style={{
                                    paddingRight: "30px"
                                }}
                            >
                                <Avatar size={30} src={image} />
                                {user.fullName}
                            </Space>
                        </a>
                    </Dropdown>
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    className="no-scrollbar"
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout >
    );
}

export default LayoutAdmin;