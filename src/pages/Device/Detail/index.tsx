import {  Card,  Tabs,  } from 'antd';
import { PageContainer,ProDescriptions } from '@ant-design/pro-components';
import { history } from '@@/core/history';
import React, { useEffect,  useRef, useState } from 'react';
import { useParams } from '@umijs/max';
import { productServiceGet } from '@/services/thing/productService';
import { THING_PRODUCT_PROTOCOL, THING_PRODUCT_TRANSFORM, THING_PRODUCT_TYPE, THING_PRODUCT_TYPE_GATEWAY, convert2ValueEnum } from '@/utils/const';
import { deviceServiceGet } from '@/services/thing/deviceService';
import ModelTabPage from './components/ModelTabPage';
import DeviceBaseTabPage from './components/DeviceBaseTabPage';
import DeviceStatusPage from './components/DeviceStatusPage';
import DeviceLogPage from './components/DeviceLogPage';
import DeviceDebugPage from './components/DeviceDebugPage';
import DeviceSimulationPage from './components/DeviceSimulationPage';
import DeviceChilePage from './components/DeviceChilePage';
import { getDeviceDetailTabId, setDeviceDetailTabId } from '@/utils/store';

const { TabPane } = Tabs;
const IndexPage: React.FC = () => {
  const params = useParams() as { id: string };
  const [productInfo, setProductInfo] = useState<API.protoProduct>({});
  const [deviceInfo, setDeviceInfo] = useState<API.protoDevice>({ name: '', id:params.id });
  const [mergeInfo, setMergeInfo] = useState<any>({} as any);
  const transformRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PRODUCT_TRANSFORM),
  );
  const protocolRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PRODUCT_PROTOCOL),
  );
  const productTypeRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PRODUCT_TYPE),
  );

  const [activeKey, setActiveKey] = useState<string>('1');
  const onChange = (key: string) => {
    console.log("onChange key", key)
    setDeviceDetailTabId(key)
    setActiveKey(key)
  };

  const queryDeviceAndProduct = async () => {
    const body: API.protoDeviceGetReq = {
        id: params.id,
    };
    const res = await deviceServiceGet(body);
    if (res.code !== 0) {
        return
    }

    const body1: API.protoProductGetReq = {
      pk: res.item!.pk,
    };
    const res1 = await productServiceGet(body1);
    if (res1.code !== 0) {
        return
    }
    setDeviceInfo(res.item!)
    setProductInfo(res1.item!)

    const info = {...res.item!}  as any
    info.product_name = res1.item!.name
    info.product_model = res1.item!.model
    info.product_pk = res1.item!.pk
    info.product_transform = res1.item!.transform
    info.product_protocol = res1.item!.protocol
    info.product_type = res1.item!.type

    setMergeInfo(info)

    setActiveKey(getDeviceDetailTabId())
  };

  useEffect(() => {
    queryDeviceAndProduct();
  }, []);

  return (
    <PageContainer
      title={mergeInfo.name}
      onBack={() => history.back()}
    >
    <ProDescriptions
      column={5}
      dataSource={mergeInfo}
      columns={[
        {
          title: '产品名称',
          dataIndex: 'product_name',
        },
        {
          title: '产品KEY',
          dataIndex: 'pk',
          ellipsis: true,
          copyable: true,
        },
        {
          title: '客户端id',
          dataIndex: 'pk',
          ellipsis: true,
          copyable: true,
          renderText(text, record, index, action) {
              return record.pk + "|" + record.sn
          },
        },
        {
          title: '产品型号',
          dataIndex: 'product_model',
        },
        {
          title: '产品类型',
          dataIndex: 'product_type',
          valueType: 'select',
          valueEnum: productTypeRef.current,
        },
        {
          title: '传输类型',
          dataIndex: 'product_transform',
          valueType: 'select',
          valueEnum: transformRef.current,
        },
        {
          title: '协议',
          dataIndex: 'product_protocol',
          valueType: 'select',
          valueEnum: protocolRef.current,
        },
      ]}
    >

    </ProDescriptions>
      <Card>
        <Tabs  
          activeKey={activeKey}
          onChange={onChange}
        >
        <TabPane tab="基础信息" key="1">
            <DeviceBaseTabPage activeKey={activeKey} deviceInfo={deviceInfo} />,
        </TabPane>
        <TabPane tab="设备状态" key="2">
            <DeviceStatusPage parentActiveKey={activeKey} deviceInfo={deviceInfo} />,
        </TabPane>
        <TabPane tab="物模型" key="3">
            <ModelTabPage productInfo={productInfo} />,
        </TabPane>
        
        <TabPane tab="设备调试" key="4">
          <DeviceDebugPage productInfo={productInfo} deviceInfo={deviceInfo}></DeviceDebugPage>
        </TabPane>
        <TabPane tab="真机模拟" key="5">
        <DeviceSimulationPage activeKey={activeKey} productInfo={productInfo} deviceInfo={deviceInfo}></DeviceSimulationPage>
        </TabPane>
        <TabPane tab="交互日志" key="6">
          <DeviceLogPage activeKey={activeKey} productInfo={productInfo} deviceInfo={deviceInfo}></DeviceLogPage>
        </TabPane>
        {(productInfo.type === THING_PRODUCT_TYPE_GATEWAY) && (<TabPane tab="子设备" key="7">
          <DeviceChilePage activeKey={activeKey} deviceId={params.id}></DeviceChilePage>
        </TabPane>
        )}
        </Tabs>
        
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
