
//  const devBaseURL='https://dev.huodiesoft.com/pos_erp_api.php'
 const devBaseURL='https://dev.lexiangpingou.cn/pos_erp_api.php'
 const proBaseURL='https://www.lexiangpingou.cn/pos_erp_api.php'

 const host = window.location.host

 const isDev = (host === 'dev.lexiangpingou.cn') ? true : false

const BASE_URL = isDev ? devBaseURL : process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;
//  export const PAY_URL = isDev ? devPayURL : process.env.NODE_ENV === 'development' ? devPayURL : proPayURL;
//  export const TIMEOUT = 5000;
 
//  export const _isDev = isDev

// const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

export default BASE_URL