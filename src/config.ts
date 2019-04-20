// import 'dotenv.config';
import { AxiosRequestConfig } from "axios";

export const requestConfig: AxiosRequestConfig = {
  // baseURL: "http://localhost:8080/",
  baseURL: "https://getpocket.com/v3/",
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Accept": "application/json"
      // "Content-Type": "application/json; charset=UTF-8",
      // "X-Accept": "application/json"
    },
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Accept": "application/json"
  }
};

export const requestPaths = {
  request: "oauth/request",
  authorize: "oauth/authorize",
  get: "get",
  add: "add",
  modify: "send"
};

export const defaultConfig = {
  consumerKey: process.env.POCKET_COSUMER_KEY || ""
}
