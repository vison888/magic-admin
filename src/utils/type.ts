import { json } from "express";
import { NOTIFY_TYPE_EMAIL, THING_DATA_TYPE_ARRAY, THING_DATA_TYPE_BOOL, THING_DATA_TYPE_FLOAT, THING_DATA_TYPE_INT, THING_DATA_TYPE_OBJECT, THING_DATA_TYPE_STRING } from "./const";
import { toNumber } from "lodash";

// 属性定义
export type ModelProperty = {
	code: string;           //标识符
	name: string;           //功能名称
	desc: string; //描述
	required: boolean;       //是否必须
	type: string;           //属性类型
  default_number : number;  
  default_bool : boolean;  
  range : number[]
  step : number;  
  unit : string;  
  array_options_items:any[]
  object_options_items:any[];
	mode : string;
	is_use_shadow: boolean; //是否使用影子
	is_no_record: boolean;  //是否存储历史
  is_sys : number;
}

export const decodePropertyData = (data:any):ModelProperty => {
    const p : ModelProperty = {...data}
    switch (p.type) {
      case THING_DATA_TYPE_BOOL:
        p.default_bool = data.bool_options.default
        break;
      case THING_DATA_TYPE_INT:
        p.range = [data.int_options.min, data.int_options.max]
        p.default_number = data.int_options.default
        p.step = data.int_options.step
        p.unit = data.int_options.unit
        break;
      case THING_DATA_TYPE_STRING:
        p.range = [data.string_options.min, data.string_options.max]
        break;
      case THING_DATA_TYPE_FLOAT:
        p.range = [data.float_options.min, data.float_options.max]
        p.default_number = data.float_options.default
        p.step = data.float_options.step
        p.unit = data.float_options.unit
        break;
      case THING_DATA_TYPE_ARRAY:
        p.range = [data.array_options.min, data.array_options.max]
        p.array_options_items = [decodePropertyData(data.array_options.array[0])]
        break;
      case THING_DATA_TYPE_OBJECT:
        p.object_options_items = []
        for (const x in data.object_options.object) {
          p.object_options_items.push(decodePropertyData(data.object_options.object[x]))
        }
        break;
      default:
        break;
    }
    return p
  }


export const encodePropertyData = (values: any, isFirst:boolean) => {
    let modelDef:any = {
      code: values.code,
      name: values.name,
      desc: values.desc,
      required: values.required,
      type: values.type,
      mode : values.mode,
      is_use_shadow: values.is_use_shadow, //是否使用影子
      is_no_record: values.is_no_record,  //是否存储历史
      is_sys : values.is_sys,
      // int_options : {} as any,
      // bool_options : {} as any,
      // float_options : {} as any,
      // string_options : {} as any,
      // array_options : {} as any,
      // object_options : {} as any,
    }

    switch (values.type) {
      case THING_DATA_TYPE_BOOL:
        modelDef.bool_options = {}
        modelDef.bool_options.default =  values.default_bool !== undefined? values.default_bool:false
        break;
      case THING_DATA_TYPE_INT:
        modelDef.int_options = {}
        modelDef.int_options.default = values.default_number !== undefined?values.default_number:0
        modelDef.int_options.min = values.range !== undefined?values.range[0]: 0
        modelDef.int_options.max = values.range !== undefined? values.range[1]:0
        modelDef.int_options.step = values.step !== undefined?values.step: 0
        modelDef.int_options.unit = values.unit !== undefined?values.unit: ""
        break;
      case THING_DATA_TYPE_STRING:
        modelDef.string_options = {}
        modelDef.string_options.min = values.range !== undefined?values.range[0]: 0
        modelDef.string_options.max = values.range !== undefined? values.range[1]:0
        break;
      case THING_DATA_TYPE_FLOAT:
        modelDef.float_options = {}
        modelDef.float_options.default = values.default_number !== undefined?values.default_number:0
        modelDef.float_options.min = values.range !== undefined?values.range[0]: 0
        modelDef.float_options.max = values.range !== undefined? values.range[1]:0
        modelDef.float_options.step = values.step !== undefined?values.step: 0
        modelDef.float_options.unit = values.unit !== undefined?values.unit: ""
        break;
      case THING_DATA_TYPE_ARRAY:
        modelDef.array_options = {}
        modelDef.array_options.min = values.range !== undefined?values.range[0]: 0
        modelDef.array_options.max = values.range !== undefined? values.range[1]:0
        modelDef.array_options.array = [encodePropertyData(values.array_options_items[0], false)]
        break;
      case THING_DATA_TYPE_OBJECT:
        modelDef.object_options = {}
        modelDef.object_options.min = values.range !== undefined?values.range[0]: 0
        modelDef.object_options.max = values.range !== undefined? values.range[1]:0
        modelDef.object_options.object = {}
        for (const x in values.object_options_items) {
          const info = values.object_options_items[x]
          const code = info.code as string
          modelDef.object_options.object[code] =  encodePropertyData(info, false)
        }
        break;
      default:
        break;
    } 
    return modelDef
}

