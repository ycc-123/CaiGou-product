import React, { Component } from 'react'
import styled from 'styled-components'
import { Toast } from 'antd-mobile';
import { store } from 'store/index'
import BetterScroll from 'common/betterScroll/BetterScroll'
import {getPurchaseApplyDetail } from 'network/Api'


function Tiao(value) {
  let tiao = value.item
  console.log(tiao)
  return (
    <div className='tiao'>
      <img className='t-img-l' src={tiao.image ? tiao.image : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />
      <ul className='wen-zi'>
        <li className='wen-zi-t'>
          <div className='name'>{tiao.goodsname}</div>
        </li>
        <li className='wen-zi-c'>
          <div >商品编码：{tiao.barcode}</div>
          <p>{tiao.price}元/{tiao.unit_name}</p>
        </li>
        <li className='wen-zi-f'>
          <div></div>
          <p>采购数量：<span>{tiao.goodsnum}</span></p>
        </li>
      </ul>
    </div>
  )
}
export default class Liebiao extends Component {
  constructor() {
    super()
    this.state = {
      goodsList: [],
      itemGoods:[]
    }
  }
  componentDidMount() {
    // 采购申请单默认商品
    getPurchaseApplyDetail({
      action: 'getPurchaseApplyDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        id: this.props.match.params.id,
      }
    }).then(res => {
      console.log(res)
      if(res.data.status===4001){
        console.log(res.data.data.item)
        // let newgoods=[...this.state.goodsList,...store.getState().goodsList]
        this.setState({
          goodsList:[...res.data.data.item,...store.getState().goodsList] 
        },()=>{
          console.log(this.state.goodsList,"===========",store.getState().goodsList)
        })
      }else{
        Toast(res.data.msg,2)
      }
    })
    console.log(store.getState().goodsList)
    // if (store.getState().goodsList === []) {
    //   // Toast.info("无采购商品", 1.5)
    //   this.setState({
    //     goodsList: []
    //   })
    // } else {
    //   this.setState({
    //     goodsList: store.getState().goodsList
    //   })
    // }
  }
  render() {
    const scollConfig = {
      probeType: 1
    }
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    var time = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate() + " " + day2.getHours() + ":" + day2.getMinutes() + ":" + day2.getSeconds();
    return (
      <LiebiaoStyle>
        <div>
          <div className='search'>
            <input type="search" className='input' placeholder="请输入商品名称或商品编码" />
            <div className='img' onClick={() => { this.search() }}>
              <img className='img-search' src="https://res.lexiangpingou.cn/images/applet/99968search.png" alt="search" />
            </div>
          </div>

          {/* <div className='conten'>
            <div className='conten-top'>
              <p>
                <img src="https://res.lexiangpingou.cn/images/applet/99962dingdan.png" alt="" />
              </p>
              <div>{this.state.purchaseDetail.docno}</div>
            </div>

            <div className='conten-c' style={{ paddingTop: ".25rem" }}>
              <p>单据日期：{s2}</p>
              <p>创建时间：{time}</p>

              <p>单据仓库：{this.props.match.params.ck}</p>
              <p>单据状态：{"待提交"}</p>
            </div>
          </div>
          <div className='footer'>
            采购备注：{this.props.match.params.bz}
          </div>*/}
        </div> 
        {
          this.state.goodsList.map((value, key) => {
            // console.log(value)
            return (
              <Tiao item={value} key={key}></Tiao>
            )
          })
        }
      </LiebiaoStyle>
    )
  }
}

const LiebiaoStyle = styled.div`
.am-button::before {
    border: none !important;
}
.yuan{
    // padding-top:.1rem;
    text-align:center;
    // margin:auto;
    position:absolute;
    top: .2rem;
    left:1.3rem;
    color:#fff;
    width:.51rem;
    height:.51rem;
    line-height:.51rem;
    border-radius:.5rem;
    background-color: #E01616;
    font-size:.24rem;
  }
  .foot_conton span{
    color:#cf2424;
  }
  .foot_conton{
    width: 12rem;
    // height: 100%rem;
    line-height:1.6rem;
    text-align:center;
    font-size:.4rem;
  }
  .left img{
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
  }
  .left{
    padding-left:.48rem;
    padding-top:.45rem;
    width:3rem;
    
  }
  .right{
    margin-top:.2rem;

    margin-right:.2rem;
  border-radius:.2rem;
  font-size:.4rem;
  color:#fff;
  text-align:center;
  width: 2.04rem;
  height: 1.17rem;
  line-height: 1.17rem;
  background-color: #ED7913;
  }
  .foot{
    display:flex;
    width: 100%;
    height: 1.6rem;
    background-color: #fff;
    position:absolute;
    bottom:0;
  }
    
    
    
    
    
    .wen-zi-f p span{
        color:#cf2424;
    }
    .wen-zi-t p{
        color:#646464;
        font-size:.29rem;
    }
    .wen-zi-f div{
        font-size:.29rem;
        color:#646464;
    }
    .wen-zi-f p{
        font-size:.29rem;
        color:#646464;
    }
    .name{
        font-size:.35rem;
        width: 3.2rem;
        color:#1a1a1a;
        // margin: .1rem 0;
    }
    .wen-zi-f{
        margin-bottom:0rem;

        display:flex;
        justify-content: space-between;
    }
    .wen-zi-t{
        display:flex;
        justify-content: space-between;
        width: 7.5rem;
        // height: 1.1rem;
        // background-color: yellow;
    }
    .wen-zi-c{
        display:flex;
        justify-content: space-between;
        font-size:.29rem;
        // margin-bottom:.27rem;
    }
    .wen-zi{
        margin-bottom: .24rem;
        padding-top:.25rem;
        margin-left: .32rem;
        width: 7.5rem;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
    }
    .t-img-l{

        margin-left: .37rem;
        margin-top:.24rem;
        margin-bottom:.24rem;
        width: 1.33rem;
        height: 1.33rem;
        // background-color: orange;
    }
    .t-img{
        // padding-top: .2rem;
        margin-left: .2rem;
        width: 1.5rem;
        height: 1.8rem;
        background-color: red;
    }
    .tiao{
        display:flex;
        width: 100%;
        // height: 2rem;
        background-color: #fff;
        border-bottom:2px solid #dadada;
        
    
    }
    .footer{
        font-size:.35rem;
        margin-top: .33rem;
        margin-left: .45rem;
        color:#646464;
        margin-bottom: .32rem;

    
    }
    .conten-c p{ 
        color:#646464;
        font-size:.32rem;
        padding-bottom:.25rem;
        margin-left: .35rem;
    }
    .conten-c{
        width: 9.3rem;  
        // height: 3.4rem;  
        margin:0 .37rem;
        background-color: #f8f8f8;
    
    }
    .conten-top p img{ 
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
    }
    .conten-top div{
        height:.89rem;
        line-height:.89rem;
        font-size:.35rem;
        color:#646464;
        // margin-top: .25rem;
        margin-left:.2rem;
    }
    .conten-top p{
        margin-top: .23rem;
        margin-left:.45rem;
        width:.33rem;
        height:.37rem;
    }
    .conten-top{
        display:flex;
        height:.89rem;
    
    }
    .conten{
        border-bottom:2px solid #dadada;
        margin-top:.2rem;
        width:100%;
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
        margin-bottom: .2rem;
        display:flex;
        margin-top:.21rem;
        margin-left:.32rem;
        width:9.36rem;
        height: .75rem;
        border-radius:.15rem;
        background-color: #fff;
      
      }


`

