import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useRef } from 'react';
import {  deviceServicePage } from '@/services/thing/deviceService';
import { timestampToDateStr } from '@/utils/date';
import { Button } from 'antd';
import { setDeviceDetailTabId } from '@/utils/store';
import { history } from '@@/core/history';


const DeviceChilePage: React.FC<{
  activeKey:string;
  deviceId: string;
}> = ({ activeKey, deviceId}) => {
  const pageRef = useRef<ActionType>();
  
  useEffect(() => {
    if (activeKey === '7') {
      pageRef.current?.reload()
    }
  }, [activeKey]);

  /**
   * 查询数据
   * */
  const queryPage = async (params: any): Promise<{ data?: API.protoDevice[]; total?: number }> => {
    const body: API.protoDevicePageReq = {
      page_index: params.current,
      page_size: params.pageSize,
      name: params.name,
      sn: params.sn,
      p_id:deviceId,
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
      title: '密钥',
      dataIndex: 'secret',
      search: false,
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
    },{
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: API.protoDevice) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setDeviceDetailTabId("1")
              location.href = '/device/detail/' + record.id;
            }}
            style={{ paddingRight: 10 }}
          >
          查看
          </Button>

        </>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
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
        toolBarRender={false}
      />
    </PageContainer>
  );
};

export default DeviceChilePage;
