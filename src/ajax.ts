import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { requestConfig } from "./config";

const axiosInstance: AxiosInstance = axios.create(requestConfig);

axiosInstance.interceptors.request.use(request => {
  console.log("Starting Request: ", request);
  return request;
});

axiosInstance.interceptors.response.use(response => {
  console.log("Response: ", response);
  return response;
});

export function request(config: AxiosRequestConfig): Promise<any> {
  return axiosInstance.request(config);
}
