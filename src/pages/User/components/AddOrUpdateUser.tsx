import useTableAdd from '@/hooks/useTableAdd';
import useTableUpdate from '@/hooks/useTableUpdate';
import { userServiceAdd, userServiceUpdate } from '@/services/auth/userService';
import { APPCODE } from '@/utils/const';
import { getPassword } from '@/utils/password';
import {
  ProFormSelect,
  ProFormInstance,
  ModalForm,
  ProFormText,
  ActionType,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

const FORMITEM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

type AddFuncType = typeof userServiceAdd;
type UpdateFuncType = typeof userServiceUpdate;

const AddOrUpdateUser: React.FC<{
  flag: string;
  record?: API.protoUser;
  pageRef: React.MutableRefObject<ActionType | undefined>;
  selectOptions: { value: string; label: string }[];
}> = ({ flag, record, pageRef, selectOptions }) => {
  const { addHandler } = useTableAdd();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  const editFormRef = useRef<ProFormInstance>();
  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const formSubmit = async (values: any) => {
    const item: API.protoUser = {
      account: values.account,
      password: getPassword(values.password as string),
      nick_name: values.nick_name,
      id: record?.id as string,
      role_code: [values.role_code],
    };

    let code = -1;
    if (flag === 'update') {
      const updateReq: API.protoUserUpdateReq = {
        app_code: APPCODE,
        Item: item,
      };
      const res = await updateHandler<UpdateFuncType, API.protoUserUpdateReq>(
        userServiceUpdate,
        pageRef,
        updateReq,
      );
      code = res.code;
    } else {
      const addReq: API.protoUserAddReq = {
        app_code: APPCODE,
        item: item,
      };
      const res = await addHandler<AddFuncType, API.protoUserAddReq>(
        userServiceAdd,
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
    if (record !== undefined) {
      const roleCodes = record.role_code as string[];
      console.log(roleCodes);
      editFormRef.current?.setFieldValue('role_code', roleCodes[0]);
    }
  }, [editFlag, record]);

  return (
    <ModalForm
      initialValues={{}}
      width={550}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑用户信息' : '添加用户'}
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
        name="nick_name"
        width="md"
        label="用户昵称"
        placeholder="请输入用户昵称"
        fieldProps={{ autoComplete: 'off' }}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText
        name="account"
        width="md"
        label="用户账号"
        placeholder="请输入用户账号"
        fieldProps={{ autoComplete: 'off' }}
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Z][a-zA-Z0-9_-]{4,20}$/,
            message:
              '账号必须以大小写字母开头，且账号只能包含大小写字母，数字，下划线和减号。 长度为4到20位之间',
          },
        ]}
      />
      {flag === 'create' && (
        <ProFormText.Password
          name="password"
          width="md"
          label="密码"
          placeholder="请输入密码"
          fieldProps={{ autoComplete: 'off' }}
          rules={[
            {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,32}$/,
              message: '密码必须包含字母和数字，长度在8-32位之间',
            },
          ]}
        />
      )}
      <ProFormSelect
        width="md"
        name="role_code"
        label="角色"
        placeholder="请选择角色"
        rules={[
          {
            required: true,
            message: '角色是必填项！',
          },
        ]}
        request={async () => selectOptions}
      />
    </ModalForm>
  );
};

export default AddOrUpdateUser;
