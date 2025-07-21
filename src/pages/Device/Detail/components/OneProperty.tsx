import {
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormSwitch,
  ProFormDigitRange,
  ProCard,
} from '@ant-design/pro-components';
import { useState } from 'react';
import { THING_DATA_TYPE, THING_DATA_TYPE_ARRAY, THING_DATA_TYPE_BOOL, THING_DATA_TYPE_FLOAT, THING_DATA_TYPE_INT, THING_DATA_TYPE_OBJECT, THING_DATA_TYPE_STRING, THING_DATA_TYPE_SUB} from '@/utils/const';

const OneProperty: React.FC<{data?:any, subSelect:boolean}> = ({data,subSelect}) => {
    const [propertyData, setPropertyData] = useState(data);
    return (
    <ProForm.Group>
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
        label="数据类型"
        placeholder="请输入数据类型"
        rules={[{ required: true, message: '请选择数据类型' }]}
        options={subSelect===true?THING_DATA_TYPE_SUB:THING_DATA_TYPE}
        onChange={(value)=>{
            propertyData.type = value
            setPropertyData({...propertyData})
            return value
        }}
        width = 'md'
        colProps = {
        {
            xs: 24,
            md: 8,
        }
        }
    />

    {propertyData.type === THING_DATA_TYPE_BOOL && (
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

    {propertyData.type === THING_DATA_TYPE_INT && (
        <>
        <ProFormDigit
        label="初始值"
        placeholder="请输入初始值"
        name="default_number"
        fieldProps={{ precision: 0 }}
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
            name="range"
            fieldProps={{ precision: 0 }}
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
        name="step"
        fieldProps={{ precision: 0 }}
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

    {propertyData.type === THING_DATA_TYPE_STRING && (
        <>
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
       </>
    )}  

    {propertyData.type === THING_DATA_TYPE_FLOAT && (
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
            name="range"
            fieldProps={{ precision: 2 }}
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
        name="step"
        fieldProps={{ precision: 2 }}
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

    
    {propertyData.type === THING_DATA_TYPE_ARRAY && (
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

    {propertyData.type === THING_DATA_TYPE_OBJECT && (
        <>
        <ProFormList 
            name="object_options_items"
            min = {0}
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
                <OneProperty data={record} subSelect={true} key={record.code}></OneProperty>
            );
        }}
      </ProFormList>
       </>
    )} 

    </ProForm.Group>
  );
};


export default OneProperty;