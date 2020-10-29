import React from 'react'
import ReactDOM from 'react-dom'
import { store,
  //  persistor 
  } from 'store/index'
import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/es/integration/react';
import AppRouter from './router/AppRouter'
// import { getParamsString } from 'commons/index'

import { 
  // saveUserUid, 
  saveUserUniacid} from 'store/actionCreators'

import 'lib-flexible'
import 'assets/css/border.css'
import 'assets/css/basic.css'
// import { update } from 'js-md5';

// let uid = getParamsString('uid')
// let uniacid = getParamsString('uniacid')



// let uid = 2271
let uniacid = "53"

console.log(uniacid)
// const actionuid = saveUserUid(uid)
// store.dispatch(actionuid)

const actionuniacid = saveUserUniacid(uniacid)
store.dispatch(actionuniacid)

ReactDOM.render(
  <Provider store={store}> 
    {/* <PersistGate persistor={persistor}> */}
      <AppRouter />
    {/* </PersistGate> */}
  </Provider>, document.getElementById('root'))

