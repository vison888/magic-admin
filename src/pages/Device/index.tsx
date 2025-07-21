import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useEffect, useRef } from 'react';
import { deviceServiceDel, deviceServicePage } from '@/services/thing/deviceService';
import useTableDelete from '@/hooks/useTableDelete';
import { timestampToDateStr } from '@/utils/date';
import AddOrUpdateDevice from './components/AddOrUpdateDevice';
import useGetSelectProducts from '@/hooks/useGetSelectProductOption';
import { THING_PRODUCT_TYPE, THING_PRODUCT_TYPE_GATEWAY, convert2ValueEnum } from '@/utils/const';
import { history } from '@@/core/history';
import { setDeviceDetailTabId } from '@/utils/store';

const DevicePage: React.FC = () => {
  const { deleteHandler } = useTableDelete();
  const pageRef = useRef<ActionType>();
  const { selectProducts, querySelectProducts } = useGetSelectProducts();
  const productTypeRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PRODUCT_TYPE),
  );
  // 删除操作
  const showDeleteConfirm = (record: API.protoDevice) => {
    const body: API.protoDeviceDelReq = {
      id: record.id ?? '',
    };
    deleteHandler<API.protoDeviceDelReq>(deviceServiceDel, pageRef, {
      title: '是否删除当前设备',
      content: `所选设备: ${record?.name ?? '未知设备'},  删除后无法恢复，请确认`,
      body,
    });
  };

  /**
   * 查询数据
   * */
  const queryPage = async (params: any): Promise<{ data?: API.protoDevice[]; total?: number }> => {
    const body: API.protoDevicePageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      name: params.name,
      sn: params.sn,
      pk: params.pk,
    };
    const res = await deviceServicePage(body);
    return {
      data: res.items,
      total: res.total,
    };
  };

  const columns: ProColumns<API.protoDevice>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '设备sn',
      dataIndex: 'sn',
    },
    {
      title: '设备类型',
      dataIndex: 'product_type',
      valueEnum: productTypeRef.current,
    },
    {
      title: '密钥',
      dataIndex: 'secret',
      search: false,
    },
    {
      title: '产品',
      dataIndex: 'pk',
      valueType: "select",
      valueEnum:convert2ValueEnum(selectProducts.list),
    },
    {
      title: '在线状态',
      dataIndex: 'online',
      search:false,
      renderText(text, record, index, action) {
        return <>{record.online?"在线":"离线"}</>
      },
    },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'create_time',
      valueType: 'dateTime',
      render: (_, entity: API.protoDevice) =>
        timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS'),
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: API.protoDevice) => (
        <>
          {record.product_type === THING_PRODUCT_TYPE_GATEWAY && (<Button
            type="link"
            onClick={() => {
              setDeviceDetailTabId("7")
              history.push('/device/detail/' + record.id);
            }}
            style={{ paddingRight: 10 }}
          >
          子设备
          </Button>)}
          
          <Button
            type="link"
            onClick={() => {
              setDeviceDetailTabId("1")
              history.push('/device/detail/' + record.id);
            }}
            style={{ paddingRight: 10 }}
          >
          查看
          </Button>

          <AddOrUpdateDevice flag="update" record={record} pageRef={pageRef} selectOptions={selectProducts.list} key="updateDevice" />
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


  useEffect(() => {
    querySelectProducts();
  }, []);

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        columns={columns}
        actionRef={pageRef}
        bordered
        request={queryPage}
        search={{
          span: 6,
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
          <AddOrUpdateDevice flag="create" pageRef={pageRef} selectOptions={selectProducts.list} key="createDevice" />,
        ]}
      />
    </PageContainer>
  );
};

export default DevicePage;
