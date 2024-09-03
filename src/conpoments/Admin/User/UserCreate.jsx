import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, notification, Space } from 'antd';
import { useState } from 'react';
import { callCreateUser } from '../../../service/api';



const UserCreate = (props) => {
    const { show, setShow, fetchListUser } = props;
    const [form] = Form.useForm();
    const handleOk = async (value) => {
        const { email, fullName, password, phone } = value;
        const res = await callCreateUser(fullName, password, email, phone);
        if (res && res.data) {
            message.success("Success create user")
            await fetchListUser()
            setShow(false)

        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message,
                duration: 5
            })
        }
    };
    const handleCancel = () => {
        setShow(false)
        form.resetFields()
    };

    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={show}
                onCancel={handleCancel}
                footer={null}
            >
                <br />
                <Form
                    name="layout-multiple-horizontal"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={handleOk}
                    form={form}
                >
                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[{ required: true }]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true }]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input.Password
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true }]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true }]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Space style={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={handleCancel}>
                                Hủy
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default UserCreate;