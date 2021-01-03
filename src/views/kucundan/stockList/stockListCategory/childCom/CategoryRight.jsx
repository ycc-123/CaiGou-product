
import React, { Component } from 'react'

import CategoryRightItem from './CategoryRightItem'

import BetterScroll from 'common/betterScroll/BetterScroll'
import { submitInventory, getStockList } from 'network/Api'
// import { store } from 'store/index'
import { Toast } from 'antd-mobile';
import { LoadingMore } from 'common/loading'
import { store } from 'store/index'


import { saveGoods } from 'store/actionCreators'

class CategoryRight extends Component {
  constructor() {
    super()
    this.state = {
      login: [],
      password: [],
      goods: [],
      num: '',
      price: '',
      goodsList: [],
      index: 0,
      limit: "10",
      page: 1,
      goods_num:0
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
    console.log(this.props.goodsList)
    let goods =this.state.goodsList
    console.log(Number(this.state.goodsList.length))
    return (
      <div className='categoryRight'>
        <ul>
          <BetterScroll config={scollConfig} style={scrollStyle} ref='scroll' loadMore={this.loadMore} isLoadMore={this.isLoadMore}>
            {(Number(this.state.goods_num)>9 ? goods: goodsList).map((item, index) => {
              return (
                  <CategoryRightItem key={item.id + index} goods={item} parent={this} />
              )
            })}
            {
              goodsList.length > 0 &&
              <LoadingMore isLoading={this.isLoadMore} />
            }
          </BetterScroll>
        </ul>
      </div>
    );
  }
  getChildrenMsg = (result, login, password, ww) => {
    //   let num=Number(this.state.num)+Number(login)
    //   let price=Number(this.state.price)+Number(login)*Number(password)
    //  this.props.aa(login, password)
    // console.log(login, password)
    //   let arr  = []
    //   arr.push(ww);
    let nums = []
    nums.push(login);

    let prices = []
    prices.push(password);
    this.setState({
      // num,
      // price,
      login: [...this.state.login, ...nums],
      password: [...this.state.password, ...prices]

      // goods:[...this.state.goods, ...arr]
    })
  }
  componentDidMount() {
    this.props.onRef(this)
  }

  myName = (e) => {
    if (this.state.login[0] === undefined) {
      submitInventory({
        action: 'submitInventory', data: {
          uniacid: store.getState().uniacid,
          uid: store.getState().uid,
          status: e,
          warehouseid: this.props.ckid,
          inventoryId: this.props.pdid,
          itemData: this.props.itemData,
        }
      }).then(res => {
        if (res.data.status === 4001) {
          // console.log(res)
          Toast.success(res.data.msg, 2)
          this.props.history.push('/home')

        } else {
          Toast.info(res.data.msg, 2)
        }
      })
    } else {
      // console.log(this.state.login, this.state.password)
      let num = this.state.login
      let price = this.state.password
      // console.log(this.props.pdid)
      // console.log(this.props.ckid)

      // console.log(num.length)

      let aa = {}
      let arr = []


      num.map((v, k) => {
        // console.log(v,k)
        aa = {
          stockid: this.state.password[k].id,
          realnum: v,

        }
        return arr.push(aa);
      })
      // const goodsList = saveGoods(arr)
      // store.dispatch(goodsList)
      // console.log(arr)
      let itemData = arr
      // console.log(itemData)
      // let purchaseData={

      //   subtotal:this.state.price,
      //   snum:this.state.num
      // }
      submitInventory({
        action: 'submitInventory', data: {
          uniacid: store.getState().uniacid,
          uid: store.getState().uid,
          status: e,
          warehouseid: this.props.ckid,
          inventoryId: this.props.pdid,
          itemData: itemData,
        }
      }).then(res => {
        // console.log(res)
        if (res.data.status === 4001) {
          Toast.success(res.data.msg, 2)
          this.props.history.push('/home')
        } else {
          Toast.info(res.data.msg, 2)
        }
      })
    }

  }
  home() {

  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps)
  }


  componentDidUpdate = () => {
    this.refs.scroll.BScroll.scrollTo(0, 0)
    this.refs.scroll.BScroll.refresh()

  }
  loadMore = () => {
    if (this.isLoadMore) {
      getStockList({
        action: 'getStockList', data: {
          uniacid: store.getState().uniacid,
          uid: store.getState().uid,
          // warehouseid: this.state.cankuID,
          categoryid: this.props.flid,
          limit: "10",
          page: this.state.page
        }
      }).then(res => {
        const { goodsList } = this.props

        // 如果长度不等于得时候加载 那么是到底了
        if (res.data.data.data.length < this.state.limit) {
          this.isLoadMore = false
        }
        this.setState({
          goodsList: [...this.state.goodsList, ...res.data.data.data],
          goods_num:res.data.data.data.length,
          loadingMore: false
        }, () => {
          console.log(this.state.goodsList)
          let page = Number(this.state.page)
          this.setState({
            page: page += 1
          })
          this.refs.scroll.BScroll.finishPullUp()
          this.refs.scroll.BScroll.refresh()
        })
      })
    } else { }
  }
}

export default CategoryRight;