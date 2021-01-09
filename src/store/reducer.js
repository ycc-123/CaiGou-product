import {
  DELET_SQGOODS,SAVE_UID, SAVE_UNIACID, SAVE_GOODS,DELET_MODIFYPRICE,SAVE_MODIFYPRICE,

  SAVE_CANKU, SAVE_TIAOBOGOODS, SAVE_YOUHUIMINGXB,
  SAVE_PACKAGEDGOODS, SAVE_SQGOODS, 
} from './actionTypes'


const defaultState = {
  uid: '',
  uniacid: '',
  goodsList: [],

  tiaoboxqck: [],
  tiaobogoods: [],
  youhuimxbiao: [],
  packagedGoods: [],
  sqgoods: [],

  modifyPrice: []

}

function reducer(state = defaultState, action) {
  //  reducer 是一个纯函数
  switch (action.type) {
    // 清楚采购数据
    case DELET_SQGOODS:
      return { ...state, goodsList: [] }
    // 把采购数据添加进来
    case SAVE_GOODS:
      return { ...state, goodsList: [...state.goodsList, action.data] }

    // 清楚调价商品数据
    case DELET_MODIFYPRICE:
      return { ...state, modifyPrice: [] }

    // 把调价商品数据添加进来
    case SAVE_MODIFYPRICE:
      return { ...state, modifyPrice: [...state.modifyPrice, action.data] }







    case SAVE_UID:
      return { ...state, uid: action.data }
    case SAVE_UNIACID:
      return { ...state, uniacid: action.data }



    case SAVE_SQGOODS:
      return { ...state, sqgoods: action.data }
    case SAVE_CANKU:
      return { ...state, tiaoboxqck: action.data }
    case SAVE_TIAOBOGOODS:
      return { ...state, tiaobogoods: action.data }
    case SAVE_YOUHUIMINGXB:
      return { ...state, youhuimxbiao: action.status }
    case SAVE_PACKAGEDGOODS:
      return { ...state, packagedGoods: action.data }
    default:
      return state;
  }
}

export default reducer;