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
          // 清除本地存储的token
          localStorage.removeItem('MAGIC_PLAT-token');
          localStorage.removeItem('MAGIC_PLAT-userId');
          // 跳转到登录页
          window.location.href = '/user/login';
          return;
        }

        // 网络层：其他4xx/5xx状态码处理
        if (status >= 400 && status < 500) {
          message.error(`请求错误 (${status}): ${data?.msg || '客户端错误'}`);
        } else if (status >= 500) {
          message.error(
            `服务器错误 (${status}): ${data?.msg || '服务器内部错误'}`,
          );
        } else {
          message.error(`网络错误 (${status}): ${data?.msg || '未知错误'}`);
        }
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        message.error('网络连接失败，请检查网络后重试');
      } else {
        // 发送请求时出了点问题
        message.error('请求发送失败，请重试');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
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
      // 拦截响应数据，进行个性化处理
      const data = response.data as any;

      // 业务层：处理业务错误码
      if (data?.code !== 0 && data?.code !== undefined) {
        // 不显示成功消息，只显示错误消息
        message.error(data?.msg || '操作失败');
      }

      return response;
    },
  ],
};
