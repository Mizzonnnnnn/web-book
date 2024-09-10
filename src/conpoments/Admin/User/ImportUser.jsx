import { InboxOutlined } from '@ant-design/icons';
import { message, Modal, notification, Table } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { importUsers } from '../../../service/api';


const ImportUser = (props) => {
    const { show, setShow, fetchListUser } = props;
    const [data, setData] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isExist, setIsExist] = useState(true)
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };

    const fakeData = [
        { fullName: 'John Doe', email: 'john@example.com', phone: 987654321, password: 'abc123' },
        { fullName: 'Jane Smith', email: 'jane@example.com', phone: 123456789, password: 'xyz789' },
        { fullName: 'Alice Johnson', email: 'alice@example.com', phone: 555666777, password: 'password123' },
        { fullName: 'Bob Brown', email: 'bob@example.com', phone: 222333444, password: 'qwerty' }
    ];

    const handleDownload = (event) => {
        event.stopPropagation();
        const worksheet = XLSX.utils.json_to_sheet(fakeData);

        // Tạo workbook và thêm worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

        // Xuất file Excel
        XLSX.writeFile(workbook, 'users.xlsx');

        message.success('File downloaded successfully.');
    }

    const prop = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileList: fileList,
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            setFileList([...info.fileList])

            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        beforeUpload(file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                let data = e.target.result;
                let workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const res = XLSX.utils.sheet_to_json(worksheet, {
                    header: ["fullName", "email", "phone"],
                    range: 1
                });
                let count = 0;
                let datas = res.map(item => ({
                    key: count++,
                    ...item,
                    password: "123456"
                }));
                setData(datas)
                setIsExist(false)
                file.status = 'done';
            }
            reader.readAsArrayBuffer(file);

            // Prevent upload
            // return false;
        },
        onDownload(file) {
            console.log(file)
        }
    };

    const handleClose = () => {
        setShow(false)
        setData([])
        setFileList([])
    }

    const handleSubmitData = async () => {
        const res = await importUsers(data);
        if (res && res.data) {
            fetchListUser();
            message.success(res.data);
            console.log(res)
            notification.success({
                message: "Xong ...",
                description: `CountError: ${res.data.countError}, CountSucces: ${res.data.countSuccess}`,
                duration: 5
            })
            setData([])
            setFileList([])
            setShow(false)
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message,
                duration: 5
            })
        }
    }

    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={show}
                onCancel={handleClose}
                onOk={handleSubmitData}
                okButtonProps={{
                    disabled: isExist
                }}

                okText="Import data"
                maskClosable={false}
                width={"50vw"}
            >
                <Dragger {...prop}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px"
                        }}>
                        <p className="ant-upload-hint">
                            Support for a single upload. Only accept .csv, .xls, .xlsx
                        </p>
                        <p onClick={(event) => handleDownload(event)} style={{ color: "#4096ff", cursor: "pointer" }}>Download Sample File</p>

                    </div>

                </Dragger>
                <div style={{ paddingTop: 20 }}>
                    <Table

                        title={() => <span>Dữ liệu upload:</span>}
                        columns={[
                            { dataIndex: 'fullName', title: 'Tên hiển thị' },
                            { dataIndex: 'email', title: 'Email' },
                            { dataIndex: 'phone', title: 'Số điện thoại' },
                        ]}
                        dataSource={data}
                    />
                </div>

            </Modal>
        </>
    );
}

export default ImportUser;