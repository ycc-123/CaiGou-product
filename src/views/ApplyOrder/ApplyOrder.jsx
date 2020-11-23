import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseApplyList } from 'network/Api'
// import { SearchBar, Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
// import Tiao from './Tiao'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
export default class ApplyOrder extends Component {
    constructor() {
        super()
        this.state = {
            tiao: [],
            inputSearch:''
        }
    }
    componentDidMount() {
        getPurchaseApplyList({
            action: 'getPurchaseApplyList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                // type:"1",
                limit: "1000",
                page: "1"
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                tiao: res.data.data.data
            }, () => {
                this.refs.scroll.BScroll.refresh()
            })
        })
    }
    inputChange(e){
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    search(){
        getPurchaseApplyList({
            action: 'getPurchaseApplyList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                search: this.state.inputSearch,
                limit: "1000",
                page: "1"
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                tiao: res.data.data.data
            }, () => {
                this.refs.scroll.BScroll.refresh()
            })
        })
    }
    render() {
        const scrollConfig = {
            probeType: 1
        }
        return (
            <ApplyOrderStyle>
        <DocumentTitle title={'采购申请单'} />
        <div>
        <div style={{display:"flex"}}>
                <div className='search'>
                        <input type="search" className='input' placeholder="请输入采购申请单号" name="inputSearch" 
                                    onChange={this.inputChange.bind(this)}
                                    value={this.state.inputSearch}/>
                        <div className='img' onClick={()=>{this.search()}}>
                            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                            </div>
                </div>
                <div
          onClick={()=>{this.props.history.push('/addApplyOrder')}}
           className='add'>新增<span style={{fontSize:".4rem"}}>+</span></div>
          </div>

                    <div className='caigoudan' >
                    <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "1.17rem", bottom: "0" }}>
                        {
                            this.state.tiao.map((v, k) => {
                                return (
                                    <div className='dan' onClick={()=>{this.props.history.push(`/ApplyOrderx/${v.id}`)}}>
                                        <div className='dan-top'>
                                            <p>
                                                <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                                            </p>
                                            <div className='t-right'>
                                            <div className='caigoudanhao'>采购单号：{v.docno}</div>
                                            <div className='zuantai'>{v.statusname}</div>
                                            </div>
                                        </div>
                                        <div className='dan-footer'>
                                            <div>
                                                <p>单据日期：{v.docdate}</p>
                                                <p>申请数量：{v.totalnum}</p>
                                            </div>
                                            <div className='btn_sh' onClick={() => { }}
                                            style={{display:v.statusname==="提交成功"?"none":''}}
                                            >提交</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </BetterScroll>


                    </div>
                </div>
            </ApplyOrderStyle>
        )
    }
}
const ApplyOrderStyle = styled.div`
.t-right{
    width:100%;
    display:flex;
    justify-content: space-between;
}
.dan-footer{
    margin-top:.27rem;
}
.dan-footer p{
    margin-bottom:.25rem;
    margin-left:.48rem;
    font-size:.35rem;
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
        // margin-top:.25rem;
        margin-left:.31rem;
        // width:7.09rem;
        height:.85rem;
        line-height:.85rem;
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
        margin-top:.25rem;
        margin-left:.37rem;
        width: .29rem;  
        height: .35rem;
    }
    .dan-top{
        display:flex;
        width: 100%;  
        height: .85rem;
        border-bottom:1px solid #dddddd;
    }
    .dan{
        margin-bottom:.23rem;
        margin-left: .32rem;
        width: 9.36rem;  
        // height: 2.89rem;
        background-color: #fff;
        border-radius:.2rem;
        border:1px solid #dddddd;
    
    
    
    }
    .add{
        width: 1.6rem;
        height: 0.75rem;
        line-height: 0.75rem;
        text-align:center;
        color:#fff;
        background: #ED7A14;
        border-radius: .1rem;
        margin-top:.21rem;
        margin-left:.32rem;
        font-size:.37rem;
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
        // width:8.3rem;
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
        width:7.44rem;
        height: .75rem;
        border-radius:.15rem;
        background-color: #fff;
      
      }

`