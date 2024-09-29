import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message, Upload } from 'antd';
import './header.scss'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { callRefeshtoken, callUpdateAccount, callUpdateAvatar } from '../../service/api';
import { v4 as uuidv4 } from 'uuid';
import { doUpdateUserInfoAction } from '../../redux/account/accountSilce';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};


const TabUpdateUser = (props) => {
    const [form] = Form.useForm();
    const account = useSelector(state => state.account.user);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [initForm, setInitForm] = useState(null);
    const [dataThumbnail, setDataThumbnail] = useState([]);
    const [userAvatar, setUserAvatar] = useState(account?.avatar ?? "");
    const dispatch = useDispatch()

    const handleUploadThumbnail = async ({ file, onSuccess, onError }) => {
        const res = await callUpdateAvatar(file);
        if (res && res.data) {
            getBase64(file, (url) => {
                setImageUrl(url);
                onSuccess('ok');
            });
            const newAvatar = res.data.fileUploaded;
            setUserAvatar(newAvatar);
        } else {
            onError('Đã có lỗi khi upload file');
        }
    }

    useEffect(() => {
        if (account && account.avatar) {
            setImageUrl(`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${account.avatar}`);
        }
    }, []);

    const uploadButton = (
        <>
        </>
    );

    const onFinish = async (values) => {
        const { phone, fullName } = values;
        let thumbnail = dataThumbnail.length > 0 ? dataThumbnail[0].name : account.avatar;
        const res = await callUpdateAccount(fullName, phone, thumbnail, account.id);
        if (res && res.data) {
            dispatch(doUpdateUserInfoAction({ avatar: userAvatar, phone, fullName }));
            message.success("Cập nhật thông tin cá nhân thành công")
            localStorage.removeItem('access_token');
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }

    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                fullName: account.fullName,
                email: account.email,
                phone: account.phone,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <div className="update-user-container">
                <div className="image-update" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Form.Item>
                        <div style={{
                            display: "flex",
                            flexDirection: 'column',
                            gap: "30px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Upload
                                listType="picture-circle"
                                maxCount={1}
                                showUploadList={false}
                                disabled
                                multiple={false}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '150px',
                                            borderRadius: '50%', // Cắt thành hình tròn
                                            objectFit: 'cover',
                                            height: "150px"
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                            <Upload
                                customRequest={handleUploadThumbnail}
                                // onChange={handleChange}
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                            </Upload>
                        </div>
                    </Form.Item>
                </div>
                <div className="form-container">
                    <Form.Item
                        label="Email"
                        name="email"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Tên hiển thị"
                        name="fullName"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullName!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </div >
        </Form >

    )
}

export default TabUpdateUser;