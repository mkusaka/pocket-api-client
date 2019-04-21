import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://getpocket.com/v3/",
  headers: {
    "Content-Type": "application/json",
    "X-Accept": "application/json",
  },
});

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
