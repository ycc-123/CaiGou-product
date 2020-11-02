
import React, { Component } from 'react'

import CategoryRightItem from './CategoryRightItem'

import BetterScroll from 'common/betterScroll/BetterScroll'
import { createPurchaseApply } from 'network/Api'
// import { store } from 'store/index'
import {  Toast } from 'antd-mobile';
import { store } from "store/index";
class CategoryRight extends Component {
  constructor(){
    super()
    this.state={
      login:[], 
      password:[],
      goods:[],
      num:'',
      price:'',
    }
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
    const { goodsList} = this.props
    console.log(this.props)
    return (
      <div className='categoryRight'>
        <ul>
          <BetterScroll config={scollConfig} style={scrollStyle} ref='scroll'>
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
  getChildrenMsg = (result,login,ww) => {
    let num=Number(this.state.num)+Number(login)
    // let price=Number(this.state.price)+Number(login)*Number(password)
   this.props.aa(num)
    let arr  = []
    arr.push(ww);

    let nums  = []
    nums.push(login);

    // let prices  = []
    // prices.push(password);
    this.setState({
      num,
      // price,
      login:[...this.state.login, ...nums],
      // password:[...this.state.password, ...prices],
      goods:[...this.state.goods, ...arr]
    })
}
  componentDidMount(){
    this.props.onRef(this)
  }

  myName = () =>{
    console.log(this.state.login[0],this.state.goods)
    let num =this.state.login
    // let price =this.state.password
    console.log(this.props.id)
    // this.child.myName()
    // let itemData=[]
    // let aa=''
    console.log(num.length)

    let aa = {}
    let arr =[]

    num.map((v,k)=>{
      console.log(v,k,this.state.goods[k].name)
       aa={
          name:this.state.goods[k].name,
          barcode:this.state.goods[k].code,
          gnum:num[k],
        }
       return arr.push(aa);
    })

    console.log(arr)
    let itemData=arr
    console.log(itemData)
    createPurchaseApply({ action: 'createPurchaseApply', data: {
      uniacid: store.getState().uniacid,
      uid:store.getState().uid,
      totalnum:this.state.num,
      // purchaseId:this.props.id,
      remark:"",
      itemData:itemData,
      // purchaseData:purchaseData
    } }).then(res=>{
      console.log(res)
      if(res.data.status===4001){
        Toast.success(res.data.msg, 2)
        this.home()
      }else{
        Toast.fail(res.data.msg, 2)
      }
    })
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