import axios, { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';

interface HttpInterface {
  interceptors (instance: AxiosInstance): void;
  request (config: AxiosRequestConfig): AxiosPromise;
}

class Http implements HttpInterface{
  private config: AxiosRequestConfig
  constructor(config: AxiosRequestConfig) {
    this.config = Object.assign({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    }, config);
    this.request = this.request.bind(this);
  }

  interceptors (instance: AxiosInstance) {
    instance.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    instance.interceptors.response.use(function (response) {
      return response.data;
    }, function (error) {
      return Promise.reject(error);
    });
  }

  request<T> (config: AxiosRequestConfig): AxiosPromise<T> {
    const instance = axios.create(Object.assign({}, this.config));
    this.interceptors(instance);
    return instance(config);
  }
}

export default Http;