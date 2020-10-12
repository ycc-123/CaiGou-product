import { requestPost, } from './request'

// 获取门店
// export function get_store(){
//   return requestPost({
    
//     data: {
//       uniacid: "53"
//     }
//   })
// }

// 会员营业分析总人数
export function mb_TotalMember(){
  return requestPost({
    params: {
      action: 'mb_TotalMember'
    },
    data: {
      uniacid: "53"
    }
  })
}

export function get_store() {

  return requestPost({
    params: {
      action: 'get_store'
    },
    data: {
      uniacid: 53
    }
  })
}


// 会员储值
export function mb_StoredTotal() {

  return requestPost({
    params: {
      action: 'mb_StoredTotal'
    },
    data: {
      uniacid: 53
    }
  })
}

export function mb_StoredValueOverview(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
export function mb_NewMember(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 首页接口


export function pos_data_total(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

export function pos_data_customer(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

export function pos_data_member(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
export function pos_data_order(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
export function pos_data_profit(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
export function pos_data_trend(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 公共头部组件接口
export function get_time(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 商品销量统计
export function get_goods_category(config) {
  return requestPost({
    params: {
      action: 'get_goods_category'
    },
    data: {
      uniacid: 53
    }
  })
}


export function sale_goods_total(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 退款页面接口
export function refund_by_oroder_all(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

export function refund_by_oroder_piece(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// Top10
export function get_top_goods(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
// 收款构成
export function sale_goods_by_payType(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

export function recharge_by_payType_store(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

export function recharge_by_store(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

export function sale_goods_by_time(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}


export function mb_Trend(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}










