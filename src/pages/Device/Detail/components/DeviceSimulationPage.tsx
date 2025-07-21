import {  timestampToDateStr } from '@/utils/date';

import {
  ProFormSelect,
  ProFormText,
  ProForm,
  ProTable,
  ActionType,
} from '@ant-design/pro-components';
import { Button, Col,  Row, message, FormInstance } from 'antd';
import { useEffect, useRef, useState } from 'react';

const DeviceSimulationPage: React.FC<{
    activeKey:string;
    productInfo: API.protoProduct;
    deviceInfo: API.protoDevice;
}> = ({ activeKey,productInfo, deviceInfo}) => {
    const connectFormRef = useRef<FormInstance>();
    const subFormRef = useRef<FormInstance>();
    const pubFormRef = useRef<FormInstance>();
    const subPageRef = useRef<ActionType>();
    const [client, setClient] = useState<any>(null)
    const [subList, setSubList] = useState<any[]>([])
    const [subMsgList, setSubMsgList] = useState<any[]>([])
    const [pubMsgList, setPubMsgList] = useState<any[]>([])
    const subMsgListRef = useRef<any[]>([])
    const [connectStatus, setConnectStatus] = useState('DisConnect')

    useEffect(() => {
        if (connectStatus === 'Connected') {
            console.log("disconnect")
            OnDisConnect()
        }
    }, [activeKey]);

    const OnConnect = () => {
        const ok = connectFormRef.current?.validateFields()
        ok?.then(()=>{
            setSubList([])
            const values = connectFormRef.current?.getFieldsValue()
            const { path, host, client_id, port, username, password } = values
            const url = `ws://${host}:${port}${path}`
            const options = {
                clientId:client_id,
                username,
                password,
                clean: true,
                reconnectPeriod: 1000, // ms
                connectTimeout: 30 * 1000, // ms
            }
            console.log("url", url)
            console.log("options", options)
            setConnectStatus('Connecting')
            setClient(mqtt.connect(url, options))
        })
    }

    const OnDisConnect = () => {
        setSubList([])
        setSubMsgList([])
        setPubMsgList([])
        subMsgListRef.current=  []
        mqttDisconnect()
    }

    const OnSub = () => {
        const ok = subFormRef.current?.validateFields()
        ok?.then(()=>{
            const values = subFormRef.current?.getFieldsValue()
            console.log("values,", values)
            for(const index in subList) {
                console.log("subList[index].topic === values.topic", subList[index].topic, values.topic)
                if (subList[index].topic === values.topic) {
                    message.error("topic已经存在订阅列表")
                    return
                }
            }
            mqttSub({topic:values.topic, qos:values.qos})
        })
    }

    const OnPub = () => {
        const ok = pubFormRef.current?.validateFields()
        ok?.then(()=>{
            const values = pubFormRef.current?.getFieldsValue()
            console.log("values,", values)
            mqttPublish({topic:values.topic, qos:values.qos, payload:values.payload})
        })
    }
    
    useEffect(() => {
        if (client) {
        // https://github.com/mqttjs/MQTT.js#event-connect
        client.on('connect', () => {
            setConnectStatus('Connected')
            console.log('connection successful')
            message.success("连接成功")
        })

        // https://github.com/mqttjs/MQTT.js#event-error
        client.on('error', (err:any) => {
            console.error('Connection error: ', err)
            client.end()
            message.error("异常断开")
        })

        client.on('disconnect', () => {
            console.error('Connection disconnect: ')
        })

        client.on('offline', () => {
            console.error('Connection offline: ')
        })

        client.on('packetsend', (packet:any) => {
            console.error('Connection packetsend: ', packet)
        })

        client.on('packetreceive', (packet:any) => {
            console.error('Connection packetreceive: ', packet)
        })

        // https://github.com/mqttjs/MQTT.js#event-reconnect
        client.on('reconnect', () => {
            setConnectStatus('Reconnecting')
            message.error("开始重连")
        })

        // https://github.com/mqttjs/MQTT.js#event-message
        client.on('message', (topic:any, message:any, packet:any) => {
            console.log(`received message: ${message} from topic: ${topic}`, packet)
            let newList:any[] = []
            newList.push({
                topic:topic,
                qos:packet.qos,
                payload:message.toString(),
                id:crypto.randomUUID(),
                create_time:new Date().getTime(),
            })
            newList = newList.concat(subMsgListRef.current)
            console.log("newList", newList, "subMsgList", subMsgList)
            subMsgListRef.current = newList
            setSubMsgList(newList)
        })
        }
    }, [client])

    const mqttDisconnect = () => {
        if (client) {
        try {
            client.end(false, () => {
            setConnectStatus('DisConnect')
            console.log('disconnected successfully')
            message.success("断开成功")
            })
        } catch (error) {
            console.log('disconnect error:', error)
            message.error("断开失败：" + error)
        }
        } else {
            message.error("客户端未初始化")
        }
    }

    const mqttPublish = (context:any) => {
        if (client) {
        // topic, QoS & payload for publishing message
        const { topic, qos, payload } = context
        client.publish(topic, payload, { qos }, (error:any) => {
            if (error) {
                console.log('Publish error: ', error)
                message.error("发布失败")
            } else {
                message.success("发布成功")
                let newList:any[] = []
                newList.push({
                    topic:topic,
                    qos:qos,
                    payload:payload,
                    id:crypto.randomUUID(),
                    create_time:new Date().getTime(),
                })
                newList = newList.concat(pubMsgList)
                setPubMsgList(newList)
            }
        })
        } else {
            message.error("客户端未初始化")
        }
    }

  
    const mqttSub = (subscription:any) => {
        if (client) {
        // topic & QoS for MQTT subscribing
        const { topic, qos } = subscription
        // subscribe topic
        // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
        client.subscribe(topic, { qos }, (error:any) => {
            if (error) {
            console.log('Subscribe to topics error', error)
            message.error("订阅失败")
            return
            }
            console.log(`Subscribe to topics: ${topic}`)
            message.success("订阅成功")
            let newList:any[] = []
            newList.push({
                id:crypto.randomUUID(),
                topic:topic,
                qos:qos,
                create_time:new Date().getTime(),
            })
            newList = newList.concat(subList)
            setSubList(newList)
        })
        } else {
            message.error("客户端未初始化")
        }
    }

    // unsubscribe topic
    // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
    const mqttUnSub = (subscription:any) => {
        if (client) {
        const { topic, qos } = subscription
        client.unsubscribe(topic, { qos }, (error:any) => {
            if (error) {
            console.log('Unsubscribe error', error)
            message.error("取消订阅失败")
            return
            }
            console.log(`unsubscribed topic: ${topic}`)
            message.error("取消订阅成功")

        const newList = []
            for (let index in subList) {
                if(subList[index].id !== subscription.id) {
                    newList.push(subList[index])
                }
            }
            setSubList(newList)
        })
        } else {
            message.error("客户端未初始化")
        }
    }

    return (
        <>
        <div style={{fontWeight:'bold', fontSize:16}}>连接配置</div>
        <ProForm
            style={{marginTop:"20px"}}
            layout='horizontal'
            formRef={connectFormRef}
            initialValues={{
                path:"/mqtt",
                host:"10.55.132.187",
                client_id:deviceInfo.pk + "|" + deviceInfo.sn,
                port:"8083",
                username:"username", 
                password:"password"
            }}
            submitter={false}
        >
        <ProForm.Group>
        <ProFormText 
            width={190}
            name="host"
            label="主机名"
            placeholder="请输入主机名"
            rules={[
                {
                    required: true,
                    message: '请输入主机名',
                },
            ]}
        />

        <ProFormText 
            width={190}
            name="port"
            label="端口"
            placeholder="请输入端口"
            rules={[
                {
                    required: true,
                    message: '请输入端口',
                },
            ]}
        />

        <ProFormText 
            width={190}
            name="path"
            label="Path"
            placeholder="请输入Path"
            rules={[
                {
                    required: true,
                    message: '请输入Path',
                },
            ]}
        />
        
        <ProFormText 
            width={190}
            name="client_id"
            label="客户端id"
            placeholder="请输入客户端id"
            rules={[
                {
                    required: true,
                    message: '请输入客户端id',
                },
            ]}
        />
        </ProForm.Group>
        <ProForm.Group>
        
        <ProFormText 
            width={190}
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            rules={[
                {
                    required: true,
                    message: '请输入用户名',
                },
            ]}
        />

        <ProFormText 
            width={190}
            name="password"
            label="密码"
            placeholder="请输入密码"
            rules={[
                {
                    required: true,
                    message: '请输入密码',
                },
            ]}
        />
        <div>
        <Button type='primary' onClick={OnDisConnect} disabled={connectStatus === "DisConnect"}>断开连接</Button>,
        <Button type='primary' onClick={OnConnect} disabled={connectStatus === "Connected"}>开始连接</Button>
        </div>
        </ProForm.Group>
    </ProForm>

    <div style={{fontWeight:'bold', fontSize:16, marginTop:"10px"}}>订阅</div>
    <ProForm
        style={{marginTop:"20px"}}
        formRef={subFormRef}
        layout='horizontal'
        initialValues={{
            topic : `iot/up/${deviceInfo.group}/${deviceInfo.pk}/${deviceInfo.sn}/property/#`,
            qos:0,
        }}
        submitter={false}
    >
        <ProForm.Group>
        <ProFormText 
            width='md'
            name="topic"
            label="主题"
            placeholder="请输入主题"
            rules={[
                {
                    required: true,
                    message: '请输入主题',
                },
            ]}
        />

        <ProFormSelect 
            width={100}
            name="qos"
            label="qos"
            placeholder="请输入qos"
            options={[{ value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' }]}
            rules={[
                {
                    required: true,
                    message: '请选择qos',
                },
            ]}
        />
        <Button type='primary' onClick={OnSub} disabled={connectStatus === "DisConnect"}>订阅</Button>,
        </ProForm.Group>
    </ProForm>
    <ProTable
        options={false}
        rowKey="id"
        columns={[
            {
                title: '主题',
                dataIndex: 'topic',
            },
            {
                title: 'qos',
                dataIndex: 'qos',
            },
            {
                title: '时间',
                dataIndex: 'create_time',
                render: (_: any, entity: any) => {
                    return timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS');
                }
            },
            {
                title: '操作',
                valueType: 'option',
                key: 'option',
                render: (text, record: any) => (
                  <>
                    <Button
                      type="link"
                      danger
                      onClick={() => {
                        mqttUnSub(record);
                      }}
                      style={{ paddingRight: 10 }}
                    >
                      删除
                    </Button>
                  </>
                ),
              },

          ]}
        actionRef={subPageRef}
        bordered
        dataSource={subList}
        pagination={false}
        rowSelection={false}
        search={false}
      />

    <div style={{fontWeight:'bold', fontSize:16, marginTop:"10px"}}>发布</div>
    <ProForm
        style={{marginTop:"20px"}}
        formRef={pubFormRef}
        layout='horizontal'
        initialValues={{
            topic : `iot/up/${deviceInfo.group}/${deviceInfo.pk}/${deviceInfo.sn}/property/batch`,
            qos:0,
            payload:"{}"
        }}
        submitter={false}
    >
        <ProForm.Group>
        <ProFormText 
            width='md'
            name="topic"
            label="主题"
            placeholder="请输入主题"
            rules={[
                {
                    required: true,
                    message: '请输入主题',
                },
            ]}
        />

        <ProFormText 
            width='md'
            name="payload"
            label="消息"
            placeholder="请输入消息"
            rules={[
                {
                    required: true,
                    message: '请输入消息',
                },
            ]}
        />

        <ProFormSelect 
            width={100}
            name="qos"
            label="qos"
            placeholder="请输入qos"
            options={[{ value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' }]}
            rules={[
                {
                    required: true,
                    message: '请选择qos',
                },
            ]}
        />
        <Button type='primary' onClick={OnPub} disabled={connectStatus === "DisConnect"}>发布</Button>,
        </ProForm.Group>
    </ProForm>
    
    <Row>
        <Col span={12}>
        <div style={{fontWeight:'bold', fontSize:16, marginTop:"10px",marginLeft:"25px"}}>已接收</div>
        <ProTable
            options={false}
            rowKey="id"
            columns={[
                {
                    title: '主题',
                    dataIndex: 'topic',
                    width:180,
                },
                {
                    title: 'qos',
                    dataIndex: 'qos',
                    width:50,
                },
                {
                    title: '消息',
                    dataIndex: 'payload',
                    ellipsis:true,
                },
                {
                    title: '时间',
                    dataIndex: 'create_time',
                    width:200,
                    render: (_: any, entity: any) => {
                        return timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS');
                    }
                }
            ]}
            bordered
            dataSource={subMsgList}
            pagination={false}
            rowSelection={false}
            search={false}
        />
        </Col>
        <Col span={12}>
        <div style={{fontWeight:'bold', fontSize:16, marginTop:"10px", marginLeft:"25px"}}>已发送</div>
        <ProTable
            options={false}
            rowKey="id"
            columns={[
                {
                    title: '主题',
                    dataIndex: 'topic',
                    width:180,
                },
                {
                    title: 'qos',
                    dataIndex: 'qos',
                    width:50,
                },
                {
                    title: '消息',
                    dataIndex: 'payload',
                    ellipsis:true,
                },
                {
                    title: '时间',
                    dataIndex: 'create_time',
                    width:200,
                    render: (_: any, entity: any) => {
                        return timestampToDateStr(Number(entity.create_time), 'YYYY-MM-DD HH:mm:ss.SSS');
                    }
                }
            ]}
            bordered
            dataSource={pubMsgList}
            pagination={false}
            rowSelection={false}
            search={false}
        />
        </Col>
    </Row>

    
    </>
  );
};

export default DeviceSimulationPage;
