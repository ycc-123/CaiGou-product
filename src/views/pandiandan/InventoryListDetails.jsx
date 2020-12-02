import React, { Component } from 'react'
import styled from 'styled-components'
import { getInventoryInfo, submitInventory } from 'network/Api'
import { Toast, Modal, Button } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import Tiao from './Tiao'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
const alert = Modal.alert;
const prompt = Modal.prompt;
export default class InventoryListDetails extends Component {
    constructor() {
        super()
        this.state = {
            result: [],
            arr: 0,
            data: {},
            inventoryData: [],
            itemData: [],
            goods: [],
            num: '',
            warehouseid: '',
            input: [],
            inputSearch: '',
            supplier: [],
            value:'',
            input:[],
            goods:[]
        }
    }
    getChildrenMsg = (result, msg) => {
        let input = []
        input.push(result)
        let ww = []
        ww.push(msg)
        // let arr = Number(result) + Number(this.state.arr)
        this.setState({
            result,
            // arr,
            goods: [...this.state.goods, ...ww],
            // num: arr,
            input: [...this.state.input, ...input]
        })
        console.log(result, msg)
    }
    componentDidMount() {

        getInventoryInfo({
            action: 'getInventoryInfo', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                inventoryId: this.props.match.params.id,
                // type: "1",
                limit: "30",
                page: "1"
            }
        }).then((res) => {
            console.log(res.data.data)
            if (res.data.status === 4001) {
                var supplier = res.data.data.itemData.map(o => { return { stockid: o.stockid, realnum: o.realnum } });
                console.log(supplier)
                this.setState({
                    supplier,
                    warehouseid: res.data.data.inventoryData.warehouseid,
                    inventoryData: res.data.data.inventoryData,
                    itemData: res.data.data.itemData
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
    }
    shengHe(e) {
        console.log(this.state.input,this.state.goods)
        
        if (e === "提交成功") {

        } else {
            if(this.state.input!==[]){
                let aa = {}
                let arr = []
                this.state.input.map((v, k) => {
                    aa = {
                        stockid: this.state.goods[k].stockid,
                        realnum: v
                    }
                    return arr.push(aa);
                })
                let itemData = arr
                submitInventory({
                    action: 'submitInventory', data: {
                        uniacid: store.getState().uniacid,
                        uid: store.getState().uid,
                        inventoryId: this.props.match.params.id,
                        status: "2",
                        warehouseid: this.state.warehouseid,
                        itemData:itemData
                    }
                }).then((res) => {
                    console.log(111)
                    if (res.data.status === 4001) {
                        Toast.info(res.data.msg, 1)
                        window.location.reload();
                    } else {
                        Toast.info(res.data.msg, 1)
                    }
                })
            }else{
                submitInventory({
                    action: 'submitInventory', data: {
                        uniacid: store.getState().uniacid,
                        uid: store.getState().uid,
                        inventoryId: this.props.match.params.id,
                        status: "2",
                        warehouseid: this.state.warehouseid,
                        itemData:this.state.supplier
                    }
                }).then((res) => {
                    if (res.data.status === 4001) {
                        Toast.info(res.data.msg, 1)
                        window.location.reload();
                    } else {
                        Toast.info(res.data.msg, 1)
                    }
                })
                
            }
            
        }


    }
    seach() {
        getInventoryInfo({
            action: 'getInventoryInfo', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                inventoryId: this.props.match.params.id,
                search: this.state.inputSearch,
                limit: "30",
                page: "1"
            }
        }).then((res) => {
            console.log(res.data.data)
            if (res.data.status === 4001) {
                // var supplier = res.data.data.purchaseDeliveryItem.map(o => { return { gnum: o.gnum } });
                // console.log(supplier)
                this.setState({
                    // supplier,
                    count: res.data.data.count,
                    inventoryData: res.data.data.inventoryData,
                    itemData: res.data.data.itemData
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
    }
    inputChange(e) {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    shuliang= (result, msg) => {
        let input = []
        input.push(result)
        let ww = []
        ww.push(msg)
        let arr = Number(result) + Number(this.state.arr)
        this.setState({
            value:result,
            arr,
            goods: [...this.state.goods, ...ww],
            num: arr,
            input: [...this.state.input, ...input]
        })
        console.log(result, msg)
    }
    render() {
        const scrollConfig = {
            probeType: 1
        }
        let Color = ''
        if (this.state.inventoryData.statusname === "提交成功") {
            Color = "#22a31b"
        } else if (this.state.inventoryData.statusname === "待提交") {
            Color = "#d92929"
        } else if (this.state.inventoryData.statusname === "待审核") {
            Color = "#ed5f21"
        }
        return (
            <WarehousingOrderxingStyle>
    <DocumentTitle title={'盘点单明细'} />

                <div>
                <div style={{display:"flex"}}>
                    <div className='search'>
                        <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="inputSearch"
                            onChange={this.inputChange.bind(this)}
                            value={this.state.inputSearch} />
                        <div className='img' onClick={() => { this.seach() }}>
                            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                        </div>
                    </div>
                </div>

                    <div className='conten'>
                        <div className='conten-top'>
                            <p>
                                <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/dingdan.png" alt="" />
                            </p>
                            <div>{this.state.inventoryData.docno}</div>
                        </div>

                        <div className='conten-c' style={{paddingTop:".25rem"}}>
                            <p>单据日期：{this.state.inventoryData.docdate}</p>
                            <p>盘点类型：{this.state.inventoryData.typename}</p>
                            <p>盘点仓库：{this.state.inventoryData.warehousename}</p>
                            <p>单据状态：<span style={{ color: Color }}>{this.state.inventoryData.statusname}</span></p>
                        </div>

                        <div className='footer'>
                            备注：{this.state.inventoryData.remark}
                        </div>
                    </div>
                    <BetterScroll config={scrollConfig} ref='scroll' style={{ height: "calc(100vh - 8rem)"}}>
                        {
                            this.state.itemData.map((value, key) => {
                                // console.log(value)
                                // let tiao = value
                                return (
                                    <Tiao item={value} key={key} parent={this}/>
                                )
                            })
                        }
                    </BetterScroll>
                    <div className='foot'>
                        <div className='left'>
                            {/* <img src="https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/wu.png" alt="" /> */}
                            账面总数：<span>{this.state.inventoryData.gnum}</span>
                            <span style={{ marginLeft: ".75rem" }}></span>
                            实际总数：<span>{this.state.inventoryData.realnum}</span>
                        </div>
                        {/* <div className='yuan'>{this.state.itemData.length}</div> */}
                        <div style={{ background: this.state.inventoryData.statusname === "提交成功" ? "#B4B4B4" : '' }} className='right' onClick={(e) => { this.shengHe(this.state.inventoryData.statusname) }}>{this.state.inventoryData.statusname === "待提交" ? "提交" : "已提交"}</div>

                    </div>
                </div>
            </WarehousingOrderxingStyle>
        )
    }
}
const WarehousingOrderxingStyle = styled.div`
.am-button::before {
    border: none !important;
}
.yuan{
    // padding-top:.1rem;
    text-align:center;
        // margin:auto;
        position:absolute;
        top: .2rem;
        left:1.6rem;
        color:#fff;
        width:.5rem;
        height:.5rem;
        line-height:.5rem;
        border-radius:.5rem;
        background-color: red;
      }
      .foot_conton span{
        color:#cf2424;
      }
      .foot_conton{
        width: 10rem;
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
      .left span{
          color:rgb(217, 41, 41);
      }
      .left{
        padding-left:.39rem;
        // margin:auto;
        width: 7rem;
        height: 1.6rem;
        line-height: 1.6rem;
        font-size:.32rem;
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
        
        padding-top:.25rem;
        margin-left: .32rem;
        width: 7.5rem;
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
        margin-top: .28rem;
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



