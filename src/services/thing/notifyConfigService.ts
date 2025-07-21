// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 通知配置创建 POST /rpc/thing/NotifyConfigService.Add */
export async function notifyConfigServiceAdd(
  body: API.protoNotifyConfigAddReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyConfigAddResp>('/rpc/thing/NotifyConfigService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知配置删除 POST /rpc/thing/NotifyConfigService.Del */
export async function notifyConfigServiceDel(
  body: API.protoNotifyConfigDelReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyConfigDelResp>('/rpc/thing/NotifyConfigService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知配置获取 POST /rpc/thing/NotifyConfigService.Get */
export async function notifyConfigServiceGet(
  body: API.protoNotifyConfigGetReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyConfigGetResp>('/rpc/thing/NotifyConfigService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知配置列表 POST /rpc/thing/NotifyConfigService.List */
export async function notifyConfigServiceList(
  body: API.protoNotifyConfigListReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyConfigListResp>('/rpc/thing/NotifyConfigService.List', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知配置分页 POST /rpc/thing/NotifyConfigService.Page */
export async function notifyConfigServicePage(
  body: API.protoNotifyConfigPageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyConfigPageResp>('/rpc/thing/NotifyConfigService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知配置修改 POST /rpc/thing/NotifyConfigService.Update */
export async function notifyConfigServiceUpdate(
  body: API.protoNotifyConfigUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyConfigUpdateResp>('/rpc/thing/NotifyConfigService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
