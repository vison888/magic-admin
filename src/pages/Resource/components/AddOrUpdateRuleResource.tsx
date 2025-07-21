import useTableAdd from '@/hooks/useTableAdd';
import useTableUpdate from '@/hooks/useTableUpdate';
import { resourceServiceAdd, resourceServiceUpdate } from '@/services/auth/resourceService';
import { RESOURCE_RULE_VALUE_OPTIONS, RESOURCE_TYPE_RULE } from '@/utils/const';
import {
  ProFormInstance,
  ModalForm,
  ProFormText,
  ProFormSelect,
  ActionType,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

const FORMITEM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

type AddFuncType = typeof resourceServiceAdd;
type UpdateFuncType = typeof resourceServiceUpdate;

const AddOrUpdateRuleResource: React.FC<{
  flag: string;
  record?: API.protoResource;
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
      const updateReq: API.protoUpdateResourceReq = {
        content: values.content,
        name: values.name,
        id: record?.id as string,
      };
      const res = await updateHandler<UpdateFuncType, API.protoUpdateResourceReq>(
        resourceServiceUpdate,
        pageRef,
        updateReq,
      );
      code = res.code;
    } else {
      const addReq: API.protoAddResourceReq = {
        content: values.content,
        name: values.name,
        type: RESOURCE_TYPE_RULE,
      };
      const res = await addHandler<AddFuncType, API.protoAddResourceReq>(
        resourceServiceAdd,
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
      initialValues={record}
      width={550}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑规则信息' : '添加规则'}
      trigger={
        <Button
          type={flag === 'update' ? 'link' : 'primary'}
          onClick={() => {
            setEditFlag(true);
            onOpen();
          }}
        >
          {flag === 'update' ? '编辑' : '添加规则'}
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
        label="资源名称"
        placeholder="请输入资源名称"
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormSelect
        name="content"
        width="md"
        label="资源内容"
        placeholder="请输入资源内容"
        options={RESOURCE_RULE_VALUE_OPTIONS}
        rules={[
          {
            required: true,
          },
        ]}
      />
    </ModalForm>
  );
};

export default AddOrUpdateRuleResource;
