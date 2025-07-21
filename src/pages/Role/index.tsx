import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { roleServiceDel, roleServicePage } from '@/services/auth/roleService';
import AddOrUpdateRole from './components/AddOrUpdateRole';
import useTableDelete from '@/hooks/useTableDelete';
import { timestampToDateStr } from '@/utils/date';

const Page: React.FC = () => {
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();
  // 删除操作
  const showDeleteConfirm = (record: API.protoRole) => {
    const body: API.protoRoleDelReq = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoRoleDelReq>(roleServiceDel, pageRef, {
      title: '是否删除当前角色',
      content: `所选角色: ${record?.name ?? '未知角色'},  删除后无法恢复，请确认`,
      body,
    });
  };

  /**
   * 查询数据
   * */
  const queryPage = async (params: any): Promise<{ data?: API.protoRole[]; total?: number }> => {
    const body: API.protoRolePageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      name: params.name,
    };
    const res = await roleServicePage(body);
    return {
      data: res.list,
      total: res.total,
    };
  };

  const columns: ProColumns<API.protoRole>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '角色代码',
      dataIndex: 'code',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      render: (_, entity: API.protoRole) =>
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
      render: (text, record: API.protoRole) => (
        <>
          <AddOrUpdateRole flag="update" key={record.id} record={record} pageRef={pageRef} />

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
        toolBarRender={() => [<AddOrUpdateRole flag="create" pageRef={pageRef} key="createRole" />]}
      />
    </PageContainer>
  );
};

export default Page;
