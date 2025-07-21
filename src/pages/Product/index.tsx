import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useEffect, useRef } from 'react';
import { productServiceDel, productServicePage } from '@/services/thing/productService';
import useTableDelete from '@/hooks/useTableDelete';
import { timestampToDateStr } from '@/utils/date';
import { history } from '@@/core/history';
import {
  THING_PRODUCT_PROTOCOL,
  THING_PRODUCT_TRANSFORM,
  THING_PRODUCT_TYPE,
  convert2ValueEnum,
} from '@/utils/const';
import AddOrUpdateProduct from './components/AddOrUpdateProduct';

const ProductPage: React.FC = () => {
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();
  const transformRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PRODUCT_TRANSFORM),
  );
  const protocolRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PRODUCT_PROTOCOL),
  );
  const productTypeRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PRODUCT_TYPE),
  );

  // 删除操作
  const showDeleteConfirm = (record: API.protoProduct) => {
    const body: API.protoProductDelReq = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoProductDelReq>(productServiceDel, pageRef, {
      title: '是否删除当前产品',
      content: `所选产品: ${record?.name ?? '未知产品'},  删除后无法恢复，请确认`,
      body,
    });
  };

  /**
   * 查询数据
   * */
  const queryPage = async (params: any): Promise<{ data?: API.protoProduct[]; total?: number }> => {
    const body: API.protoProductPageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      name: params.name,
      model: params.model,
      pk: params.pk,
      type: params.type,
    };
    const res = await productServicePage(body);
    return {
      data: res.items,
      total: res.total,
    };
  };

  const columns: ProColumns<API.protoProduct>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '产品名称',
      dataIndex: 'name',
    },
    {
      title: '产品型号',
      dataIndex: 'model',
    },
    {
      title: '产品KEY',
      dataIndex: 'pk',
    },
    {
      title: '传输类型',
      dataIndex: 'transform',
      search: false,
      valueEnum: transformRef.current,
    },
    {
      title: '协议',
      dataIndex: 'protocol',
      search: false,
      valueEnum: protocolRef.current,
    },
    {
      title: '产品类型',
      dataIndex: 'type',
      valueEnum: productTypeRef.current,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      render: (_, entity: API.protoProduct) =>
        timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS'),
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: API.protoProduct) => (
        <>
           <a
            key="show"
            onClick={() => {
              history.push('/product/detail/' + record.id);
            }}
          >
            查看
          </a>
          <AddOrUpdateProduct flag="update" key={record.id} record={record} pageRef={pageRef} />
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
    },
  ];

  return (
    <PageContainer>
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
        toolBarRender={() => [
          <AddOrUpdateProduct flag="create" pageRef={pageRef} key="createProduct" />,
        ]}
      />
    </PageContainer>
  );
};

export default ProductPage;
