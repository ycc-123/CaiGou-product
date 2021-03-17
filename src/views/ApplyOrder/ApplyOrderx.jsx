import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseApplyDetail, submitPurchaseApply } from 'network/Api'
import BetterScroll from 'common/betterScroll/BetterScroll'
import { Toast,Button,Modal } from 'antd-mobile';
import { store } from "store/index";
import Tiaomx from "./Tiaomx"
import DocumentTitle from 'react-document-title'

export default class ApplyOrderx extends Component {
  constructor() {
    super()
    this.state = {
      quan: [],
      tiao: [],
      sum: '',
      remark: '',
      inputSearch: "",
      newNum: ''
    }
  }
  componentDidMount() {
    getPurchaseApplyDetail({
      action: 'getPurchaseApplyDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        id: this.props.match.params.id
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        let aa = {}
        let arr = []
        res.data.data.item.map((v, k) => {
          aa = v.goodsnum
          return arr.push(aa);
        })
        let sum = 0;
        arr.forEach(item => {
          sum = sum + Number(item)
        })
        this.setState({
          quan: res.data.data,
          remark: res.data.data.remark,
          tiao: res.data.data.item ? res.data.data.item : [],
          sum
        }, () => {
          this.refs.scroll.BScroll.refresh()
        })
      } else {
        Toast.info(res.data.msg, 2)
      }
    })
  }

  tijiao(e) {
    if (e === "提交成功") { } else {
      submitPurchaseApply({
        action: 'submitPurchaseApply', data: {
          uniacid: store.getState().uniacid,
          uid: store.getState().uid,
          id: this.props.match.params.id,
        }
      }).then((res) => {
        if (res.data.status === 4001) {
          window.location.reload();
          Toast.success(res.data.msg, 1)
        } else {
          Toast.info(res.data.msg, 1)
        }
      })
    }

  }
  seach() {
    getPurchaseApplyDetail({
      action: 'getPurchaseApplyDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        id: this.props.match.params.id,
        search: this.state.inputSearch,
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        this.setState({
          tiao: res.data.data.item ? res.data.data.item : [],
        })
      } else {
        Toast.info(res.data.msg, 2)
      }
    })
  }
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  bianji(e){
    if (e === "待提交") {
      this.props.history.push(`/Sqcgcategory/${this.props.match.params.id}/${9999}`)
    } else {}
  }
  render() {
    const scrollConfig = {
      probeType: 1
    }
    return (
      <ApplyOrderxStyle>
        <DocumentTitle title={'采购申请单明细'} />
        <div>
          <div className='search'>
            <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="inputSearch"
              onChange={this.inputChange.bind(this)}
              value={this.state.inputSearch} />
            <div className='img' onClick={() => { this.seach() }}>
              <img className='img-search' src="https://res.lexiangpingou.cn/images/applet/99968search.png" alt="search" />
            </div>
          </div>

          <div className='conten'>
            <div className='conten-top'>
              <p>
                <img src="https://res.lexiangpingou.cn/images/applet/99962dingdan.png" alt="" />
              </p>
              <div>{this.state.quan.docno}</div>
            </div>
            <div className='conten-c' style={{ paddingTop: ".25rem" }}>
              <p>单据日期：{this.state.quan.docdate}</p>
              <p>创建时间：{this.state.quan.createtime}</p>
              <p>申请仓库：{this.state.quan.warehouseName}</p>
              <p>申请数量：{this.state.sum}</p>
              <p>单据状态：<span style={{ color: "#ed5f21" }}>{this.state.quan.statusname}</span></p>
            </div>
            <div className='footer'>
              采购备注：{this.state.quan.remark}
            </div>
          </div>
          <BetterScroll config={scrollConfig} ref='scroll' style={{ height: "calc(100vh - 8.7rem)" }}>
            {
              this.state.tiao.map((v, k) => {
                return (
                  <Tiaomx statusname={this.state.quan.statusname} value={v} id={this.props.match.params.id}></Tiaomx>
                )
              })
            }
          </BetterScroll>
          <div className='foot'>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <div className='left'>
                <div style={{ width: "1.28rem", height: ".68rem" }}><img src="https://res.lexiangpingou.cn/images/applet/99954wu.png" alt="" /></div>
                <div className='yuan'>{this.state.tiao.length}</div>
              </div>
              <div style={{ display: "flex", marginTop: ".2rem" }}>
              <div className='tijiao' style={{ background: this.state.quan.statusname === "待提交" ?  '': "#B4B4B4" }}
                  onClick={(e) => { this.bianji(this.state.quan.statusname) }}>编辑</div>
                <div className='tijiao' style={{ background: this.state.quan.statusname === "提交成功" ? "#B4B4B4" : '' }}
                  onClick={(e) => { this.tijiao(this.state.quan.statusname) }}>{this.state.quan.statusname === "提交成功"?"已提交":"提交"}</div>
              </div>
            </div>
          </div>
        </div>
      </ApplyOrderxStyle>
    )
  }
}
const ApplyOrderxStyle = styled.div`
.del {
  position: absolute;
  z-index: 1;
  width: 2rem;
  height: 100%;
  right: 0;
  top:0;
  text-align: center;
  line-height: 2.1rem;
  font-size: .8rem;
  background: #ED7A14;
}
.del img{
  width: .7rem;
  height: auto;
}




.baocun{
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
  .tijiao{
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
    font-size:.4rem;
    color:#fff;
    text-align:center;
    width: 2.76rem;
    height: 1.6rem;
    line-height:1.6rem;
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
    }
    .wen-zi-f{
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
        display:flex;
        margin-top:.21rem;
        margin-left:.32rem;
        width:9.36rem;
        height: .75rem;
        border-radius:.15rem;
        background-color: #fff;
      
      }



`