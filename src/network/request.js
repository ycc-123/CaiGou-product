import axios from 'axios'
import BASE_URL from './config'
import { Toast } from 'antd-mobile';

export function requestPost(config) {

  // let isLodding = false
  // let a = 0
  // let b = 0
  // const _Toast = Toast

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

  // instance.interceptors.request.use(config => {
  //   //  发送网络请求是， 在界面的中间位置显示 loading 的组件
  //   //  某一些请求要求用户必须携带token , 如果没有携带，那么直接跳转到登录页面
  //   //  params/data 序列化的操作
  //   console.log('加载中...+++++++' + a)
  //   Toast.loading('加载中...')
  //   return config;
  // }, err => {
  //   a = 0
  // });
  
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
