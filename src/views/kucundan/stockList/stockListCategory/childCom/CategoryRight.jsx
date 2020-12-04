
import React, { Component } from 'react'

import CategoryRightItem from './CategoryRightItem'

import BetterScroll from 'common/betterScroll/BetterScroll'
import { submitInventory,searchProduct } from 'network/Api'
// import { store } from 'store/index'
import {  Toast } from 'antd-mobile';

import { store} from 'store/index'


import { saveGoods} from 'store/actionCreators'

class CategoryRight extends Component {
  constructor(){
    super()
    this.state={
      login:[], 
      password:[],
      goods:[],
      num:'',
      price:'',
      goodsList:[],
      index:0,
      limit:"10",
      page:1,
    }
    this.isLoadMore = true
  }
  render() {
    const scollConfig = {
      probeType: 1
    }
    const scrollStyle = {
      top: '0',
      bottom: '0',
      width: '7.5rem',
    }
    const { goodsList } = this.props
    console.log(this.props)
    return (
      <div className='categoryRight'>
        <ul>
          <BetterScroll config={scollConfig} style={scrollStyle} ref='scroll' loadMore={this.loadMore}
                    isLoadMore={this.isLoadMore}>
            {Boolean(goodsList)===false?"":goodsList.map((item, index) => {
              return (
                <CategoryRightItem key={item.id + index} goods={item} parent={ this }/>
              )
            })}
          </BetterScroll>
        </ul>
      </div>
    );
  }
  getChildrenMsg = (result,login, password,ww) => {
  //   let num=Number(this.state.num)+Number(login)
  //   let price=Number(this.state.price)+Number(login)*Number(password)
  //  this.props.aa(login, password)
    console.log(login, password)
  //   let arr  = []
  //   arr.push(ww);
    let nums  = []
    nums.push(login);

    let prices  = []
    prices.push(password);
    this.setState({
      // num,
      // price,
      login:[...this.state.login, ...nums],
      password:[...this.state.password, ...prices]

      // goods:[...this.state.goods, ...arr]
    })
}
  componentDidMount(){
    this.props.onRef(this)
  }

  myName = (e) =>{
    if(this.state.login[0]===undefined){
      submitInventory({ action: 'submitInventory', data: {
        uniacid: store.getState().uniacid,
        uid:store.getState().uid,
        status:e,
        warehouseid:this.props.ckid,
        inventoryId:this.props.pdid,
        itemData:this.props.itemData,
      } }).then(res=>{
        if(res.data.status===4001){
          console.log(res)
          Toast.success(res.data.msg, 2)
          this.props.history.push('/home')

        }else{
          Toast.info(res.data.msg, 2)
        }
      })
    }else{
      console.log(this.state.login, this.state.password)
    let num =this.state.login
    let price =this.state.password
    console.log(this.props.pdid)
    console.log(this.props.ckid)

    // console.log(num.length)

    let aa = {}
    let arr =[]
    

    num.map((v,k)=>{
      console.log(v,k)
       aa={
        stockid:this.state.password[k].id,
        realnum:v,
  
        }
       return arr.push(aa);
    })
    // const goodsList = saveGoods(arr)
    // store.dispatch(goodsList)
    console.log(arr)
    let itemData=arr
    console.log(itemData)
    // let purchaseData={
      
    //   subtotal:this.state.price,
    //   snum:this.state.num
    // }
    submitInventory({ action: 'submitInventory', data: {
      uniacid: store.getState().uniacid,
      uid:store.getState().uid,
      status:e,
      warehouseid:this.props.ckid,
      inventoryId:this.props.pdid,
      itemData:itemData,
    } }).then(res=>{
      console.log(res)
      if(res.data.status===4001){
        Toast.success(res.data.msg, 2)
        this.props.history.push('/home')
      }else{
        Toast.info(res.data.msg, 2)
      }
    })
    }
    
  } 
  home(){
    
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps)
  }


  componentDidUpdate = () => {
    this.refs.scroll.BScroll.scrollTo(0, 0)
    this.refs.scroll.BScroll.refresh()

  }
//   loadMore = () => {
//     // 加载数据时转圈
//     let loading = true
//     setTimeout(() => {
//         if (loading) {
//             this.setState({
                
//                 loadingMore: true
//             })
//         }
//     }, 1000)
//     if (this.isLoadMore) {
      
//       searchProduct({
//         action: 'searchProduct', data: {
//           uniacid: store.getState().uniacid,
//           uid: store.getState().uid,
//           // categoryid: this.props.Id[0].id,
//         }
//       }).then(res => {
//         const { goodsList } = this.props

//             // 如果长度不等于得时候加载 那么是到底了
//             if (res.data.data.data.length < this.state.limit) {
//                 this.isLoadMore = false
//                 /* let bottomTip = document.querySelector('.bottom-tip')
//                 bottomTip.style.visibility = 'visible'
//                 bottomTip.innerHTML = '商品已经全部加载完成' */
//             }
//             this.setState({
//               goodsList: [...goodsList, ...res.data.data.data],
           
//                 loadingMore: false
//             }, () => {
//                 let page=Number(this.state.page)
//                 this.setState({
//                     page: page += 1
//                 })

//                 loading = false
//                 this.refs.scroll.BScroll.finishPullUp()
//                 this.refs.scroll.BScroll.refresh()
//             })
//         })
//     } else {
//         /* let bottomTip = document.querySelector('.bottom-tip')
//         bottomTip.style.visibility = 'visible'
//         bottomTip.innerHTML = '商品已经全部加载完成' */
//     }
// }
}

export default CategoryRight;