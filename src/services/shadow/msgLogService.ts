// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 消息分页 POST /rpc/shadow/MsgLogService.Page */
export async function msgLogServicePage(
  body: API.protoMsgLogPageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoMsgLogPageResp>('/rpc/shadow/MsgLogService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
