import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import React, { useState } from 'react';
import {
  authServiceForgetPassword,
  authServiceVerificationCode,
} from '@/services/auth/authService';
import { APPCODE } from '@/utils/const';
import { getPassword } from '@/utils/password';

interface ForgotPasswordModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onCancel,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [form] = Form.useForm();

  // 验证手机号或邮箱格式
  const validateContact = (_: any, value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^1[3-9]\d{9}$/;
    
    if (emailRegex.test(value)) {
      return Promise.resolve();
    }
    if (phoneRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请输入有效的手机号或邮箱地址'));
  };

  const handleSendVerificationCode = async () => {
    try {
      const contact = form.getFieldValue('email');
      if (!contact) {
        message.error('请先输入手机号或邮箱地址');
        return;
      }

      setSendingCode(true);
      const response = await authServiceVerificationCode({
        object: contact,
        method: 2, // 邮箱验证
        app_code: APPCODE,
      });

      if (response.code === 0) {
        message.success('验证码已发送');
      } else {
        message.error(response.msg || '发送验证码失败');
      }
    } catch (error) {
      message.error('发送验证码失败，请重试');
    } finally {
      setSendingCode(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const response = await authServiceForgetPassword({
        email: values.email,
        verification_code: values.verificationCode,
        password: getPassword(values.newPassword),
      });

      if (response.code === 0) {
        message.success('密码重置成功，请使用新密码登录');
        onSuccess();
        handleCancel();
      } else {
        message.error(response.msg || '密码重置失败');
      }
    } catch (error) {
      message.error('密码重置失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setLoading(false);
    setSendingCode(false);
    onCancel();
  };

  return (
    <Modal
      title="忘记密码"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={400}
      centered
    >
      <Form form={form} layout="vertical" style={{ marginTop: '16px' }}>
        <Form.Item
          name="email"
          label="手机号或邮箱"
          rules={[
            { required: true, message: '请输入手机号或邮箱地址' },
            { validator: validateContact },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined />}
            placeholder="请输入手机号或邮箱地址"
          />
        </Form.Item>

        <Form.Item
          name="verificationCode"
          label="验证码"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              size="large"
              placeholder="请输入验证码"
              maxLength={6}
              style={{ flex: 1 }}
            />
            <Button
              size="large"
              onClick={handleSendVerificationCode}
              loading={sendingCode}
              disabled={sendingCode}
            >
              获取验证码
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 6, message: '密码长度至少6位' },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="请输入新密码"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="确认密码"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: '请确认新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="请确认新密码"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleResetPassword}
            style={{ width: '100%' }}
          >
            重置密码
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordModal;
