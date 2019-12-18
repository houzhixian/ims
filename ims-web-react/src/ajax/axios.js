import {baseURL, mockURL, errMessage} from '../config/config'
import axios from 'axios'
import {message} from 'antd'

// 封装ajax请求

const fetch = axios.create({
    baseURL: baseURL,
    timeout: 2000,
    responseType: "json"
});

fetch.defaults.timeout = 10000 //超时取消请求
fetch.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
fetch.defaults.baseURL = mockURL
// fetch.defaults.baseURL = baseURL




// fetch.interceptors.request.use(config => {
//     return config
// })

// fetch.interceptors.response.use(
//     (response) => {return response;},
//     (err) => handleError(err)
// )
 
fetch.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    // return Promise.reject(error);
    message.error(errMessage.sys_common_err)
    return Promise.reject(error)
  });


export function get(url, callback_success, callback_error){
    let config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    return new Promise((resolve, reject) => {
        fetch.get(url, config)
            .then(res => {
                resolve(res.data)
                callback_success(res.data)
            })
            .catch(err => {
                reject(err)
                callback_error(err)
            })
    })
}

export function getWithParam(url, param, callback_success, callback_error) {
    url += "?";
    if (param instanceof Map) {
        for (let [key, value] of param) {
            url += key + "=" + value + "&"
        }
    }
    get(url.substr(0, url.length - 1), callback_success, callback_error)
}


export function post(url, params) {
    let config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }
    return new Promise((resolve, reject) => {
        fetch.post(url, params, config)
            .then(res => {
                resolve(res.data)
            })
            .catch(err =>{
                reject(err)
                // handleError(err, reject)
            })
    });
}

export function del(url, params) {
    let config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }
    return new Promise((resolve, reject) => {
        fetch.delete(url, params, config)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}


export function uploadFile(url, formData) {
    return new Promise((resolve, reject) => {
        fetch.post(url, formData , {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err)
            })
    });
}

export function download(url) {
    let config = {
        headers: {
            "Content-Type" : "application/json"
        },
        responseType: 'blob'
    }
    return new Promise((resolve, reject) => {
        fetch.get(url, config).then(res => {

            let disposition = res.headers['content-disposition']
            let fileName = disposition.substring(disposition.indexOf('filename=') + 9, disposition.length)
            fileName = decodeURI(fileName)
            const blob = res.data
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = (e) => {
                const a = document.createElement('a')
                a.download = fileName
                a.href = e.target.result
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export function exportFile(url, data) {
    let config = {
        headers: {
            "Content-Type": "application/json"
        },
        responseType: 'blob'
    }

    return new Promise((resolve, reject) => {
        fetch.post(url, data, config).then(res => {

            let disposition = res.headers['content-disposition']
            let fileName = disposition.substring(disposition.indexOf('filename=') + 9, disposition.length)
            fileName = decodeURI(fileName)
            const blob = res.data
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = (e) => {
                const a = document.createElement('a')
                a.download = fileName
                a.href = e.target.result
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            }
        }).catch(err => {
            reject(err)
        })
    })
}


// function handleError(err, reject) {
//     console.error(err)

//     message.error(errMessage.sys_common_err)

//     if (reject != null) reject(err)
// }