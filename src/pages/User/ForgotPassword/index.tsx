import { LockOutlined, MailOutlined, SafetyOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message, Steps } from 'antd';
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
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const steps = [
    {
      title: '邮箱验证',
      icon: <MailOutlined />,
    },
    {
      title: '验证码',
      icon: <SafetyOutlined />,
    },
    {
      title: '重置密码',
      icon: <LockOutlined />,
    },
  ];

  const handleSendVerificationCode = async () => {
    try {
      const email = form.getFieldValue('email');
      if (!email) {
        message.error('请先输入邮箱地址');
        return;
      }

      setLoading(true);
      const response = await authServiceVerificationCode({
        object: email,
        method: 2, // 邮箱验证
        app_code: APPCODE,
      });

      if (response.code === 0) {
        message.success('验证码已发送到您的邮箱');
        setCurrentStep(1);
      } else {
        message.error(response.msg || '发送验证码失败');
      }
    } catch (error) {
      message.error('发送验证码失败，请重试');
    } finally {
      setLoading(false);
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
    setCurrentStep(0);
    setLoading(false);
    onCancel();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱地址' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined style={{ color: '#36CFC9' }} />}
              placeholder="请输入邮箱地址"
            />
          </Form.Item>
        );
      case 1:
        return (
          <Form.Item
            name="verificationCode"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              size="large"
              prefix={<SafetyOutlined style={{ color: '#36CFC9' }} />}
              placeholder="请输入验证码"
              maxLength={6}
            />
          </Form.Item>
        );
      case 2:
        return (
          <>
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: '请输入新密码' },
                { min: 6, message: '密码长度至少6位' },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined style={{ color: '#36CFC9' }} />}
                placeholder="请输入新密码"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
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
                prefix={<LockOutlined style={{ color: '#36CFC9' }} />}
                placeholder="请确认新密码"
              />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  const getStepActions = () => {
    switch (currentStep) {
      case 0:
        return (
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleSendVerificationCode}
            style={{
              background: 'linear-gradient(135deg, #1890FF 0%, #00E5FF 100%)',
              border: 'none',
              borderRadius: '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
            }}
          >
            发送验证码
          </Button>
        );
      case 1:
        return (
          <Button
            type="primary"
            size="large"
            onClick={() => setCurrentStep(2)}
            style={{
              background: 'linear-gradient(135deg, #1890FF 0%, #00E5FF 100%)',
              border: 'none',
              borderRadius: '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
            }}
          >
            下一步
          </Button>
        );
      case 2:
        return (
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleResetPassword}
            style={{
              background: 'linear-gradient(135deg, #1890FF 0%, #00E5FF 100%)',
              border: 'none',
              borderRadius: '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
            }}
          >
            重置密码
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title="忘记密码"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={500}
      centered
      styles={{
        header: {
          background: 'linear-gradient(135deg, #0F1423 0%, #1A1F2D 100%)',
          borderBottom: '1px solid rgba(56, 207, 201, 0.3)',
        },
        body: {
          background: 'rgba(26, 31, 45, 0.9)',
          backdropFilter: 'blur(20px)',
        },
        mask: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <div style={{ padding: '20px 0' }}>
        <Steps
          current={currentStep}
          items={steps}
          style={{ marginBottom: '32px' }}
        />

        <Form form={form} layout="vertical" style={{ marginTop: '24px' }}>
          {renderStepContent()}

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            {getStepActions()}
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
