import React from 'react'
import ReactDOM from 'react-dom'

import { store, persistor } from 'store/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react';

import AppRouter from './router/AppRouter'

import 'lib-flexible'
import 'assets/css/border.css'
import 'assets/css/basic.css'

ReactDOM.render(
  <Provider store={store}> 
  
    <PersistGate persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>, document.getElementById('root'))

