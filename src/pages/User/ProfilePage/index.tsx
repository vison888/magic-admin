import {
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
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { userServiceUpdate } from '@/services/auth/userService';
import { APPCODE } from '@/utils/const';

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const currentUser = initialState?.currentUser;

  // 初始化表单数据
  React.useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        nickName: currentUser?.nickName,
        phone: currentUser?.phone,
        email: currentUser?.email,
      });
    }
  }, [currentUser, form]);

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
    <PageContainer title="个人信息">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="头像信息">
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Avatar
                size={120}
                src={currentUser?.avatar}
                icon={<UserOutlined />}
                style={{
                  marginBottom: '16px',
                }}
              />
              <Title level={4} style={{ margin: '0 0 8px 0' }}>
                {currentUser?.nickName || currentUser?.userName}
              </Title>
              <Text type="secondary">管理员</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="基本信息">
            <Descriptions
              column={1}
              size="small"
              style={{ marginBottom: '24px' }}
            >
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
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="昵称"
                    name="nickName"
                    rules={[{ required: true, message: '请输入昵称' }]}
                  >
                    <Input placeholder="请输入昵称" />
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
                    <Input placeholder="请输入手机号" />
                  </Form.Item>
                </Col>
              </Row>

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
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ProfilePage;
 