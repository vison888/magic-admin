// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加应用 POST /rpc/auth/AppService.Add */
export async function appServiceAdd(body: API.protoAppAddReq, options?: { [key: string]: any }) {
  return request<API.protoAppAddResp>('/rpc/auth/AppService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除应用 POST /rpc/auth/AppService.Del */
export async function appServiceDel(body: API.protoAppDelReq, options?: { [key: string]: any }) {
  return request<API.protoAppDelResp>('/rpc/auth/AppService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取应用 POST /rpc/auth/AppService.Get */
export async function appServiceGet(body: API.protoAppGetReq, options?: { [key: string]: any }) {
  return request<API.protoAppGetResp>('/rpc/auth/AppService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 应用分页 POST /rpc/auth/AppService.Page */
export async function appServicePage(body: API.protoAppPageReq, options?: { [key: string]: any }) {
  return request<API.protoAppPageResp>('/rpc/auth/AppService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新应用 POST /rpc/auth/AppService.Update */
export async function appServiceUpdate(
  body: API.protoAppUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoAppUpdateResp>('/rpc/auth/AppService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
