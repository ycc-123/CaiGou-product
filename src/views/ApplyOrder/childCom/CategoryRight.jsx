
import React, { Component } from 'react'
import CategoryRightItem from './CategoryRightItem'
import BetterScroll from 'common/betterScroll/BetterScroll'
import { createPurchaseApply } from 'network/Api'
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
   this.props.aa(num)
    let arr  = []
    arr.push(ww);
    let nums  = []
    nums.push(login);
    this.setState({
      num,
      login:[...this.state.login, ...nums],
      goods:[...this.state.goods, ...arr]
    })
}
  componentDidMount(){
    this.props.onRef(this)
  }

  myName = (e) =>{
    let num =this.state.login
    let aa = {}
    let arr =[]
    num.map((v,k)=>{
       aa={
          name:this.state.goods[k].name,
          barcode:this.state.goods[k].code,
          gnum:num[k],
        }
       return arr.push(aa);
    })
    let itemData=arr
    createPurchaseApply({ action: 'createPurchaseApply', data: {
      uniacid: store.getState().uniacid,
      uid:store.getState().uid,
      status:e,
      totalnum:this.state.num,
      remark:this.props.bz==="1"?"":this.props.bz,
      warehouseid:this.props.id,
      itemData:itemData,
    } }).then(res=>{
      if(res.data.status===4001){
        Toast.success(res.data.msg, 2)
        this.home()
      }else{
        Toast.info(res.data.msg, 2)
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