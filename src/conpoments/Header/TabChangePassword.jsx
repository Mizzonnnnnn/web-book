import React from 'react';
import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import { useSelector } from 'react-redux';
import { callChangePassword } from '../../service/api';

const TabChangePassword = () => {
    const [form] = Form.useForm();
    const account = useSelector(state => state.account.user);
    const onFinish = async (values) => {
        console.log('Success:', values);
        const res = await callChangePassword(values.email, values.password, values.cofirmpassword);

        if (res && res.data) {
            form.resetFields();
            message.success("Cập nhật password thành công");
        } else {
            notification.error({
                message: "Sai kìa thằng mặt lol",
                description: res.message
            })
        }
    };

    console.log(account)
    return (
        <Form
            form={form}
            name="change12242"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                email: account.email
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                labelCol={{ span: 24 }}
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                label="Mật khẩu hiên tại"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                labelCol={{ span: 24 }}

            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Password"
                name="cofirmpassword"
                labelCol={{ span: 24 }}

                rules={[
                    {
                        required: true,
                        message: 'Please input your confirm password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default TabChangePassword;