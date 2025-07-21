// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** API权限 POST /rpc/auth/AuthService.APIPermissions */
export async function authServiceApiPermissions(
  body: API.protoAPIPermissionsReq,
  options?: { [key: string]: any },
) {
  return request<API.protoAPIPermissionsResp>('/rpc/auth/AuthService.APIPermissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除token POST /rpc/auth/AuthService.DelToken */
export async function authServiceDelToken(
  body: API.protoDelTokenReq,
  options?: { [key: string]: any },
) {
  return request<API.protoDelTokenResp>('/rpc/auth/AuthService.DelToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 忘记密码 POST /rpc/auth/AuthService.ForgetPassword */
export async function authServiceForgetPassword(
  body: API.protoForgetPasswordReq,
  options?: { [key: string]: any },
) {
  return request<API.protoForgetPasswordResp>('/rpc/auth/AuthService.ForgetPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 生成token POST /rpc/auth/AuthService.GenToken */
export async function authServiceGenToken(
  body: API.protoGenTokenReq,
  options?: { [key: string]: any },
) {
  return request<API.protoGenTokenResp>('/rpc/auth/AuthService.GenToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 检测token POST /rpc/auth/AuthService.Inspect */
export async function authServiceInspect(
  body: API.protoInspectReq,
  options?: { [key: string]: any },
) {
  return request<API.protoInspectResp>('/rpc/auth/AuthService.Inspect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录 POST /rpc/auth/AuthService.Login */
export async function authServiceLogin(body: API.protoLoginReq, options?: { [key: string]: any }) {
  return request<API.protoLoginResp>('/rpc/auth/AuthService.Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 邮箱登录 POST /rpc/auth/AuthService.LoginByEmail */
export async function authServiceLoginByEmail(
  body: API.protoLoginByEmailReq,
  options?: { [key: string]: any },
) {
  return request<API.protoLoginByEmailResp>('/rpc/auth/AuthService.LoginByEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 手机号登录 POST /rpc/auth/AuthService.LoginByPhone */
export async function authServiceLoginByPhone(
  body: API.protoLoginByPhoneReq,
  options?: { [key: string]: any },
) {
  return request<API.protoLoginByPhoneResp>('/rpc/auth/AuthService.LoginByPhone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出 POST /rpc/auth/AuthService.Logout */
export async function authServiceLogout(
  body: API.protoLogoutReq,
  options?: { [key: string]: any },
) {
  return request<API.protoLogoutResp>('/rpc/auth/AuthService.Logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 刷新token POST /rpc/auth/AuthService.RefreshToken */
export async function authServiceRefreshToken(
  body: API.protoRefreshTokenReq,
  options?: { [key: string]: any },
) {
  return request<API.protoRefreshTokenResp>('/rpc/auth/AuthService.RefreshToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取验证码 POST /rpc/auth/AuthService.VerificationCode */
export async function authServiceVerificationCode(
  body: API.protoVerificationCodeReq,
  options?: { [key: string]: any },
) {
  return request<API.protoResponse>('/rpc/auth/AuthService.VerificationCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 验证密码 POST /rpc/auth/AuthService.VerifyPassword */
export async function authServiceVerifyPassword(
  body: API.protoVerifyPasswordReq,
  options?: { [key: string]: any },
) {
  return request<API.protoVerifyPasswordResp>('/rpc/auth/AuthService.VerifyPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
