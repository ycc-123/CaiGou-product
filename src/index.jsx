import React from 'react'
import ReactDOM from 'react-dom'
import { store} from 'store/index'
import { Provider } from 'react-redux'
import AppRouter from './router/AppRouter'
import { getParamsString } from 'commons/index'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";


import { 
  saveUserUid, 
  saveUserUniacid} from 'store/actionCreators'
import 'lib-flexible'
import 'assets/css/border.css'
import 'assets/css/basic.css'

// import  VConsole  from  'vconsole';
// let vConsole = new VConsole();
// localStorage.clear()

let uniacid = getParamsString('uniacid')
let uid = getParamsString('uid')

// // 正式站
// let uid = "5372"
// let uniacid = "826"

// 测试站
// let uid ="2271"
// let uniacid = "53"

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

 
Sentry.init({
  dsn: "https://68ca9a6e14ad45a3b037ba24fd844e31@o501293.ingest.sentry.io/5593433",
  release: 'v1.0.7', 
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing()
  ],

  tracesSampleRate: 1.0,
});


ReactDOM.render(
  <Provider store={store}> 
    <AppRouter />
  </Provider>, document.getElementById('root'))

