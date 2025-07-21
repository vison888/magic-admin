import message from 'antd/lib/message';
import { useState } from 'react';
import { PAGE_SIZE_MAX } from '@/utils/const';
import { productServicePage } from '@/services/thing/productService';

type selectResult = {
  list: { label: string; value: string, info: API.protoProduct }[];
  map: { [key: string]: { label: string; value: string, info: API.protoProduct } };
};

const useGetSelectProducts = () => {
  const [selects, setSelects] = useState<selectResult>({ list: [], map: {} });
  const querySelects = async () => {
    try {
      const res = await productServicePage({
        page_index: 1,
        page_size: PAGE_SIZE_MAX,
      });
      const list = (res.items as API.protoProduct[]).map((item: API.protoProduct) => {
        return {
          label: item.name,
          value: item.pk,
          info:item,
        } as { label: string; value: string, info: API.protoProduct };
      });

      const m: { [key: string]: { label: string; value: string, info: API.protoProduct } } = {};
      for (let v of list) {
        m[v.value] = v;
      }

      setSelects({ list: list, map: m });
    } catch (error) {
      message.error((error as Error)?.message);
    }
  };
  return {
    selectProducts:selects,
    querySelectProducts:querySelects,
  };
};

export default useGetSelectProducts;
