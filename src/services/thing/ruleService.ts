// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 规则创建 POST /rpc/thing/RuleService.Add */
export async function ruleServiceAdd(body: API.protoRuleAddReq, options?: { [key: string]: any }) {
  return request<API.protoRuleAddResp>('/rpc/thing/RuleService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 规则删除 POST /rpc/thing/RuleService.Del */
export async function ruleServiceDel(body: API.protoRuleDelReq, options?: { [key: string]: any }) {
  return request<API.protoRuleDelResp>('/rpc/thing/RuleService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 规则获取 POST /rpc/thing/RuleService.Get */
export async function ruleServiceGet(body: API.protoRuleGetReq, options?: { [key: string]: any }) {
  return request<API.protoRuleGetResp>('/rpc/thing/RuleService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 规则列表 POST /rpc/thing/RuleService.List */
export async function ruleServiceList(
  body: API.protoRuleListReq,
  options?: { [key: string]: any },
) {
  return request<API.protoRuleListResp>('/rpc/thing/RuleService.List', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 规则分页 POST /rpc/thing/RuleService.Page */
export async function ruleServicePage(
  body: API.protoRulePageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoRulePageResp>('/rpc/thing/RuleService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 规则修改 POST /rpc/thing/RuleService.Update */
export async function ruleServiceUpdate(
  body: API.protoRuleUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoRuleUpdateResp>('/rpc/thing/RuleService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
