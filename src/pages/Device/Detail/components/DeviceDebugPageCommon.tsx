import { forwardingServicePublishMsg } from '@/services/shadow/forwardingService';
import {  productModelServicePage } from '@/services/thing/productModelService';
import { PAGE_SIZE_MAX, convert2ValueEnum, THING_MODEL_TYPE, THING_SERVICE_DIR_TYPE_DOWN } from '@/utils/const';

import {
  ProFormSelect,
  ProFormTextArea,
  ProFormText,
  ProForm,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { Card, Col, Tabs, Row, message, FormInstance } from 'antd';
import { useEffect, useRef, useState } from 'react';

const { TabPane } = Tabs;
const DeviceDebugPageCommon: React.FC<{
    productInfo: API.protoProduct;deviceInfo: API.protoDevice;
}> = ({ productInfo, deviceInfo}) => {
  const [modelAllList, setModelAllList] = useState<API.protoProductModel[]>([]);
  const [reqResult, setReqResult] = useState<string>("");
  const [selectCodeMap, setSelectCodeMap] = useState<{[key: string]: { text: string };}>({});
  const [isUseTopic, setIsUseTopic] = useState<boolean>(false);
  const formRef = useRef<FormInstance>();

  const queryModelDef = async () => {
    const param : API.protoProductModelPageReq = {
        page_index: 1,
        page_size: PAGE_SIZE_MAX,
        product_id: productInfo.id,
    };
    const res = await productModelServicePage(param);
    if (res.code === 0) {
      const pList = res.items!.filter((item)=>{
        const info = JSON.parse(item.model_def!)
        return info.dir === THING_SERVICE_DIR_TYPE_DOWN
      })
      setModelAllList(pList)
      const payload = `{\n  "params":{}\n}`
      const topic = `iot/down/${deviceInfo.group}/${deviceInfo.pk}/${deviceInfo.sn}/service/xx`
      if(formRef.current?.getFieldValue("payload") === undefined) {
        formRef.current?.setFieldValue("payload",payload)
      }
      if(formRef.current?.getFieldValue("topic") === undefined) {
        formRef.current?.setFieldValue("topic",topic)
      }
    }
  };

  useEffect(() => {
    queryModelDef()
  }, []);

  
  const formSubmit = async (values: any) => {
    console.log("values", values)
    let obj = {}
    try {
      obj = JSON.parse(values.payload) as any
    } catch (e) {
      message.error("不是json格式")
      return
    }
    if ((typeof obj === 'object' && !Array.isArray(obj)) === false) {
        message.error("必须json的对象格式")
        return
    }
   
    const body : API.protoForwardingPublishMsgReq = {}
    if(isUseTopic){
      body.sn = deviceInfo.sn
      body.topic = values.topic
      body.use_topic = values.use_topic
      body.payload = values.payload
      body.timeout = values.timeout
    } else {
      body.sn = deviceInfo.sn
      body.context_id = values.context_id
      body.msg_type = values.msg_type
      body.code = values.code
      body.use_topic = values.use_topic
      body.payload = values.payload
      body.timeout = values.timeout
    }

    const res = await forwardingServicePublishMsg(body);
    const result = JSON.stringify(res, null, 2)
    const reqData = JSON.stringify(body, null, 2)

    setReqResult("<h3>请求参数:</h3>" + reqData + "<h3>请求结果:</h3>" + result)
    if (res.code === 0) {
      message.success("请求成功")
    }
  };

  return (
    <Card>
        <Row>
            <Col span={12}>
                <div style={{fontWeight:'bold', fontSize:16}}>请求参数</div>
                <ProForm style={{marginTop:"20px"}}
                formRef={formRef}
                onFinish={formSubmit}
                >
                <ProFormSwitch 
                    name="use_topic"
                    label="是否主题发布"
                    fieldProps={{
                      onChange:(checked:boolean)=>{
                        console.log("checked,", checked)
                        setIsUseTopic(checked)
                      }
                    }}
                />

                {isUseTopic && (<ProFormText
                    name="topic"
                    label="请输入主题"
                    rules={[
                      {
                        required: true,
                        message: '请输入主题',
                      },
                    ]}
                />)}

                {!isUseTopic &&(<ProFormSelect
                    name="msg_type"
                    label="消息类型"
                    valueEnum={convert2ValueEnum(THING_MODEL_TYPE)}
                    fieldProps={{
                      onChange:(value:string)=>{
                        const subType = value.replace("_reply", "");
                        console.log("value,", value, "subType", subType)
                        const tempList = modelAllList.filter((item)=>{
                          return item.type === subType
                        })

                        const newMap:{[key: string]: { text: string }} = {} 
                        for (const index in tempList) {
                          const item = tempList[index]
                          newMap[item.code!] = {text:item.name!}
                        }
                        setSelectCodeMap(newMap)
                        formRef.current?.setFieldValue("code", "")
                      }
                    }}
                    rules={[
                      {
                        required: true,
                        message: '请选择消息类型',
                      },
                    ]}
                />)}

                {!isUseTopic &&(<ProFormSelect
                    name="code"
                    label="方法"
                    valueEnum={selectCodeMap}
                    rules={[
                      {
                        required: true,
                        message: '请选择方法',
                      },
                    ]}
                />)}

                {!isUseTopic &&(<ProFormText
                    name="context_id"
                    label="上下文"
                    initialValue={crypto.randomUUID()}
                />)}

                <ProFormText
                    name="timeout"
                    label="超时时间(毫秒)"
                    initialValue={10000}
                />

                <ProFormTextArea 
                    bordered
                    name="payload"
                    placeholder="请输入body"
                    rules={[
                        {
                            required: true,
                            message: '请输入body',
                        },
                    ]}
                    fieldProps={{
                        cols:18,
                        rows:18,
                    }}
                />
            </ProForm>
            </Col>
            <Col span={12}>
            <div style={{fontWeight:'bold', fontSize:16, marginLeft:"10px"}}>请求结果</div>
            <div style={{marginTop:"20px", marginLeft:"10px"}} dangerouslySetInnerHTML={{__html: reqResult}} /> 
            </Col>
        </Row>
    </Card>
  );
};

export default DeviceDebugPageCommon;
