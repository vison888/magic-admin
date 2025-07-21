import { Button, Card,  Tabs, Upload, message } from 'antd';
import { PageContainer,ProDescriptions,ActionType,ModalForm } from '@ant-design/pro-components';
import { history } from '@@/core/history';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from '@umijs/max';
import { productServiceGet, productServiceGetModel, productServiceUpdateModel } from '@/services/thing/productService';
import { THING_PRODUCT_PROTOCOL, THING_PRODUCT_TRANSFORM, THING_PRODUCT_TYPE, convert2ValueEnum } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import ModelPropertyPage from './components/ModelPropertyPage';
import ModelServicePage from './components/ModelServicePage';
import ModelEventPage from './components/ModelEventPage';
import { getModelTabId, setModelTabId } from '@/utils/store';
import { downloadFunction } from '@/utils/utils';
import { DownloadOutlined, EyeOutlined, ImportOutlined } from '@ant-design/icons';
import ReactJson from 'react-json-view';
import DevicePage from '@/pages/Device';

const ShowModelJson: React.FC<{
  info: any;
}> = ({info}) => {
  const [visible, setVisible] = useState(false);
  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);
  return (
      <ModalForm
      width={550}
      title={"json数据"}
      trigger={
        <Button
          icon={<EyeOutlined/>}
          onClick={() => {
            onOpen();
          }}
        >
       查看物模型
        </Button>
      }
      open={visible}
      modalProps={{
        onCancel: () => {
          onClose()
        },
      }}
      onFinish={async ()=> {onClose()}}
    >
    <ReactJson
      src={JSON.parse(info.content as string)}
      name={false}
    />
    </ModalForm>
  
  );
};

const { TabPane } = Tabs;
const IndexPage: React.FC = () => {
  const params = useParams() as { id: string };
  const [productInfo, setProductInfo] = useState<API.protoProduct>({ name: '', id:params.id });
  const [thingDef, setThingDef] = useState<string>("{}");
  const [changeIndex, setChangeIndex] = useState<string>("");

  const transformRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PRODUCT_TRANSFORM),
  );
  const protocolRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PRODUCT_PROTOCOL),
  );
  const productTypeRef = useRef<{ [key: string]: { text: string } }>(
    convert2ValueEnum(THING_PRODUCT_TYPE),
  );

  const queryProduct = async (): Promise<API.protoProduct> => {
    const body: API.protoProductGetReq = {
      id: params.id,
    };
    const res = await productServiceGet(body);
    setProductInfo(res.item!)
    return res.item!;
  };

  const getModelDef = async () => {
    const res = await productServiceGetModel({id:params.id});
    if (res.code === 0) {
      const content = res.item!.thing_def!;
      setThingDef(content)
      return content
    }
    return "{}"
  }

  const download = async () => {
    const filename = productInfo.name + '-model.json';
    const content = getModelDef() as any;
    downloadFunction(JSON.stringify(JSON.parse(content), null, 2), filename);
  };

  const uploadModelDef = async(data:string)=> {
    console.log("uploadModelDef", data)
    const res = await productServiceUpdateModel({id:productInfo.id, thing_def:data})
    if (res.code === 0) {
      message.success("更新成功")
      getModelDef();
      const currentTime = new Date();
      setChangeIndex(currentTime +"")
    }
  };

  useEffect(() => {
    queryProduct();
    getModelDef();
  }, []);

  

  return (
    <PageContainer
      title={productInfo.name}
      onBack={() => history.back()}
    >
    <ProDescriptions
      dataSource={productInfo}
      columns={[
        {
          title: '产品型号',
          dataIndex: 'model',
        },
        {
          title: '产品KEY',
          dataIndex: 'pk',
        },
        {
          title: '产品类型',
          key: 'state',
          dataIndex: 'type',
          valueType: 'select',
          valueEnum: productTypeRef.current,
        },
        {
          title: '传输类型',
          dataIndex: 'transform',
          valueType: 'select',
          valueEnum: transformRef.current,
        },
        {
          title: '协议',
          key: 'text',
          dataIndex: 'protocol',
          valueType: 'select',
          valueEnum: protocolRef.current,
        },
        {
          title: '创建时间',
          key: 'date',
          dataIndex: 'create_time',
          valueType: 'date',
          render: (_, entity: API.protoProduct) => timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS'),
        },
        {
          title: '描述',
          dataIndex: 'desc',
        },
        {
          title: '操作',
          valueType: 'option',
          render: () => [
            <Button icon={<DownloadOutlined/>} onClick={download}>导出物模型</Button>
            ,
            <Upload 
            multiple={false}
            directory={false}
            showUploadList={false}
            type='select'
            accept='.json'
            maxCount={1}
            beforeUpload={(file)=>{
              let reader = new FileReader()
              reader.onload = function () {
                uploadModelDef(reader.result as string)
              }
              reader.readAsText(file as any)
            }}
            >
            <Button icon={<ImportOutlined/>}>导入物模型</Button>
            </Upload>
            ,
            
            <ShowModelJson info={{title:"",content: thingDef }} />,
            ,
          ],
        },
      ]}
    >
    </ProDescriptions>
      <Card>
        <Tabs  
          defaultActiveKey={getModelTabId()}
          onChange={(index)=>{
            setModelTabId(index)
          }}
        >
          <TabPane tab="属性" key="1">
            <ModelPropertyPage changeIndex={changeIndex} productInfo={productInfo} key="ModelPropertyPage" />
          </TabPane>
          <TabPane tab="服务" key="2">
            <ModelServicePage changeIndex={changeIndex} productInfo={productInfo} key="ModelServicePage" />
          </TabPane>
          <TabPane tab="事件" key="3">
            <ModelEventPage changeIndex={changeIndex} productInfo={productInfo} key="ModelEventPage" />
          </TabPane>
        
          
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
