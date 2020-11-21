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
// 库存单列表
export function getStockList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 获取库存单分类
export function showProductCategory(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 优惠统计表列表和详情
export function getRetailList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 获取收银员
export function get_cashier(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })

}


// 采购申请单列表
export function getPurchaseApplyList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })

}

// 采购申请单详情
export function getPurchaseApplyDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })

}


// 提交采购单
export function createPurchaseApply(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })

}

// 采购申请单提交
export function submitPurchaseApply(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })

}

// 报损单列表
export function getDamageList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 商品优惠明细列表
export function getRetailGoodsList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}


// 商品优惠明细列表

export function get_store(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 盘点单列表
export function getInventoryList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 盘点单明细
export function getInventoryInfo(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 新建盘点单
export function createInventory(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 提交盘点单
export function submitInventory(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 调拨单列表
export function getWarehouseChangeList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 调拨单明细
export function getWarehouseChangeDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 调拨单提交
export function submitWarehouseChange(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 创建调拨单
export function createWarehouseChange(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}



// 创建商品
export function createProduct(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 获取单位列表

export function getUnitList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 商品编辑默认数据

export function getProductDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}