import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { TOKENKEY } from '@/utils/const';
import { getToken } from '@/utils/store';

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 分层错误处理
      if (error.response) {
        const { status, data } = error.response;
        // 权限层：403状态码处理
        if (status === 403) {
          message.error('登录已过期，请重新登录');
          localStorage.removeItem('MAGIC_PLAT-token');
          localStorage.removeItem('MAGIC_PLAT-userId');
          window.location.href = '/user/login';
          return;
        }
        // 网络层：其他4xx/5xx状态码处理
        if (status >= 400 && status < 500) {
          // 尝试使用更直接的方式显示错误
          setTimeout(() => {
            message.error(`请求错误 (${status}): ${data?.msg || '客户端错误'}`);
            // 备选方案：如果message不显示，使用alert
            console.log(
              '尝试显示错误消息:',
              `请求错误 (${status}): ${data?.msg || '客户端错误'}`,
            );
          }, 100);
        } else if (status >= 500) {
          setTimeout(() => {
            message.error(
              `服务器错误 (${status}): ${data?.msg || '服务器内部错误'}`,
            );
          }, 100);
        } else {
          setTimeout(() => {
            message.error(`网络错误 (${status}): ${data?.msg || '未知错误'}`);
          }, 100);
        }
      } else if (error.request) {
        message.error('网络连接失败，请检查网络后重试');
      } else {
        message.error('请求发送失败，请重试');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers[TOKENKEY] = token;
      }
      return { ...config };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      const data = response.data as any;
      // 业务层：处理业务错误码，只在这里 message.error
      if (data?.code !== 0 && data?.code !== undefined) {
        console.log('响应拦截器准备显示错误消息:', data?.msg);
        // 使用setTimeout确保message能正常显示
        setTimeout(() => {
          message.error(data?.msg || '操作失败');
          // 备选方案：如果message不显示，使用alert
          console.log('message.error已调用，如果没显示请检查message组件');
        }, 100);
        console.log('响应拦截器已调用 message.error');
        // 抛出错误，errorHandler 只做流程控制不再弹窗
        // const error = new Error(data?.msg || '操作失败');
        // (error as any).response = { status: 400, data };
        // throw error;
      }
      return response;
    },
  ],
};
