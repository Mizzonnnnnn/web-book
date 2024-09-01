import { Button, Checkbox, Col, Form, Input, Row, Space, theme } from 'antd';


const InputSearch = (props) => {
    const { handleOnSearch } = props;
    const onFinish = (values) => {
        let query = "";
        if (values.fullName) {
            query += `&fullName=/${values.fullName}/i`
        }
        if (values.email) {
            query += `&email=/${values.email}/i`
        }

        if (values.phone) {
            query += `&phone=/${values.phone}/i`
        }

        if (query) {
            handleOnSearch(query);
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    return (
        <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row gutter={24}>

                <Col span={8}>
                    <Form.Item
                        label="Name"
                        name="fullName"
                        labelCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        labelCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        labelCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Space
                    style={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="submit">
                        Clear
                    </Button>
                </Space>

            </Form.Item>
        </Form>
    )
}

export default InputSearch;