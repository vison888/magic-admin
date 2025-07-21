import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import {
  apiWhiteListServiceDel,
  apiWhiteListServicePage,
} from '@/services/auth/apiWhiteListService';
import AddOrUpdateApiWhiteList from './components/AddOrUpdateWhitList';
import useTableDelete from '@/hooks/useTableDelete';
import { timestampToDateStr } from '@/utils/date';

const Page: React.FC = () => {
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();
  // 删除操作
  const showDeleteConfirm = (record: API.protoApiWhiteList) => {
    const body: API.protoApiWhiteListDelReq = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoApiWhiteListDelReq>(apiWhiteListServiceDel, pageRef, {
      title: '是否删除当前白名单',
      content: `所选白名单: ${record?.name ?? '未知白名单'},  删除后无法恢复，请确认`,
      body,
    });
  };

  /**
   * 查询数据
   * */
  const queryPage = async (
    params: any,
  ): Promise<{ data?: API.protoApiWhiteList[]; total?: number }> => {
    const body: API.protoApiWhiteListPageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      name: params.name,
    };
    const res = await apiWhiteListServicePage(body);
    return {
      data: res.list,
      total: res.total,
    };
  };

  const columns: ProColumns<API.protoApiWhiteList>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'api名称',
      dataIndex: 'name',
    },
    {
      title: 'api地址',
      dataIndex: 'path',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      render: (_, entity: API.protoApiWhiteList) =>
        timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS'),
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: API.protoApiWhiteList) => (
        <>
          <AddOrUpdateApiWhiteList
            flag="update"
            key={record.id}
            record={record}
            pageRef={pageRef}
          />

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
        toolBarRender={() => [
          <AddOrUpdateApiWhiteList flag="create" pageRef={pageRef} key="createApiWhiteList" />,
        ]}
      />
    </PageContainer>
  );
};

export default Page;
