// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/shadow/ForwardingService.Properties */
export async function forwardingServiceProperties(
  body: API.protoForwardingPropertiesReq,
  options?: { [key: string]: any },
) {
  return request<API.protoForwardingPropertiesResp>('/rpc/shadow/ForwardingService.Properties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/shadow/ForwardingService.PublishMsg */
export async function forwardingServicePublishMsg(
  body: API.protoForwardingPublishMsgReq,
  options?: { [key: string]: any },
) {
  return request<API.protoForwardingPublishMsgResp>('/rpc/shadow/ForwardingService.PublishMsg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/shadow/ForwardingService.Service */
export async function forwardingServiceService(
  body: API.protoForwardingServiceReq,
  options?: { [key: string]: any },
) {
  return request<API.protoForwardingServiceResp>('/rpc/shadow/ForwardingService.Service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/shadow/ForwardingService.ServiceReply */
export async function forwardingServiceServiceReply(
  body: API.protoForwardingServiceReplyReq,
  options?: { [key: string]: any },
) {
  return request<API.protoForwardingServiceReplyResp>(
    '/rpc/shadow/ForwardingService.ServiceReply',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/shadow/ForwardingService.SetProperties */
export async function forwardingServiceSetProperties(
  body: API.protoForwardingSetPropertiesReq,
  options?: { [key: string]: any },
) {
  return request<API.protoForwardingSetPropertiesResp>(
    '/rpc/shadow/ForwardingService.SetProperties',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/shadow/ForwardingService.SetProperty */
export async function forwardingServiceSetProperty(
  body: API.protoForwardingSetPropertyReq,
  options?: { [key: string]: any },
) {
  return request<API.protoForwardingSetPropertyResp>('/rpc/shadow/ForwardingService.SetProperty', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/shadow/ForwardingService.Watch */
export async function forwardingServiceWatch(
  body: API.protoForwardingWatchReq,
  options?: { [key: string]: any },
) {
  return request<{ result?: API.protoForwardingWatchResp }>('/rpc/shadow/ForwardingService.Watch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
