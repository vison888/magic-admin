
import {  Card,  Tabs,  } from 'antd';
import React from 'react';
import DeviceDebugPageProperty from './DeviceDebugPageProperty';
import DeviceDebugPageService from './DeviceDebugPageService';
import DeviceDebugPageCommon from './DeviceDebugPageCommon';

const { TabPane } = Tabs;
const DeviceDebugPage: React.FC<{productInfo: API.protoProduct;deviceInfo: API.protoDevice;}> = ({productInfo, deviceInfo}) => {
    return (
    <Card>
        <Tabs>
            <TabPane tab="属性更新" key="1">
                <DeviceDebugPageProperty productInfo={productInfo} deviceInfo={deviceInfo} key="DeviceDebugPageProperty" />
            </TabPane>
            <TabPane tab="服务调用" key="2">
                <DeviceDebugPageService productInfo={productInfo} deviceInfo={deviceInfo} key="DeviceDebugPageService" />
            </TabPane>
            <TabPane tab="通用" key="3">
                <DeviceDebugPageCommon productInfo={productInfo} deviceInfo={deviceInfo} key="DeviceDebugPageCommon" />
            </TabPane>
        </Tabs>
    </Card>
    );
};

export default DeviceDebugPage;