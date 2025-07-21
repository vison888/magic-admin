import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import type { ActionType } from '@ant-design/pro-components';
import { Modal, message } from 'antd';

const { confirm } = Modal;
const useTableDelete = () => {
  const deleteHandler = <T,>(
    deleteApi: (
      body: T,
      options?: Record<string, any> | undefined,
    ) => Promise<any>,
    actionRef: React.MutableRefObject<ActionType | undefined>,
    deleteMap: { title: string; content: string; body: T },
    deleteOkHandler?: () => void,
    deleteCancelHandler?: () => void,
  ) => {
    const { title, content, body } = deleteMap;

    // 添加调试信息
    console.log('删除确认弹窗准备显示:', { title, content, body });

    // 使用Ant Design Pro的Modal.confirm
    Modal.confirm({
      title,
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      content,
      okText: '确认删除',
      cancelText: '取消',
      okType: 'danger',
      centered: true,
      maskClosable: false,
      zIndex: 9999,
      async onOk() {
        console.log('用户确认删除');
        let res;
        try {
          res = await deleteApi(body);
          console.log('删除API响应:', res);
          if (res.code === 0) {
            actionRef.current?.reloadAndRest?.();
            message.success('删除成功');
            if (deleteOkHandler) deleteOkHandler();
          } else {
            // 显示删除失败的错误信息
            message.error(res.msg || '删除失败');
          }
        } catch (error) {
          console.error('删除操作失败:', error);
          message.error('删除失败，请重试');
        }
        return res;
      },
      onCancel() {
        console.log('用户取消删除');
        if (deleteCancelHandler) deleteCancelHandler();
      },
    });
  };
  return {
    deleteHandler,
  };
};

export default useTableDelete;
