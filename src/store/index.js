
import { createStore, applyMiddleware, compose } from 'redux'  //  引入createStore方法
import reducer from './reducer'
import thunk from 'redux-thunk'
// 让redux刷新数据不丢失

import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// applyMiddleware 注册中间件   composeEnhancers 增强函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const config = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const myReducer = persistReducer(config, reducer)

const store = createStore(myReducer, composeEnhancers(applyMiddleware(thunk)), ) // 创建数据存储仓库
const persistor = persistStore(store)


export {
    store,
    persistor
}    //暴露出去
