/**
 *  @author liuyihu
 *  @date 2019/4/28 11:23
 */
import {notification, Modal} from 'ant-design-vue' //引入ant-design-vue(前端视觉框架) notification:通知提醒框, Modal对话框
import axios from 'axios' //导入axios组件(axios组件提供了ajax的方法)
import qs from 'qs' //序列化组件

const service = axios.create({
    baseURL: 'http://localhost:8080', // 请求访问域名, 浏览器发送请求到node.js, node.js进行处理后再向后台发送请求, 这就是后台请求的地址
    timeout: 6000, // 请求超时时间
    // 这个配置如果设置为true, 在后端设置addCorsMappings为*时,会在浏览器报错:The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
    withCredentials: false //指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求
})
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头

const err = (error) => { //定义一个常量err方法, 方法形参为一个error对象
    if (error.response) { //如果有响应值 则执行
        let data = error.response.data
        const token = localStorage.getItem("ACCESS_TOKEN")
        console.log("------异常响应------", token)
        console.log("------异常响应------", error.response.status)
        switch (error.response.status) { // 判断错误响应代码
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
// service.interceptors.response.use((response) => {
//     if (response.data.code == '2000' || response.data.code == '3000') {
//         return response.data
//     } else {
//         notification.error({message: '系统提示', description: '111', duration: 4})
//         return {desc: '请求失败'}
//     }
// }, err)

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
