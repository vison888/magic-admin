// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加白名单 POST /rpc/auth/ApiWhiteListService.Add */
export async function apiWhiteListServiceAdd(
  body: API.protoApiWhiteListAddReq,
  options?: { [key: string]: any },
) {
  return request<API.protoApiWhiteListAddResp>('/rpc/auth/ApiWhiteListService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除白名单 POST /rpc/auth/ApiWhiteListService.Del */
export async function apiWhiteListServiceDel(
  body: API.protoApiWhiteListDelReq,
  options?: { [key: string]: any },
) {
  return request<API.protoApiWhiteListDelResp>('/rpc/auth/ApiWhiteListService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页白名单 POST /rpc/auth/ApiWhiteListService.Page */
export async function apiWhiteListServicePage(
  body: API.protoApiWhiteListPageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoApiWhiteListPageResp>('/rpc/auth/ApiWhiteListService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 刷新白名单 POST /rpc/auth/ApiWhiteListService.Refresh */
export async function apiWhiteListServiceRefresh(
  body: API.protoApiWhiteListRefreshReq,
  options?: { [key: string]: any },
) {
  return request<API.protoApiWhiteListRefreshResp>('/rpc/auth/ApiWhiteListService.Refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑白名单 POST /rpc/auth/ApiWhiteListService.Update */
export async function apiWhiteListServiceUpdate(
  body: API.protoApiWhiteListUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoApiWhiteListUpdateResp>('/rpc/auth/ApiWhiteListService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
