import useTableAdd from '@/hooks/useTableAdd';
import useTableUpdate from '@/hooks/useTableUpdate';
import { notifyConfigServiceAdd, notifyConfigServiceUpdate } from '@/services/thing/notifyConfigService';
import {
  NOTIFY_TYPE,
  NOTIFY_TYPE_EMAIL,
  NOTIFY_TYPE_WEBHOOK,
  convert2ValueEnum,
} from '@/utils/const';
import { decodeNotifyConfig, encodeNotifyConfig } from '@/utils/type';
import {
  ProFormInstance,
  ModalForm,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormDigit,
  ProFormSwitch,
  ActionType,
  ProFormList,
  ProCard,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';
type AddFuncType = typeof notifyConfigServiceAdd;
type UpdateFuncType = typeof notifyConfigServiceUpdate;

const AddOrUpdateNotifyConfig: React.FC<{
  flag: string;
  record?: API.protoNotifyConfig;
  pageRef: React.MutableRefObject<ActionType | undefined>;
}> = ({ flag, record, pageRef }) => {
  const { addHandler } = useTableAdd();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  const [notifyType, setNotifyType] = useState<string>("");
  const editFormRef = useRef<ProFormInstance>();
  const onOpen = () => {setVisible(true)};
  const onClose = () => setVisible(false);

  const formSubmit = async (values: any) => {
    let code = -1;
    const reqData = encodeNotifyConfig(values) 
    if (flag === 'update') {
      reqData.id = record?.id as string
      console.log('updateReq', reqData);
      const res = await updateHandler<UpdateFuncType, API.protoNotifyConfigUpdateReq>(
        notifyConfigServiceUpdate,
        pageRef,
        reqData,
      );
      code = res.code;
    } else {
      console.log('addReq', reqData);
      const res = await addHandler<AddFuncType, API.protoNotifyConfigAddReq>(
        notifyConfigServiceAdd,
        pageRef,
        reqData,
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
    let defaultValue = NOTIFY_TYPE_EMAIL
    if (record !== undefined) {
      defaultValue = record?.notify_type!
      record = decodeNotifyConfig(record)
    } else {
      record = {notify_type:defaultValue}
    }
    setNotifyType(defaultValue)
    editFormRef.current?.setFieldValue("notify_type", defaultValue)
  }, [editFlag, visible, record]);

  return (
    <ModalForm
      initialValues={record}
      width={800}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑通知配置' : '添加通知配置'}
      trigger={
        <Button
          type={flag === 'update' ? 'link' : 'primary'}
          onClick={() => {
            setEditFlag(true);
            onOpen();
          }}
        >
          {flag === 'update' ? '编辑' : '添加通知配置'}
        </Button>
      }
      open={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel: onClose,
      }}
      submitTimeout={2000}
      layout={LAYOUT_TYPE_HORIZONTAL}
      onFinish={formSubmit}
    >
      <ProFormText
        name="name"
        width="md"
        label="名称"
        placeholder="请输入名称"
        rules={[
          {
            required: true,
          },
        ]}
      />

      <ProFormSelect
        disabled={flag === 'update'}
        width="md"
        name="notify_type"
        label="类型"
        placeholder="请选择类型"
        onChange={(value:any)=>{
          setNotifyType(value)
        }}
        rules={[
          {
            required: true,
            message: '类型是必填项！',
          },
        ]}
        valueEnum={convert2ValueEnum(NOTIFY_TYPE)}
      />

      {notifyType === NOTIFY_TYPE_EMAIL && (
        <>
        <ProForm.Group>
        <ProFormText
          name="email_addr"
          label="地址"
          placeholder="请输入地址"
          width="sm"
          rules={[
            {
              required: true,
            },
          ]}
          />
          
          <ProFormDigit
          name="email_port"
          width="sm"
          label="端口"
          placeholder="请输入端口"
          rules={[
            {
              required: true,
            },
          ]}
          />

          <ProFormSwitch 
              name="email_ssl"
              width="sm"
              label="ssl"
              fieldProps={{
                onChange:(checked:boolean)=>{
                  console.log("checked,", checked)
                }
              }}
          />
          </ProForm.Group>

        <ProFormText
          name="email_sender"
          label="发送者"
          placeholder="请输入发送者"
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
          />

        <ProFormText
          name="email_password"
          label="密码"
          placeholder="请输入密码"
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
          />
          </>
      )}


      {notifyType === NOTIFY_TYPE_WEBHOOK && (
        <>
        <ProFormText
          name="webhook_url"
          label="地址"
          placeholder="请输入地址"
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
          />
          
          <ProFormList 
            name="webhook_headers"
            label="请求头"
            itemRender={({ listDom, action }, { record }) => {
                return (
                    <ProCard extra={action} style={{ border: '1px solid blue'}}>{listDom}</ProCard>
                );
            }}
        >
        {(f, index, action) => {
            return (
             <>
             <ProForm.Group>
              <ProFormText
              name="key"
              label="key"
              placeholder="请输入key"
              width="sm"
              rules={[
                {
                  required: true,
                },
              ]}
              />

            <ProFormText
              name="value"
              label="value"
              placeholder="请输入value"
              width="sm"
              rules={[
                {
                  required: true,
                },
              ]}
              />
              </ProForm.Group>
             </>
            );
        }}
      </ProFormList>
      </>
      )}

      <ProFormTextArea
        bordered
        name="desc"
        width="md"
        label="描述"
        placeholder="请输入描述"
        fieldProps={{
          autoSize: true,
        }}
      />
    </ModalForm>
  );
};

export default AddOrUpdateNotifyConfig;
