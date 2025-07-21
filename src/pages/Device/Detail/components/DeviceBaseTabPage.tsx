
import { Button, message } from 'antd';
import { ProDescriptions,ActionType } from '@ant-design/pro-components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { timestampToDateStr } from '@/utils/date';
import { CopyOutlined} from '@ant-design/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { deviceServiceProperties } from '@/services/thing/deviceService';

const DeviceBaseTabPage: React.FC<{activeKey:string, deviceInfo: API.protoDevice;}> = ({activeKey, deviceInfo}) => {
   const formRef = useRef<ActionType>();
   const [onlien, setOnlien] = useState<string>("-");

    const copyText = useMemo(() => {
      return deviceInfo
        ? JSON.stringify(deviceInfo)
        : '';
    }, [deviceInfo]);

    const queryOnline = async () => {
      const param : API.protoDevicePropertiesReq = {
          id: deviceInfo.id,
          codes:["online"],
      };
      const res = await deviceServiceProperties(param);
      if (res.code !== 0) {
        return "-";
      }
      let onlienText = "离线"
      if (res.items![0].value == "true") {
        onlienText = "在线"
      }
      return onlienText
    }

    useEffect(()=>{
      if(activeKey === '1') {
        queryOnline().then((online:any)=>{
          setOnlien(online)
        })
      }
    },[activeKey])

    return (
        <ProDescriptions
        actionRef={formRef}
        title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>设备基础信息</div>
              <CopyToClipboard
                text={copyText}
                onCopy={() => {
                  message.success('复制成功');
                }}
              >
              <Button size='small' style={{marginLeft:'20px'}} icon={<CopyOutlined/>} type="primary">一键复制</Button>
              </CopyToClipboard>
            </div>
          }
        dataSource={deviceInfo}
        columns={[
          {
            title: '设备名称',
            dataIndex: 'name',
          },
          {
            title: '设备sn',
            dataIndex: 'sn',
            ellipsis: true,
            copyable: true,
          },
          {
            title: '设备密钥',
            dataIndex: 'secret',
            ellipsis: true,
            copyable: true,
          },
          {
            title: '在线状态',
            dataIndex: 'online',
            renderText(text, record, index, action) {
                return <>{onlien}</> 
            },
          },
          {
            title: '创建时间',
            dataIndex: 'create_time',
            valueType: 'date',
            render: (_, entity: any) => timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS'),
          },
          {
            title: '描述',
            dataIndex: 'desc',
          },
        ]}
      >
      </ProDescriptions>
    );
};

export default DeviceBaseTabPage;