
 const devBaseURL='https://dev.huodiesoft.com/pos_erp_api.php'
 const proBaseURL='https://www.lexiangpingou.cn/pos_erp_api.php'


const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;



export default BASE_URL