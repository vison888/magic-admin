// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 影子创建 POST /rpc/shadow/ShadowService.Add */
export async function shadowServiceAdd(
  body: API.protoShadowAddReq,
  options?: { [key: string]: any },
) {
  return request<API.protoShadowAddResp>('/rpc/shadow/ShadowService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 影子删除 POST /rpc/shadow/ShadowService.Del */
export async function shadowServiceDel(
  body: API.protoShadowDelReq,
  options?: { [key: string]: any },
) {
  return request<API.protoShadowDelResp>('/rpc/shadow/ShadowService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 影子获取 POST /rpc/shadow/ShadowService.Get */
export async function shadowServiceGet(
  body: API.protoShadowGetReq,
  options?: { [key: string]: any },
) {
  return request<API.protoShadowGetResp>('/rpc/shadow/ShadowService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 影子列表 POST /rpc/shadow/ShadowService.List */
export async function shadowServiceList(
  body: API.protoShadowListReq,
  options?: { [key: string]: any },
) {
  return request<API.protoShadowListResp>('/rpc/shadow/ShadowService.List', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 影子分页 POST /rpc/shadow/ShadowService.Page */
export async function shadowServicePage(
  body: API.protoShadowPageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoShadowPageResp>('/rpc/shadow/ShadowService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 影子修改 POST /rpc/shadow/ShadowService.Update */
export async function shadowServiceUpdate(
  body: API.protoShadowUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoShadowUpdateResp>('/rpc/shadow/ShadowService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
