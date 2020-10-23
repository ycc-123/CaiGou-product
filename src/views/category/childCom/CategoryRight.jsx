
import React, { Component } from 'react'

import CategoryRightItem from './CategoryRightItem'

import BetterScroll from 'common/betterScroll/BetterScroll'
import { submitPurchase } from 'network/Api'
// import { store } from 'store/index'

class CategoryRight extends Component {
  constructor(){
    super()
    this.state={
      login:'', 
      password:'',
      goods:{},
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
    const { id,goodsList, ys, kc } = this.props
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
  getChildrenMsg = (result,login, password,goods) => {
    let num=Number(this.state.num)+Number(login)
    let price=Number(this.state.price)+Number(login)*Number(password)
   this.props.aa(num,price)
    console.log(num,price,login, password)
    // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
    this.setState({
      num,
      price,
      login,
      password,
      goods
    })
}
  componentDidMount(){
    this.props.onRef(this)
  }

  myName = () =>{
    console.log(this.state.login, this.state.password,this.state.goods)
    let num =this.state.login
    let price =this.state.password
    console.log(this.props.id)
    // this.child.myName()
    let itemData=[{
      amount:num*price,
      barcodeid:this.state.goods.barcodeid,
      barcode:this.state.goods.code,
      gnum:num,
      num:num,
      price:price
  }]
    let purchaseData={
      subtotal:price,
      snum:num
    }
    submitPurchase({ action: 'submitPurchase', data: {
      uniacid: "53",
      uid:"2271",
      type:"1",
      purchaseId:this.props.id,
      status:"2",
      itemData:itemData,
      purchaseData:purchaseData
    } }).then(res=>{
      console.log(res)
    })
  } 

  shouldComponentUpdate = (nextProps, nextState) => {
    // console.log(this.props)
    return JSON.stringify(this.props) !== JSON.stringify(nextProps)
  }


  componentDidUpdate = () => {
    // 默认每次加载x=0，y=0 不然会有bug
    // console.log(this)
    /* console.log('进来了') */
    this.refs.scroll.BScroll.scrollTo(0, 0)
    this.refs.scroll.BScroll.refresh()

  }
}

export default CategoryRight;