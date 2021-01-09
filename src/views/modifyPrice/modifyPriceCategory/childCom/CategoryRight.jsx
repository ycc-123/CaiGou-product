
import React, { Component } from 'react'
import CategoryRightItem from './CategoryRightItem'
import BetterScroll from 'common/betterScroll/BetterScroll'
import {submitPriceModify } from 'network/Api'
import {  Toast } from 'antd-mobile';
import { store} from 'store/index'
import { deleteModifyPrice } from 'store/actionCreators'

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
    return (
      <div className='categoryRight'>
        <ul>
          <BetterScroll config={scollConfig} style={scrollStyle} ref='scroll' loadMore={this.loadMore}
                    isLoadMore={this.isLoadMore}>
            {goodsList.map((item, index) => {
              return (
                <CategoryRightItem key={item.id + index} goods={item} parent={ this } id={this.props.id}/>
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
  //  this.props.aa(num,price,this.state.goods)
    let arr  = []
    arr.push(ww);

    let nums  = []
    nums.push(login);

    let prices  = []
    prices.push(password);
    console.log(nums,prices)
    this.setState({
      num,
      price,
      login:[...this.state.login, ...nums],
      password:[...this.state.password, ...prices],
      goods:[...this.state.goods, ...arr]
    },()=>{
   this.props.aa(this.state.num,this.state.price,this.state.goods)
      console.log(this.state.login,this.state.password,this.state.goods)
   
    // const goodsList = saveGoods(arr)
    // store.dispatch(goodsList)
    })
}
  componentDidMount(){
    this.props.onRef(this)
  }

  myName = (e) =>{
    // if(this.state.login[0]===undefined){
    //  Toast.info('请调价商品后提交',1.5)
    // }else{
    let num =this.state.login
    let price =this.state.password
    let aa = {}
    let arr =[]
    num.map((v,k)=>{
      aa={
          barcodeid:this.state.goods[k].barcodeid,
          newmemberprice:price[k],
          newposprice:num[k],
        }
       return arr.push(aa);
    })
    // const goodsList = saveGoods(arr)
    // store.dispatch(goodsList)
    let itemData=arr
    submitPriceModify({ action: 'submitPriceModify', data: {
      uniacid: store.getState().uniacid,
      uid:store.getState().uid,
      status:e,
      id:this.props.id,
      // itemData:itemData,
    } }).then(res=>{
      if(res.data.status===4001){
        Toast.success(res.data.msg, 2)
        this.home()
      }else{
        Toast.info(res.data.msg, 2)
      }
    })
    // }
  } 
  home(){
    let aa=[]
    const modifyPrice = deleteModifyPrice(aa)
      store.dispatch(modifyPrice)
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