import useTableAdd from '@/hooks/useTableAdd';
import useTableUpdate from '@/hooks/useTableUpdate';
import { productServiceAdd, productServiceUpdate } from '@/services/thing/productService';
import {
  THING_PRODUCT_PROTOCOL,
  THING_PRODUCT_TRANSFORM,
  THING_PRODUCT_TYPE,
  convert2ValueEnum,
} from '@/utils/const';
import {
  ProFormInstance,
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ActionType,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

const FORMITEM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

type AddFuncType = typeof productServiceAdd;
type UpdateFuncType = typeof productServiceUpdate;

const AddOrUpdateProduct: React.FC<{
  flag: string;
  record?: API.protoProduct;
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
      const updateReq: API.protoProductUpdateReq = {
        name: values.name,
        model: values.model,
        thing_def: values.thing_def,
        desc: values.desc,
        id: record?.id as string,
      };
      console.log('updateReq', updateReq);
      const res = await updateHandler<UpdateFuncType, API.protoProductUpdateReq>(
        productServiceUpdate,
        pageRef,
        updateReq,
      );
      code = res.code;
    } else {
      const addReq: API.protoProductAddReq = {
        name: values.name,
        model: values.model,
        transform: values.transform,
        protocol: values.protocol,
        type: values.type,
        thing_def: values.thing_def,
        desc: values.desc,
      };
      console.log('addReq', addReq);
      const res = await addHandler<AddFuncType, API.protoProductAddReq>(
        productServiceAdd,
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
      title={flag === 'update' ? '编辑产品信息' : '添加产品'}
      trigger={
        <Button
          type={flag === 'update' ? 'link' : 'primary'}
          onClick={() => {
            setEditFlag(true);
            onOpen();
          }}
        >
          {flag === 'update' ? '编辑' : '添加产品'}
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
        label="产品名称"
        placeholder="请输入产品名称"
        rules={[
          {
            required: true,
          },
        ]}
      />

      <ProFormText
        name="model"
        width="md"
        label="产品型号"
        placeholder="请输入产品型号"
        rules={[
          {
            required: true,
          },
        ]}
      />

      <ProFormSelect
        disabled={flag === 'update'}
        width="md"
        name="type"
        label="产品类型"
        placeholder="请选择产品类型"
        rules={[
          {
            required: true,
            message: '产品类型是必填项！',
          },
        ]}
        valueEnum={convert2ValueEnum(THING_PRODUCT_TYPE)}
      />

      <ProFormSelect
        disabled={flag === 'update'}
        width="md"
        name="transform"
        label="传输类型"
        placeholder="请选择传输类型"
        rules={[
          {
            required: true,
            message: '传输类型是必填项！',
          },
        ]}
        valueEnum={convert2ValueEnum(THING_PRODUCT_TRANSFORM)}
      />

      <ProFormSelect
        disabled={flag === 'update'}
        width="md"
        name="protocol"
        label="协议"
        placeholder="请选择协议"
        rules={[
          {
            required: true,
            message: '协议是必填项！',
          },
        ]}
        valueEnum={convert2ValueEnum(THING_PRODUCT_PROTOCOL)}
      />

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

export default AddOrUpdateProduct;
