import {
    SAVE_UID, SAVE_UNIACID
} from './actionTypes'


const defaultState = {
    uid: '',
    uniacid: '',

}


export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {

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