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



// 商品编辑提交

export function editProduct(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 报损单汇总列表
export function getDamageDetailList(config) {
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
// 报损单明细

export function getDamageDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 提交报损单


export function submitDamage(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 创建报损单


export function createDamage(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 创建报损单


export function getProductCategoryAllChildren(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}



// 优惠明细
export function getRetailDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 生成商品编码


export function getProductCode(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 检查盘点单未盘点商品

export function checkSubmitInventory(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}


// 打包商品明细

export function getPackgeProductDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}


// 打包商品明细

export function createPackgeProduct(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}



// 打包商品明细

export function editPackgeProduct(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 商品调价单明细

export function getPriceModifyDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 商品调价单列表

export function getPriceModifyList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 创建商品调价单

export function createPriceModify(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 提交商品调价单

export function submitPriceModify(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 收银订单列表

export function getOrderList(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 收银订单明细

export function getOrderDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}


// 编辑采购单

export function editPurchaseDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 采购申请单详情修改

export function editPurchaseApplyDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}


// 商品调价单明细添加

export function addPriceModifyDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 采购单详情添加

export function addPurchaseDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 采购单详情添加

export function editPurchaseDeliveryDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}


// 作废商品

export function deleteProduct(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 删除采购单商品

export function delPurchaseDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}



// 删除采购申请单商品

export function delPurchaseApplyDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}


// 添加采购申请单商品

export function addPurchaseApplyDetail(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 删除打包商品

export function delPackgeProduct(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 添加打包商品

export function addPackgeProduct(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}