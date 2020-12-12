import React from 'react'
import ReactDOM from 'react-dom'
import { store} from 'store/index'
import { Provider } from 'react-redux'
import AppRouter from './router/AppRouter'
import { getParamsString } from 'commons/index'
import { 
  saveUserUid, 
  saveUserUniacid} from 'store/actionCreators'
import 'lib-flexible'
import 'assets/css/border.css'
import 'assets/css/basic.css'

// import  VConsole  from  'vconsole';
// let vConsole = new VConsole();
// localStorage.clear()

// let uniacid = getParamsString('uniacid')
// let uid = getParamsString('uid')

// 正式站
// let uid = "5372"
// let uniacid = "826"

// 测试站
let uid ="2271"
let uniacid = "53"

// 无开通收银服务用户
// let  uid= "5664"
// let  uniacid= "4038"


const actionuid = saveUserUid(uid)
store.dispatch(actionuid)

const actionuniacid = saveUserUniacid(uniacid)
store.dispatch(actionuniacid)

// 判断是否微信开发者工具
let environment = window.__wxjs_environment === 'miniprogram'
console.log(environment)
localStorage.setItem('user',environment);

ReactDOM.render(
  <Provider store={store}> 
    <AppRouter />
  </Provider>, document.getElementById('root'))

