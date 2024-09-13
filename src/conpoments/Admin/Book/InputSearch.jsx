import { Button, Checkbox, Col, Form, Input, Row, Space, theme } from 'antd';


const InputSearch = (props) => {
    const [form] = Form.useForm();
    const { handleOnSearch, handleRefesh } = props;
    const onFinish = (values) => {
        let query = "";
        if (values.mainText) {
            query += `&mainText=/${values.mainText}/i`
        }
        if (values.author) {
            query += `&author=/${values.author}/i`
        }

        if (values.category) {
            query += `&category=/${values.category}/i`
        }

        if (query) {
            handleOnSearch(query);
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    };

    const onReset = () => {
        form.resetFields();
        handleRefesh()
    };
    return (
        <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
        >
            <Row gutter={24}>

                <Col span={8}>
                    <Form.Item
                        label="Tên sách"
                        name="mainText"
                        labelCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                        labelCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Thể loại"
                        name="category"
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
                        Search
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Clear
                    </Button>
                </Space>

            </Form.Item>
        </Form>
    )
}

export default InputSearch;