import {
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormText,
  ProFormSwitch,
  ProFormDigitRange,
  ProCard
} from '@ant-design/pro-components';
import { THING_DATA_TYPE_ARRAY, THING_DATA_TYPE_BOOL, THING_DATA_TYPE_FLOAT, THING_DATA_TYPE_INT, THING_DATA_TYPE_OBJECT, THING_DATA_TYPE_STRING,} from '@/utils/const';
import { ModelProperty } from '@/utils/type';
import OneProperty from '../../components/OneProperty';

const ExtraProperty: React.FC<{
    modelProperty: ModelProperty;
  }> = ({modelProperty}) => {

  return (
    <ProForm.Group
        title="额外属性"
    >
    {modelProperty.type === THING_DATA_TYPE_BOOL && (
        <ProFormSwitch
        name="default_bool"
        label="初始值"
        width = 'md'
        colProps = {
            {
            xs: 24,
            md: 8,
            }
        }
        />
    )}

    {modelProperty.type === THING_DATA_TYPE_INT && (
        <>
        <ProFormDigit
        label="初始值"
        placeholder="请输入初始值"
        name="default_number"
        width = 'md'
        fieldProps={{ precision: 0 }}
        colProps = {
            {
            xs: 24,
            md: 8,
            }
        }
        />
        <ProFormDigitRange
            label="数值范围"
            placeholder="请输入数值范围"
            fieldProps={{ precision: 0 }}
            name="range"
            width = 'md'
            colProps = {
                {
                xs: 24,
                md: 8,
                }
            }
        />

        <ProFormDigit
        label="步长"
        placeholder="请输入步长"
        fieldProps={{ precision: 0 }}
        name="step"
        width = 'md'
        colProps = {
            {
            xs: 24,
            md: 8,
            }
        }
        />

        <ProFormText
        label="单位"
        placeholder="请输入单位"
        name="unit"
        width = 'md'
        colProps = {
            {
            xs: 24,
            md: 8,
            }
        }
        />
       </>
    )} 

    {modelProperty.type === THING_DATA_TYPE_STRING && (
        <ProFormDigitRange
            label="字节数范围"
            width = 'md'
            name="range"
            fieldProps={{ precision: 0 }}
            colProps = {
                {
                xs: 24,
                md: 8,
                }
            }
        />
    )}  

    {modelProperty.type === THING_DATA_TYPE_FLOAT && (
        <>
        <ProFormDigit
        label="初始值"
        placeholder="请输入初始值"
        name="default_number"
        fieldProps={{ precision: 2 }}
        width = 'md'
        colProps = {
            {
            xs: 24,
            md: 8,
            }
        }
        />
        <ProFormDigitRange
            label="数值范围"
            placeholder="请输入数值范围"
            fieldProps={{ precision: 2 }}
            name="range"
            width = 'md'
            colProps = {
                {
                xs: 24,
                md: 8,
                }
            }
        />
        <ProFormDigit
        label="步长"
        placeholder="请输入步长"
        fieldProps={{ precision: 2 }}
        name="step"
        width = 'md'
        colProps = {
            {
            xs: 24,
            md: 8,
            }
        }
        />
        <ProFormText
        label="单位"
        placeholder="请输入单位"
        name="unit"
        width = 'md'
        colProps = {
            {
            xs: 24,
            md: 8,
            }
        }
        />
        </>
    )}  


    {modelProperty.type === THING_DATA_TYPE_ARRAY && (
        <>
       <ProFormDigitRange
            label="元素个数范围"
            name="range"
            rules={[{ required: true, message: '请输入范围' }]}
            width = 'md'
            colProps = {
                {
                xs: 24,
                md: 8,
                }
            }
        />

        <ProFormList 
            name="array_options_items"
            max = {1}
            min = {1}
            itemRender={({ listDom, action }, { record }) => {
                return (
                    <ProCard extra={action} style={{padding:'10px', marginTop:"20px", border: '1px solid blue'}}>{listDom}</ProCard>
                );
            }}
        >
        {(f, index, action) => {
            const record = action.getCurrentRowData()
            return (
                <OneProperty data={record} subSelect={true} key={record.code}></OneProperty>
            );
        }}
      </ProFormList>
      </>
    )}  

    {modelProperty.type === THING_DATA_TYPE_OBJECT && (
        <>
         <ProFormList 
            name="object_options_items"
            itemRender={({ listDom, action }, { record }) => {
                return (
                    <ProCard extra={action} style={{padding:'10px', marginTop:"20px", border: '1px solid blue'}}>{listDom}</ProCard>
                );
            }}
        >
        {(f, index, action) => {
            const record = action.getCurrentRowData()
            return (
                <OneProperty data={record} subSelect={true} key={record.code}></OneProperty>
            );
        }}
      </ProFormList> 
        </>
    )}  
    </ProForm.Group>
  );
};

export default ExtraProperty;