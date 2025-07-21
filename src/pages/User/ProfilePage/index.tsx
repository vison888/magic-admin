import {
  CloseOutlined,
  EditOutlined,
  SaveOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  message,
  Row,
} from 'antd';
import React, { useState } from 'react';
import { userServiceUpdate } from '@/services/auth/userService';
import { APPCODE } from '@/utils/const';

const ProfilePage: React.FC = () => {
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
    <PageContainer
      title="个人信息"
      extra={
        <div style={{ display: 'flex', gap: '8px' }}>
          {!editing ? (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEdit}
              style={{
                background: 'linear-gradient(135deg, #1890FF 0%, #00E5FF 100%)',
                border: 'none',
                borderRadius: '8px',
              }}
            >
              编辑信息
            </Button>
          ) : (
            <>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                loading={loading}
                onClick={handleSave}
                style={{
                  background:
                    'linear-gradient(135deg, #52C41A 0%, #36CFC9 100%)',
                  border: 'none',
                  borderRadius: '8px',
                }}
              >
                保存
              </Button>
              <Button
                icon={<CloseOutlined />}
                onClick={handleCancel}
                style={{
                  border: '1px solid rgba(56, 207, 201, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              >
                取消
              </Button>
            </>
          )}
        </div>
      }
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card
            title="头像信息"
            style={{
              background: 'rgba(26, 31, 45, 0.8)',
              border: '1px solid rgba(56, 207, 201, 0.3)',
              borderRadius: '12px',
            }}
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Avatar
                size={120}
                src={currentUser?.avatar}
                icon={<UserOutlined />}
                style={{
                  border: '4px solid rgba(56, 207, 201, 0.3)',
                  boxShadow: '0 8px 24px rgba(0, 229, 255, 0.3)',
                }}
              />
              <div
                style={{
                  marginTop: '20px',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {currentUser?.nickName || currentUser?.userName}
              </div>
              <div
                style={{ marginTop: '8px', color: 'rgba(255, 255, 255, 0.6)' }}
              >
                管理员
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card
            title="基本信息"
            style={{
              background: 'rgba(26, 31, 45, 0.8)',
              border: '1px solid rgba(56, 207, 201, 0.3)',
              borderRadius: '12px',
            }}
          >
            {!editing ? (
              <Descriptions
                column={1}
                bordered
                size="middle"
                labelStyle={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 600,
                  width: '120px',
                }}
                contentStyle={{
                  color: '#fff',
                  background: 'rgba(15, 20, 35, 0.6)',
                }}
                style={{
                  background: 'rgba(15, 20, 35, 0.6)',
                  borderRadius: '8px',
                  border: '1px solid rgba(56, 207, 201, 0.3)',
                }}
              >
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
              <Form form={form} layout="vertical" style={{ marginTop: '24px' }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="昵称"
                      name="nickName"
                      rules={[{ required: true, message: '请输入昵称' }]}
                    >
                      <Input
                        placeholder="请输入昵称"
                        style={{
                          background: 'rgba(15, 20, 35, 0.6)',
                          border: '1px solid rgba(56, 207, 201, 0.3)',
                          color: '#fff',
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="手机号"
                      name="phone"
                      rules={[
                        {
                          pattern: /^1[3-9]\d{9}$/,
                          message: '请输入有效的手机号',
                        },
                      ]}
                    >
                      <Input
                        placeholder="请输入手机号"
                        style={{
                          background: 'rgba(15, 20, 35, 0.6)',
                          border: '1px solid rgba(56, 207, 201, 0.3)',
                          color: '#fff',
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
                >
                  <Input
                    placeholder="请输入邮箱"
                    style={{
                      background: 'rgba(15, 20, 35, 0.6)',
                      border: '1px solid rgba(56, 207, 201, 0.3)',
                      color: '#fff',
                    }}
                  />
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ProfilePage;
