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
