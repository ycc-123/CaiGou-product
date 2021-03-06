import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseDetail, changePurchaseStatus, submitPurchase,editPurchaseDetail } from 'network/Api'
import { Toast, Modal, Button } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
import Tiaomx from "./Tiaomx"
import { clearCache } from 'react-router-cache-route'
const alert = Modal.alert;
function Tiao(value) {
  let tiao = value.item
  return (
    <div className='tiao'>
      <img className='t-img-l' src={tiao.image ? tiao.image : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />

      <ul className='wen-zi'>
        <li className='wen-zi-t'>
          <div className='name'>{tiao.goods_name}</div>
        </li>
        <li className='wen-zi-c'>
          <div >商品编码：{tiao.barcode}</div>
          <p>{tiao.price}元/{tiao.unitname}</p>
        </li>

        <li className='wen-zi-f'>
          <div style={{display:"flex"}}>
          <p>采购数量：<span>{tiao.gnum}</span></p>
          <p>采购数量：<span>{tiao.gnum}</span></p>


          </div>
          <Button
                style={{ position: "absolute", left: "6.6rem", color: "transparent", background: "transparent", width: "9rem" }}
                className="btn_modal"
                onClick={() => prompt(
                  '填写', '请输入采购数量',
                  [
                    {
                      text: '取消',
                      onPress: value => console.log(111)
                    },
                    {
                      text: '确定',
                      onPress: value => {
                        this.shuliang(value, tiao)
                      }
                    },
                  ], 'default', null, [''])}
              >111111</Button>
        </li>
      </ul>
    </div>
  )
}
export default class PurchaseOrderDetailed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      purchaseDetail: {},
      id: this.props.match.params.id,
      data: [],
      purchaseItem: [],
      goodsSearch: '',
      supplier:0
    }
  }
  componentDidMount() {
    clearCache()
    getPurchaseDetail({
      action: 'getPurchaseDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        purchaseId: this.props.match.params.id,
        type: "1",
        limit: "30",
        page: "1"
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        let count = res.data.data.count
        let sum=[]
        res.data.data.purchaseItem.map((v,k)=>{
          console.log(v.subtotal)
          sum.push(v.subtotal)
        })
        console.log(sum)
        let supplier = 0;
        sum.forEach(item => {
          supplier = Number(supplier) + parseFloat(item)
        })
        console.log(supplier)
        this.setState({
          supplier,
          purchaseDetail: res.data.data.purchaseDetail,
          purchaseItem: res.data.data.purchaseItem,
          count,
        }, () => {
          this.refs.scroll.BScroll.refresh()
        })
      } else {
        Toast.info('网络错误', 2)
      }
    })
  }
  shengHe() {
    let price = []
    let num = []
    this.state.purchaseItem.map((value, key) => {
      price.push(value.subtotal)
      num.push(value.gnum)
      return ""
    })
    let prices = 0
    let nums = 0
    price.forEach(item => {
      prices = prices + Number(item)
    })
    num.forEach(item => {
      nums = nums + Number(item)
    })
    let purchaseData = { subtotal: prices, snum: nums }
    if (this.state.purchaseDetail.statusname === "待提交") {
      submitPurchase({
        action: 'submitPurchase', data: {
          uniacid: store.getState().uniacid,
          uid: store.getState().uid,
          purchaseId: this.props.match.params.id,
          type: "1",
          status: "2",
          // itemData: [],
          // purchaseData: purchaseData
        }
      }).then((res) => {
        if (res.data.status === 4001) {
          window.location.reload();
          Toast.success(res.data.msg, 2)
        } else {
          Toast.info(res.data.msg, 2)
        }
      })
    } else {
      let id = this.props.match.params.id.split()
      submitPurchase({
        action: 'submitPurchase', data: {
          uniacid: store.getState().uniacid,
          uid: store.getState().uid,
          purchaseId: this.props.match.params.id,
          type: "1",
          status: "4"
        }
      }).then((res) => {
        if (res.data.status === 4001) {
          window.location.reload();
          Toast.success(res.data.msg, 2)
        } else {
          Toast.info(res.data.msg, 2)
        }
      })
    }
  }
  getChildrenMsg = (result, msg) => {
  console.log(result, msg)
  editPurchaseDetail({
    action: 'editPurchaseDetail', data: {
      uniacid: store.getState().uniacid,
      uid: store.getState().uid,
      id: this.props.match.params.id,
      itemId: msg.id,
      price: msg.price,
      gnum: result,
    }
  }).then((res) => {
    if (res.data.status === 4001) {
      Toast.info("修改成功", 1)
    } else {
      Toast.info(res.data.msg, 2)
    }
  })
  }

  search() {
    getPurchaseDetail({
      action: 'getPurchaseDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        purchaseId: this.props.match.params.id,
        search: this.state.goodsSearch,
        type: "1",
        limit: "30",
        page: "1"
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        let count = res.data.data.count
        this.setState({
          purchaseDetail: res.data.data.purchaseDetail,
          purchaseItem: res.data.data.purchaseItem,
          count,
        }, () => {
          this.refs.scroll.BScroll.refresh()
        })
      } else {
        Toast.info('网络错误', 2)
      }
    })
  }
  goodsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  bianji(){
    if(this.state.purchaseDetail.statusname === "待提交"){
      this.props.history.push(`/addCaigouGoods/${this.props.match.params.id}`)
    }
  }
  render() {
    const scrollConfig = {
      probeType: 1
    }
    let Color = ''
    const {purchaseDetail}=this.state
    if (purchaseDetail.statusname === "审核成功") {
      Color = "#22a31b"
    } else if (purchaseDetail.statusname === "待提交") {
      Color = "#d92929"
    } else if (purchaseDetail.statusname === "待审核") {
      Color = "#ed5f21"
    }
    return (
      <PurchaseOrderDetailedStyle>
        <DocumentTitle title={'采购单明细'} />

        <div>
          <div className='search'>
            <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="goodsSearch"
              onChange={this.goodsChange.bind(this)}
              value={this.state.goodsSearch} />
            <div className='img' onClick={() => { this.search() }}>
              <img className='img-search' src="https://res.lexiangpingou.cn/images/applet/99968search.png" alt="search" />
            </div>
          </div>

          <div className='conten'>
            <div className='conten-top'>
              <p>
                <img src="https://res.lexiangpingou.cn/images/applet/99962dingdan.png" alt="" />
              </p>
              <div>{purchaseDetail.docno}</div>
            </div>

            <div className='conten-c' style={{ paddingTop: ".25rem" }}>
              <p>单据日期：{purchaseDetail.docdate}</p>
              <p>创建时间：{purchaseDetail.createtime}</p>
              <p>采购仓库：{purchaseDetail.warehousename}</p>
              <p>单据状态：<span style={{ color: Color }}>{purchaseDetail.statusname}</span></p>
            </div>

            <div className='footer'>
              采购备注：{purchaseDetail.remark}
            </div>
          </div>
          <BetterScroll config={scrollConfig} ref='scroll' style={{ height: "calc(100vh - 8rem)" }}>
            {
              this.state.purchaseItem.map((value, key) => {
                return (
                  <Tiaomx danid={this.props.match.params.id} statusname={purchaseDetail.statusname} item={value} key={key} parent={this}></Tiaomx>
                )
              })
            }
          </BetterScroll>
          <div className='foot'>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <div className='left' >
                <div style={{ width: "1.28rem", height: ".68rem" }}>
                  <img src="https://res.lexiangpingou.cn/images/applet/99954wu.png" alt="" /></div>
                <div className='yuan'>{this.state.purchaseItem.length}</div>
              </div>
              
              <div className="zong_mony">采购总额：<span style={{color:"#E50B0B"}}>{(this.state.supplier).toFixed(2)}</span></div>
              <div style={{ background: purchaseDetail.statusname === "待提交" ? "" : '#B4B4B4' }}
                className='bianji'
                onClick={() => { this.bianji() }}
              >编辑</div>
              
              <div style={{ background: purchaseDetail.statusname === "审核成功" ? "#B4B4B4" : '' }}
                className='right'
                onClick={() => { this.shengHe() }}
              >{purchaseDetail.statusname === "待提交" ? (purchaseDetail.statusname=== "待提交" ? "提交" : "已提交") : (purchaseDetail.statusname=== "审核成功" ? "已审核" : "审核" )}
              </div>
              <div style={{display: purchaseDetail.statusname === "审核成功" ?  "none" : "block", width: "3rem", height: "2rem", position: "absolute", top: ".2rem", left: "7.8rem",}}
              >
              <Button
                style={{  color: "transparent", background: "transparent" }}
                className="btn_modal"
                onClick={() =>
                  alert(purchaseDetail.statusname=== "待提交"?'提交':"审核", purchaseDetail.statusname=== "待提交"?'是否确认提交采购单':'是否确认审核采购单', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => this.shengHe() },
                  ])
                }
              >
                confirm
                        </Button></div>
            </div>
          </div>
        </div>
      </PurchaseOrderDetailedStyle>
    )
  }
}
const PurchaseOrderDetailedStyle = styled.div`
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


.zong_mony{
  width: 3.2rem;
  height: 1.6rem;
  line-height: 1.6rem;
  font-size:.35rem;
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
    width:2rem;
    
  }
  .bianji{
    margin-top:.2rem;
    // margin-right:.2rem;
    border-radius:.2rem;
    font-size:.4rem;
    color:#fff;
    text-align:center;
    width: 2.04rem;
    height: 1.17rem;
    line-height: 1.17rem;
    background-color: #ED7913;
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
        width:7.5rem;
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
      position: relative;
      overflow: hidden;
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


