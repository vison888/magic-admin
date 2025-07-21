import { CopyOutlined, DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Alert, Button, Input, message, Modal } from 'antd';
import { productModelServiceDel, productModelServicePage } from '@/services/thing/productModelService';
import { MutableRefObject, useMemo, useRef } from 'react';
import { THING_DATA_TYPE, THING_DATA_TYPE_BOOL, THING_DATA_TYPE_FLOAT, THING_DATA_TYPE_INT, THING_EVENT_TYPE, THING_MODEL_TYPE_PROPERTY, THING_MODEL_TYPE_SERVICE, THING_PROPERTY_MODE, THING_SERVICE_DIR_TYPE, convert2ValueEnum } from '@/utils/const';
import useTableDelete from '@/hooks/useTableDelete';
import { history } from '@@/core/history';

const ModelServicePage: React.FC<{
  productInfo: API.protoProduct;
  changeIndex:string;
  readonly?:boolean;
}> = ({productInfo, changeIndex, readonly = false}) => {
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();
  const serviceDirTypeMap = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_SERVICE_DIR_TYPE),
  );
  const thingModeMap = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PROPERTY_MODE),
  );

  const getDefinition = (record: API.protoProductModel) => {
    try {
      return JSON.parse(record.model_def!);
    } catch (e) {
      console.error(e);
      message.error('JSON 解析错误');
    }
  };

  // 删除操作
  const showDeleteConfirm = (record: API.protoProductModel) => {
    const body: API.protoProductModelDelReq = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoProductModelDelReq>(productModelServiceDel, pageRef, {
      title: '是否删除当前属性',
      content: `所选属性: ${record?.name ?? '未知属性'},  删除后无法恢复，请确认`,
      body,
    });
  };

  const columns: ProColumns<API.protoProductModel>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '标识',
      dataIndex: 'code',
    },
    {
      title: '调用方向',
      dataIndex:'model_def',
      search:false,
      render: (_: any, entity: API.protoProductModel) => {
        const dir = getDefinition(entity).dir as string;
        const info = serviceDirTypeMap.current[dir]
        return info === undefined? '-':info.text;
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      search:false,
    },
  ];

  if(readonly) {
    columns.push({
      title: '物模型',
      dataIndex: 'model_def',
      search:false,
      width:350,
      ellipsis:true,
    })
  } else {
    columns.push({
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: API.protoProduct) => (
        <>
         <a
            key="updateModelService"
            onClick={() => {
              history.push('/product/detail/' + productInfo.id + '/service/'+record.id);
            }}
          >
            编辑
          </a>
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
    })
  }
  const queryPage = async (params: any): Promise<{ data?: API.protoProductModel[]; total?: number }> => {
    const param : API.protoProductModelPageReq = {
        page_index: params.current,
        page_size: params.pageSize,
        name: "",
        code: "",
        type: THING_MODEL_TYPE_SERVICE,
        product_id: productInfo?.id,
    };
    const res = await productModelServicePage(param);
    if (res.code !== 0) {
      return {
        data: [],
        total: 0,
      };
    }
    return {
      data: res.items,
      total: res.total,
    };
  
  };

  const form = useMemo(() => {
    pageRef.current?.reload()
  }, [changeIndex]);

  return (
    <ProTable
        rowKey="id"
        columns={columns}
        actionRef={pageRef}
        bordered
        request={queryPage}
        search={{
          span: 5,
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
        toolBarRender={readonly?false:() => {
          return [
            <Button
            type={'primary'}
            onClick={() => {
              history.push('/product/detail/' + productInfo.id + '/service/0');
            }}
            >
            添加服务
          </Button>
          ]
        }}
      />
  );
};

export default ModelServicePage;