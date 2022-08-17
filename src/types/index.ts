type TWidget = {
  city: {
    name: string,
    country: string,
  }
  main: {
    icon: string, // id иконки
    temp: number, // температура
    feelsLike: number, // ощущается как
    description: string, // описание
  }
  wind: {
    speed: string, // скорость
    deg: number, // направление
  }
  pressure: number, // давление
  humidity: number, // влажность в процентах
  visibility: string, // Видимость в метрах
}

export interface AxiosRequestConfig<T = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  headers?: Record<string, string>;
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: T;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  adapter?: AxiosAdapter;
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
  transitional?: TransitionalOptions
}

type AxiosResponse<T = never> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig<never>;
  request?: any;
}

// export interface AxiosResponse<T = never>  {
//   data: T; +
//   status: number; +
//   statusText: string; +
//   headers: Record<string, string>; +
//   config: AxiosRequestConfig<T>; +
//   request?: any; +
// }
export { TWidget, AxiosResponse };
