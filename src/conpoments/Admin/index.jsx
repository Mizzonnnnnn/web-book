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
                },
                {
                    key: "12",
                    label: <Link to="/admin/user">options1</Link>,
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
        },
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
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div style={{ height: 32, margin: 16, marginBottom: 17, textAlign: 'center', paddingTop: 5 }}>
                    Admin
                </div>

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
                            height: 50,
                        }}
                    />

                    <Dropdown
                        menu={{
                            items: itemsDropdown
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space >

                                <Avatar size={30} src={image} />
                                {user.fullName}
                            </Space>
                        </a>
                    </Dropdown>
                </Header>

                <Content
                    style={{
                        margin: "12px 0px 0px 12px",
                        padding: 20,
                        minHeight: 350,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
                {/* <Footer
                    style={{
                        textAlign: 'center',
                        padding: "10px"
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout >
    );
}

export default LayoutAdmin;