// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 设备创建 POST /rpc/thing/DeviceService.Add */
export async function deviceServiceAdd(
  body: API.protoDeviceAddReq,
  options?: { [key: string]: any },
) {
  return request<API.protoDeviceAddResp>('/rpc/thing/DeviceService.Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设备鉴权 POST /rpc/thing/DeviceService.Auth */
export async function deviceServiceAuth(
  body: API.protoDeviceAuthReq,
  options?: { [key: string]: any },
) {
  return request<API.protoDeviceAuthResp>('/rpc/thing/DeviceService.Auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设备删除 POST /rpc/thing/DeviceService.Del */
export async function deviceServiceDel(
  body: API.protoDeviceDelReq,
  options?: { [key: string]: any },
) {
  return request<API.protoDeviceDelResp>('/rpc/thing/DeviceService.Del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设备获取 POST /rpc/thing/DeviceService.Get */
export async function deviceServiceGet(
  body: API.protoDeviceGetReq,
  options?: { [key: string]: any },
) {
  return request<API.protoDeviceGetResp>('/rpc/thing/DeviceService.Get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设备列表 POST /rpc/thing/DeviceService.List */
export async function deviceServiceList(
  body: API.protoDeviceListReq,
  options?: { [key: string]: any },
) {
  return request<API.protoDeviceListResp>('/rpc/thing/DeviceService.List', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 网关设备列表 POST /rpc/thing/DeviceService.ListGateway */
export async function deviceServiceListGateway(
  body: API.protoDeviceListGatewayReq,
  options?: { [key: string]: any },
) {
  return request<API.protoDeviceListGatewayResp>('/rpc/thing/DeviceService.ListGateway', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设备分页 POST /rpc/thing/DeviceService.Page */
export async function deviceServicePage(
  body: API.protoDevicePageReq,
  options?: { [key: string]: any },
) {
  return request<API.protoDevicePageResp>('/rpc/thing/DeviceService.Page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取属性值 POST /rpc/thing/DeviceService.Properties */
export async function deviceServiceProperties(
  body: API.protoDevicePropertiesReq,
  options?: { [key: string]: any },
) {
  return request<API.protoDevicePropertiesResp>('/rpc/thing/DeviceService.Properties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设备修改 POST /rpc/thing/DeviceService.Update */
export async function deviceServiceUpdate(
  body: API.protoDeviceUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.protoDeviceUpdateResp>('/rpc/thing/DeviceService.Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
