import { Modal, Tabs } from "antd"
import TabUpdateUser from "./TabUpdateUser";
import TabChangePassword from "./TabChangePassword";


const ModalAccount = (props) => {
    const { show, setShow } = props;

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'Cập nhật thông tin',
            children: <TabUpdateUser />,
        },
        {
            key: '2',
            label: 'Đổi mật khẩu',
            children: <TabChangePassword />,
        }
    ];

    return (
        <Modal
            title="Basic Modal"
            open={show}
            onCancel={() => setShow(false)}
            width={900}
            footer={null}
        >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Modal>
    )
}

export default ModalAccount;