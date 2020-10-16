// import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { Toast } from 'antd-mobile'

// import { store } from 'store/index'
// import { getCartData } from 'store/actionCreators'

// import { _showCart, _cartApi } from 'network/cart'
// import { _detailApi } from 'network/detail'

// class CategorySwiperItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       num: this.props.goods.num
//     }
//     this.click = true
//   }
//   render() {
//     const { goods, ys, kc } = this.props
//     const show = parseInt(goods.num) === 0 ? 'block' : 'none'
//     const showNum = parseInt(goods.num) === 0 ? 'none' : 'block'
//     const kca = parseInt(kc) === 1 ? 'none' : 'block'
//     const ysa = parseInt(ys) === 1 ? 'none' : 'block'
//     return (
//       <div className='swiper-slide' onClick={(e) => { this.goDetail(e, goods.id) }}>
//         <img className='swiper-goods-img' src={goods.gimg} alt="图片" />
//         <div className='swiper-goods-info'>
//           <p>{goods.gname}</p>
//           <p>市场价: <span>￥</span> {goods.mprice}</p>
//           <p>
//             <span>￥</span>
//             {goods.oprice}
//             {/* <button className='category-button-left'>会员价</button>
//             <button className='category-button-right'><span>￥</span>4.99</button> */}
//           </p>
//           <p style={{ display: "flex", fontSize: ".32rem" }}>
//             <span style={{ display: ysa }}> 已售{goods.salenum}</span>
//             <span style={{ display: kca }}> 库存{goods.isshow === '3' ? '0' : goods.gnum} </span>
//           </p>
//           {goods.selltype === '0' && goods.hasoption === '0' &&
//             <img className='category-goods-img'
//               src='https://res.lexiangpingou.cn/images/vip/cart2.png'
//               alt=""
//               style={{ display: show }}
//               onClick={(e) => { this.addCart(e) }} />
//           }
//           {goods.selltype === '0' && goods.hasoption !== '0' &&
//             <img className='category-goods-img'
//               src='https://res.lexiangpingou.cn/images/vip/cart2.png'
//               alt=""
//               style={{ display: show }} />
//           }
//           {goods.selltype === '1' && <button className='category-button' >去开团</button>}
//           {(goods.isshow === '3' || goods.gnum === '0') && <img src='https://res.lexiangpingou.cn/images/vip/maiwan.png' className='＋▂＋' alt='' />}
//           {goods.selltype === '0' && <div className='calculate_1' style={{ display: showNum, padding: '.6rem .4rem .4rem .6rem', right: '-.4rem', bottom: '-.4rem' }} onClick={(e) => { this.addCart(e) }}>
//             <div className='decrement_1' onClick={(e) => { this.editCart(e) }}>
//             </div>
//             {goods.num}
//             <div className='increment_1' onClick={(e) => { this.editCart(e) }}>
//             </div>
//           </div>}
//         </div>
//       </div>
//     )
//   }


//   shouldComponentUpdate = (nextProps, nextState) => {
//     return JSON.stringify(this.state) !== JSON.stringify(nextState) || this.props.history.location.pathname === '/category'
//   }

//   goDetail = (e, id) => {
//     e.stopPropagation()
//     const { isApplet } = store.getState().appConfig
//     const { goods } = this.props
//     const { appConfig, userInfoWX } = store.getState()
//     if (Number(goods.one_group) === 1) {
//       const config = {
//         action: 'goods_detail',
//         data: {
//           uniacid: appConfig.uniacid,
//           openid: userInfoWX.openid,
//           id
//         }
//       }
//       _detailApi(config).then(res => {
//         if (res.data.data.groupinfo.tuan_id !== '' && res.data.data.groupinfo.tuan_id !== 0) {

//           isApplet ? window.navigateToWebWiew(`#/group/${res.data.data.groupinfo.tuan_id}`) : this.props.history.push({ pathname: `/group/${res.data.data.groupinfo.tuan_id}` })
//           // this.props.history.push({ pathname: `/group/${res.data.data.groupinfo.tuan_id}` })
//         } else {
//           // this.props.history.push({ pathname: `/detail/${id}/1` })
//           isApplet ? window.navigateToWebWiew(`#/detail/${id}/1`) : this.props.history.push(`/detail/${id}/1`)
//         }
//       })
//     } else {
//       if (this.props.goods.num === 0) {
//         isApplet ? window.navigateToWebWiew(`#/detail/${id}/1`) : this.props.history.push(`/detail/${id}/1`)
//       } else {
//         // this.props.history.push({ pathname: `/detail/${id}/${this.props.goods.num}` })
//         isApplet ? window.navigateToWebWiew(`#/detail/${id}/${this.props.goods.num}`) : this.props.history.push(`/detail/${id}/${this.props.goods.num}`)
//       }
//     }

