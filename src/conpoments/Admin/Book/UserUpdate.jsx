import { Button, Form, Input, message, Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { callUpdateUser } from "../../../service/api";

const UserUpdate = (props) => {
    const { show, setShow, data, fetchListUser } = props;
    const [form] = Form.useForm();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const onFinish = async (values) => {
        const { fullName, phone } = values;
        const res = await callUpdateUser(data._id, fullName, phone);
        if (res && res.data) {
            handleClose();
            message.success("Cập nhật thành công");
            fetchListUser();
        }
    };

    const handleClose = () => {
        setShow(false)
        form.resetFields();
        setFullName("")
        setEmail("");
        setPhone("")
    }
    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
            });
            setFullName(data.fullName);
            setEmail(data.email);
            setPhone(data.phone);
        }
    }, [data._id])
    return (
        <Modal
            title="Cập nhật người dùng"
            open={show}
            footer={false}
            onCancel={handleClose}
            forceRender={true}
        >
            <br />
            <Form
                name="layout-multiple-horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                form={form}
                onFinish={onFinish}
                initialValues={data}
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
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}

                >
                    <Input disabled />
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
                            Cập nhật
                        </Button>
                        <Button htmlType="button">
                            Hủy
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UserUpdate;