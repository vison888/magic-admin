// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 通知日志删除 POST /rpc/thing/NotifyLogService.Del */
export async function notifyLogServiceDel(
  body: API.protoNotifyLogDelReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyLogDelResp>('/rpc/thing/NotifyLogService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通知日志分页 POST /rpc/thing/NotifyLogService.Page */
export async function notifyLogServicePage(
  body: API.protoNotifyLogPageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoNotifyLogPageResp>('/rpc/thing/NotifyLogService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
