import React, { Component } from 'react'
import styled from 'styled-components'
import { getOrderDetail } from 'network/Api'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import Swiper from 'swiper'
// import "swiper/swiper.less"
import "swiper/css/swiper.css"
export default class Shouyinmxb extends Component {
  constructor() {
    super()
    this.state = {
      linshou: [],
      goodsSearch: '',
      data: [],
      order: {}
    }
  }
  componentDidMount() {
    new Swiper('.swiper-container', {
      autoplay:true,
      direction: 'horizontal', // 垂直切换选项
      loop: false, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
    getOrderDetail({
      action: 'getOrderDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        orderid: this.props.match.params.id
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.status === 4001) {
        this.setState({
          data: res.data.data.data,
          order: res.data.data.order
        }, () => {
          this.refs.scroll.BScroll.finishPullUp()
          this.refs.scroll.BScroll.refresh()
        })
      } else {
        Toast.info(res.data.msg, 2)
      }
    })
  }
  goodsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  search() {
    getOrderDetail({
      action: 'getOrderDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        search: this.state.goodsSearch,
        orderid: this.props.match.params.id
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        this.setState({
          data: res.data.data.data,
          order: res.data.data.order
        }, () => {
          this.refs.scroll.BScroll.finishPullUp()
          this.refs.scroll.BScroll.refresh()
        })
      } else {
        Toast.info(res.data.msg, 2)
      }
    })

  }
  render() {
    const scrollConfig = {
			probeType: 1
		}
    let Color = ''
    if (this.state.order.statusName === "已付款") {
      Color = "#00B500"
    } else if (this.state.order.statusName === "未付款") {

    } else if (this.state.order.statusName === "部分退款") {
      Color = "red"
    } else if (this.state.order.statusName === "全部退款") {
      Color = "red"
    }
    return (
      <ShouyinmxbStyle>
        <DocumentTitle title={'收银明细表'} />
        <div className='search'>
          <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="goodsSearch"
            onChange={this.goodsChange.bind(this)}
            value={this.state.goodsSearch} />
          <div className='img' onClick={() => { this.search() }}>
            <img className='img-search' src="https://res.lexiangpingou.cn/images/applet/99968search.png" alt="search" />
          </div>
        </div>
        {
          <div className='bj'>
            <div className='dan'>
              <div className='dan-top'>
                <p>
                  <img src="https://res.lexiangpingou.cn/images/applet/99962dingdan.png" alt="" />
                </p>
                <div className='t-right'>
                  <div className='caigoudanhao'>{this.state.order.orderno}</div>
                  <div className='zuantai' style={{ color: Color }}>{this.state.order.statusName}</div>
                </div>

              </div>
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className='dan-footer' style={{ paddingTop: ".25rem" }}>
                      <p >单据日期：{this.state.order.createtime}</p>
                      <p>所属商家：{this.state.order.storeName}</p>
                      <p>收银员：{this.state.order.createName}</p>
                      <p>支付方式：{this.state.order.pay_type_name}</p>
                      <p>应收金额：{this.state.order.price}</p>
                      <p>实收金额：{this.state.order.pay_price}</p>
                      <p>找零金额：{this.state.order.countsm}</p>
                      <p>会员名称：{this.state.order.addname}</p>
                      <p style={{ paddingBottom: ".25rem", marginBottom: "0" }}>手机号：{this.state.order.mobile}</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className='dan-footer' style={{ paddingTop: ".25rem" }}>
                      <p >使用积分：{this.state.order.use_score}</p>
                      <p>积分优惠：{this.state.order.score_discount}</p>
                      <p>原价总额：{this.state.order.totalmoney}</p>
                      <p>小计总额：{this.state.order.goodsprice}</p>
                      <p>小计优惠：{this.state.order.total_small_fee}</p>
                      <p>总计优惠：{this.state.order.total_discount_fee}</p>
                      <p>优惠总额：{this.state.order.all_fee}</p>
                      <p>优惠折扣：{this.state.order.discount_num}</p>
                      <p style={{ paddingBottom: ".25rem", marginBottom: "0" }}>抹零：{this.state.order.price}</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className='dan-footer' style={{ paddingTop: ".25rem", height: "" }}>
                      <p >退款金额：{this.state.order.refund_fee}</p>
                      <p>退款原因：{this.state.order.reason}</p>
                      <p>订单状态：{this.state.order.statusName}</p>
                      <p>退款门店：{this.state.order.refund_store}</p>
                      <p>退款收银员：{this.state.order.refund_createName}</p>
                      <p>退款时间：{this.state.order.refund_time}</p>
                      <p style={{color:"transparent"}}>退款时间：{this.state.order.refund_time}</p>
                      <p style={{ color:"transparent" }}>退款时间：{this.state.order.refund_time}</p>
                      <p style={{color:"transparent", paddingBottom: ".25rem", marginBottom: "0" }}>退款时间：{this.state.order.refund_time}</p>
                    </div>
                  </div>
                </div>
                {/* <!-- 如果需要分页器 -->    */}
                <div className="swiper-pagination"></div>
              </div>
            </div>
            <div>
              <ul className='title' style={{ height: ".97rem", lineHeight: ".97rem" }}>
                <li className='yuanjia'>原价</li>
                <li className='shoujia'>售价</li>
                <li className='count'>数量</li>
                <li className='xiaojiyh'>小计优惠</li>
                <li className='xji'>小计</li>
              </ul>
            </div>
            <BetterScroll config={scrollConfig} ref='scroll' style={{ top:"9.85rem",bottom:"0"}}>
            {
              this.state.data.map((v, k) => {
                return (
                  <div key={k}>
                    <div className='name'>{v.goods_name.length > 13 ? v.goods_name.substring(0, 13) + "..." : v.goods_name}</div>
                    <ul className='title' style={{ color: "#1a1a1a", }}>
                      <li className='yuanjia'>{v.posprice}</li>
                      <li className='shoujia'>{v.modifyprice}</li>
                      <li className='count'>{v.num}</li>
                      <li className='xiaojiyh'>{v.small_fee}</li>
                      <li className='xji'>{v.subtotal}</li>
                    </ul>
                  </div>
                )
              })
            }
            </BetterScroll>
          </div>
        })

      </ShouyinmxbStyle>
    )
  }
}
const ShouyinmxbStyle = styled.div`
.t-right{
    width:100%;
    display:flex;
    justify-content: space-between;
}
.swiper-pagination-bullet{
    width:.15rem;
    height:.15rem;
}
.swiper-pagination-bullet-active{
    background:#ed7913;
    width:.5rem;
    height:.15rem;
    border-radius:.1rem;
}

.conten ul li div{
    // margin-left:2rem;
    width:4rem;
}
.conten ul li p{
    margin-left:.4rem;
    width:5.4rem;
}
.conten ul{
    padding-top:.1rem;
    margin-top:.3rem;
    display:flex;
    // justify-content:space-between;
}
.conten{
    color:#7d7d7d;
    font-size:.38rem;
    width:9.4rem;
    height:2.8rem;
    margin:.1rem .2rem;
    background-color: #f5f5f5;
}
.name{
    margin-top:.2rem;
    margin-left:.8rem;
    color:#1a1a1a;
    font-size:.35rem;
}
.xji{
    width:2rem;
    height:100%;
    // background-color: red;
}
.xiaojiyh{
    width:2.2rem;
    height:100%;
    // background-color: pink;
}
.count{
    width:1.6rem;
    height:100%;
    // background-color: yellow;
}
.shoujia{
    width:2rem;
    height:100%;
    // background-color: pink;
}
.yuanjia{
    margin-left:.8rem;
    width:1.6rem;
    height:100%;
    // background-color: red;
}
.title{
    color:#ed7913;
    font-size:.35rem;
    display:flex;
    height:.77rem;
    line-height:.77rem;
    border-bottom:2px solid #dadada;
}






.bj{
    width:100rem;
    height:100rem;
    background-color: #fff;
}



input::-webkit-input-placeholder {
    color: #c9c9c9;
    font-size:.35rem;
  }
  .img{
    width: .55rem;  
    height: .55rem; 
    // line-height: .5rem; 
    margin-left:2.45rem;
  }
  .img-search{
    margin-top:.12rem;
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
  }
    
  .input{
    font-size:.37rem;
    border:none;
    width:6rem;
    // margin-top:.21rem;
    margin-left:.17rem;
    height: .75rem;
    line-height: .75rem;
    // background-color: red;
  
  }
  .search{
    display:flex;
    margin-top:.21rem;
    margin-left:.32rem;
    margin-bottom:.21rem;

    width:9.36rem;
    height: .75rem;
    border-radius:.15rem;
    background-color: #fff;
  }
  .dan-footer{
    background-color: #F3F3F3;
  }
.dan-footer p{
    margin-bottom:.25rem;
    margin-left:.38rem;
    font-size:.32rem;
    color: #969696;
}
.zuantai{
        // margin-top:.27rem;
        margin-right:.25rem;
        height:.85rem;
        line-height:.85rem;
        font-size:.35rem;
        color: #ed5f21;
    }
    .caigoudanhao{
        height:.89rem;
        line-height:.89rem;
        margin-left:.21rem;
        // margin-top:.31rem;
        font-size:.35rem;
        color: #333333;
    }
    .dan-top p img{
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
    }
    .dan-top p{
        margin-top:.22rem;
        width: .33rem;  
        height: .37rem;
    }
    .dan-top{
        display:flex;
        width: 100%;  
        height: .89rem;
    }
    .dan{
        position:relative;
        // margin-bottom:.23rem;
        margin-left: .32rem;
        width: 9.36rem;  
        // height: 2.89rem;
        background-color: #fff;
        border-radius:.2rem;
    
    
    
    }


`



