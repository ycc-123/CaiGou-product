import {
    SAVE_UID, SAVE_UNIACID,SAVE_GOODS
} from './actionTypes'


const defaultState = {
    uid: '',
    uniacid: '',
    goodsList:[]


}


export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
          // 保存商品
          case SAVE_GOODS:
            newState.goodsList = action.data
            return newState

        case SAVE_UID:
            newState.uid = action.data
            return newState

        case SAVE_UNIACID:
            newState.uniacid = action.data
            return newState
        
        default:
            break
    }
    return state
}