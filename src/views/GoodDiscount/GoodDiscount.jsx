import React, { Component } from 'react'
import styled from 'styled-components'
import { getWarehouseList, getRetailGoodsList, get_store } from 'network/Api'
import { Toast, List, DatePicker } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import GoodDiscounts from './GoodDiscounts'
import { store } from "store/index";
import DocumentTitle from 'react-document-title'
import axios from 'axios';
import { LoadingMore } from 'common/loading'
export default class LossReport extends Component {
    constructor() {
        super()
        this.state = {
            status: "",
            Goodszong: {},
            GoodsList: [],
            fenleiName: ["今天", "昨天", "7天", "本月"],
            childrens: ["全部", "已付款", "未付款", "全部退款", "部分退款", "已取消"],
            cankuID: '',
            ckkey: '',
            result: [],
            ekey: 0,
            xian: false,
            yikey: 0,
            data: [],
            key: '',
            date: '',
            start: '',
            start_data: '',
            end: '',
            end_data: '',
            time: '',
            today_time: '',
            limit: "10",
            page: 1,
            kongbj: true
        }
        this.isLoadMore = true
    }
    StrToGMT(time) {
        let GMT = new Date(time)
        return GMT
    }
    componentDidMount() {
        getRetailGoodsList({
            action: 'getRetailGoodsList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            // console.log(res.data.data.data)
            if (res.data.status === 4001) {
                this.setState({
                    GoodsList: res.data.data.data,
                    Goodszong: res.data.data.total
                }, () => {

                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                this.setState({
                    kongbj: false
                })
                Toast.info(res.data.msg, 1)
            }
        })
        var day2 = new Date();
        day2.setTime(day2.getTime());
        var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
        // console.log(s2)
        this.setState({
            today_time: s2
        })
        get_store({
            action: 'get_store', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                type: "1",
                limit: "15",
                page: "1"
            }
        }).then((res) => {
            if (res.data.status === 4001) {
                var bb = res.data.data.map(o => { return { id: o.id, name: o.name } });
                let aa = [{ id: "", name: "全部仓库" }]
                let result = [...aa, ...bb]
                this.setState({
                    result
                })
            } else {
                Toast.offline(res.data.msg, 2)
            }
        })
    }
    queding() {
        this.setState({
            xian: false
        })
        getRetailGoodsList({
            action: 'getRetailGoodsList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                starttime: this.state.start_data ? this.state.start_data : this.state.today_time,
                endtime: this.state.end_data ? this.state.end_data : this.state.today_time,
                status: this.state.status,
                store_id: this.state.cankuID,
                limit: "30",
                page: "1"
            }
        }).then((res) => {
            if (res.data.status === 4001) {
                this.setState({
                    GoodsList: res.data.data.data,
                    Goodszong: res.data.data.total,
                    kongbj: true,
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                Toast.info(res.data.msg, 1)
                this.setState({
                    kongbj: false,
                    GoodsList: [],
                    Goodszong: {}
                })
            }
        })
    }
    status(v, k) {
        // console.log(v)
        this.setState({
            ekey: k
        })
        if (v === "全部") {

        } else if (v === "已付款") {
            this.setState({
                status: "1"
            })
        } else if (v === "未付款") {
            this.setState({
                status: "0"
            })
        } else if (v === "全部退款") {
            this.setState({
                status: "4"
            })
        } else if (v === "部分退款") {
            this.setState({
                status: "6"
            })
        } else if (v === "已取消") {
            this.setState({
                status: "9"
            })
        }
    }
    yijifenlei(v, k) {
        // console.log(v, k)
        this.setState({
            yikey: k
        })
        if (v === "今天") {
            axios({
                timeout: 10000,
                baseURL: 'https://dev.huodiesoft.com/posdataapi.php?action=get_time',
                method: 'post',
                headers: {
                    'Content-Type': 'text/plain'
                },
                data: { date: "今天" }
            }).then(res => {
                // console.log(res.data.data.end);
                let start = this.StrToGMT(res.data.data.start)
                let end = this.StrToGMT(res.data.data.end)
                this.setState({
                    end: end,
                    start: start,
                    end_data: res.data.data.end,
                    start_data: res.data.data.start,
                })
            })
        } else if (v === "昨天") {
            axios({
                timeout: 10000,
                baseURL: 'https://dev.huodiesoft.com/posdataapi.php?action=get_time',
                method: 'post',
                headers: {
                    'Content-Type': 'text/plain'
                },
                data: { date: "昨天" }
            }).then(res => {
                // console.log(res.data.data.end);
                let start = this.StrToGMT(res.data.data.start)
                let end = this.StrToGMT(res.data.data.end)
                this.setState({
                    end: end,
                    start: start,
                    end_data: res.data.data.end,
                    start_data: res.data.data.start,
                })
            })
        } else if (v === "7天") {
            axios({
                timeout: 10000,
                baseURL: 'https://dev.huodiesoft.com/posdataapi.php?action=get_time',
                method: 'post',
                headers: {
                    'Content-Type': 'text/plain'
                },
                data: { date: "近七天" }
            }).then(res => {
                // console.log(res.data.data.end);
                let start = this.StrToGMT(res.data.data.start)
                let end = this.StrToGMT(res.data.data.end)
                this.setState({
                    end: end,
                    start: start,
                    end_data: res.data.data.end,
                    start_data: res.data.data.start,
                })
            })
        } else if (v === "本月") {
            axios({
                timeout: 10000,
                baseURL: 'https://dev.huodiesoft.com/posdataapi.php?action=get_time',
                method: 'post',
                headers: {
                    'Content-Type': 'text/plain'
                },
                data: { date: "本月" }
            }).then(res => {
                // console.log(res.data.data.end);
                let start = this.StrToGMT(res.data.data.start)
                let end = this.StrToGMT(res.data.data.end)
                this.setState({
                    end: end,
                    start: start,
                    end_data: res.data.data.end,
                    start_data: res.data.data.start,
                })
            })
        }
    }
    xianyin() {
        if (this.state.xian === false) {
            this.setState({
                xian: true
            }, () => {
                this.refs.scroll.BScroll.refresh()
            })
        } else {
            this.setState({
                xian: false
            }, () => {
                this.refs.scroll.BScroll.refresh()
            })
        }
    }
    canku(v, k) {
        // console.log(v.id)
        this.setState({
            cankuID: v.id,
            ckkey: v.id
        }, () => {
        })
    }
    search() {
        // console.log(this.state.inputSearch)
        getRetailGoodsList({
            action: 'getRetailGoodsList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                search: this.state.inputSearch,
                limit: "30",
                page: "1"
            }
        }).then((res) => {
            if (res.data.status === 4001) {
                this.setState({
                    GoodsList: res.data.data.data,
                    Goodszong: res.data.data.total
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                Toast.info(res.data.msg, 1)
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
        return (
            <LossReportStyle>
                <DocumentTitle title={'商品优惠汇总'} />
                <div style={{ display: "flex" }}>
                    <div className='search'  >
                        <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="inputSearch"
                            onChange={this.inputChange.bind(this)}
                            value={this.state.inputSearch} />
                        <div className='img' onClick={() => { this.search() }}>
                            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                        </div>
                    </div>
                    <div className='sximg' >
                        <img className='sximg-search' onClick={() => { this.xianyin() }} src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/aqwe.png" alt="aaa" />
                    </div>
                </div>
                <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "1.2rem", bottom: "1.5rem" }} loadMore={this.loadMore}
                    isLoadMore={this.isLoadMore}>
                    <div style={{ display: this.state.xian === false ? "block" : "none" }}>
                        {
                            this.state.GoodsList.map((v, k) => {
                                return (
                                    <GoodDiscounts item={v} key={k} />
                                )
                            })
                        }
                        {
                            this.state.GoodsList.length > 0 &&
                            <LoadingMore isLoading={this.isLoadMore} />
                        }
                    </div>
                {/* </BetterScroll> */}
                {/* <BetterScroll config={scrollConfig} ref='bbb'> */}
                    <div className='fenglei' style={{ display: this.state.xian === false ? "none" : "block" }}>
                        <div><span style={{ color: "#333333" }}>仓库名称</span>
                            <ul>
                                {
                                    this.state.result.map((v, k) => {
                                        return (
                                            <li onClick={(e) => { this.canku(v, k) }}
                                                style={{ background: this.state.ckkey === v.id ? "#fff5ed" : '', color: this.state.ckkey === v.id ? "#ed7913" : '', border: this.state.ckkey === v.id ? "1px solid #ed7913" : '' }}
                                            >{v.name}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div><span style={{ color: "#333333" }}>日期</span>
                            <ul>
                                <div style={{ display: "flex", width: "100%" }}>
                                    <div className='start'>
                                        <DatePicker
                                            mode="date"
                                            title=""
                                            extra={this.state.today_time}
                                            onOk={''}
                                            value={this.state.start}
                                            onChange={start => this.setState({ start, start_data: start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() })}
                                        >
                                            <List.Item arrow="horizontal" className='data'></List.Item>
                                        </DatePicker>
                                    </div>
                                    <span style={{ fontSize: ".5rem", paddingTop: ".25rem", paddingLeft: '.3rem' }}>&nbsp;~</span>
                                    <div className='end'>
                                        <DatePicker
                                            mode="date"
                                            title=""
                                            extra={this.state.today_time}
                                            onOk={(e) => { console.log(e) }}
                                            value={this.state.end}
                                            onChange={end => this.setState({ end, end_data: end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() })}
                                        >
                                            <List.Item arrow="horizontal" className='data'></List.Item>
                                        </DatePicker>
                                    </div>
                                </div>
                                {
                                    this.state.fenleiName.map((v, k) => {
                                        return (
                                            <li
                                                onClick={(e) => { this.yijifenlei(v, k) }}
                                                style={{ background: this.state.yikey === k ? "#fff5ed" : '', color: this.state.yikey === k ? "#ed7913" : '', border: this.state.yikey === k ? "1px solid #ed7913" : '' }}
                                            >{v}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div><span style={{ color: "#333333" }}>单据状态</span>
                            <ul>
                                {
                                    this.state.childrens.map((v, k) => {
                                        return (
                                            <li onClick={(e) => { this.status(v, k) }}
                                                style={{ background: this.state.ekey === k ? "#fff5ed" : '', color: this.state.ekey === k ? "#ed7913" : '', border: this.state.ekey === k ? "1px solid #ed7913" : '' }}
                                            >{v}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className='btn' onClick={() => { this.queding() }}>确定</div>
                    </div>
                    <div className='kongbj' style={{ display: this.state.kongbj === false ? "block" : "none" }}>
                        <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/kong.png" alt="" />
                    </div>
                </BetterScroll>
                <div className='foot' >
                    <div>小计总额：<span>{this.state.Goodszong.total_subtotal ? this.state.Goodszong.total_subtotal : 0}</span></div>
                    <div style={{ marginRight: ".2rem" }}>小计优惠总额：<span>{this.state.Goodszong.total_fee ? this.state.Goodszong.total_fee : 0}</span></div>
                </div>
            </LossReportStyle>
        )
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
            getRetailGoodsList({
                action: 'getRetailGoodsList', data: {
                    uniacid: store.getState().uniacid,
                    uid: store.getState().uid,
                    starttime: this.state.start_data,
                    endtime: this.state.end_data,
                    status: this.state.status,
                    store_id: this.state.cankuID,
                    limit: "30",
                    page: "1"
                }
            }).then((res) => {
                let good = res.data.data.data.length
                // 如果长度不等于得时候加载 那么是到底了
                if (good < this.state.limit) {
                    this.isLoadMore = false
                }
                this.setState({
                    GoodsList: [...this.state.GoodsList, ...res.data.data.data],
                    Goodszong: res.data.data.total,
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
}
const LossReportStyle = styled.div`
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
.start{
    margin-left:1.6rem;
    }
    
    .data{
    background-color:#f9f9f9;
    padding:0;
    margin:0;
    width:2.5rem;
    }
    .am-list-item time am-list-item-middle{
    width:12rem;
    }
    .am-list-item .am-list-line .am-list-extra{
    position:absolute;
    right:.1rem;
    color:#474747;
    text-align: left;
    font-size:.4rem;
    padding-left:.1rem;
    }
    .am-list-item .am-list-line .am-list-arrow{
    
    background-image: none;
    opacity:0;
    }

    .am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
    }

.store_name{
    color: #8b8b8b;
    padding-right:.3rem;
}
.order{
    margin-left:.1rem;
    color: #8b8b8b;
}
.header{
    font-size:.38rem;
    display:flex;
    justify-content: space-between;
    padding:.2rem .2rem;
}
.fenglei div ul li{
    overflow: hidden;
    color:#6f6f6f;
    width:2.8rem;
    height:.8rem;
    line-height:.8rem;
    text-align:center;
    background-color: #f0f0f0;
    margin:.2rem .2rem;
    border-radius:.1rem;
    border:1px solid #dcdcdc;
}
.fenglei div ul{
    display:flex;
    flex-wrap:wrap;
}
.fenglei div{
    font-size:.4rem;
}
.fenglei{
    padding:.2rem .2rem;
    position:relative;
    width:10rem;
    background-color: #f6f6f6;
    // height:4rem;
}
.btn{
    // position:absolute;
    // bottom:.2rem;
    color:#fff;
    margin-top:.2rem;
    width:100%;
    background-color: #ed7912;
    height:1rem;
    line-height:1rem;
    text-align:center;
    border-radius:.1rem;
}
.foot div span{
    color:#cf2424;
    font-weight:900;
}
.foot{
    box-shadow: -1px -1px 2px #ccc;
    padding-left:.2rem;
    font-size:.38rem;
    display:flex;
    justify-content: space-between;
    width:100%;
    height:1.5rem;
    line-height:1.5rem;
    position:absolute;
    bottom:0rem;
    background-color: #fff;
}
.wen-zi-t p{
    color:#646464;
    font-size:.35rem;
}
.wen-zi-f div{
    font-size:.3rem;
    color:#7d7d7d;
}
.wen-zi-f p span{
    color:#7d7d7d;
}
.wen-zi-f p{
    font-size:.35rem;
    color:#cd1d1d;
    font-weight:900;
}
.name{
    font-size:.35rem;
    width: 3.2rem;
    height: 100%;
    color:#262626;
    // background-color: pink;
}
.wen-zi-f{
    display:flex;
    justify-content: space-between;
}
.wen-zi-t{
    display:flex;
    justify-content: space-between;
    width: 7.5rem;
    height: .6rem;
    // background-color: yellow;
}
.wen-zi{
    
    // padding-top:.2rem;
    margin-left: .2rem;
    width: 7.5rem;
    height: 1.7rem;
    // background-color: red;
}
.t-img-l{
    margin-left: .3rem;
    // margin-top:.2rem;
    width: 1.5rem;
    height: 1.5rem;
    // background-color: orange;
}
.t-img{
    // padding-top: .2rem;
    margin-left: .2rem;
    width: 1.5rem;
    height: 1.8rem;
    // background-color: red;
}
.tiao{
    background-color: #fff;
    width: 100%;
    height: 2.9rem;
    border-bottom:2px solid #dadada;
}
.conten{
    display:flex;
    
}

.sximg{
    margin-left:.2rem;
    margin-top:.3rem;
    width: .8rem;  
    height: .6rem; 
}
.sximg-search{
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
input::-webkit-input-placeholder {
    color: #c9c9c9;
    font-size:.35rem;
  }
  .img{
    width: .55rem;  
    height: .55rem; 
    // line-height: .5rem; 
    // margin-left:3.8rem;
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
    width:7.7rem;
    // margin-top:.21rem;
    margin-left:.17rem;
    height: .75rem;
    line-height: .75rem;
    // background-color: red;
  
  }
  .search{
    display:flex;
    margin-top:.21rem;
    margin-bottom:.21rem;

    margin-left:.32rem;
    width:8.6rem;
    height: .75rem;
    border-radius:.15rem;
    background-color: #fff;
  
  }





`