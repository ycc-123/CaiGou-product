import React, { Component } from 'react'
import styled from 'styled-components'
import { getStockList, getWarehouseList, getProductCategoryAll, showProductCategory } from 'network/Api'
import { Toast, List, DatePicker } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import LossReportTiao from './LossReportTiao'
import { store } from "store/index";
import { setTitle } from 'commons/utils'
export default class LossReport extends Component {
    constructor() {
        super()
        this.state = {
            fenleiName: ["今天", "昨天", "7天", "30日"],
            childrens: ["全部", "已审核", "待审核"],
            cankuID: '',
            ckkey: '',
            result: [],
            ekey: '',
            xian:false,
            
            data: [],
            key: '',
            date: '',
            start: '',
            start_data: '',
            end: '',
            end_data: '',
            time: '',
            today_time: ''

        }
    }
    componentDidMount() {
        setTitle('库存单')

        var day2 = new Date();
        day2.setTime(day2.getTime());
        var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
        this.setState({
            today_time: s2
        })
        // getStockList({
        //     action: 'getStockList', data: {
        //         uniacid: store.getState().uniacid,
        //         uid: store.getState().uid,
        //     }
        // }).then((res) => {
        //     console.log(res)
        //     if (res.data.status === 4001) {
        //         var result = res.data.data.data.map(o => { return { id: o.warehouseid, name: o.name } });
        //         console.log(result)
        //         this.setState({
        //             goods: res.data.data.data,
        //             totalcostprice: res.data.data.totalcostprice,
        //             totalgnum: res.data.data.totalgnum
        //         }, () => {
        //             this.refs.scroll.BScroll.refresh()
        //         })
        //     } else {
        //         Toast.fail(res.data.msg, 2)
        //     }
        // })

        getWarehouseList({
            action: 'getWarehouseList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                type: "1",
                limit: "8",
                page: "1"
            }
        }).then((res) => {
            console.log(res)
            if (res.data.status === 4001) {
                var result = res.data.data.data.map(o => { return { id: o.id, name: o.name } });
                console.log(result)
                this.setState({
                    result
                })
            } else {
                Toast.fail(res.data.msg, 2)
            }
        })
    }
    erjifenlei(v, k) {
        this.setState({
            ekey: k
        })
    }
    yijifenlei(v, k) {
        console.log(v, k)
        this.setState({
            yikey: k
        })
    }
    xianyin() {
        if (this.state.xian === false) {
            this.setState({
                xian: true
            })
        } else {
            this.setState({
                xian: false
            })
        }
    }
    canku(v, k) {
        console.log(v.id)
        this.setState({
            cankuID: v.id,
            ckkey: v.id
        })
    }


    search() {
        console.log(this.state.inputSearch)
        getStockList({
            action: 'getStockList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                search: this.state.inputSearch,
            }
        }).then((res) => {
            console.log(res)
            if (res.data.status === 4001) {
                var result = res.data.data.data.map(o => { return { id: o.warehouseid, name: o.name } });
                console.log(result)
                this.setState({
                    goods: res.data.data.data,
                    totalcostprice: res.data.data.totalcostprice,
                    totalgnum: res.data.data.totalgnum
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                Toast.fail(res.data.msg, 2)
            }
        })
    }
    inputChange(e) {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        console.log(this.state.childrens)
        const scrollConfig = {
            probeType: 1
        }
        const scrollConfigs = {
            probeType: 1
        }

        console.log(this.state.goods)
        return (
            <LossReportStyle>


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
                <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "1rem", bottom: "1.5rem" }}>
                    <div className='tiao'>
                        <ul className='header'>
                            <li className='order'>报损单号：BS20201020563456465</li>
                            <li className='store_name'>火蝶云</li>
                        </ul>
                        <div className='conten'>
                            {/* <img className='t-img-l'  alt="" /> */}
                            <img className='t-img-l' src="https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png" alt="" />

                            <ul className='wen-zi'>
                                <li className='wen-zi-t'>
                                    <div className='name'>name</div>
                                    <p style={{ color: "#858585" }}>0.85斤</p>
                                </li>
                                <li className='wen-zi-f'>
                                    <div>￥：444元/斤</div>
                                    <p><span style={{fontWeight:"100"}}>总价格：</span>444</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </BetterScroll>

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
                                <span style={{ fontSize: ".5rem", paddingTop: ".25rem",paddingLeft:'.3rem' }}>&nbsp;~</span>
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
                                        <li onClick={(e) => { this.erjifenlei(v, k) }}
                                            style={{ background: this.state.ekey === k ? "#fff5ed" : '', color: this.state.ekey === k ? "#ed7913" : '', border: this.state.ekey === k ? "1px solid #ed7913" : '' }}
                                        >{v}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='btn' onClick={() => { this.queding() }}>确定</div>
                </div>

                <div className='foot' >
                    <div>总数量：<span>{this.state.totalgnum ? this.state.totalgnum : 0}</span></div>
                    <div style={{ marginLeft: ".8rem" }}>总报损金额：<span>{this.state.totalcostprice ? this.state.totalcostprice : 0}</span></div>
                </div>
            </LossReportStyle>
        )
    }
}
const LossReportStyle = styled.div`

.start{
    margin-left:2rem;
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
    padding-right:.4rem;
}
.order{
    color: #5cab31;
}
.header{
    font-size:.35rem;
    display:flex;
    justify-content: space-between;
    padding:.2rem .2rem;
}
.fenglei div ul li{
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
    padding-left:.9rem;
    font-size:.38rem;
    display:flex;
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
    font-size:.35rem;
    color:#7d7d7d;
}
.wen-zi-f p span{
    color:#5f5f5f;
}
.wen-zi-f p{
    font-size:.38rem;
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
    height: 1.1rem;
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
    margin-left: .2rem;
    // margin-top:.2rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: orange;
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
    height: 2.6rem;
}
.conten{
    display:flex;
    border-bottom:2px solid #dadada;
}

.sximg{
    margin-left:.2rem;
    margin-top:.2rem;
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
    width: .8rem;  
    height: .6rem; 
}
.img-search{
    margin-top:.1rem;
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
    
.input{
    font-size:.35rem;
    border:none;
    width:8.3rem;
    margin-top:.1rem;
    margin-left:.3rem;
    height: .6rem;
    // background-color: red;

}
.search{
    display:flex;
    margin: .1rem .2rem;
    width:8.5rem;
    height: .8rem;
    border-radius:.5rem;
    background-color: #fff;

}





`