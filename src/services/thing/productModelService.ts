// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加物模型 POST /rpc/thing/ProductModelService.Add */
export async function productModelServiceAdd(
  body: API.protoProductModelAddReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductModelAddResp>('/rpc/thing/ProductModelService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除物模型 POST /rpc/thing/ProductModelService.Del */
export async function productModelServiceDel(
  body: API.protoProductModelDelReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductModelDelResp>('/rpc/thing/ProductModelService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 物模型获取 POST /rpc/thing/ProductModelService.Get */
export async function productModelServiceGet(
  body: API.protoProductModelGetReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductModelGetResp>('/rpc/thing/ProductModelService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 物模型列表 POST /rpc/thing/ProductModelService.List */
export async function productModelServiceList(
  body: API.protoProductModelListReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductModelListResp>('/rpc/thing/ProductModelService.List', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 物模型分页 POST /rpc/thing/ProductModelService.Page */
export async function productModelServicePage(
  body: API.protoProductModelPageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductModelPageResp>('/rpc/thing/ProductModelService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新物模型 POST /rpc/thing/ProductModelService.Update */
export async function productModelServiceUpdate(
  body: API.protoProductModelUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductModelUpdateResp>('/rpc/thing/ProductModelService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
