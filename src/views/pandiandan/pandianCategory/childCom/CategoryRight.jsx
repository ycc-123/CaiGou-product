
import React, { Component } from 'react'
import CategoryRightItem from './CategoryRightItem'
import BetterScroll from 'common/betterScroll/BetterScroll'
import { submitInventory } from 'network/Api'
import {  Toast } from 'antd-mobile';
import { store} from 'store/index'

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
   this.props.aa(login, password)
    let nums  = []
    nums.push(login);
    let prices  = []
    prices.push(password);
    this.setState({
      login:[...this.state.login, ...nums],
      password:[...this.state.password, ...prices]
    },()=>{
    })
}
  componentDidMount(){
    this.props.onRef(this)
  }

  myName = (e) =>{
    if(this.state.login[0]===undefined){
      Toast.info("请盘点商品后提交或保存")
    }else{
    let num =this.state.login
    let aa = {}
    let arr =[]
    num.map((v,k)=>{
       aa={
        stockid:this.state.password[k].id,
        realnum:v,
        }
       return arr.push(aa);
    })
    let itemData=arr
    submitInventory({ action: 'submitInventory', data: {
      uniacid: store.getState().uniacid,
      uid:store.getState().uid,
      status:e,
      warehouseid:this.props.ckid,
      inventoryId:this.props.pdid,
      itemData:itemData,
    } }).then(res=>{
      if(res.data.status===4001){
        Toast.success(res.data.msg, 1.5)
        this.home()
      }else{
        Toast.info(res.data.msg, 1.5)
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