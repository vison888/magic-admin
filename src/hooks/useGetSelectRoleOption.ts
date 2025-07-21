import message from 'antd/lib/message';
import { roleServicePage } from '@/services/auth/roleService';
import { useState } from 'react';
import { PAGE_SIZE_MAX } from '@/utils/const';

type selectResult = {
  list: { label: string; value: string }[];
  map: { [key: string]: { label: string; value: string } };
};

const useGetSelectRoles = () => {
  const [selectRoles, setSelectRoles] = useState<selectResult>({ list: [], map: {} });
  const querySelectRoles = async () => {
    try {
      const res = await roleServicePage({
        page_index: 1,
        page_size: PAGE_SIZE_MAX,
      });
      const list = (res.list as API.protoRole[]).map((item: API.protoRole) => {
        return {
          label: item.name,
          value: item.code,
        } as { label: string; value: string };
      });

      const m: { [key: string]: { label: string; value: string } } = {};
      for (let v of list) {
        m[v.value] = v;
      }

      setSelectRoles({ list: list, map: m });
    } catch (error) {
      message.error((error as Error)?.message);
    }
  };
  return {
    selectRoles,
    querySelectRoles,
  };
};

export default useGetSelectRoles;
