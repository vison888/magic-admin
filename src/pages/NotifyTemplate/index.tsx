import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useEffect, useRef } from 'react';
import { notifyTemplateServiceDel } from '@/services/thing/notifyTemplateService';
import useTableDelete from '@/hooks/useTableDelete';
import { timestampToDateStr } from '@/utils/date';
import {
  NOTIFY_TYPE,
  convert2ValueEnum,
} from '@/utils/const';
import { notifyTemplateServicePage } from '@/services/thing/notifyTemplateService';
import AddOrUpdateNotifyTemplate from './components/AddOrUpdateNotifyTemplate';
import useGetSelectNotifyConfigs from '@/hooks/useGetSelectNotifyConfigOption';

const NotifyTemplatePage: React.FC = () => {
  const { selectNotifyConfigs, querySelectNotifyConfigs } = useGetSelectNotifyConfigs();
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();
  const notifyTypeRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(NOTIFY_TYPE),
  );
 
  // 删除操作
  const showDeleteConfirm = (record: API.protoNotifyTemplate) => {
    const body: API.protoNotifyLogDelReq = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoNotifyLogDelReq>(notifyTemplateServiceDel, pageRef, {
      title: '是否删除当前模板',
      content: `所选模板: ${record?.name ?? '未知模板'},  删除后无法恢复，请确认`,
      body,
    });
  };

  useEffect(() => {
    querySelectNotifyConfigs();
  }, []);

  /**
   * 查询数据
   * */
  const queryPage = async (params: any): Promise<{ data?: API.protoNotifyTemplate[]; total?: number }> => {
    const body: API.protoNotifyTemplatePageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      notify_type: params.notify_type,
      name: params.name,
      notify_config_id: params.notify_config_id,
    };
    const res = await notifyTemplateServicePage(body);
    return {
      data: res.items,
      total: res.total,
    };
  };

  const columns: ProColumns<API.protoNotifyTemplate>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '模板名称',
      dataIndex: 'name',
    },
    {
      title: '通知类型',
      dataIndex: 'notify_type',
      valueEnum: notifyTypeRef.current,
    },
    {
      title: '通知配置',
      dataIndex: 'notify_config_id',
      valueType: "select",
      valueEnum:convert2ValueEnum(selectNotifyConfigs.list),
    },
    {
      title: '模板信息',
      dataIndex: 'notify_template',
      search:false,
      ellipsis:true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      render: (_, entity: API.protoNotifyTemplate) =>
        timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS'),
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: API.protoNotifyTemplate) => (
        <>
        <AddOrUpdateNotifyTemplate selectNotifyConfigOptions={selectNotifyConfigs.list} flag="update" key={record.id} record={record} pageRef={pageRef} />
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
        toolBarRender={() => [
          <AddOrUpdateNotifyTemplate selectNotifyConfigOptions={selectNotifyConfigs.list} flag="create" pageRef={pageRef} key="createNotifyTemplate" />,
        ]}
      />
    </PageContainer>
  );
};

export default NotifyTemplatePage;
