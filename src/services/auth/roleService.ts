// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加角色 POST /rpc/auth/RoleService.Add */
export async function roleServiceAdd(body: API.protoRoleAddReq, options?: { [key: string]: any }) {
  return request<API.protoRoleAddResp>('/rpc/auth/RoleService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 POST /rpc/auth/RoleService.Del */
export async function roleServiceDel(body: API.protoRoleDelReq, options?: { [key: string]: any }) {
  return request<API.protoRoleDelResp>('/rpc/auth/RoleService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色 POST /rpc/auth/RoleService.Get */
export async function roleServiceGet(body: API.protoRoleGetReq, options?: { [key: string]: any }) {
  return request<API.protoRoleGetResp>('/rpc/auth/RoleService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 应用标识获取角色列表 POST /rpc/auth/RoleService.List */
export async function roleServiceList(
  body: API.protoRoleListReq,
  options?: { [key: string]: any },
) {
  return request<API.protoRoleListResp>('/rpc/auth/RoleService.List', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色标识获取角色列表 POST /rpc/auth/RoleService.ListByCode */
export async function roleServiceListByCode(
  body: API.protoRoleListByCodeReq,
  options?: { [key: string]: any },
) {
  return request<API.protoRoleListByCodeResp>('/rpc/auth/RoleService.ListByCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色分页 POST /rpc/auth/RoleService.Page */
export async function roleServicePage(
  body: API.protoRolePageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoRolePageResp>('/rpc/auth/RoleService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新角色 POST /rpc/auth/RoleService.Update */
export async function roleServiceUpdate(
  body: API.protoRoleUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoRoleUpdateResp>('/rpc/auth/RoleService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
