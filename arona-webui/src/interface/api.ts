import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface IRequestConfig<D = any> extends AxiosRequestConfig<D> {
  // 当网络请求错误时是否显示错误
  showResponseError?: boolean;
  // 当http 200但是 serverResponse.code !== 200 时是否显示 serverResponse.message
  // 默认开启
  showServerResponseError?: boolean;
}

export interface IResponseError<T = any, D = any> extends AxiosError<T, D> {
  config: IRequestConfig<D>;
}

export interface IResponse<T = any, D = any> extends AxiosResponse<T, D> {
  config: IRequestConfig<D>;
}
export interface ServerResponse<T> {
  code: number;
  message: string;
  data: T;
}
