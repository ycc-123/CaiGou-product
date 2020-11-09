import axios from 'axios'
import BASE_URL from './config'

export function requestPost(config) {
  const instance = axios.create({
    timeout: 10000,
    baseURL: BASE_URL,
    // baseURL:'https://dev.huodiesoft.com/pos_erp_api.php',
    // 切换正式站
    // baseURL:'https://www.lexiangpingou.cn/pos_erp_api.php',
    method: 'post',
    headers: {
      'Content-Type': 'text/plain'
    },
    data: config.data
  })

  
  // 拦截器
  // instance.interceptors.request.use(config => {
  //   // console.log(config)
  //   return config
  // }, err => {
  //   // console.log(err)
  //   return Promise.reject(err)
  // })
 
  instance.interceptors.response.use(config => {
    return config
  }, err => {
    // console.log(err)
    return Promise.reject(err)
  })
  
  return instance(config)
}
