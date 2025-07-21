import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { resourceServiceDel, resourceServicePage } from '@/services/auth/resourceService';
import AddOrUpdateApiResource from './components/AddOrUpdateApiResource';
import useTableDelete from '@/hooks/useTableDelete';
import { timestampToDateStr } from '@/utils/date';
import {
  RESOURCE_TYPE_API,
  RESOURCE_TYPE_MENU,
  RESOURCE_TYPE_RULE,
  RESOURCE_TYPE_VALUE,
} from '@/utils/const';
import AddOrUpdateMenuResource from './components/AddOrUpdateMenuResource';
import AddOrUpdateRuleResource from './components/AddOrUpdateRuleResource';

const Page: React.FC = () => {
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();
  // 删除操作
  const showDeleteConfirm = (record: API.protoResource) => {
    const body: API.protoRequest = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoRequest>(resourceServiceDel, pageRef, {
      title: '是否删除当前资源',
      content: `所选资源: ${record?.name ?? '未知资源'},  删除后无法恢复，请确认`,
      body,
    });
  };

  /**
   * 查询数据
   * */
  const queryPage = async (
    params: any,
  ): Promise<{ data?: API.protoResource[]; total?: number }> => {
    const body: API.protoResourcePageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      name: params.name,
      type: params.type,
      content: params.content,
    };
    const res = await resourceServicePage(body);
    return {
      data: res.list,
      total: res.total,
    };
  };

  const columns: ProColumns<API.protoResource>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '资源名称',
      dataIndex: 'name',
    },
    {
      title: '资源类型',
      dataIndex: 'type',
      valueEnum: RESOURCE_TYPE_VALUE,
    },
    {
      title: '资源内容',
      dataIndex: 'content',
      render: (_, entity: API.protoResource) => {
        if (entity.type === 'menu') {
          return (
            <>
              <AddOrUpdateMenuResource
                flag="detail"
                key={entity.id}
                record={entity}
                pageRef={pageRef}
              />
            </>
          );
        }
        return entity.content;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      render: (_, entity: API.protoResource) =>
        timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS'),
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: API.protoResource) => (
        <>
          {record.type === RESOURCE_TYPE_API && (
            <AddOrUpdateApiResource
              flag="update"
              key={record.id}
              record={record}
              pageRef={pageRef}
            />
          )}

          {record.type === RESOURCE_TYPE_MENU && (
            <AddOrUpdateMenuResource
              flag="update"
              key={record.id}
              record={record}
              pageRef={pageRef}
            />
          )}

          {record.type === RESOURCE_TYPE_RULE && (
            <AddOrUpdateRuleResource
              flag="update"
              key={record.id}
              record={record}
              pageRef={pageRef}
            />
          )}

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
          span: 6,
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
          <>
            <AddOrUpdateApiResource flag="create" pageRef={pageRef} key="createResource" />,
            <AddOrUpdateMenuResource flag="create" pageRef={pageRef} key="createResource" />,
            <AddOrUpdateRuleResource flag="create" pageRef={pageRef} key="createResource" />,
          </>,
        ]}
      />
    </PageContainer>
  );
};

export default Page;
