import { permissionServiceAdd, permissionServiceUpdate } from '@/services/auth/permissionService';
import { msgLogServicePage } from '@/services/shadow/msgLogService';
import { THING_MODEL_TYPE, THING_SERVICE_DIR_TYPE, convert2ValueEnum } from '@/utils/const';
import { dateStrToTimestamp, timestampToDateStr } from '@/utils/date';
import {
  ProColumns,
  ProTable,
  ActionType,
  ProFormText,
  ProForm,
  ProFormDateTimeRangePicker,
  ProFormSelect,
} from '@ant-design/pro-components';
import {  FormInstance, Button } from 'antd';
import {  useEffect, useRef } from 'react';

const DeviceLogPage: React.FC<{
  activeKey:string;
  productInfo: API.protoProduct;
  deviceInfo: API.protoDevice;
}> = ({ activeKey, productInfo, deviceInfo}) => {
  const pageRef = useRef<ActionType>();
  const formInstanceRef = useRef<FormInstance>()
  const formParams = useRef<any>({});
  const msgDirRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_SERVICE_DIR_TYPE),
  );
  const modelTypeRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_MODEL_TYPE),
  );

  useEffect(() => {
    if (activeKey === '6') {
      onSearch()
    }
    console.log("useEffect activeKey end", activeKey)
  }, [activeKey]);

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
        // dir: params.dir,
        msg_id: formParams.current.msg_id,
        context_id: formParams.current.context_id,
        code: formParams.current.code,
        start_time: start_time,
        end_time: end_time,
        sn:formParams.current.sn,
    };
    if(formParams.current.log_type != undefined) {
      param.log_types = [formParams.current.log_type]
    }
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
    formInstanceRef.current?.setFieldValue("sn", deviceInfo.sn)
  }

  const columns: ProColumns<API.protoResource>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '设备sn',
      dataIndex: 'sn',
      width: 100,
    },
    {
      title: '时间',
      dataIndex: 'create_time',
      valueType:'dateTimeRange',
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
      title: '消息方向',
      dataIndex: 'dir',
      valueType:"select",
      width: 100,
      valueEnum:msgDirRef.current
    },
    {
      title: '消息类型',
      dataIndex: 'log_type',
      valueType:"select",
      width: 100,
      valueEnum:modelTypeRef.current
    },
    {
      title: '消息内容',
      dataIndex: 'content',
      search:false,
      ellipsis:true,
    },
  ];

  return (
    <>
    <ProForm
        style={{marginTop:"20px"}}
        layout='horizontal'
        formRef={formInstanceRef}
        initialValues={{
          create_time:[new Date().getTime() - 1000*3600*12, new Date()],
          sn:deviceInfo.sn,
        }}
        submitter={false}
      >
        <ProForm.Group>
        <ProFormDateTimeRangePicker
            width='md'
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
            width='sm'
            name="sn"
            label="设备sn"
            placeholder="请输入设备sn"
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
            width='sm'
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

        <ProFormSelect 
            width={180}
            name="log_type"
            label="消息类型"
            valueEnum={modelTypeRef.current}
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

export default DeviceLogPage;
