import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { appServiceDel, appServicePage } from '@/services/auth/appService';
import AddOrUpdateApp from './components/AddOrUpdateApp';
import useTableDelete from '@/hooks/useTableDelete';
import { timestampToDateStr } from '@/utils/date';

const AppPage: React.FC = () => {
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();

  // 删除操作
  const showDeleteConfirm = (record: API.protoApp) => {
    const body: API.protoAppDelReq = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoAppDelReq>(appServiceDel, pageRef, {
      title: '是否删除当前应用',
      content: `所选应用: ${record?.name ?? '未知应用'},  删除后无法恢复，请确认`,
      body,
    });
  };

  /**
   * 查询数据
   * */
  const queryPage = async (params: any): Promise<{ data?: API.protoApp[]; total?: number }> => {
    const body: API.protoAppPageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      name: params.name,
    };
    const res = await appServicePage(body);
    return {
      data: res.list,
      total: res.total,
    };
  };

  const columns: ProColumns<API.protoApp>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '应用',
      dataIndex: 'name',
    },
    {
      title: '应用代码',
      dataIndex: 'code',
      search: false,
    },
    {
      title: '应用描述',
      dataIndex: 'describe',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      render: (_, entity: API.protoApp) =>
        timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS'),
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'create_username',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: API.protoApp) => (
        <>
          <AddOrUpdateApp flag="update" key={record.id} record={record} pageRef={pageRef} />

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
      <ProTable<API.protoApp, API.protoAppPageReq>
        rowKey="id"
        columns={columns}
        actionRef={pageRef}
        bordered
        request={queryPage}
        search={{
          span: 8,
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
        toolBarRender={() => [<AddOrUpdateApp flag="create" pageRef={pageRef} key="createApp" />]}
      />
    </PageContainer>
  );
};

export default AppPage;
