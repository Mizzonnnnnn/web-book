import React, { useState } from "react";
import { Button, Form, Grid, Input, message, notification, theme, Typography } from "antd";
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import iconFaceBook from "/icons/facebook.svg"
import iconGithub from "/icons/github.svg"
import iconGoogle from "/icons/google.svg"
import { useNavigate } from "react-router-dom";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;
import { postRegister } from "../../service/api";
const RegisterPage = () => {
    const { token } = useToken();
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const onFinish = async (values) => {
        setIsSubmit(true)
        const { fullName, email, password, phone } = values;
        const res = await postRegister(fullName, email, password, phone);
        setIsSubmit(false)
        if (res?.data?._id) {
            message.success("Đăng ký tài khoảng thành công !!!");
            navigate("/login")

        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && res.message.length > 0 ? res.message[0] : res.message,
                duration: 5
            })

        }
    };

    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
            width: "350px",
            border: `1px solid ${token.colorBorder}`, // Thêm border bao quanh form
            borderRadius: "8px", // Tùy chọn thêm bo góc border
            boxShadow: `0 4px 8px ${token.colorShadow}`, // Tùy chọn thêm hiệu ứng đổ bóng
            backgroundColor: "#F1F5FA"// Thay đổi màu nền để phù hợp với thiết kế
        },
        footer: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%"
        },
        forgotPassword: {
            float: "right"
        },
        header: {
            marginBottom: token.marginXL,
            textAlign: "center",
        },
        section: {
            alignItems: "center",
            backgroundColor: token.colorBgContainer,
            display: "flex",
            // minHeight: screens.sm ? "100vh" : "auto", // Sử dụng minHeight thay vì height
            padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
            overflow: "hidden" // Thêm thuộc tính overflow để kiểm soát nội dung tràn
        },
        text: {
            color: token.colorTextSecondary
        },
        title: {
            fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
        },

    };


    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <Title style={styles.title}>Sign up</Title>
                </div>
                <Form
                    name="normal_login"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="fullName"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "Please input your FullName!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Full Name"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                            {
                                min: 8,
                                message: "Min 8 characters",
                            },
                            {
                                pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
                                message: 'Include upper, lower, number, and symbol'
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Phone!",
                            },
                            {
                                pattern: /^(\+84|0)[1-9][0-9]{8}$/,
                                message: "Phone number must be in the format +84xxxxxxxxx or 0xxxxxxxxx"
                            }
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="Phone"
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block="true" type="primary" htmlType="submit" loading={isSubmit}>
                            Log in
                        </Button>
                        <div style={styles.footer}>
                            <Text style={styles.text}>You have an account?</Text>{" "}
                            <Link onClick={() => navigate("/login")}>Sign in</Link>
                            <div style={{
                                display: "flex",
                                cursor: "pointer",
                                justifyContent: "center",
                                gap: "15px",
                                marginTop: "15px"
                            }}>
                                <div>
                                    <img src={iconFaceBook} alt="icon facebook" style={{ height: "40px", width: "40px" }} />
                                </div>
                                <div>
                                    <img src={iconGoogle} alt="icon google" style={{ height: "40px", width: "40px" }} />
                                </div>
                                <div>
                                    <img src={iconGithub} alt="icon github" style={{ height: "40px", width: "40px" }} />
                                </div>
                            </div>

                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    )
}

export default RegisterPage;