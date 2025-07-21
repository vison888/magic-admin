import { ClockCircleOutlined } from '@ant-design/icons';
import { ActionType} from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { useRef, useState, useEffect } from 'react';
import { deviceServiceProperties } from '@/services/thing/deviceService';
import { timestampToDateStr } from '@/utils/date';
import DeviceStatusPagePropertyDetail from './DeviceStatusPagePropertyDetail';

const DeviceStatusPageProperty: React.FC<{
  parentActiveKey:string;
  activeKey:string;
  deviceInfo: API.protoDevice;
}> = ({parentActiveKey, activeKey, deviceInfo}) => {
  const actionRef = useRef<ActionType>();
  const [propertysData, setPropertysData] = useState<any[]>([] as any[]);
  const [timerId, setTimerId] = useState<any>(null);

  const queryList = async (): Promise<any[]> => {
    const param : API.protoDevicePropertiesReq = {
        id: deviceInfo.id,
    };
    const res = await deviceServiceProperties(param);
    if (res.code !== 0) {
      return [];
    }

    const newList = res.items!.map((value: any)=>{
      value.avatar = "/xingzhuang.svg"
      return value
    })

    setPropertysData(newList)
    return newList;
  };

  useEffect(() => {
    if (parentActiveKey === '2' && activeKey === '1') {
      queryList()
    } 
  }, []);

  useEffect(() => {
    console.log("parentActiveKey", parentActiveKey, "activeKey", activeKey)
    if (parentActiveKey === '2' && activeKey === '1') {
      const id:any = setInterval(() => {
          queryList()
      }, 5000);
      setTimerId(id);
    } else {
      if (timerId !== null) {
        console.log("clearInterval")
        clearInterval(timerId);
        setTimerId(null)
      }
    }
  }, [parentActiveKey, activeKey]);

  return (
    <ProList<any>
      actionRef={actionRef}
      pagination={false}
      rowSelection={false}
      grid={{ gutter: 16, column: 3,}}
      onItem={(record: any) => {
        return {
          onClick: () => {
            console.log(record);
          },
        };
      }}
      metas={{
        title: {dataIndex:"name"},
        subTitle: {
          render(dom, entity, index, action, schema) {
              return <>
              <Tag color="#00BFFF">{entity.code}</Tag>
              <Tag color="#5BD8A6">{entity.type}</Tag>
              </>
          },
        },
        type: {},
        avatar: {dataIndex:"avatar"},
        content: {
          render(dom, entity, index, action, schema) {
            return <div>
              <div style={{height:60,}}>
                <div style={{fontWeight:'bold'}}>{entity.value === ""?"-":entity.value}</div>
              </div>
              <div>
                <ClockCircleOutlined/><span style={{marginLeft:'5px'}}>更新时间:
                {timestampToDateStr(Number(entity.update_time), 'YYYY-MM-DD HH:mm:ss.SSS')} 
                </span>
              </div>
              </div>
        },
        },
        actions: {
          render(dom, entity, index, action, schema) {
            return <DeviceStatusPagePropertyDetail deviceInfo={deviceInfo} record={entity}></DeviceStatusPagePropertyDetail>
          },
        },
      }}
      dataSource={propertysData}
    />
  );
};

export default DeviceStatusPageProperty;