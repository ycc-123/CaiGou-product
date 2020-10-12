import axios from 'axios'

export function requestPost(config) {
  const instance = axios.create({
    timeout: 10000,
    baseURL: 'https://dev.huodiesoft.com/posdataapi.php',
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

// export function requestPost(config) {

//   let baseUrl = 'https://dev.huodiesoft.com/posdataapi.php'

//   if(baseUrl !== null){
//     config.data.timestamp = new Date().getTime()

//     const instance = axios.create({
//       timeout: 10000,
//       // 测试站
//       baseURL: baseUrl,
//       method: 'post',
//       headers: { 'Content-Type': 'text/plain' },
//       data: config.data
//     })

//     instance.interceptors.request.use(async config => {
//       const token = JSON.parse(sessionStorage.getItem('token'))
//       if (token !== null) {
//         config.headers['token'] = token
//         return config
//       } else {
//         return config
//       }
//     }, err => {
//       console.log(err)
//       return Promise.reject(err)
//     })

//     instance.interceptors.response.use(config => {
  
//       return config
//     }, err => {
//       console.log(err)
//       return Promise.reject(err)
//     })
//     return instance(config)
//   }
// }


