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
export function searchProduct(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 创建采购单
export function createPurchase(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 审核采购单
export function changePurchaseStatus(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 提交采购单
export function submitPurchase(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 提交采购入库单
export function submitPurchaseDelivery(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 盘点单
export function getStockList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

export function showProductCategory(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

