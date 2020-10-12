import {
    SAVE_GOODS, SAVE_UNIACID, SAVE_APP_CONFIG, SAVE_DEFAULT_ADDRESS, SAVE_DEFAULT_COUPON, SAVE_SUBMIT_STORE,
    SHOW_LOADING, HIDE_LOADING, INCREMENT_GOODS, DECREMENT_GOODS, GET_DATA, IS_SELECT, SELECT_ALL, DELETE_CART_GOODS,
    CATEGORY_TITLE, CATEGORY_GOODS, CATEGORY_INDEX, SAVE_USER_INFO, SAVE_CONTROL_SWITCH, SAVE_MEMBER_USERINFO, SAVE_STORE
} from './actionTypes'


const defaultState = {
    controlSwitch: {},
    loading: false,
    goodsList: [],
    cartGoods: [],
    selectAll: true,
    totalPrice: 0,
    totalNumber: 0,
    categoryIndex: 0,
    categoryGoods: [],
    cartNumber: 0,
    defaultcoupon: '',
    store: {
        storename: '未选择门店'
    },
    submitStore: {
        storename: '未选择门店'
    },
    memberUserInfo: {
        // id: '514224'
        id: ''
    },
    defaultAddress: {},

    // 开发
    appConfig: {
         uniacid: 53,
         wxUserInfo: {
             openid: 'oCKOnuICMVMDv62MPhSlmrfEpKQ8',
            //  lat:'27.77838',
            //  lng:'120.65518',
         }
     },
     userInfoWX: {
         openid: "oCKOnuICMVMDv62MPhSlmrfEpKQ8"
     },

    // 线上
    // appConfig: {
    //     uniacid: '',
    //     wxUserInfo: {
    //         openid: ''
    //     }
    // },
    // userInfoWX: {
    // },
}


export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        // 根据提交的方法type 进行不同的函数
        // 保存提交页门店
        case SAVE_SUBMIT_STORE:
            newState.submitStore = action.data
            return newState
        // 保存首页门店
        case SAVE_STORE:
            newState.store = action.data
            return newState
        // 保存商品
        case SAVE_GOODS:
            newState.goodsList.push(action.data)
            return newState
        // 显示加载动画
        case SHOW_LOADING:
            newState.loading = true
            return newState
        // 隐藏加载动画
        case HIDE_LOADING:
            newState.loading = false
            return newState
        // 增加商品数量
        case INCREMENT_GOODS:
            newState.cartGoods[action.index].num += 1
            return newState
        // 减少商品数量
        case DECREMENT_GOODS:
            newState.cartGoods[action.index].num -= 1
            return newState
        // 获取数据
        case GET_DATA:
            newState.cartGoods = action.data.sort()
            return newState
        // 是否选择
        case IS_SELECT:
            newState.cartGoods[action.index].checked = !newState.cartGoods[action.index].checked
            return newState
        // 是否全选
        case SELECT_ALL:
            newState.selectAll = !newState.selectAll
            return newState
        // 删除购物车商品
        case DELETE_CART_GOODS:
            newState.cartGoods.splice(action.index, 1)
            return newState
        // 保存分类左侧数据
        case CATEGORY_TITLE:
            newState.categoryGoods = action.data
            return newState
        // 改变分类左侧索引
        case CATEGORY_INDEX:
            newState.categoryIndex = action.index
            return newState
        // 保存分类右侧数据
        case CATEGORY_GOODS:
            newState.categoryGoods[action.index]['data'] = action.data
            return newState
        // 保存用户wx 相关信息openid....
        case SAVE_USER_INFO:
            newState.userInfoWX = action.data
            return newState
        // 保存uniacid
        case SAVE_UNIACID:
            newState.appConfig = action.data
            return newState
        // 保存全局功能点开关
        case SAVE_CONTROL_SWITCH:
            newState.controlSwitch = action.data;
            return newState;
        // 保存会员信息
        case SAVE_MEMBER_USERINFO:
            newState.memberUserInfo = action.data;
            return newState;

        case SAVE_APP_CONFIG:
            newState.appConfig = action.data;
            return newState;

        case SAVE_DEFAULT_ADDRESS:
            newState.defaultAddress = action.data;
            return newState;

        case SAVE_DEFAULT_COUPON:
            newState.defaultcoupon = action.data;
            return newState;
        default:
            break
    }
    return state
}