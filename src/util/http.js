import axios from 'axios';
import { store } from '../redux/store';

axios.defaults.baseURL = 'http://localhost:5000';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 显示loading
    store.dispatch({
        type: "change_loading",
        payload: true
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 取消loading
    store.dispatch({
        type: "change_loading",
        payload: false
    })
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});