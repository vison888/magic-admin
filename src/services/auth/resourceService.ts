// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加资源 POST /rpc/auth/ResourceService.Add */
export async function resourceServiceAdd(
  body: API.protoAddResourceReq,
  options?: { [key: string]: any },
) {
  return request<API.protoAddResourceResp>('/rpc/auth/ResourceService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除资源 POST /rpc/auth/ResourceService.Del */
export async function resourceServiceDel(body: API.protoRequest, options?: { [key: string]: any }) {
  return request<API.protoResponse>('/rpc/auth/ResourceService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 资源详情 POST /rpc/auth/ResourceService.Get */
export async function resourceServiceGet(body: API.protoRequest, options?: { [key: string]: any }) {
  return request<API.protoResourceGetResp>('/rpc/auth/ResourceService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 资源列表 POST /rpc/auth/ResourceService.Page */
export async function resourceServicePage(
  body: API.protoResourcePageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoResourcePageResp>('/rpc/auth/ResourceService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 规则类型 POST /rpc/auth/ResourceService.RuleType */
export async function resourceServiceRuleType(
  body: API.protoResourceRuleTypeReq,
  options?: { [key: string]: any },
) {
  return request<API.protoResourceRuleTypeResp>('/rpc/auth/ResourceService.RuleType', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新资源 POST /rpc/auth/ResourceService.Update */
export async function resourceServiceUpdate(
  body: API.protoUpdateResourceReq,
  options?: { [key: string]: any },
) {
  return request<API.protoResponse>('/rpc/auth/ResourceService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
