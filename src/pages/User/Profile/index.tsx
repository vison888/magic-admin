import {
  CloseOutlined,
  SaveOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  message,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { userServiceUpdate } from '@/services/auth/userService';
import { APPCODE } from '@/utils/const';

const { Title, Text } = Typography;

interface UserProfileDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({
  visible,
  onClose,
}) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const currentUser = initialState?.currentUser;

  // 初始化表单数据
  React.useEffect(() => {
    if (visible && currentUser) {
      form.setFieldsValue({
        nickName: currentUser?.nickName,
        phone: currentUser?.phone,
        email: currentUser?.email,
      });
    }
  }, [visible, currentUser, form]);

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

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '480px',
        height: '100vh',
        backgroundColor: '#fff',
        boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        overflowY: 'auto',
      }}
    >
      {/* 头部 */}
      <div style={{ 
        padding: '24px 24px 0 24px',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>个人信息</Title>
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </div>
      </div>

      <div style={{ padding: '0 24px 24px 24px' }}>
        {/* 头像和基本信息 */}
        <Card 
          style={{ marginBottom: '24px' }}
          bodyStyle={{ padding: '24px' }}
        >
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              size={80} 
              src={currentUser?.avatar} 
              icon={<UserOutlined />}
              style={{ marginBottom: '16px' }}
            />
            <Title level={4} style={{ margin: '0 0 8px 0' }}>
              {currentUser?.nickName || currentUser?.userName}
            </Title>
            <Text type="secondary">{currentUser?.userName}</Text>
          </div>
        </Card>

        {/* 详细信息 */}
        <Card title="详细信息">
          <Descriptions column={1} size="small" style={{ marginBottom: '24px' }}>
            <Descriptions.Item label="用户ID">
              <Text copyable>{currentUser?.userId}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="用户名">
              {currentUser?.userName}
            </Descriptions.Item>
            <Descriptions.Item label="角色">
              <Text type="success">管理员</Text>
            </Descriptions.Item>
          </Descriptions>

          <Form form={form} layout="vertical">
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

            <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                loading={loading}
                onClick={handleSave}
                block
                size="large"
              >
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UserProfileDrawer;
