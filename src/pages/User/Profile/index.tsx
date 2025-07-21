import {
  CloseOutlined,
  EditOutlined,
  SaveOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import {
  Avatar,
  Button,
  Descriptions,
  Drawer,
  Form,
  Input,
  message,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { userServiceUpdate } from '@/services/auth/userService';
import { APPCODE } from '@/utils/const';

interface UserProfileDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({
  visible,
  onClose,
}) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const currentUser = initialState?.currentUser;

  const handleEdit = () => {
    setEditing(true);
    form.setFieldsValue({
      nickName: currentUser?.nickName,
      phone: currentUser?.phone,
      email: currentUser?.email,
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const response = await userServiceUpdate({
        Item: {
          id: currentUser?.userId,
          nick_name: values.nickName,
          phone: values.phone,
          email: values.email,
        },
        app_code: APPCODE,
      });

      if (response.code === 0) {
        message.success('个人信息更新成功');
        setEditing(false);

        // 更新全局状态
        if (setInitialState) {
          setInitialState((s) => ({
            ...s,
            currentUser: {
              ...s?.currentUser,
              nickName: values.nickName,
              phone: values.phone,
              email: values.email,
            },
          }));
        }
      } else {
        message.error(response.msg || '更新失败');
      }
    } catch (error) {
      message.error('更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    form.resetFields();
  };

  return (
    <Drawer
      title="个人信息"
      placement="right"
      width={500}
      open={visible}
      onClose={onClose}
      styles={{
        mask: {
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        },
      }}
      extra={
        <div style={{ display: 'flex', gap: '8px' }}>
          {!editing ? (
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              编辑
            </Button>
          ) : (
            <>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                loading={loading}
                onClick={handleSave}
              >
                保存
              </Button>
              <Button icon={<CloseOutlined />} onClick={handleCancel}>
                取消
              </Button>
            </>
          )}
        </div>
      }
    >
      <div style={{ padding: '20px 0' }}>
        {/* 头像区域 */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Avatar size={80} src={currentUser?.avatar} icon={<UserOutlined />} />
          <div style={{ marginTop: '16px', fontSize: '18px', fontWeight: 600 }}>
            {currentUser?.nickName || currentUser?.userName}
          </div>
        </div>

        {!editing ? (
          // 查看模式
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="用户ID">
              {currentUser?.userId}
            </Descriptions.Item>
            <Descriptions.Item label="用户名">
              {currentUser?.userName}
            </Descriptions.Item>
            <Descriptions.Item label="昵称">
              {currentUser?.nickName || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="手机号">
              {currentUser?.phone || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="邮箱">
              {currentUser?.email || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="角色">管理员</Descriptions.Item>
          </Descriptions>
        ) : (
          // 编辑模式
          <Form form={form} layout="vertical" style={{ marginTop: '24px' }}>
            <Form.Item
              label="昵称"
              name="nickName"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input placeholder="请输入昵称" />
            </Form.Item>

            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Form>
        )}
      </div>
    </Drawer>
  );
};

export default UserProfileDrawer;
