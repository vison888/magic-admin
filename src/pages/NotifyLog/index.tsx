import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useEffect, useRef } from 'react';
import { notifyLogServiceDel } from '@/services/thing/notifyLogService';
import useTableDelete from '@/hooks/useTableDelete';
import { timestampToDateStr } from '@/utils/date';
import {
  NOTIFY_TYPE,
  convert2ValueEnum,
} from '@/utils/const';
import { notifyLogServicePage } from '@/services/thing/notifyLogService';
import useGetSelectNotifyConfigs from '@/hooks/useGetSelectNotifyConfigOption';

const NotifyLogPage: React.FC = () => {
  const { selectNotifyConfigs, querySelectNotifyConfigs } = useGetSelectNotifyConfigs();
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();
  const notifyTypeRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(NOTIFY_TYPE),
  );
 
  // 删除操作
  const showDeleteConfirm = (record: API.protoNotifyLog) => {
    const body: API.protoNotifyLogDelReq = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoNotifyLogDelReq>(notifyLogServiceDel, pageRef, {
      title: '是否删除当前日志',
      content: `所选日志: ${record?.id ?? '未知日志'},  删除后无法恢复，请确认`,
      body,
    });
  };

  useEffect(() => {
    querySelectNotifyConfigs();
  }, []);

  /**
   * 查询数据
   * */
  const queryPage = async (params: any): Promise<{ data?: API.protoNotifyLog[]; total?: number }> => {
    const body: API.protoNotifyLogPageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      notify_type: params.notify_type,
      notify_config_id: params.notify_config_id,
      notify_template_id: params.notify_template_id,
    };
    const res = await notifyLogServicePage(body);
    return {
      data: res.items,
      total: res.total,
    };
  };

  const columns: ProColumns<API.protoNotifyLog>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '通知类型',
      dataIndex: 'notify_type',
      valueEnum: notifyTypeRef.current,
      width: 100,
    },
    {
      title: '通知配置',
      dataIndex: 'notify_config_id',
      valueType: "select",
      valueEnum:convert2ValueEnum(selectNotifyConfigs.list),
      ellipsis:true,
      width: 100,
    },
    {
      title: '模板名称',
      dataIndex: 'notify_type',
      renderText(text, record, index, action) {
          return record!.notify_template!.name
      },
      ellipsis:true,
      search:false,
      width: 100,
    },
    {
      title: '上文内容',
      dataIndex: 'content',
      search:false,
      width: 200,
    },
    {
      title: '执行结果',
      dataIndex: 'result_status',
      search:false,
      width: 100,
      renderText(text, record, index, action) {
        return record!.result_status === 0?"成功":"失败"
    },
    },
    {
      title: '错误信息',
      dataIndex: 'result',
      search:false,
      ellipsis:true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      render: (_, entity: API.protoNotifyLog) =>
        timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS'),
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: API.protoNotifyLog) => (
        <>
          <Button
            type="link"
            danger
            onClick={() => {
              showDeleteConfirm(record);
            }}
            style={{ paddingRight: 10 }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        columns={columns}
        actionRef={pageRef}
        bordered
        request={queryPage}
        search={{
          span: 5,
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        toolBarRender={false}
      />
    </PageContainer>
  );
};

export default NotifyLogPage;