//   }





//   // 添加到购物车
//   addCart = async e => {
//     e.stopPropagation()
//     let { goods } = this.props
//     if (goods.isshow !== '3') {
//       if (goods.gnum > 0) {
//         goods.num = 1
//         const add_config = {
//           action: 'cartAdd',
//           data: {
//             uniacid: store.getState().appConfig.uniacid,
//             openid: store.getState().userInfoWX.openid,
//             gid: goods.id,
//             num: goods.num
//           }
//         }
//         const result = await _cartApi(add_config)
//         const action = getCartData(result.data.data)
//         store.dispatch(action)
//         const cartGoodsItem = result.data.data.find(item => {
//           return item.sid === goods.id
//         })
//         this.setState({
//           num: cartGoodsItem.num
//         })
//       }
//     }
//   }

//   // 修改购物车
//   editCart = async e => {
//     e.stopPropagation()
//     const { goods } = this.props
//     // 判断是否为加
//     if (e.target.className === 'increment_1') {
//       this.click = false
//       // 存在限购
//       if (goods.one_limit) {
//         if (parseInt(goods.one_limit) === parseInt(goods.num)) {
//           this.click = true
//           Toast.info(`当前商品最大可购买${goods.one_limit}`, 1)
//         } else {
//           goods.num = parseInt(goods.num) + 1
//           const add_config = {
//             action: 'cartAdd',
//             data: {
//               uniacid: store.getState().appConfig.uniacid,
//               openid: store.getState().userInfoWX.openid,
//               gid: goods.id,
//               num: goods.num
//             }
//           }
//           const result = await _cartApi(add_config)
//           if (result.data.status === 200) {
//             const action = getCartData(result.data.data)
//             store.dispatch(action)
//             const cartGoodsItem = result.data.data.find(item => {
//               return item.sid === goods.id
//             })
//             this.setState({
//               num: cartGoodsItem.num
//             }, () => {
//               this.click = true
//             })
//           } else {
//             // 错误处理
//             goods.num = parseInt(goods.num) - 1
//             Toast.info(result, 1)
//             this.click = true
//           }

//         }
//       } else if (parseInt(goods.num) === parseInt(goods.gnum)) {
//         Toast.info(`当前商品不能超过库存${goods.gnum}`, 1)
//       } else { // 不存在限购直接进来
//         goods.num = parseInt(goods.num) + 1
//         const add_config = {
//           action: 'cartAdd',
//           data: {
//             uniacid: store.getState().appConfig.uniacid,
//             openid: store.getState().userInfoWX.openid,
//             gid: goods.id,
//             num: goods.num
//           }
//         }
//         const result = await _cartApi(add_config)
//         const action = getCartData(result.data.data)
//         store.dispatch(action)
//         const cartGoodsItem = result.data.data.find(item => {
//           return item.sid === goods.id
//         })
//         this.setState({
//           num: cartGoodsItem.num
//         }, () => {
//           setTimeout(() => {
//             this.click = true
//           })
//         })
//       }
//     } else if (e.target.className === 'decrement_1' && this.click) {  // 减
//       this.click = false
//       goods.num = parseInt(goods.num) - 1
//       if (goods.num === 0) {
//         const del_cart = {
//           action: 'cartDel',
//           data: {
//             uniacid: store.getState().appConfig.uniacid,
//             cart_id: store.getState().cartGoods.find(item => item.sid === goods.id).id
//           }
//         }
//         const del = await _cartApi(del_cart)
//         const result = await _showCart()
//         const action = getCartData(result.data.data)
//         store.dispatch(action)
//         this.setState({ num: 0 }, () => {
//           setTimeout(() => {
//             this.click = true
//           }, 100)
//         })
//       } else {
//         const add_config = {
//           action: 'cartAdd',
//           data: {
//             uniacid: store.getState().appConfig.uniacid,
//             openid: store.getState().userInfoWX.openid,
//             gid: goods.id,
//             num: goods.num
//           }
//         }
//         const result = await _cartApi(add_config)
//         const action = getCartData(result.data.data)
//         store.dispatch(action)
//         const cartGoodsItem = result.data.data.find(item => {
//           return item.sid === goods.id
//         })
//         this.setState({
//           num: cartGoodsItem.num
//         }, () => {
//           setTimeout(() => {
//             this.click = true
//           }, 100)
//         })
//       }
//     }
//   }

// }

// export default withRouter(CategorySwiperItem)