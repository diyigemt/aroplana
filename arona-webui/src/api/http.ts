import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { errorMessage, infoMessage, warningMessage } from "~/utils/message";
import type { IRequestConfig, IResponse, IResponseError, ServerResponse } from "~/interface/api";
import { type InstanceObject, formatJsonToUrlParams } from "~/utils/format";
import showCodeMessage from "~/api/code";

const HTTP_OK = 200;
const BASE_PREFIX = import.meta.env.VITE_API_BASEURL;

// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: IRequestConfig) => {
    config.showResponseError = config.showResponseError || true;
    config.showServerResponseError = config.showServerResponseError || true;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: IResponse) => {
    if (response.status === HTTP_OK) {
      const resp = response.data as ServerResponse<unknown>;
      if (resp && resp.code !== HTTP_OK && resp.code !== 101 && resp.message && response.config.showServerResponseError) {
        warningMessage(resp.message);
      }

      return response.data;
    }
    infoMessage(JSON.stringify(response.status));

    return response;
  },
  (error: IResponseError) => {
    const { response, config } = error;
    if (response) {
      if (config && config.showResponseError) {
        errorMessage(showCodeMessage(response.status));
      }
      return Promise.reject(response.data);
    }
    if (config && config.showResponseError) {
      warningMessage("网络连接异常,请稍后再试!");
    }
    return Promise.reject(error);
  },
);

const ApiService = {
  upload(url: string, file: FormData | File) {
    if (Object.hasOwn(file, "get")) {
      const fileName = encodeURI(((file as FormData).get("file") as File).name);
      return axiosInstance({
        url,
        method: "POST",
        data: file,
        headers: buildFileUploadHeader(fileName),
      }) as unknown as Promise<ServerResponse<string>>;
    }
    const data = new FormData();
    data.set("file", file as Blob);
    const fileName = encodeURI((file as File).name);
    return axiosInstance({
      url,
      method: "POST",
      data,
      headers: buildFileUploadHeader(fileName),
    }) as unknown as Promise<ServerResponse<string>>;
  },
  download(id: string) {
    const config: IRequestConfig = {
      url: "/file/image",
      params: {
        id,
      },
      method: "GET",
      responseType: "blob",
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return axiosInstance(config);
  },
  raw<T>(config: IRequestConfig): Promise<ServerResponse<T>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return axiosInstance(config) as unknown as Promise<ServerResponse<T>>;
  },
  get<T>(config: IRequestConfig): Promise<ServerResponse<T>> {
    return ApiService.raw({
      ...config,
      method: "GET",
    });
  },
  urlDownload(url: string, data: InstanceObject) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    window.location.href = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(data)}`;
  },
};

function buildFileUploadHeader(fileName: string) {
  return {
    "Content-Type": "multipart/form-data",
    "arona-file-name": fileName,
  };
}

export default ApiService;
