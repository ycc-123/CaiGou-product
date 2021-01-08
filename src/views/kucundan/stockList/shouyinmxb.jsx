import React, { Component } from 'react'
import styled from 'styled-components'
import { getRetailDetail } from 'network/Api'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'

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
    // console.log()
    getRetailDetail({
      action: 'getRetailDetail', data: {
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
          this.refs.scroll.BScroll.refresh()
        })
      } else {
        Toast.info(res.data.msg, 2)
      }
    })
  }
  goodsChange(e) {
    // console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  search() {
    getRetailDetail({
      action: 'getRetailDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        search: this.state.goodsSearch,
        orderid: this.props.match.params.id
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.status === 4001) {
        this.setState({
          data: res.data.data.data,
          order: res.data.data.order
        }, () => {
          this.refs.scroll.BScroll.refresh()
        })
      } else {
        Toast.info(res.data.msg, 2)
      }
    })

  }
  render() {
    // console.log(this.state)
    const scrollConfig = {
			probeType: 1
		}
    const {order}=this.state
    return (
      <ShouyinmxbStyle>
        <DocumentTitle title={'优惠明细表'} />
        <div className='search'>
          <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="goodsSearch"
            onChange={this.goodsChange.bind(this)}
            value={this.state.goodsSearch} />
          <div className='img' onClick={() => { this.search() }}>
            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
          </div>
        </div>
        {
          <div className='bj'>
            <div className='dan'>
              <div className='dan-top'>
                <p>
                  <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/dingdan.png" alt="" />
                </p>
                <div className='caigoudanhao'>{order.orderno}</div>
              </div>
              <div className='dan-footer' style={{ paddingTop: ".25rem" }}>
                <p >单据日期：{order.createtime}</p>
                <p>所属商家：{order.storeName}</p>
                <p>支付方式：{order.pay_type_name}</p>
                <p>订单状态：{order.statusName}</p>
                <p>原价总额：{order.totalmoney}</p>
                <p>总价优惠：{order.all_fee}</p>
                <p>小计优惠：{order.total_discount_fee}</p>
                <p style={{ paddingBottom: ".25rem", marginBottom: "0" }}>实收金额：{order.price}</p>
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
        margin-right:.27rem;
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



