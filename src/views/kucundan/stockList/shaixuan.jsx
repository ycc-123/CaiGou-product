import React, { Component } from 'react'
import styled from 'styled-components'
import { getStockList ,getWarehouseList ,getProductCategoryAll,showProductCategory} from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
// import Shaixuan from './shaixuan'
import StockListTiao from './stockListTiao'
import { store } from "store/index";
import DocumentTitle from 'react-document-title'
export default class shaixuan extends Component {
    constructor(){
        super()
        this.state={
            result:[],
            fenleiName:[],
            childrens:[],
            xian:false
        }
    }
    componentDidMount(){
        getWarehouseList({
            action: 'getWarehouseList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                type:"1",
                limit:"15",
                page:"1"
            }
        }).then((res) => {
            // console.log(res)
            if(res.data.status===4001){
                var bb = res.data.data.data.map(o=>{return{id:o.id,name:o.name}});
                    // console.log(bb)
                    let aa=[{id:"",name:"全部仓库"}]
                    let result=[...aa,...bb]
                this.setState({
                    result
                })
            }else{
                Toast.info(res.data.msg,2)
            }
        })
        // 分类
        getProductCategoryAll({
            action: 'getProductCategoryAll', data: {
                uniacid: store.getState().uniacid,
               
            }
        }).then((res) => {
            // console.log(res)
            if(res.data.status===4001){
                var bb = res.data.data.map(o=>{return{id:o.id,name:o.name}});
                let aa=[{id:"",name:"全部分类"}]
                    let result=[...aa,...bb]
                    // console.log(result)
                this.setState({
                   fenleiName:result

                })
            }else{
                Toast.info(res.data.msg,2)
            }
        })
    }
    // 获取二级分类
    yijifenlei(v,k){
        // console.log(v,k)
        showProductCategory({
            action: 'showProductCategory', data: {
                uniacid: store.getState().uniacid,
                id:v.id
            }
        }).then((res) => {
            // console.log(res)
            if(res.data.status===4001){
                var result = res.data.data.childrens.map(o=>{return{id:o.id,name:o.name}});
                    // console.log(result)
                this.setState({
                    panduan:result===[]?false:true,
                    childrens:result,
                    erji:true,
                    quankey:v.id,
                    yikey:v.id
                },()=>{

                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                Toast.info(res.data.msg,2)
            }
        })
    }
    canku(v,k){
        // console.log(v.id)
        this.setState({
            cankuID:v.id,
            ckkey:v.id
        })
    }
    erjifenlei(v){
        this.setState({
            erjifenlei:v.id,
            quankey:v.id,
            ekey:v.id
        })
    }
    queding(){
        this.setState({
            xian:false
        })
        // console.log(this.state.yikey)
        getStockList({
            action: 'getStockList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                warehouseid:this.state.cankuID,
                categoryid:this.state.quankey 
            }
        }).then((res) => {
            this.setState({
                panduan:false
            })
            if(res.data.status===4001){
                this.setState({
                    goods: res.data.data.data!==null?res.data.data.data:[],
                    totalcostprice: res.data.data.totalcostprice,
                    totalgnum: res.data.data.totalgnum
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                Toast.info(res.data.msg,2)
            }
        })
    }
    render() {
        // console.log( this.refs.scroll)
        const scrollConfig = {
            probeType: 2
        }
        return (
            <BetterScroll config={scrollConfig} ref='scroll' style={{ top:"1rem",bottom:"1.5rem"}}>
                    <div className='fenglei' style={{display: this.props.yc===false?"none":"block"}}>
                        <div>仓库名称
                            <ul>
                                {
                                    this.state.result.map((v,k)=>{
                                        return(
                                            <li onClick={(e)=>{this.canku(v,k)}}
                                            style={{background:this.state.ckkey===v.id?"#fff5ed":'',color:this.state.ckkey===v.id?"#ed7913":'',border:this.state.ckkey===v.id?"1px solid #ed7913":''}}
                                            >{v.name}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div>一级分类
                            <ul>
                                {
                                    this.state.fenleiName.map((v,k)=>{
                                        return(
                                            <li onClick={(e)=>{this.yijifenlei(v,k)}} 
                                            style={{background:this.state.yikey===v.id?"#fff5ed":'',color:this.state.yikey===v.id?"#ed7913":'',border:this.state.yikey===v.id?"1px solid #ed7913":''}}
                                            >{v.name}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div style={{display:this.state.erji===false?"none":"block"}}>二级分类
                            <ul>
                                {
                                    this.state.childrens.map((v,k)=>{
                                        return(
                                            <li onClick={(e)=>{this.erjifenlei(v,k)}}
                                            style={{background:this.state.ekey===v.id?"#fff5ed":'',color:this.state.ekey===v.id?"#ed7913":'',border:this.state.ekey===v.id?"1px solid #ed7913":''}}
                                            >{v.name}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        
                        <div className='btn' onClick={()=>{this.queding()}}>确定</div>
                    </div>
                    </BetterScroll>
        )
    }
}
