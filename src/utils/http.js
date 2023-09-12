import axios from "axios";

const service = axios.create({
  timeout: 60000,
  baseURL: process.env.VUE_APP_BASE_API,
});
/*
 * 请求拦截器
 */
service.interceptors.request.use();
/*
 * 响应拦截器
 */
service.interceptors.request.use();

export default service;
