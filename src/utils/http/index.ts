import Request from './request';
import type {
  RequestConfig,
  // RequestInterceptors,
  // CancelRequestSource,
} from './types';

const request = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      console.log('实例请求拦截器');

      return config;
    },
    // 响应拦截器
    responseInterceptors: (result) => {
      console.log('实例响应拦截器');
      return result;
    },
  },
});

// import type { RequestConfig } from './types'
interface YWZRequestConfig<T> extends RequestConfig {
  data?: T;
}
interface YWZResponse<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * @description: 函数的描述
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const ywzRequest = <D, T = any>(config: YWZRequestConfig<D>) => {
  const { method = 'GET' } = config;
  if (method === 'get' || method === 'GET') {
    config.params = config.data;
  }
  return request.request<YWZResponse<T>>(config);
};

export default ywzRequest;
