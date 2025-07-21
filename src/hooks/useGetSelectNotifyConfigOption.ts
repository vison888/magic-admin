import message from 'antd/lib/message';
import { useState } from 'react';
import { notifyConfigServiceList } from '@/services/thing/notifyConfigService';

type selectResult = {
  list: { label: string; value: string, info: API.protoNotifyConfig }[];
  map: { [key: string]: { label: string; value: string, info: API.protoNotifyConfig } };
};

const useGetSelectNotifyConfigs = () => {
  const [selects, setSelects] = useState<selectResult>({ list: [], map: {} });
  const querySelects = async () => {
    try {
      const res = await notifyConfigServiceList({
        only_id_and_name: true,
      });
      const list = (res.items as API.protoNotifyConfig[]).map((item: API.protoNotifyConfig) => {
        return {
          label: item.name,
          value: item.id,
          info:item,
        } as { label: string; value: string, info: API.protoNotifyConfig };
      });


      
      const m: { [key: string]: { label: string; value: string, info: API.protoNotifyConfig } } = {};
      for (let v of list) {
        m[v.value] = v;
      }

      setSelects({ list: list, map: m });
    } catch (error) {
      message.error((error as Error)?.message);
    }
  };
  return {
    selectNotifyConfigs:selects,
    querySelectNotifyConfigs:querySelects,
  };
};

export default useGetSelectNotifyConfigs;
