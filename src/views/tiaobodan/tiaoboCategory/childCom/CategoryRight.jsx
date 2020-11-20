
import React, { Component } from 'react'

import CategoryRightItem from './CategoryRightItem'

import BetterScroll from 'common/betterScroll/BetterScroll'
import { submitPurchase,searchProduct,submitWarehouseChange } from 'network/Api'
// import { store } from 'store/index'
import {  Toast } from 'antd-mobile';

import { store} from 'store/index'


import { savetiaoboGoods} from 'store/actionCreators'

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
            {goodsList.map((item, index) => {
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
    let num=Number(this.state.num)+Number(login)
    let price=Number(this.state.price)+Number(login)*Number(password)
   this.props.aa(num,price)
    console.log(num,price,login, password)
    let arr  = []
    arr.push(ww);

    let nums  = []
    nums.push(login);

    let prices  = []
    prices.push(password);
    this.setState({
      num,
      price,
      login:[...this.state.login, ...nums],
      password:[...this.state.password, ...prices],

      goods:[...this.state.goods, ...arr]
    },()=>{
      let num =this.state.login
    let price =this.state.password
    // console.log(this.props.id)
    // console.log(num.length)

    let aa = {}
    let arr =[]
    console.log(this.state.goods)

    num.map((v,k)=>{
      console.log(v,k)
       aa={
          amount:num[k]*price[k],
          barcodeid:this.state.goods[k].barcodeid,
          barcode:this.state.goods[k].code,
          img:this.state.goods[k].image,
          gnum:num[k],
          num:num[k],
          price:price[k],
          name:this.state.goods[k].name,
          unit_name:this.state.goods[k].unit_name,

        }
       return arr.push(aa);
    })
    console.log(arr)
    const tiaobogoods = savetiaoboGoods(arr)
    store.dispatch(tiaobogoods)
    })
    
}
  componentDidMount(){
    this.props.onRef(this)
  }

  myName = () =>{
    if(this.state.login[0]===undefined){
     Toast.info('请调拨商品后提交',1.5)
    }else{
      // console.log(this.state.login[0], this.state.password,this.state.goods)
    let num =this.state.login
    let price =this.state.password
    
    console.log(price)

    console.log(this.state.goods)

    let aa = {}
    let arr =[]
    

    num.map((v,k)=>{
      console.log(v,k)
       aa={
          stockid:this.state.goods[k].id,
          realnum:num[k],
        }
       return arr.push(aa);
    })
    // const goodsList = saveGoods(arr)
    // store.dispatch(goodsList)
    // console.log(arr)
    let itemData=arr
    console.log(itemData)
    // let purchaseData={
      
    //   subtotal:this.state.price,
    //   snum:this.state.num
    // }


    submitWarehouseChange({ action: 'submitWarehouseChange', data: {
      uniacid: store.getState().uniacid,
      uid:store.getState().uid,
      status:"2",
      warehouseChangeId:this.props.pdid,
      itemData:itemData,
    } }).then(res=>{
      console.log(res)
      if(res.data.status===4001){
        Toast.success(res.data.msg, 2)
        // this.home()
      }else{
        Toast.info(res.data.msg, 2)
      }
    })
    }
    
  } 
  home(){
    this.props.history.push('/home')
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps)
  }


  componentDidUpdate = () => {
    this.refs.scroll.BScroll.scrollTo(0, 0)
    this.refs.scroll.BScroll.refresh()

  }

}

export default CategoryRight;