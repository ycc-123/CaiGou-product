
import React, { Component } from 'react'
import CategoryRightItem from './CategoryRightItem'
import BetterScroll from 'common/betterScroll/BetterScroll'
import { editPackgeProduct,addPackgeProduct} from 'network/Api'
import {  Toast } from 'antd-mobile';
import { store } from "store/index";
import { 
  saveModifyPrice, 
  deleteModifyPrice} from 'store/actionCreators'

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
    addPackgeProduct({ action: 'addPackgeProduct', data: {
      uniacid: store.getState().uniacid,
      uid:store.getState().uid,
      packge_goodsid:this.props.bsid,
      barcodeid:ww.barcodeid,
      num:login
    } }).then(res=>{

    })
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
      let aa = {}
      let arr =[]
      this.state.goods.map((v,k)=>{
         aa={
            code: this.state.goods[k].code,
            img: this.state.goods[k].albumpath,
            name: this.state.goods[k].name,
            posprice: this.state.goods[k].posprice,
            memberprice: this.state.goods[k].memberprice,
            unitname: this.state.goods[k].unitname,
            num: this.state.login[k],
          }
         return aa;
      })
      // localStorage.setItem('packagedGoods',JSON.stringify(arr))
      const actionuid = saveModifyPrice(aa)
      store.dispatch(actionuid)
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
        id:this.state.goods[k].barcodeid,
          num:num[k],
        }
       return arr.push(aa);
    })

    let packge_ids=arr
    // editPackgeProduct({ action: 'editPackgeProduct', data: {
    //   uniacid: store.getState().uniacid,
    //   uid:store.getState().uid,
    //   goodsid:this.props.bsid,
    //   packge_ids:packge_ids
    // } }).then(res=>{
    //   if(res.data.status===4001){
    //     Toast.success(res.data.msg, 2)
        this.home()
    //   }else{
    //     Toast.info(res.data.msg, 2)
    //   }
    // })
  } 
  home(){
    let aa=[]
    const modifyPrice = deleteModifyPrice(aa)
      store.dispatch(modifyPrice)
    this.props.history.push('/home')
    Toast.success("新增打包商品成功",1.5)
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