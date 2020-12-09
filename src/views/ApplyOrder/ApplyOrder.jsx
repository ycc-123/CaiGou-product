import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseApplyList, submitPurchaseApply } from 'network/Api'
import BetterScroll from 'common/betterScroll/BetterScroll'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
import { Toast } from 'antd-mobile';

export default class ApplyOrder extends Component {
    constructor() {
        super()
        this.state = {
            tiao: [],
            inputSearch: '',
            limit: "10",
            page: "1",
            kongbj: true
        }
        this.isLoadMore = true
    }
    componentDidMount() {
        getPurchaseApplyList({
            action: 'getPurchaseApplyList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            if (res.data.status === 4001) {
                this.setState({
                    tiao: res.data.data.data
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                this.setState({
                    kongbj: false
                })
            }
        })
    }
    inputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    search() {
        getPurchaseApplyList({
            action: 'getPurchaseApplyList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                search: this.state.inputSearch,
                limit: "1000",
                page: "1"
            }
        }).then((res) => {
            if (res.data.status === 4001) {
                this.setState({
                    tiao: res.data.data.data
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            }
        })
    }
    loadMore = () => {
        // 加载数据时转圈
        let loading = true
        setTimeout(() => {
            if (loading) {
                this.setState({

                    loadingMore: true
                })
            }
        }, 1000)
        if (this.isLoadMore) {
            getPurchaseApplyList({
                action: 'getPurchaseApplyList', data: {
                    uniacid: store.getState().uniacid,
                    uid: store.getState().uid,
                    limit: this.state.limit,
                    page: this.state.page
                }
            }).then((res) => {
                let good = res.data.data.data.length
                if (good < this.state.limit) {
                    this.isLoadMore = false
                }
                this.setState({
                    tiao: [...this.state.tiao, ...res.data.data.data],
                    loadingMore: false
                }, () => {
                    let page = Number(this.state.page)
                    this.setState({
                        page: page += 1
                    })

                    loading = false
                    this.refs.scroll.BScroll.finishPullUp()
                    this.refs.scroll.BScroll.refresh()
                })
            })
        } else {
        }
    }
    submit(v) {
        submitPurchaseApply({
            action: 'submitPurchaseApply', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                id: v.id
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
    render() {
        const scrollConfig = {
            probeType: 1
        }
        return (
            <ApplyOrderStyle>
                <DocumentTitle title={'采购申请单'} />
                <div>
                    <div style={{ display: "flex" }}>
                        <div className='search'>
                            <input type="search" className='input' placeholder="请输入采购申请单号" name="inputSearch"
                                onChange={this.inputChange.bind(this)}
                                value={this.state.inputSearch} />
                            <div className='img' onClick={() => { this.search() }}>
                                <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                            </div>
                        </div>
                        <div
                            onClick={() => { this.state.kongbj === false ? console.log() : this.props.history.push('/addApplyOrder') }}
                            className='add'>新增<span style={{ fontSize: ".4rem" }}>+</span></div>
                    </div>

                    <div className='caigoudan' >
                        <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "1.17rem", bottom: "0" }} loadMore={this.loadMore}
                            isLoadMore={this.isLoadMore}>
                            {
                                this.state.tiao.map((v, k) => {
                                    let Color = ''
                                    if (v.statusname === "提交成功") {
                                        Color = "#22a31b"
                                    } else if (v.statusname === "待提交") {
                                        Color = "#ED5F21"
                                    }
                                    return (
                                        <div className='dan' >
                                            <div onClick={() => { this.props.history.push(`/ApplyOrderx/${v.id}`) }}>
                                                <div className='dan-top'>
                                                    <p>
                                                        <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                                                    </p>
                                                    <div className='t-right'>
                                                        <div className='caigoudanhao'>采购单号：{v.docno}</div>
                                                        <div className='zuantai' style={{ color: Color }}>{v.statusname}</div>
                                                    </div>
                                                </div>
                                                <div className='dan-footer'>
                                                    <div >
                                                        <div >
                                                            <p>单据日期：{v.docdate}</p>
                                                            <p>创建时间：{v.createtime}</p>
                                                            <p>申请门店：{v.docdate}</p>
                                                            <p>申请数量：{v.totalnum}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className='btn_sh' onClick={() => { this.submit(v) }}
                                                style={{ display: v.statusname === "提交成功" ? "none" : '' }}
                                            >提交</div>
                                        </div>
                                    )
                                })
                            }
                        </BetterScroll>
                    </div>
                </div>
                <div className='kongbj' style={{ display: this.state.kongbj === false ? "block" : "none" }}>
                    <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/kong.png" alt="" />
                </div>
            </ApplyOrderStyle>
        )
    }
}
const ApplyOrderStyle = styled.div`
.kongbj img{
    width: 5rem;
    height: 5rem;
}
.kongbj{
    margin-top:3rem;
    width:100%;
    height: 100%;
    vertical-align: middle;
    text-align: center;

}
.btn_sh{
    position:absolute;
    bottom:.2rem;
    right:.2rem;
    width: 1.33rem;
    height: 0.67rem;
    line-height: 0.67rem;
    // margin-top:.4rem;
    // margin-right:.11rem;
    color:#fff;
    text-align:center;
    background: #ED7913;
    border-radius: .1rem;
}
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
        position:relative;
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
        // margin-left:2.45rem;
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
        width:6.6rem;
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