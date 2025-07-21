// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加用户 POST /rpc/auth/UserService.Add */
export async function userServiceAdd(body: API.protoUserAddReq, options?: { [key: string]: any }) {
  return request<API.protoUserAddResp>('/rpc/auth/UserService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /rpc/auth/UserService.Del */
export async function userServiceDel(body: API.protoUserDelReq, options?: { [key: string]: any }) {
  return request<API.protoUserDelResp>('/rpc/auth/UserService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户详情 POST /rpc/auth/UserService.Get */
export async function userServiceGet(body: API.protoUserGetReq, options?: { [key: string]: any }) {
  return request<API.protoUserGetResp>('/rpc/auth/UserService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 关联用户到角色 POST /rpc/auth/UserService.LinkUserRoles */
export async function userServiceLinkUserRoles(
  body: API.protoLinkUserRolesReq,
  options?: { [key: string]: any },
) {
  return request<API.protoResponse>('/rpc/auth/UserService.LinkUserRoles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询用户列表 POST /rpc/auth/UserService.Page */
export async function userServicePage(
  body: API.protoUserPageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoUserPageResp>('/rpc/auth/UserService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** SQL语句分页查询用户列表 POST /rpc/auth/UserService.PageBySql */
export async function userServicePageBySql(
  body: API.protoUserPageBySqlReq,
  options?: { [key: string]: any },
) {
  return request<API.protoUserPageBySqlResp>('/rpc/auth/UserService.PageBySql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消关联用户到角色 POST /rpc/auth/UserService.UnlinkUserRoles */
export async function userServiceUnlinkUserRoles(
  body: API.protoUnlinkUserRolesReq,
  options?: { [key: string]: any },
) {
  return request<API.protoResponse>('/rpc/auth/UserService.UnlinkUserRoles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户 POST /rpc/auth/UserService.Update */
export async function userServiceUpdate(
  body: API.protoUserUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoUserUpdateResp>('/rpc/auth/UserService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户密码 POST /rpc/auth/UserService.UpdatePassword */
export async function userServiceUpdatePassword(
  body: API.protoUpdatePasswordReq,
  options?: { [key: string]: any },
) {
  return request<API.protoUpdatePasswordResp>('/rpc/auth/UserService.UpdatePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
