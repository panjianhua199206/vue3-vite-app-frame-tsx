import axios from 'axios'

const service = axios.create({
    // baseURL: process.env.BASE_API,
    baseURL: '', // 本地代理暂时为空
    timeout: 600000 // 请求超时时间
})

// request请求拦截器
service.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
})

// respone响应拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 上传二进制文件
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} method [请求方法，支持多种：get，post，delect，put...]
 * @returns Promise
 */
export default function upload(url:string, params = {}, method: 'post') {
    return new Promise((resolve, reject) => {
        service({
            url,
            method,
            data: params,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}