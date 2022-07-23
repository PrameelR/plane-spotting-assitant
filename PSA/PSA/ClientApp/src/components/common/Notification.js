import React from "react";
import { notification, Avatar } from "antd";
import { BugOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const key = 'updatable';
export const openNotification = (
    title,
    description,
    type
) => {
    notification.open({
        key,
        message: title,
        description: description,
        duration: 10,
        icon: type === 'error' ? <CloseCircleOutlined style={{ color: '#e9152b' }} /> :
            type === 'success' ?
                <CheckCircleOutlined style={{ color: '#20C376' }} /> :
                <BugOutlined style={{ color: '#108ee9' }} />,
    });
};

