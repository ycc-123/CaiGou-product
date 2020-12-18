
import React, { Component } from 'react'
import CategoryRightItem from './CategoryRightItem'
import BetterScroll from 'common/betterScroll/BetterScroll'
import { submitDamage } from 'network/Api'
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
    let arr  = []
    arr.push(ww);
    let nums  = []
    nums.push(login);
    this.setState({
      num,
      login:[...this.state.login, ...nums],
      goods:[...this.state.goods, ...arr]
    },()=>{
   this.props.aa(this.state.login,this.state.goods)

    })
}
  componentDidMount(){
    this.props.onRef(this)
  }

  myName = () =>{
    let num =this.state.login
    let aa = {}
    let arr =[]

    num.map((v,k)=>{
       aa={
        stockid:this.state.goods[k].id,
          num:num[k],
        }
       return arr.push(aa);
    })

    let itemData=arr
    submitDamage({ action: 'submitDamage', data: {
      uniacid: store.getState().uniacid,
      uid:store.getState().uid,
      damageId:this.props.bsid,
      remark:this.props.ckid==="1"?"":this.props.ckid,
      warehouseid:this.props.pdid,
      itemData:itemData,
    } }).then(res=>{
      if(res.data.status===4001){
        Toast.success(res.data.msg, 2)
        this.home()
      }else{
        Toast.info(res.data.msg, 2)
        if(res.data.msg==="库存不足无法减库存"){
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          
        }
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