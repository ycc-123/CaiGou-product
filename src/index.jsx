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
localStorage.clear()
// let uid = getParamsString('uid')
// let uniacid = getParamsString('uniacid')

// 正式站
let uid = "5372"
let uniacid = "826"

// 测试站
// let uid ="2271"
// let uniacid = "53"

const actionuid = saveUserUid(uid)
store.dispatch(actionuid)

const actionuniacid = saveUserUniacid(uniacid)
store.dispatch(actionuniacid)


// window.location.reload()

ReactDOM.render(
  <Provider store={store}> 
      <AppRouter />
  </Provider>, document.getElementById('root'))

