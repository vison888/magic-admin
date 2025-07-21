import useTableAdd from '@/hooks/useTableAdd';
import useTableUpdate from '@/hooks/useTableUpdate';
import { roleServiceAdd, roleServiceUpdate } from '@/services/auth/roleService';
import { ProFormInstance, ModalForm, ProFormText, ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

const FORMITEM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

type AddFuncType = typeof roleServiceAdd;
type UpdateFuncType = typeof roleServiceUpdate;

const AddOrUpdateRole: React.FC<{
  flag: string;
  record?: API.protoRole;
  pageRef: React.MutableRefObject<ActionType | undefined>;
}> = ({ flag, record, pageRef }) => {
  const { addHandler } = useTableAdd();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  const editFormRef = useRef<ProFormInstance>();
  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const formSubmit = async (values: any) => {
    let code = -1;
    if (flag === 'update') {
      const updateReq: API.protoRoleUpdateReq = {
        code: values.code,
        name: values.name,
        id: record?.id as string,
      };
      const res = await updateHandler<UpdateFuncType, API.protoRoleUpdateReq>(
        roleServiceUpdate,
        pageRef,
        updateReq,
      );
      code = res.code;
    } else {
      const addReq: API.protoRoleAddReq = {
        code: values.code,
        name: values.name,
      };
      const res = await addHandler<AddFuncType, API.protoRoleAddReq>(
        roleServiceAdd,
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

  useEffect(() => {
    editFormRef.current?.setFieldsValue(record);
  }, [editFlag, record]);

  return (
    <ModalForm
      width={550}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑角色信息' : '添加角色'}
      trigger={
        <Button
          type={flag === 'update' ? 'link' : 'primary'}
          onClick={() => {
            setEditFlag(true);
            onOpen();
          }}
        >
          {flag === 'update' ? '编辑' : '添加'}
        </Button>
      }
      open={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel: onClose,
      }}
      submitTimeout={2000}
      {...FORMITEM_LAYOUT}
      layout={LAYOUT_TYPE_HORIZONTAL}
      onFinish={formSubmit}
    >
      <ProFormText
        name="name"
        width="md"
        label="角色名称"
        placeholder="请输入角色名称"
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText
        name="code"
        width="md"
        label="角色代码"
        placeholder="请输入角色代码"
        rules={[
          {
            required: true,
          },
        ]}
      />
    </ModalForm>
  );
};

export default AddOrUpdateRole;
