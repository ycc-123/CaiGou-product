import {
  SAVE_UID, SAVE_UNIACID,SAVE_GOODS,SAVE_CANKU,SAVE_TIAOBOGOODS,SAVE_YOUHUIMINGXB
} from './actionTypes'


/* 
 *
 *返回一个对象
 * 
 * 
*/

// 保存uniacid和uid

export const saveUserUniacidAction = data => ({
  type: SAVE_UNIACID,
  data
})

export const saveUserUidAction = (data) => ({
  type: SAVE_UID,
  data
})
export const saveGoodsAction = (data) => ({
  type: SAVE_GOODS,
  data
})
export const saveCankuAction = (data) => ({
  type: SAVE_CANKU,
  data
})
export const savetiaoboGoodsAction = (data) => ({
  type: SAVE_TIAOBOGOODS,
  data
})
export const saveyouhuimxbiaoAction = (data) => ({
  type: SAVE_YOUHUIMINGXB,
  data
})


// saveUserUid, saveUserUniacid

/*
*
*
*
*/
export const saveCanku = (data) => {
  return dispatch => {
    const action = saveCankuAction(data)
    dispatch(action)
  }
}

export const saveUserUid = (data) => {
  return dispatch => {
    const action = saveUserUidAction(data)
    dispatch(action)
  }
}

export const saveUserUniacid = (data) => {
  return dispatch => {
    const action = saveUserUniacidAction(data)
    dispatch(action)
  }
}

export const saveGoods = (data) => {
  return dispatch => {
    const action = saveGoodsAction(data)
    dispatch(action)
  }
}

export const savetiaoboGoods = (data) => {
  return dispatch => {
    const action = savetiaoboGoodsAction(data)
    dispatch(action)
  }
}

export const saveyouhuimxbiao = (data) => {
  return dispatch => {
    const action = saveyouhuimxbiaoAction(data)
    dispatch(action)
  }
}



