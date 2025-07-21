import type { ActionType } from '@ant-design/pro-components';
import message from 'antd/lib/message';

const useTableAdd = () => {
  const addHandler = async <T extends Function, k>(
    addApi: T,
    actionRef: React.MutableRefObject<ActionType | undefined> | undefined,
    body: k,
    addOkHandler?: () => void,
  ) => {
    let res;
    try {
      res = await addApi(body);
      if (res?.code === 0) {
        actionRef?.current?.reload();
        message.success('创建成功');
        if (addOkHandler) addOkHandler();
      }
    } catch (error) {
      // message.error((error as Error)?.message);
    }
    return res;
  };
  return {
    addHandler,
  };
};

export default useTableAdd;
