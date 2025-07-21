// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 通知模板创建 POST /rpc/thing/NotifyTemplateService.Add */
export async function notifyTemplateServiceAdd(
  body: API.protoNotifyTemplateAddReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyTemplateAddResp>('/rpc/thing/NotifyTemplateService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知模板删除 POST /rpc/thing/NotifyTemplateService.Del */
export async function notifyTemplateServiceDel(
  body: API.protoNotifyTemplateDelReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyTemplateDelResp>('/rpc/thing/NotifyTemplateService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知模板获取 POST /rpc/thing/NotifyTemplateService.Get */
export async function notifyTemplateServiceGet(
  body: API.protoNotifyTemplateGetReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyTemplateGetResp>('/rpc/thing/NotifyTemplateService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知模板列表 POST /rpc/thing/NotifyTemplateService.List */
export async function notifyTemplateServiceList(
  body: API.protoNotifyTemplateListReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyTemplateListResp>('/rpc/thing/NotifyTemplateService.List', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知模板分页 POST /rpc/thing/NotifyTemplateService.Page */
export async function notifyTemplateServicePage(
  body: API.protoNotifyTemplatePageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyTemplatePageResp>('/rpc/thing/NotifyTemplateService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知模板修改 POST /rpc/thing/NotifyTemplateService.Update */
export async function notifyTemplateServiceUpdate(
  body: API.protoNotifyTemplateUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyTemplateUpdateResp>('/rpc/thing/NotifyTemplateService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
