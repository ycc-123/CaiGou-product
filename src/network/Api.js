import { requestPost, } from './request'


// 仓库

export function getWarehouseList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 供应商

export function getSupplierList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 采购商列表

export function getPurchaseList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 采购单明细
export function getPurchaseDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 采购出入库单列表
export function getPurchaseDeliveryList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 采购出入库单明细
export function getPurchaseDeliveryDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 收银商品全部分类
export function getProductCategoryAll(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 收银商品指定分类
export function showProductCategory(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}











