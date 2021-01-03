import {
    SAVE_UID, SAVE_UNIACID, SAVE_GOODS, SAVE_CANKU, SAVE_TIAOBOGOODS, SAVE_YOUHUIMINGXB,
    SAVE_PACKAGEDGOODS
} from './actionTypes'


const defaultState = {
    uid: '',
    uniacid: '',
    goodsList: [],
    tiaoboxqck: [],
    tiaobogoods: [],
    youhuimxbiao: [],
    packagedGoods: []


}


// export default (state = defaultState, action) => {
//     let newState = JSON.parse(JSON.stringify(state))
//     switch (action.type) {
//         // 保存商品
//         case SAVE_GOODS:
//             // newState.goodsList = action.data
//             return [newState, ...action.data]

//         case SAVE_UID:
//             newState.uid = action.data
//             return newState

//         case SAVE_UNIACID:
//             newState.uniacid = action.data
//             return newState

//         case SAVE_CANKU:
//             newState.tiaoboxqck = action.data
//             return newState

//         case SAVE_TIAOBOGOODS:
//             newState.tiaobogoods = action.data
//             return newState

//         case SAVE_YOUHUIMINGXB:
//             newState.youhuimxbiao = action.data
//             return newState

//         case SAVE_PACKAGEDGOODS:
//             newState.packagedGoods = action.data
//             return newState
//         default:
//             break
//     }
//     return state
// }

function reducer(state = defaultState, action) {
    //  reducer 是一个纯函数
    switch (action.type) {
      case SAVE_GOODS:
        return { ...state, goodsList: action.data }
      case SAVE_UID:
        return { ...state, uid: action.data }
      case SAVE_UNIACID:
        return { ...state, uniacid: action.data }
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