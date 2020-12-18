import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseDeliveryDetail, submitPurchaseDelivery } from 'network/Api'
import { Toast, Modal} from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import Tiao from './Tiaomx'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
const alert = Modal.alert;

export default class WarehousingOrderxing extends Component {
    constructor() {
        super()
        this.state = {
            result: [],
            arr: 0,
            data: {},
            purchaseDetail: [],
            purchaseItem: [],
            goods: [],
            num: '',
            count: '',
            input: [],
            inputSearch: '',
            supplier: []
        }
    }
    componentDidMount() {
        // 获取采购入库明细
        getPurchaseDeliveryDetail({
            action: 'getPurchaseDeliveryDetail', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                deliveryId: this.props.match.params.id,
                type: "1",
                limit: "30",
                page: "1"
            }
        }).then((res) => {
            if (res.data.status === 4001) {
                var supplier = res.data.data.purchaseDeliveryItem.map(o => { return { gnum: o.gnum } });
                // console.log(supplier)
                this.setState({
                    supplier,
                    count: res.data.data.count,
                    purchaseDetail: res.data.data.purchaseDeliveryDetail,
                    purchaseItem: res.data.data.purchaseDeliveryItem
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
    }
    shengHe(e) {
        if(e==="审核通过"){}else{
        if (this.state.input.length === 0) {
            // 默认
            let aa = {}
            let arr = []
            this.state.purchaseItem.map((v, k) => {
                aa = {
                    id: this.state.purchaseItem[k].id,
                    barcodeid: this.state.purchaseItem[k].barcodeid,
                    diffnum: this.state.purchaseItem[k].price - this.state.purchaseItem[k].price,
                    innum: this.state.purchaseItem[k].gnum,
                    goodsid: this.state.purchaseItem[k].goodsid
                }
                return arr.push(aa);
            })
            let itemData = arr
            let in_out_num = []
            this.state.purchaseItem.map((v, k) => {
                let innum = this.state.purchaseItem[k].gnum
                return in_out_num.push(innum);
            })
            let sum = 0;
            in_out_num.forEach(item => {
                sum = Number(sum)  + parseInt(item)
            })
            let deliveryData = {
                id: this.props.match.params.id,
                snum: this.state.count,
                in_out_num: sum
            }
            // console.log("默认", deliveryData, itemData)
            submitPurchaseDelivery({
                    action: 'submitPurchaseDelivery', data: {
                        uniacid: store.getState().uniacid,
                        uid: store.getState().uid,
                        itemData: itemData,
                        deliveryData: deliveryData,
                        type: "1",
                        status: "4"
                    }
                }).then((res) => {
                    // console.log(res.data)
                    if (res.data.status === 4001) {
                        window.location.reload();
                        Toast.success(res.data.msg, 2)
                    } else {
                        Toast.info(res.data.msg, 2)
                    }
                })
        } else {
            let aa = {}
            let arr = []
            this.state.goods.map((v, k) => {
                // console.log(v, k)
                aa = {
                    id: this.state.goods[k].id,
                    barcodeid: this.state.goods[k].barcodeid,
                    diffnum: this.state.goods[k].price - this.state.input[k],
                    innum: this.state.input[k],
                    goodsid: this.state.goods[k].goodsid
                }
                return arr.push(aa);
            })
            let itemData = arr
            // console.log(itemData)
            let deliveryData = {
                id: this.props.match.params.id,
                snum: this.state.count,
                in_out_num: this.state.num
            }
            // console.log("22222", deliveryData, itemData)
            submitPurchaseDelivery({
                    action: 'submitPurchaseDelivery', data: {
                        uniacid: store.getState().uniacid,
                        uid: store.getState().uid,
                        itemData: itemData,
                        deliveryData: deliveryData,
                        type: "1",
                        status: "4"
                    }
                }).then((res) => {
                    // console.log(res.data)
                    if (res.data.status === 4001) {
                        window.location.reload();
                        Toast.success(res.data.msg, 2)
                    } else {
                        Toast.info(res.data.msg, 2)
                    }
                })
        }
    }
}
    getChildrenMsg = (result, msg) => {
        let input = []
        input.push(result)
        let ww = []
        ww.push(msg)
        let arr = Number(result) + Number(this.state.arr)
        this.setState({
            result,
            arr,
            goods: [...this.state.goods, ...ww],
            num: arr,
            input: [...this.state.input, ...input]
        })
        // console.log(result, msg)
    }
    seach() {
        getPurchaseDeliveryDetail({
            action: 'getPurchaseDeliveryDetail', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                deliveryId: this.props.match.params.id,
                search: this.state.inputSearch,
                type: "1",
                limit: "30",
                page: "1"
            }
        }).then((res) => {
            // console.log(res.data.data.purchaseDeliveryItem)
            if (res.data.status === 4001) {
                this.setState({
                    count: res.data.data.count,
                    purchaseDetail: res.data.data.purchaseDeliveryDetail,
                    purchaseItem: res.data.data.purchaseDeliveryItem
                })
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
    }
    inputChange(e) {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const scrollConfig = {
            probeType: 1
        }
        let Color = ''
        if (this.state.purchaseDetail.statusname === "审核通过") {
            Color = "#22a31b"
        } else if (this.state.purchaseDetail.statusname === "待提交") {
            Color = "#d92929"
        } else if (this.state.purchaseDetail.statusname === "待审核") {
            Color = "#ed5f21"
        }
        return (
            <WarehousingOrderxingStyle>
                <DocumentTitle title={'采购入库单明细'} />
                <div>
                    <div className='search'>
                        <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="inputSearch"
                            onChange={this.inputChange.bind(this)}
                            value={this.state.inputSearch} />
                        <div className='img' onClick={() => { this.seach() }}>
                            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                        </div>
                    </div>
                    <div className='conten'>
                        <div className='conten-top'>
                            <p>
                                <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/dingdan.png" alt="" />
                            </p>
                            <div>{this.state.purchaseDetail.docno}</div>
                        </div>
                        <div className='conten-c' style={{ paddingTop: ".25rem" }}>
                            <p>单据日期：{this.state.purchaseDetail.docdate}</p>
                            <p>单据仓库：{this.state.purchaseDetail.warehousename}</p>
                            <p>单据状态：<span style={{ color: Color }}>{this.state.purchaseDetail.statusname}</span></p>
                        </div>

                        <div className='footer'>
                            采购备注：{this.state.purchaseDetail.remark}
                        </div>
                    </div>
                    <BetterScroll config={scrollConfig} ref='scroll' style={{ height: "calc(100vh - 8rem)" }}>
                        {
                            this.state.purchaseItem.map((value, key) => {
                                return (
                                    <Tiao item={value} key={key} parent={this}></Tiao>
                                )
                            })
                        }
                    </BetterScroll>
                    <div className='foot'>
                    <div className="foot_t">
                            <p>
                                采购总量：{this.state.purchaseDetail.snum}
                            </p>
                            <p>
                                入库总量：{this.state.purchaseDetail.in_out_num}
                            </p>
                        </div>
                        <div className="foot_c">
                            差异数量：
                            <span style={{color:"#cf2424"}}>
                                {Number(this.state.purchaseDetail.snum)-Number(this.state.purchaseDetail.in_out_num)}
                            </span>
                        </div>
                        <div className="btn"
                            style={{ background: this.state.purchaseDetail.statusname === "审核通过" ? "#B4B4B4" : '' }} 
                                onClick={(e) => { this.shengHe(this.state.purchaseDetail.statusname) }}>
                            {this.state.purchaseDetail.statusname === "待提交" ? "提交" : "审核"}
                        </div>
                    </div>
                </div>
            </WarehousingOrderxingStyle>
        )
    }
}
const WarehousingOrderxingStyle = styled.div`
.foot_c{
    height:1.6rem;
    line-height:1.6rem;
}
.btn{
    margin-top:.2rem;
    margin-right:.2rem;
    border-radius:.2rem;
    font-size:.4rem;
    color:#fff;
    text-align:center;
    width: 2.04rem;
    height: 1.17rem;
    line-height:1.17rem;
    background-color: #ED7913;
}
.foot_t p{
    margin-top:.25rem;
}
.foot_t{
    margin-left:.5rem;
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


  .foot{
    font-size:0.35rem;
    display:flex;
    justify-content: space-between;
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
        margin-top:.1rem;
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
    .aaa{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
    }
    .wen-zi{
        margin-bottom: .24rem;
        padding-top:.25rem;
        margin-left: .32rem;
       
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


