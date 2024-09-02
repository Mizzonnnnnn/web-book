import React, { useState } from 'react';
import { Badge, Descriptions, Drawer } from 'antd';



const UserViewDetail = (props) => {
    const { show, setShow, data } = props

    const handleCreateAt = () => {
        const date = new Date(data.createdAt);

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getUTCFullYear();

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    const handleUpdateAt = () => {
        const date = new Date(data.updatedAt);

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getUTCFullYear();

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    const items = [
        {
            key: '1',
            label: 'Id',
            children: data._id,
            span: 3
        },
        {
            key: '2',
            label: 'Họ và tên',
            children: data.fullName,
            span: 3
        },
        {
            key: '3',
            label: 'Email',
            children: data.email,
            span: 2
        },
        {
            key: '4',
            label: 'Phone',
            children: data.phone,
            span: 1
        },
        {
            key: '6',
            label: 'Role',
            children: <Badge status="processing" text={data.role} />,
            span: 3,
        },
        {
            key: '7',
            label: 'Created At',
            children: handleCreateAt(),
            span: 2
        },
        {
            key: '8',
            label: 'Updated At',
            children: handleUpdateAt(),
            span: 1
        }
    ];

    return (
        <>
            <Drawer
                closable
                destroyOnClose
                title={<p>User Profile</p>}
                placement="right"
                open={show}
                onClose={() => setShow(false)}
                width={700}
            >
                <Descriptions
                    bordered
                    size={'middle'}
                    items={items}
                />

            </Drawer>
        </>
    );
};

export default UserViewDetail;