import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, Modal, message } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { Footer } from '@/components';
import { authServiceLogin } from '@/services/auth/authService';
import { APPCODE } from '@/utils/const';
import { getPassword } from '@/utils/password';
import { setLoginResult } from '@/utils/store';
import { isPassword, passwordFormatTips } from '@/utils/verification';
import Settings from '../../../../config/defaultSettings';
import ForgotPasswordModal from '../ForgotPassword';
import './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
        marginTop: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const checkPassword = (password: string) => {
    if (!password) {
      return '请输入密码';
    }
    if (!isPassword(password)) {
      return passwordFormatTips;
    }
    return true;
  };

  const checkAccount = (account: string) => {
    if (!account) {
      return '请输入账号';
    }
    return true;
  };

  const handleSubmit = async (values: API.protoLoginReq) => {
    const account = values.account as string;
    const password = values.password as string;
    const passwordErr = checkPassword(password);
    if (!passwordErr) {
      message.error(passwordErr);
      return;
    }

    const accountErr = checkAccount(account);
    if (!accountErr) {
      message.error(accountErr);
      return;
    }

    values.password = getPassword(values.password as string);
    // 登录
    const msg = await authServiceLogin({ ...values });
    if (msg.code === 0) {
      message.success('登录成功！正在跳转...');
      //存储token信息
      setLoginResult(msg.token as string, msg.user_id as string);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      setTimeout(() => {
        history.push(urlParams.get('redirect') || '/');
      }, 1000);
      return;
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>
          {'登录页'}- {Settings.title}
        </title>
      </Helmet>

      <div className="login-content">
        <div className="login-form-wrapper">
          <LoginForm
            title="管理系统"
            subTitle="Magic Admin - 企业级管理平台"
            initialValues={{
              autoLogin: false,
            }}
            onFinish={async (values) => {
              const req: API.protoLoginReq = {
                account: values.username,
                password: values.password,
                role_code: 'MAGIC_PLAT_ADMIN',
                app_code: APPCODE,
              };
              await handleSubmit(req);
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined style={{ color: '#bfbfbf' }} />,
              }}
              placeholder={'请输入用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined style={{ color: '#bfbfbf' }} />,
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />

            <div
              style={{
                marginBottom: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  color: '#1890ff',
                  textDecoration: 'none',
                }}
                onClick={() => {
                  setForgotPasswordVisible(true);
                }}
              >
                忘记密码
              </a>
            </div>
          </LoginForm>
        </div>
      </div>

      <Footer />
      <ForgotPasswordModal
        visible={forgotPasswordVisible}
        onCancel={() => setForgotPasswordVisible(false)}
        onSuccess={() => {
          message.success('密码重置成功，请使用新密码登录');
        }}
      />
    </div>
  );
};

export default Login;
