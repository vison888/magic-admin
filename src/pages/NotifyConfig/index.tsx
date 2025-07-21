import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { notifyConfigServiceDel } from '@/services/thing/notifyConfigService';
import useTableDelete from '@/hooks/useTableDelete';
import { timestampToDateStr } from '@/utils/date';
import {
  NOTIFY_TYPE,
  convert2ValueEnum,
} from '@/utils/const';
import { notifyConfigServicePage } from '@/services/thing/notifyConfigService';
import AddOrUpdateNotifyConfig from './components/AddOrUpdateNotifyConfig';

const NotifyConfigPage: React.FC = () => {
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();
  const notifyTypeRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(NOTIFY_TYPE),
  );
 
  // 删除操作
  const showDeleteConfirm = (record: API.protoNotifyConfig) => {
    const body: API.protoNotifyLogDelReq = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoNotifyLogDelReq>(notifyConfigServiceDel, pageRef, {
      title: '是否删除当前配置',
      content: `所选配置: ${record?.name ?? '未知配置'},  删除后无法恢复，请确认`,
      body,
    });
  };

  /**
   * 查询数据
   * */
  const queryPage = async (params: any): Promise<{ data?: API.protoNotifyConfig[]; total?: number }> => {
    const body: API.protoNotifyConfigPageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      notify_type: params.notify_type,
      name: params.name,
    };
    const res = await notifyConfigServicePage(body);
    return {
      data: res.items,
      total: res.total,
    };
  };

  const columns: ProColumns<API.protoNotifyConfig>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '配置名称',
      dataIndex: 'name',
    },
    {
      title: '通知类型',
      dataIndex: 'notify_type',
      valueEnum: notifyTypeRef.current,
    },
    {
      title: '配置信息',
      dataIndex: 'notify_config',
      search:false,
      ellipsis:true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      render: (_, entity: API.protoNotifyConfig) =>
        timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS'),
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: API.protoNotifyConfig) => (
        <>
        <AddOrUpdateNotifyConfig flag="update" key={record.id} record={record} pageRef={pageRef} />
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
          <AddOrUpdateNotifyConfig flag="create" pageRef={pageRef} key="createNotifyConfig" />,
        ]}
      />
    </PageContainer>
  );
};

export default NotifyConfigPage;
