/**
 *  @author liuyihu
 *  @date 2019/4/28 11:23
 */
import {notification, Modal} from 'ant-design-vue'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

const service = axios.create({
    baseURL: 'http://127.0.0.1:8080', // 请求访问域名
    timeout: 6000, // 请求超时时间
    withCredentials: true
})
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.headers.common['X-Access-Token'] = Vue.ls.get('Access-Token');

const err = (error) => {
    if (error.response) {
        let data = error.response.data
        const token = localStorage.getItem("ACCESS_TOKEN")
        console.log("------异常响应------", token)
        console.log("------异常响应------", error.response.status)
        switch (error.response.status) {
            case 403:
                notification.error({message: '系统提示', description: '拒绝访问', duration: 4})
                break
            case 500:
                if (data.message == "Token失效，请重新登录") {
                    Modal.error({
                        title: '登录已过期',
                        content: '很抱歉，登录已过期，请重新登录',
                        okText: '重新登录',
                        mask: false,
                        onOk: () => {
                        }
                    })
                }
                break
            case 404:
                notification.error({message: '系统提示', description: '很抱歉，资源未找到!', duration: 4})
                break
            case 504:
                notification.error({message: '系统提示', description: '网络超时'})
                break
            case 401:
                notification.error({message: '系统提示', description: '未授权，请重新登录', duration: 4})
                if (token) {
                    console.log(token)
                }
                break
            default:
                notification.error({
                    message: '系统提示',
                    description: data.message,
                    duration: 4
                })
                break
        }
    } else {
        let message = '请求失败！请检查网络';
        notification.error({message: '系统提示', description: message, duration: 4})
    }
    return Promise.reject(error)
};

// response interceptor
service.interceptors.response.use((response) => {
    /*if (response.data.code == '2000' || response.data.code == '3000') {
        return response.data
    } else {
        notification.error({message: '系统提示', description: '111', duration: 4})
        return {desc: '请求失败'}
    }*/
    return response.data
}, err)

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve) => {
        service.get(url, {
            params: params
        })
            .then(response => {
                resolve(response);
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve) => {
        service.post(url, qs.stringify(data))
            .then(response => {
                resolve(response);
            })
    })
}
