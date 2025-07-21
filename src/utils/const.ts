export const APPCODE: string = 'MAGIC_PLAT_APP';
export const TOKENKEY: string = 'AuthToken';
export const PAGE_SIZE_MAX: number = 100000;

export const RESOURCE_TYPE_API = 'api';
export const RESOURCE_TYPE_MENU = 'menu';
export const RESOURCE_TYPE_RULE = 'rule';


export const RESOURCE_TYPE_VALUE = {
  [RESOURCE_TYPE_API]: { text: '接口' },
  [RESOURCE_TYPE_MENU]: { text: '菜单' },
  [RESOURCE_TYPE_RULE]: { text: '规则' },
};

export const RESOURCE_RULE_VALUE_OPTIONS = [{ value: 'bool', label: 'bool' }];

export const THING_DATA_TYPE_BOOL = "bool"
export const THING_DATA_TYPE_INT = "int"
export const THING_DATA_TYPE_STRING = "string"
export const THING_DATA_TYPE_FLOAT = "float"
export const THING_DATA_TYPE_ARRAY = "array"
export const THING_DATA_TYPE_OBJECT = "object"

export const THING_MODEL_TYPE_PROPERTY = 'property';
export const THING_MODEL_TYPE_PROPERTY_REPLY = 'property_reply';
export const THING_MODEL_TYPE_SERVICE = 'service';
export const THING_MODEL_TYPE_SERVICE_REPLY = 'service_reply';
export const THING_MODEL_TYPE_EVENT = 'event';

export const THING_MODEL_TYPE = [
  { value: THING_MODEL_TYPE_PROPERTY, label: '属性' },
  { value: THING_MODEL_TYPE_SERVICE, label: '服务' },
  { value: THING_MODEL_TYPE_EVENT, label: '事件' },
  { value: THING_MODEL_TYPE_PROPERTY_REPLY, label: '属性回复' },
  { value: THING_MODEL_TYPE_SERVICE_REPLY, label: '服务回复' },
];

export const THING_DATA_TYPE = [
  { value: THING_DATA_TYPE_BOOL, label: '布尔型' },
  { value: THING_DATA_TYPE_INT, label: '整数型' },
  { value: THING_DATA_TYPE_STRING, label: '字符串' },
  { value: THING_DATA_TYPE_FLOAT, label: '浮点型' },
  { value: THING_DATA_TYPE_ARRAY, label: '数组' },
  { value: THING_DATA_TYPE_OBJECT, label: '对象' },
];

export const THING_DATA_TYPE_SUB = [
  { value: THING_DATA_TYPE_BOOL, label: '布尔型' },
  { value: THING_DATA_TYPE_INT, label: '整数型' },
  { value: THING_DATA_TYPE_STRING, label: '字符串' },
  { value: THING_DATA_TYPE_FLOAT, label: '浮点型' },
];

export const THING_PROPERTY_MODE = [
  { value: 'r', label: '只读' },
  { value: 'rw', label: '读写' },
];


export const THING_EVENT_TYPE_INFO = 'info'
export const THING_EVENT_TYPE_ALERT = 'alert'
export const THING_EVENT_TYPE_FAULT = 'fault'
export const THING_EVENT_TYPE = [
  { value: THING_EVENT_TYPE_INFO, label: '信息' },
  { value: THING_EVENT_TYPE_ALERT, label: '告警' },
  { value: THING_EVENT_TYPE_FAULT, label: '故障' },
];

export const THING_SERVICE_DIR_TYPE_UP = 'up'
export const THING_SERVICE_DIR_TYPE_DOWN = 'down'

export const THING_SERVICE_DIR_TYPE = [
  { value: THING_SERVICE_DIR_TYPE_UP, label: '上行调用' },
  { value: THING_SERVICE_DIR_TYPE_DOWN, label: '下行调用' },
];

export const THING_PRODUCT_PROTOCOL = [
  { value: 'websocket', label: 'websocket' },
  { value: 'coap', label: 'coap' },
  { value: 'mqtt3', label: 'mqtt3' },
  { value: 'mqtt5', label: 'mqtt5' },
];


export const THING_PRODUCT_TYPE_DIRECT = 'direct'
export const THING_PRODUCT_TYPE_GATEWAY = 'gateway'
export const THING_PRODUCT_TYPE_CHILE = 'child'
export const THING_PRODUCT_TYPE = [
  { value: THING_PRODUCT_TYPE_DIRECT, label: '直连设备' },
  { value: THING_PRODUCT_TYPE_GATEWAY, label: '网关' },
  { value: THING_PRODUCT_TYPE_CHILE, label: '子设备' },
];

export const THING_PRODUCT_TRANSFORM = [
  { value: 'model', label: '物模型' },
  { value: 'raw', label: '透传' },
];

export const NOTIFY_TYPE_EMAIL = "email"
export const NOTIFY_TYPE_WEBHOOK = "webhook"
export const NOTIFY_TYPE = [
  { value: NOTIFY_TYPE_EMAIL, label: '邮箱' },
  { value: NOTIFY_TYPE_WEBHOOK, label: 'Webhook' },
];


export function convert2ValueEnum(list: { value: string; label: string }[]): {
  [key: string]: { text: string };
} {
  const m: { [key: string]: { text: string } } = {};
  for (let v of list) {
    m[v.value] = { text: v.label };
  }
  return m;
}
