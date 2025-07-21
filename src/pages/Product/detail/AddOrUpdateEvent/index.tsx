
import {
  ProForm,
  PageContainer,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProCard,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { productModelServiceAdd, productModelServiceGet, productModelServiceUpdate } from '@/services/thing/productModelService';
import { useEffect, useRef,useState } from 'react';
import { useParams } from '@umijs/max';
import { THING_DATA_TYPE, THING_EVENT_TYPE, THING_EVENT_TYPE_INFO, THING_MODEL_TYPE_EVENT, THING_PROPERTY_MODE, convert2ValueEnum } from '@/utils/const';
import { FormInstance } from 'antd/lib';
import { ModelEvent, decodeEventData, encodeEventData, encodePropertyData } from '@/utils/type';
import OneProperty from '../components/OneProperty';

const AddOrUpdateEvent: React.FC = () => {
  const [productModelEventDef, setProductModelEventDef] = useState<ModelEvent>({} as ModelEvent);
  const params = useParams() as { id: string, subid: string };
  const formRef = useRef<FormInstance>()
  const dataTypeRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_DATA_TYPE),
  );
  const propertyModeRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PROPERTY_MODE),
  );

  const formSubmit = async (values: any) => {
    const modelDef = encodeEventData(values, true)
    let code = -1;
    let msg = "";
    if (params.subid === '0') {
      const addReq: API.protoProductModelAddReq = {
        name:values.name,
        code:values.code,
        type:THING_MODEL_TYPE_EVENT,
        product_id:params.id,
        desc:values.desc,
        model_def:JSON.stringify(modelDef),
      };
      const res = await productModelServiceAdd(addReq);
      code = res.code!;
      msg = res.msg!;
    } else {
      const updateReq: API.protoProductModelUpdateReq = {
        id:params.subid,
        name:values.name,
        code:values.code,
        type:THING_MODEL_TYPE_EVENT,
        desc:values.desc,
        model_def:JSON.stringify(modelDef),
      };
      const res = await productModelServiceUpdate(updateReq);
      code = res.code!;
      msg = res.msg!;
    }
    if (code === 0) {
      if (params.subid === '0') {
        message.success("添加成功")
      } else {
        message.success("更新成功")
      }
      history.back()
    }
  };

  const getDefinition = (record: API.protoProductModel) => {
    try {
      return JSON.parse(record.model_def!);
    } catch (e) {
      console.error(e);
      message.error('JSON 解析错误');
    }
  };

  const queryProductModel = async (): Promise<ModelEvent> => {
    if(params.subid === "0") {
      // 构造默认数据
      const p : ModelEvent = {
        code:"",
        name:"",
        desc:"",
        type:THING_EVENT_TYPE_INFO,
        params:[],
        is_sys:0,
      }
      setProductModelEventDef(p)
      return p
    }

    const body: API.protoProductModelGetReq = {
      id: params.subid,
    };
    const res = await productModelServiceGet(body);

    const m = getDefinition(res.item!)

    const p : ModelEvent = decodeEventData(m)
    p.is_sys = res.item!.is_sys!

    setProductModelEventDef(p)
    console.log("p", p)
    return p;
  };

  useEffect(() => {
    queryProductModel();
  }, []);

  return (
    <PageContainer
    title={params.subid === "0"?"新建事件":productModelEventDef.name+ (productModelEventDef.is_sys === 1?"(系统事件)":"")}
    onBack={() => history.back()}
    >
    <ProForm
      onFinish={async (values) => {
        console.log("values", values)
        formSubmit(values)
      }}
      disabled={productModelEventDef.is_sys === 1}
      grid={true}
      formRef={formRef}
      request={queryProductModel}
      autoFocusFirstInput
    >

      <ProFormText
        name="name"
        label="名称"
        placeholder="请输入名称"
        rules={[{ required: true, message: '请输入名称' }]}
        width = 'md'
        colProps = {
          {
            xs: 24,
            md: 8,
          }
        }
      />

      <ProFormText
        name="code"
        label="标识符"
        placeholder="请输入标识符"
        rules={[{ required: true, message: '请输入标识符' }]}
        width = 'md'
        colProps = {
          {
            xs: 24,
            md: 8,
          }
        }
      />

      <ProFormSelect
        name="type"
        label="事件类型"
        placeholder="请输入事件类型"
        rules={[{ required: true, message: '请选择事件类型' }]}
        options={THING_EVENT_TYPE}
        width = 'md'
        colProps = {
          {
            xs: 24,
            md: 8,
          }
        }
      />

      <ProFormTextArea
        name="desc"
        label="描述"
        placeholder="请输入描述"
      />

      <ProFormList 
            name="params"
            max = {10}
            itemRender={({ listDom, action }, { record }) => {
              return (
                  <ProCard extra={action} style={{padding:'10px', marginTop:"20px", border: '1px solid blue'}}>{listDom}</ProCard>
              );
          }}
        >
          {(f, index, action) => {
          const record = action.getCurrentRowData()
          return (
              <OneProperty data={record} subSelect={false} key={record.code}></OneProperty>
          );
        }}
      </ProFormList>
    </ProForm>
    </PageContainer>
  );
};

export default AddOrUpdateEvent;