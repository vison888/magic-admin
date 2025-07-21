import {
  type ActionType,
  ModalForm,
  type ProColumns,
  type ProFormInstance,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import useTableAdd from '@/hooks/useTableAdd';
import useTableUpdate from '@/hooks/useTableUpdate';
import {
  permissionServiceAdd,
  permissionServiceUpdate,
} from '@/services/auth/permissionService';
import { resourceServicePage } from '@/services/auth/resourceService';
import { RESOURCE_TYPE_MENU } from '@/utils/const';
import ShowJson from './ShowJson';

const FORMITEM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

type AddFuncType = typeof permissionServiceAdd;
type UpdateFuncType = typeof permissionServiceUpdate;

const AddOrUpdateMenuPermission: React.FC<{
  flag: string;
  record?: API.protoPermission;
  pageRef: React.MutableRefObject<ActionType | undefined>;
  selectAppOptions: { value: string; label: string }[];
  selectRoleOptions: { value: string; label: string }[];
}> = ({ flag, record, pageRef, selectAppOptions, selectRoleOptions }) => {
  const { addHandler } = useTableAdd();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  const editFormRef = useRef<ProFormInstance>(null);
  const subPageActionRef = useRef<ActionType>(null);
  const selectedList = useRef<string[]>([]);
  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const formSubmit = async (values: any) => {
    let code = -1;
    const resourceList = selectedList.current.map((item: any) => {
      return { resource_id: item };
    });
    const resourceStr = JSON.stringify(resourceList);

    if (flag === 'update') {
      const updateReq: API.protoPermissionUpdateReq = {
        id: record?.id as string,
        role_id: values.role_id,
        app_id: values.app_id,
        resources: resourceStr,
      };
      const res = await updateHandler<
        UpdateFuncType,
        API.protoPermissionUpdateReq
      >(permissionServiceUpdate, pageRef, updateReq);
      code = res.code;
    } else {
      const addReq: API.protoPermissionAddReq = {
        role_id: values.role_id,
        app_id: values.app_id,
        resource_type: RESOURCE_TYPE_MENU,
        resources: resourceStr,
      };
      const res = await addHandler<AddFuncType, API.protoPermissionAddReq>(
        permissionServiceAdd,
        pageRef,
        addReq,
      );
      code = res.code;
    }
    if (code === 0) {
      onClose();
      editFormRef.current?.resetFields();
    }
  };

  /**
   * 查询数据
   * */
  const queryPage = async (
    params: any,
  ): Promise<{ data?: API.protoPermission[]; total?: number }> => {
    const body: API.protoResourcePageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      type: RESOURCE_TYPE_MENU,
    };
    const res = await resourceServicePage(body);
    return {
      data: res.list,
      total: res.total,
    };
  };

  useEffect(() => {
    editFormRef.current?.setFieldsValue(record);
    if (record !== undefined) {
      const list = JSON.parse(record.resources as string);
      const ids: string[] = list.map((item: any) => {
        return item.resource_id as string;
      });
      selectedList.current = ids;
      console.log('selectedList.current,', selectedList.current);
    }
  }, [editFlag, record]);

  const columns: ProColumns<API.protoResource>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '菜单内容',
      dataIndex: 'content',
      render: (_, entity: API.protoResource) => {
        return (
          <>
            <ShowJson
              key={entity.id}
              info={{ name: entity.name, content: entity.content }}
            />
          </>
        );
      },
    },
  ];

  return (
    <ModalForm
      width={550}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑权限信息' : '添加菜单权限'}
      trigger={
        <Button
          type={flag === 'update' ? 'link' : 'primary'}
          onClick={() => {
            setEditFlag(true);
            onOpen();
          }}
        >
          {flag === 'update' ? '编辑' : '添加菜单权限'}
        </Button>
      }
      open={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => {
          onClose();
        },
      }}
      submitTimeout={2000}
      {...FORMITEM_LAYOUT}
      layout={LAYOUT_TYPE_HORIZONTAL}
      onFinish={formSubmit}
    >
      <ProFormSelect
        width="md"
        name="role_id"
        label="角色"
        placeholder="请选择角色"
        request={async () => selectRoleOptions}
        rules={[
          {
            required: true,
            message: '角色是必填项！',
          },
        ]}
      />
      <ProFormSelect
        width="md"
        name="app_id"
        label="应用"
        placeholder="请选择应用"
        request={async () => selectAppOptions}
        rules={[
          {
            required: true,
            message: '应用是必填项！',
          },
        ]}
      />
      <ProTable
        search={false}
        options={false}
        rowKey="id"
        columns={columns}
        actionRef={subPageActionRef}
        bordered
        request={queryPage}
        pagination={{
          pageSize: 10,
        }}
        rowSelection={{
          onChange: (row) => {
            console.log('row', row);
            const ids: string[] = row.map((item: any) => {
              return item as string;
            });
            selectedList.current = ids;
          },
          preserveSelectedRowKeys: true,
          defaultSelectedRowKeys: selectedList.current,
        }}
      />
    </ModalForm>
  );
};

export default AddOrUpdateMenuPermission;
