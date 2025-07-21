
import { Button, Card,  Tabs, Upload, message } from 'antd';
import { PageContainer,ProDescriptions,ActionType,ModalForm } from '@ant-design/pro-components';
import { history } from '@@/core/history';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from '@umijs/max';
import { productServiceGet, productServiceGetModel, productServiceUpdateModel } from '@/services/thing/productService';
import { THING_PRODUCT_PROTOCOL, THING_PRODUCT_TRANSFORM, THING_PRODUCT_TYPE, convert2ValueEnum } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { getModelTabId, setModelTabId } from '@/utils/store';
import { downloadFunction } from '@/utils/utils';
import { DownloadOutlined, EyeOutlined, ImportOutlined } from '@ant-design/icons';
import ReactJson from 'react-json-view';
import { deviceServiceGet } from '@/services/thing/deviceService';
import ModelPropertyPage from '@/pages/Product/detail/components/ModelPropertyPage';
import ModelServicePage from '@/pages/Product/detail/components/ModelServicePage';
import ModelEventPage from '@/pages/Product/detail/components/ModelEventPage';

const { TabPane } = Tabs;
const ModelTabPage: React.FC<{productInfo: API.protoProduct;}> = ({productInfo}) => {
    return (
        <Card>
        <Tabs>
            <TabPane tab="属性" key="1">
                <ModelPropertyPage changeIndex="" readonly={true} productInfo={productInfo} key="ModelPropertyPage" />
            </TabPane>
            <TabPane tab="服务" key="2">
                <ModelServicePage changeIndex="" readonly={true} productInfo={productInfo} key="ModelServicePage" />
            </TabPane>
            <TabPane tab="事件" key="3">
                <ModelEventPage changeIndex="" readonly={true} productInfo={productInfo} key="ModelEventPage" />
            </TabPane>
        </Tabs>
        </Card>
    );
};

export default ModelTabPage;