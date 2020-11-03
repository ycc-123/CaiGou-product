import {  requestPost } from './request'
import { store } from 'store/index'

export function _categoryLeft() {
  return requestPost({
    params: {
      action: 'category'
    },
    data: {
      // uniacid: store.getState().appConfig.uniacid || 53
    }
  })
}

export function _categoryRight(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

export function getCategoryData(op, uniacid) {
  // return request({
  //   params: {
  //     op,
  //     uniacid
  //   }
  // })
}

// 用户名53uniacid  op写死ajax_optimization_bymobile  fk_typeid分类id1692 page页面1 page25分类大小
// type写3  erp_warehouseid仓库id 
export function getCategoryGoods(uniacid, op, fk_typeid, page, pagesize, type, erp_warehouseid) {
  // return request({
  //   params: {
  //     uniacid,
  //     op,
  //     fk_typeid,
  //     page,
  //     pagesize,
  //     type,
  //     erp_warehouseid
  //   }
  // })
}