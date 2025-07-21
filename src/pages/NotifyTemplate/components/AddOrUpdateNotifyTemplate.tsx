import useTableAdd from '@/hooks/useTableAdd';
import useTableUpdate from '@/hooks/useTableUpdate';
import { notifyTemplateServiceAdd, notifyTemplateServiceUpdate } from '@/services/thing/notifyTemplateService';
import {
  NOTIFY_TYPE,
  NOTIFY_TYPE_EMAIL,
  NOTIFY_TYPE_WEBHOOK,
  convert2ValueEnum,
} from '@/utils/const';
import { decodeNotifyTemplate, encodeNotifyTemplate } from '@/utils/type';
import {
  ProFormInstance,
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormSwitch,
  ActionType,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';
type AddFuncType = typeof notifyTemplateServiceAdd;
type UpdateFuncType = typeof notifyTemplateServiceUpdate;

const AddOrUpdateNotifyTemplate: React.FC<{
  selectNotifyConfigOptions: { value: string; label: string, info: API.protoNotifyConfig }[];
  flag: string;
  record?: API.protoNotifyTemplate;
  pageRef: React.MutableRefObject<ActionType | undefined>;
}> = ({ selectNotifyConfigOptions, flag, record, pageRef }) => {
  const { addHandler } = useTableAdd();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  const [notifyType, setNotifyType] = useState<string>("");
  const [isCustion, setIsCustion] = useState<boolean>(false);
  const [configSelect, setConfigSelect] = useState<{[key: string]: { text: string }}>({});
  const editFormRef = useRef<ProFormInstance>();
  const onOpen = () => {setVisible(true)};
  const onClose = () => setVisible(false);

  const formSubmit = async (values: any) => {
    let code = -1;
    const reqData = encodeNotifyTemplate(values) 
    if (flag === 'update') {
      reqData.id = record?.id as string
      console.log('updateReq', reqData);
      const res = await updateHandler<UpdateFuncType, API.protoNotifyTemplateUpdateReq>(
        notifyTemplateServiceUpdate,
        pageRef,
        reqData,
      );
      code = res.code;
    } else {
      console.log('addReq', reqData);
      const res = await addHandler<AddFuncType, API.protoNotifyTemplateAddReq>(
        notifyTemplateServiceAdd,
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

  const reloadConfigSelect = () => {
      const dataResult:{[key: string]: { text: string }} = {}
      if (selectNotifyConfigOptions === undefined) {
        setConfigSelect(dataResult)
        return
      }
      for(const index in  selectNotifyConfigOptions) {
        const item = selectNotifyConfigOptions[index] as any
        if(item.info.notify_type === notifyType) {
          dataResult[item.value] = {text:item.label}
        }
      }
      setConfigSelect(dataResult)
  }

  useEffect(() => {
    editFormRef.current?.setFieldsValue(record);
    let defaultValue = NOTIFY_TYPE_EMAIL
    if (record !== undefined) {
      defaultValue = record?.notify_type!
      record = decodeNotifyTemplate(record)
      setIsCustion((record as any).webhook_is_custom as boolean)
    } else {
      record = {notify_type:defaultValue}
    }
    setNotifyType(defaultValue)
    editFormRef.current?.setFieldValue("notify_type", defaultValue)
    reloadConfigSelect()
  }, [editFlag, visible, record]);

  useMemo(() =>{
    reloadConfigSelect()
  },[notifyType])

  return (
    <ModalForm
      initialValues={record}
      width={800}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑通知模板' : '添加通知模板'}
      trigger={
        <Button
          type={flag === 'update' ? 'link' : 'primary'}
          onClick={() => {
            setEditFlag(true);
            onOpen();
          }}
        >
          {flag === 'update' ? '编辑' : '添加通知模板'}
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
          editFormRef.current?.setFieldValue("notify_config_id",undefined)
        }}
        rules={[
          {
            required: true,
            message: '类型是必填项！',
          },
        ]}
        valueEnum={convert2ValueEnum(NOTIFY_TYPE)}
      />

      <ProFormSelect
        width="md"
        name="notify_config_id"
        label="配置"
        placeholder="请选择配置"
        valueEnum={configSelect}
        rules={[
          {
            required: true,
            message: '配置是必填项！',
          },
        ]}
      />

      {notifyType === NOTIFY_TYPE_EMAIL && (
        <>
        <ProFormText
          name="email_title"
          label="标题"
          placeholder="请输入标题"
          width="sm"
          rules={[
            {
              required: true,
            },
          ]}
          />
         
        <ProFormText
          name="email_receivers"
          label="接收者"
          placeholder="请输入接收者"
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
          />

            
        <ProFormTextArea
          name="email_content"
          label="内容"
          placeholder="请输入内容"
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
          fieldProps={{
            autoSize: true,
          }}
          />
          </>
      )}

      {notifyType === NOTIFY_TYPE_WEBHOOK && (
        <>
         <ProFormSwitch 
              name="webhook_is_custom"
              label="是否自定义"
              width="md"
              fieldProps={{
                onChange:(checked:boolean)=>{
                  setIsCustion(checked)
                }
              }}
          />

        <ProFormTextArea
          bordered
          disabled={!isCustion}
          name="webhook_content"
          width="md"
          label="内容"
          placeholder="请输入内容"
          fieldProps={{
            autoSize: true,
          }}
        />
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

export default AddOrUpdateNotifyTemplate;
