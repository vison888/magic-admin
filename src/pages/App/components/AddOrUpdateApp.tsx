import useTableAdd from '@/hooks/useTableAdd';
import useTableUpdate from '@/hooks/useTableUpdate';
import { appServiceAdd, appServiceUpdate } from '@/services/auth/appService';
import { ProFormInstance, ModalForm, ProFormText, ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

const FORMITEM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

type AddFuncType = typeof appServiceAdd;
type UpdateFuncType = typeof appServiceUpdate;

const AddOrUpdateApp: React.FC<{
  flag: string;
  record?: API.protoApp;
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
      const updateReq: API.protoAppUpdateReq = {
        code: values.code,
        name: values.name,
        describe: values.describe,
        id: record?.id as string,
      };
      const res = await updateHandler<UpdateFuncType, API.protoAppUpdateReq>(
        appServiceUpdate,
        pageRef,
        updateReq,
      );
      code = res.code;
    } else {
      const addReq: API.protoAppAddReq = {
        code: values.code,
        name: values.name,
        describe: values.describe,
      };
      const res = await addHandler<AddFuncType, API.protoAppAddReq>(appServiceAdd, pageRef, addReq);
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
      title={flag === 'update' ? '编辑应用信息' : '添加应用'}
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
        label="应用名称"
        placeholder="请输入应用名称"
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText
        name="code"
        width="md"
        label="应用代码"
        placeholder="请输入应用代码"
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText name="describe" width="md" label="应用描述" placeholder="请输入应用描述" />
    </ModalForm>
  );
};

export default AddOrUpdateApp;
