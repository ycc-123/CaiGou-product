import {
    SAVE_UID, SAVE_UNIACID, SAVE_GOODS, SAVE_CANKU,SAVE_TIAOBOGOODS,SAVE_YOUHUIMINGXB,
    SAVE_PACKAGEDGOODS
} from './actionTypes'


const defaultState = {
    uid: '',
    uniacid: '',
    goodsList: [],
    tiaoboxqck: [],
    tiaobogoods: [],
    youhuimxbiao:[],
    packagedGoods:[]


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

        case SAVE_CANKU:
            newState.tiaoboxqck = action.data
            return newState

        case SAVE_TIAOBOGOODS:
            newState.tiaobogoods = action.data
            return newState

        case SAVE_YOUHUIMINGXB:
            newState.youhuimxbiao = action.data
            return newState

        case SAVE_PACKAGEDGOODS:
            newState.packagedGoods = action.data
            return newState

            


        default:
            break
    }
    return state
}