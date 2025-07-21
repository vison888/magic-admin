
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  PageContainer,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormList,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProCard,
  ProFormSwitch
} from '@ant-design/pro-components';
import {  message } from 'antd';
import { productModelServiceAdd, productModelServiceGet, productModelServiceUpdate } from '@/services/thing/productModelService';
import { useEffect, useMemo, useRef,useState } from 'react';
import { useParams } from '@umijs/max';

import { THING_MODEL_TYPE_SERVICE,THING_SERVICE_DIR_TYPE, THING_SERVICE_DIR_TYPE_UP} from '@/utils/const';
import { FormInstance } from 'antd/lib';
import {  decodeServiceData, encodeServiceData, encodePropertyData, ModelService } from '@/utils/type';
import OneProperty from '../components/OneProperty';

const AddOrUpdateService: React.FC = () => {
  const [productModelServiceDef, setProductModelServiceDef] = useState<ModelService>({} as ModelService);
  const params = useParams() as { id: string, subid: string };
  const formRef = useRef<FormInstance>()

  const formSubmit = async (values: any) => {
    const modelDef = encodeServiceData(values, true)
    let code = -1;
    let msg = "";
    if (params.subid === '0') {
      const addReq: API.protoProductModelAddReq = {
        name:values.name,
        code:values.code,
        type:THING_MODEL_TYPE_SERVICE,
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
        type:THING_MODEL_TYPE_SERVICE,
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

  const queryProductModel = async (): Promise<ModelService> => {
    if(params.subid === "0") {
      // 构造默认数据
      const p : ModelService = {
        code:"",
        name:"",
        desc:"",
        dir:THING_SERVICE_DIR_TYPE_UP,
        input:[],
        output:[],
        is_sys:0,
      }
      setProductModelServiceDef(p)
      return p
    }

    const body: API.protoProductModelGetReq = {
      id: params.subid,
    };
    const res = await productModelServiceGet(body);
    const m = getDefinition(res.item!)
    const p : ModelService = decodeServiceData(m)
    p.is_sys = res.item!.is_sys!
    setProductModelServiceDef(p)
    console.log("p", p)
    return p;
  };

  useEffect(() => {
    queryProductModel();
  }, []);

  return (
    <PageContainer
    title={params.subid === "0"?"新建服务":productModelServiceDef.name+(productModelServiceDef.is_sys === 1?"(系统服务)":"")}
    onBack={() => history.back()}
    >
    <ProForm
      onFinish={async (values) => {
        console.log("values", values)
        formSubmit(values)
      }}
      disabled={productModelServiceDef.is_sys === 1}
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
        name="dir"
        label="调用方向"
        placeholder="请输入调用方向"
        rules={[{ required: true, message: '请选择调用方向' }]}
        options={THING_SERVICE_DIR_TYPE}
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
            label="输入参数"
            name="input"
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

      <ProFormList 
            label="输出参数"
            name="output"
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

export default AddOrUpdateService;