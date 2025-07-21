import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useEffect, useRef } from 'react';
import useGetSelectRoles from '@/hooks/useGetSelectRoleOption';
import useTableDelete from '@/hooks/useTableDelete';
import { userServiceDel, userServicePage } from '@/services/auth/userService';
import { timestampToDateStr } from '@/utils/date';
import AddOrUpdateUser from './components/AddOrUpdateUser';
import UpdatePassword from './components/UpdatePassword';

const UserPage: React.FC = () => {
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();
  const { selectRoles, querySelectRoles } = useGetSelectRoles();

  // 删除操作
  const showDeleteConfirm = (record: API.protoUser) => {
    const body: API.protoUserDelReq = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoUserDelReq>(userServiceDel, pageRef, {
      title: '是否删除当前用户',
      content: `所选用户: ${record?.nick_name ?? '未知用户'},  删除后无法恢复，请确认`,
      body,
    });
  };

  /**
   * 查询数据
   * */
  const queryPage = async (
    params: any,
  ): Promise<{ data?: API.protoUser[]; total?: number }> => {
    const body: API.protoUserPageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      account: params.account,
      nick_name: params.nick_name,
    };
    const res = await userServicePage(body);
    return {
      data: res.list,
      total: res.total,
    };
  };

  const columns: ProColumns<API.protoUser>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名称',
      dataIndex: 'nick_name',
    },
    {
      title: '用户账号',
      dataIndex: 'account',
    },
    {
      title: '角色',
      dataIndex: 'role_code',
      search: false,
      render: (_, entity: API.protoUser) => {
        let roleNames = '-';
        const roles = entity.role_code as string[];
        if (roles.length > 0) {
          roleNames = '';
          for (let index = 0; index < roles.length; index++) {
            const code = roles[index];
            selectRoles.map[code] &&
              (roleNames = selectRoles.map[code].label + ' ');
          }
        }
        return roleNames;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      render: (_, entity: API.protoUser) =>
        timestampToDateStr(
          Number(entity.create_time),
          'YYYY-MM-DD HH:mm:ss.SSS',
        ),
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
      render: (text, record: API.protoUser) => (
        <>
          <AddOrUpdateUser
            flag="update"
            key={record.id + 'AddOrUpdateUser'}
            record={record}
            pageRef={pageRef}
            selectOptions={selectRoles.list}
          />

          <UpdatePassword key={record.id + 'UpdatePassword'} record={record} />

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

  useEffect(() => {
    querySelectRoles();
  }, []);

  return (
    <PageContainer>
      <ProTable<API.protoUser, API.protoUserPageReq>
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
          <AddOrUpdateUser
            flag="create"
            pageRef={pageRef}
            key="createUser"
            selectOptions={selectRoles.list}
          />,
        ]}
      />
    </PageContainer>
  );
};

export default UserPage;
