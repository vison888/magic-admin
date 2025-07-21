import { forwardingServiceSetProperties, forwardingServiceSetProperty } from '@/services/shadow/forwardingService';
import {  productModelServicePage } from '@/services/thing/productModelService';
import { PAGE_SIZE_MAX, THING_MODEL_TYPE_PROPERTY } from '@/utils/const';

import {
  ProFormTextArea,
  ProFormSwitch,
  ProForm,
} from '@ant-design/pro-components';
import {  Card, Col, Tabs, Row, message, FormInstance } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';

const { TabPane } = Tabs;

const DeviceDebugPageProperty: React.FC<{
    productInfo: API.protoProduct;deviceInfo: API.protoDevice;
}> = ({ productInfo, deviceInfo}) => {
  const [modelPropertyList, setModelPropertyList] = useState<API.protoProductModel[]>([]);
  const [reqResult, setReqResult] = useState<string>("");
  const [selectCode, setSelectCode] = useState<string>("");
  const formRef = useRef<FormInstance>();

  const queryModelDef = async () => {
    const param : API.protoProductModelPageReq = {
        page_index: 1,
        page_size: PAGE_SIZE_MAX,
        product_id: productInfo.id,
        type:THING_MODEL_TYPE_PROPERTY,
    };
    const res = await productModelServicePage(param);
    if (res.code === 0) {
      const pList =res.items!
      setModelPropertyList(pList)
      if(pList.length > 0) {
        const info = `{\n  "${pList[0].code}":"value"\n}`
        formRef.current?.setFieldValue("params",info)
      }
    }
  };

  useEffect(() => {
    queryModelDef()
  }, []);

  const formSubmit = async (values: any) => {
    let obj = {}
    try {
      obj = JSON.parse(values.params) as any
    } catch (e) {
      message.error("不是json格式")
      return
    }
    if ((typeof obj === 'object' && !Array.isArray(obj)) === false) {
        message.error("必须json的对象格式")
        return
    }
    let contextId:string = crypto.randomUUID()
    if(values.async) {
        contextId = ""
    }

    let code = selectCode
    if(selectCode === "" && modelPropertyList.length > 0) {
      code = modelPropertyList[0].code as string
    }
    if(code === "") {
      message.error("请选择属性进行操作")
      return
    }

    const payloadInfo = {
      id : crypto.randomUUID(),
      context_id : contextId,
      time : new Date().getTime(),
      params : obj,
    }

    const payloadStr = JSON.stringify(payloadInfo)

    const len = Object.keys(obj).length
    if (len === 1) {
        const body : API.protoForwardingSetPropertyReq = {
            sn: deviceInfo.sn,
            context_id: contextId,
            code: code,
            timeout: 10000,
            payload:payloadStr,
        };
        const res = await forwardingServiceSetProperty(body);
        const result = JSON.stringify(res, null, 2)
        const reqData = JSON.stringify(body, null, 2)

        setReqResult("<h3>请求参数:</h3>" + reqData + "<h3>请求结果:</h3>" + result)
        if (res.code === 0) {
          message.success("属性设置成功")
        }
        return
    }

    const body: API.protoForwardingSetPropertiesReq = {
        sn: deviceInfo.sn,
        context_id: contextId,
        payload: payloadStr,
        timeout: 10000,
    };
    const res = await forwardingServiceSetProperties(body);
    const result = JSON.stringify(res, null, 2)
    const reqData = JSON.stringify(body, null, 2)

    setReqResult("<h3>请求参数:</h3>" + reqData + "<h3>请求结果:</h3>" + result)
    if (res.code === 0) {
      message.success("批量属性设置成功")
    }
  };

  return (
    <Card>
        <Row>
            <Col span={4}>
            <Tabs tabPosition='left' onChange={(value)=>{
                const info = `{\n  "${value}":"value"\n}`
                formRef.current?.setFieldValue("params",info)
                setSelectCode(value)
            }}>

            {useMemo(() =>{return modelPropertyList.map((item)=>{
              return (
                <TabPane tab={item.name} key={item.code}/>
            )
            })}, [modelPropertyList])}
                
            </Tabs>
            </Col>
            <Col span={12}>
                <div style={{fontWeight:'bold', fontSize:16}}>请求参数</div>
                <ProForm style={{marginTop:"20px"}}
                formRef={formRef}
                onFinish={formSubmit}
                >
                <ProFormTextArea 
                    bordered
                    name="params"
                    placeholder="请输入参数"
                    rules={[
                        {
                            required: true,
                            message: '请输入参数',
                        },
                    ]}
                    fieldProps={{
                        cols:18,
                        rows:18,
                    }}
                />

            <ProFormSwitch
                name="async"
                label="异步调用"
            />
            </ProForm>
            </Col>
            <Col span={8}>
            <div style={{fontWeight:'bold', fontSize:16, marginLeft:"10px"}}>请求结果</div>
            <div style={{marginTop:"20px", marginLeft:"10px"}} dangerouslySetInnerHTML={{__html: reqResult}} /> 
            </Col>
        </Row>
    </Card>
  );
};

export default DeviceDebugPageProperty;
