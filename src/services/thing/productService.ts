// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 产品创建 POST /rpc/thing/ProductService.Add */
export async function productServiceAdd(
  body: API.protoProductAddReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductAddResp>('/rpc/thing/ProductService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 产品删除 POST /rpc/thing/ProductService.Del */
export async function productServiceDel(
  body: API.protoProductDelReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductDelResp>('/rpc/thing/ProductService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 产品获取 POST /rpc/thing/ProductService.Get */
export async function productServiceGet(
  body: API.protoProductGetReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductGetResp>('/rpc/thing/ProductService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取物模型 POST /rpc/thing/ProductService.GetModel */
export async function productServiceGetModel(
  body: API.protoProductGetModelReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductGetModelResp>('/rpc/thing/ProductService.GetModel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 产品列表 POST /rpc/thing/ProductService.List */
export async function productServiceList(
  body: API.protoProductListReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductListResp>('/rpc/thing/ProductService.List', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 产品分页 POST /rpc/thing/ProductService.Page */
export async function productServicePage(
  body: API.protoProductPageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductPageResp>('/rpc/thing/ProductService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 产品修改 POST /rpc/thing/ProductService.Update */
export async function productServiceUpdate(
  body: API.protoProductUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductUpdateResp>('/rpc/thing/ProductService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新物模型 POST /rpc/thing/ProductService.UpdateModel */
export async function productServiceUpdateModel(
  body: API.protoProductUpdateModelReq,
  options?: { [key: string]: any },
) {
  return request<API.protoProductUpdateModelResp>('/rpc/thing/ProductService.UpdateModel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