export type ModelEvent = {
    code : string; 
    name: string; 
    desc: string; 
    type: string; 
    params :ModelProperty[];
    is_sys : number;
}

export const encodeEventData = (values: any, isFirst:boolean) => {
    let modelDef = {
      code: values.code,
      name: values.name,
      desc: values.desc,
      type: values.type,
      is_sys : values.is_sys,
      params: [] as any,
    }

    for (const x in values.params) {
      const info = values.params[x] as any
      const item = encodePropertyData(info, false)
      modelDef.params.push(item)
    }
    return modelDef
}

export const decodeEventData = (data: any) => {
    const p : ModelEvent = {...data}
    p.params = []
    for (const x in data.params) {
        const info = data.params[x] as any
        const item = decodePropertyData(info)
        p.params.push(item)
    }
    return p
}

export type ModelService = {
    code : string; 
    name: string; 
    desc: string; 
    dir: string; 
    input :ModelProperty[];
    output :ModelProperty[];
    is_sys : number;
}

export const encodeServiceData = (values: any, isFirst:boolean) => {
    let modelDef = {
      code: values.code,
      name: values.name,
      desc: values.desc,
      dir: values.dir,
      is_sys : values.is_sys,
      input: [] as any,
      output: [] as any,
    }

    for (const x in values.input) {
      const info = values.input[x] as any
      const item = encodePropertyData(info, false)
      modelDef.input.push(item)
    }

    for (const x in values.output) {
        const info = values.output[x] as any
        const item = encodePropertyData(info, false)
        modelDef.output.push(item)
    }
    return modelDef
}

export const decodeServiceData = (data: any) => {
    const p : ModelService = {...data}
    p.input = []
    for (const x in data.input) {
        const info = data.input[x] as any
        const item = decodePropertyData(info)
        p.input.push(item)
    }

    p.output = []
    for (const x in data.output) {
        const info = data.output[x] as any
        const item = decodePropertyData(info)
        p.output.push(item)
    }

    return p
}

export type NotifyConfig = {
  id: string;
  name: string;
  notify_type: string;
  notify_config: string;
  desc: string;

  email_addr : string;
  email_port : number;
  email_ssl : boolean;
  email_sender : string;
  email_password : string;

  webhook_url : string;
  webhook_headers : any[];
}

export const encodeNotifyConfig = (values: any) => {
  let configDef = {
    id:values.id,
    name:values.name,
    notify_type:values.notify_type,
    notify_config:values.notify_config,
    desc:values.desc,
  }

  let notify_config_obj :any = {}
  if (configDef.notify_type === NOTIFY_TYPE_EMAIL) {
    notify_config_obj.addr = values.email_addr
    notify_config_obj.port = toNumber(values.email_port)
    notify_config_obj.ssl = values.email_ssl
    notify_config_obj.sender = values.email_sender
    notify_config_obj.password = values.email_password
  } else {
    notify_config_obj.url = values.webhook_url
    notify_config_obj.headers = values.webhook_headers
  }
  configDef.notify_config = JSON.stringify(notify_config_obj)
  return configDef
}

export const decodeNotifyConfig = (data: any) => {
  const notify_config_obj = JSON.parse(data.notify_config)
  if (data.notify_type === NOTIFY_TYPE_EMAIL) {
    data.email_addr = notify_config_obj.addr
    data.email_port = toNumber(notify_config_obj.port)
    data.email_ssl = notify_config_obj.ssl
    data.email_sender = notify_config_obj.sender
    data.email_password = notify_config_obj.password
  } else {
    data.webhook_url = notify_config_obj.url
    data.webhook_headers = notify_config_obj.headers
  }

  return data
}

export type NotifyTemplate = {
  id: string;
  name: string;
  notify_type: string;
  notify_config_id: string;
  notify_template: string;
  desc: string;

  email_title : string;
  email_receivers : number;
  email_content : boolean;

  webhook_content : string;
  webhook_is_custom : boolean;
}

export const encodeNotifyTemplate = (values: any) => {
  let configDef = {
    id:values.id,
    name:values.name,
    notify_type:values.notify_type,
    notify_config_id:values.notify_config_id,
    notify_template:values.notify_template,
    desc:values.desc,
  }

  let notify_template_obj :any = {}
  if (configDef.notify_type === NOTIFY_TYPE_EMAIL) {
    notify_template_obj.title = values.email_title
    notify_template_obj.receivers = values.email_receivers
    notify_template_obj.content = values.email_content
  } else {
    notify_template_obj.content = values.webhook_content
    notify_template_obj.is_custom = values.webhook_is_custom
  }
  configDef.notify_template = JSON.stringify(notify_template_obj)
  return configDef
}

export const decodeNotifyTemplate = (data: any) => {
  const notify_template_obj = JSON.parse(data.notify_template)
  if (data.notify_type === NOTIFY_TYPE_EMAIL) {
    data.email_title = notify_template_obj.title
    data.email_receivers = notify_template_obj.receivers
    data.email_content = notify_template_obj.content

  } else {
    data.webhook_content = notify_template_obj.content
    data.webhook_is_custom = notify_template_obj.is_custom
  }

  return data
}