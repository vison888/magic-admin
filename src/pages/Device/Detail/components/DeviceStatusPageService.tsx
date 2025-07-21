import { msgLogServicePage } from '@/services/shadow/msgLogService';
import { deviceServiceGet } from '@/services/thing/deviceService';
import { THING_SERVICE_DIR_TYPE_UP } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import {
  ProColumns,
  ProTable,
  ActionType,
  ProForm,
  ProFormText,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-components';
import {  Button, message } from 'antd';
import { FormInstance } from 'antd/lib';
import { useEffect, useRef } from 'react';

const DeviceStatusPageService:  React.FC<{
  parentActiveKey:string;
  activeKey:string;
  deviceInfo: API.protoDevice;
}> = ({parentActiveKey, activeKey,deviceInfo}) => {
  const formParams = useRef<any>({});
  const pageRef = useRef<ActionType>();
  const formInstanceRef = useRef<FormInstance>();
  
  const queryPage = async (params: any): Promise<{ data?: API.protoProductModel[]; total?: number }> => {
    let start_time = "0"
    let end_time = "0"
    if (formParams.current.create_time !== null && formParams.current.create_time !== undefined) {
      start_time = formParams.current.create_time[0].valueOf()
      end_time = formParams.current.create_time[1].valueOf()
    }
    
    const param : API.protoMsgLogPageReq = {
        page_index: params.current,
        page_size: params.pageSize,
        log_types: ["service"],
        dir:THING_SERVICE_DIR_TYPE_UP,
        msg_id: formParams.current.msg_id,
        context_id: formParams.current.context_id,
        code: formParams.current.code,
        start_time: start_time,
        end_time: end_time,
        sn:deviceInfo.sn,
    };
    const res = await msgLogServicePage(param);
    if (res.code !== 0) {
      return {
        data: [],
        total: 0,
      };
    }
    return {
      data: res.items,
      total: res.total,
    };
  };

  useEffect(() => {
    if (activeKey === '2') {
      pageRef.current?.reload()
    }
  }, [activeKey]);

  const getMsgObject = (record: any) => {
    try {
      return JSON.parse(record.content!);
    } catch (e) {
      console.error(e);
      message.error('JSON 解析错误');
    }
  };

  const onSearch = ()=>{
    const ok = formInstanceRef.current?.validateFields()
    ok?.then(()=>{
      const values = formInstanceRef.current?.getFieldsValue()
      formParams.current = values
      pageRef.current?.reload()
    })
  }

  const onReset = ()=>{
    formInstanceRef.current?.resetFields()
    formInstanceRef.current?.setFieldValue("create_time", [new Date().getTime() - 1000*3600*12, new Date()])
  }

  const columns: ProColumns<API.protoMsgLog>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '时间',
      dataIndex: 'create_time',
      render: (_: any, entity: API.protoMsgLog) => {
        return timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS');
      },
      width: 180,
    },
    {
      title: '消息id',
      dataIndex: 'msg_id',
      width: 260,
    },
    {
      title: '上下文id',
      dataIndex: 'context_id',
      width: 260,
    },
    {
      title: '标识',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: '参数',
      dataIndex: 'content',
      search:false,
      ellipsis:true,
      render: (_: any, entity: API.protoMsgLog) => {
        const params = getMsgObject(entity).params;
        return JSON.stringify(params);
      },
    },
  ];

  return (
    <>
    <ProForm
        style={{marginTop:"20px"}}
        layout='horizontal'
        formRef={formInstanceRef}
        initialValues={{
          create_time:[new Date().getTime() - 1000*3600*12, new Date()]
        }}
        submitter={false}
      >
        <ProForm.Group>
        <ProFormDateTimeRangePicker
            width='xl'
            name="create_time"
            label="时间范围"
            placeholder={["请输入开始时间", "请输入结束时间"]}
            dataFormat='YYYY-MM-DD HH:mm:ss'
            rules={[
                {
                    required: true,
                    message: '请输入时间范围',
                },
            ]}
        />

        <ProFormText 
            width="sm"
            name="msg_id"
            label="消息id"
            placeholder="请输入消息id"
        />
        </ProForm.Group>
        <ProForm.Group>
        <ProFormText 
            width='md'
            name="context_id"
            label="上下文id"
            placeholder="请输入上下文id"
        />

        <ProFormText 
            width='sm'
            name="code"
            label="标识"
            placeholder="请输入标识"
        />
        <div>
        <Button type='dashed' onClick={onReset}>重置</Button>,
        <Button type='primary' onClick={onSearch}>搜索</Button>
        </div>
        </ProForm.Group>
    </ProForm>


    <ProTable
        options={false}
        rowKey={(record: API.protoMsgLog, index?: number)=>{
          return ""+record.msg_id+record.create_time
        }}
        columns={columns}
        actionRef={pageRef}
        bordered
        request={queryPage}
        pagination={{
          pageSize: 10,
        }}
        rowSelection={false}
        search={false}
      />
      </>
  );
};

export default DeviceStatusPageService;
