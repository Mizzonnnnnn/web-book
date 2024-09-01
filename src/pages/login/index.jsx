import React from "react";
import { Button, Checkbox, Form, Grid, Input, message, notification, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import iconFaceBook from "/icons/facebook.svg"
import iconGithub from "/icons/github.svg"
import iconGoogle from "/icons/google.svg"
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../service/api";
import { useDispatch, useSelector } from "react-redux";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;
import { doLoginAction } from "../../redux/account/accountSilce";

const LoginPage = () => {
    const { token } = useToken();
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await postLogin(email, password);

        if (res && res.data) {
            dispatch(doLoginAction(res.data.user))
            localStorage.setItem("access_token", res.data.access_token)
            navigate('/')
            message.success("Đăng nhập thành công")
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message,
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
            <div style={
                styles.container
            }>
                <div style={styles.header}>
                    <Title style={styles.title}>Sign in</Title>
                </div>
                <Form
                    name="normal_login"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                            },
                            {
                                type: 'email',
                                message: 'Enter a valid email address!',
                            }
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
                            // {
                            //     min: 8,
                            //     message: "Password must be at least 8 characters long",
                            // },

                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a style={styles.forgotPassword} href="">
                            Forgot password?
                        </a>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block="true" type="primary" htmlType="submit">
                            Log in
                        </Button>
                        <div style={styles.footer}>
                            <Text style={styles.text}>Don't have an account?</Text>{" "}
                            <Link onClick={() => navigate("/register")}>Sign up</Link>
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

export default LoginPage;