import {
  ModalForm,
  type ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useRef, useState } from 'react';
import { userServiceUpdatePassword } from '@/services/auth/userService';
import { getPassword } from '@/utils/password';

const UpdatePassword: React.FC<{
  record?: API.protoUser;
}> = ({ record }) => {
  const [visible, setVisible] = useState(false);
  const updatePasswordRef = useRef<ProFormInstance>();
  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    updatePasswordRef.current?.resetFields();
    setVisible(false);
  };

  const formSubmit = async (values: any) => {
    const new_password = values.new_password as string;
    const confirm_password = values.confirm_password as string;
    if (new_password !== confirm_password) {
      message.info('新密码跟确认密码不一致');
      return;
    }
    const item: API.protoUpdatePasswordReq = {
      user_id: record?.id as string,
      cur_password: '', // 管理员不需要原密码
      new_password: getPassword(new_password),
    };
    const res = await userServiceUpdatePassword(item);
    if (res.code === 0) {
      onClose();
      message.success('修改密码成功');
    }
  };

  return (
    <ModalForm
      initialValues={record}
      width={550}
      formRef={updatePasswordRef}
      title="修改密码"
      trigger={
        <Button
          type="link"
          onClick={() => {
            onOpen();
          }}
        >
          修改密码
        </Button>
      }
      open={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => {
          onClose();
        },
      }}
      onFinish={formSubmit}
    >
      <ProFormText disabled name="nick_name" width="md" label="用户昵称" />

      <ProFormText.Password
        name="new_password"
        width="md"
        label="新密码"
        placeholder="请输入新密码"
        rules={[
          {
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,32}$/,
            message: '密码必须包含字母和数字，长度在8-32位之间',
          },
        ]}
      />

      <ProFormText.Password
        name="confirm_password"
        width="md"
        label="确认密码"
        placeholder="请输入确认密码"
        rules={[
          {
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,32}$/,
            message: '密码必须包含字母和数字，长度在8-32位之间',
          },
        ]}
      />
    </ModalForm>
  );
};

export default UpdatePassword;
