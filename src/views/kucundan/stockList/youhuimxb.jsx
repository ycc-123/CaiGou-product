import React, { Component } from 'react'
import styled from 'styled-components'
import { getRetailList ,get_cashier,get_store} from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import { Picker, List, DatePicker } from 'antd-mobile';
import Youhuimxbs from './youhuimxbs'
import { setTitle } from 'commons/utils'
import { store } from "store/index";
export default class Youhuimxb extends Component {
    constructor() {
        super()
        this.state = {
            start:"",
            end:"",
            store_id:[],
            shouyinyuan:[],
            linshou:[],
            limit: "50",
            page: "1",
            zuantai:false,
            IDsyy:'',
            IDsj:'',
            end_time:'',
            start_time:''
        }
        this.isLoadMore = true
    }
    componentDidMount() {
        setTitle('优惠明细表')
        get_store({
            action: 'get_store', data: {
                uniacid: store.getState().uniacid,
            }
        }).then((res) => {
            // console.log(res)
            var supplier = res.data.data.map(o=>{return{value:o.id,label:o.name}});
                    // console.log(supplier)
            if(res.data.status===1002){
                this.setState({
                    store_id:supplier
                })
            }else{
                Toast.fail(res.data.msg,2)
            }
        })
        get_cashier({
            action: 'get_cashier', data: {
                uniacid: store.getState().uniacid,
            }
        }).then((res) => {
            var shouyinyuan = res.data.data.map(o=>{return{value:o.id,label:o.nick_name}});
                    // console.log(shouyinyuan)
            if(res.data.status===1002){
                this.setState({
                    shouyinyuan
                })
            }else{
                Toast.fail(res.data.msg,2)
            }
        })
        let IDsyy=this.state.IDsyy.toString()
        let IDsj=this.state.IDsj.toString()
        getRetailList({
            action: 'getRetailList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                starttime:this.state.start_time,
                endtime:this.state.end_time,
                createid:IDsyy,
                store_id:IDsj,
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            // console.log(res)
            this.setState({
                linshou:res.data.data.data
            },()=>{
                this.refs.scroll.BScroll.refresh()
            })
        })
    }
    shaixuan(){
        this.state.zuantai===false?this.setState({zuantai:true}):this.setState({zuantai:false})
    }
    queding(){
        console.log(this.state.IDsj,"=======",this.state.IDsyy,this.state.end_time,this.state.start_time)
        let IDsyy=this.state.IDsyy.toString()
        let IDsj=this.state.IDsj.toString()
        getRetailList({
            action: 'getRetailList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                starttime:this.state.start_time,
                endtime:this.state.end_time,
                createid:IDsyy,
                store_id:IDsj,
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            this.setState({
                linshou:res.data.data.data
            },()=>{
                this.refs.scroll.BScroll.refresh()
            })
        })
    }
    render() {
        const scrollConfig = {
            probeType: 1
        }
        const {linshou}=this.state
        // console.log(this.state.store_id)
        return (
            <YouhuimxbStyle>
                <div>
                    <div style={{ display: "flex" }}>
                        <div className='search' >
                            <input type="search" className='input' placeholder="请输入商品名称或商品编码" />
                            <div className='img' onClick={()=>{}}>
                                <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                            </div>
                        </div>
                        <div className='sximg' onClick={()=>{this.shaixuan()}}>
                            <img className='sximg-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/aqwe.png" alt="aaa" />
                        </div>
                    </div>

                    <BetterScroll config={scrollConfig} ref='scroll' style={{ top:"1.3rem",bottom:"0"}} loadMore={this.loadMore} isLoadMore={this.isLoadMore}>
                    {
                        linshou.map((v,k)=>{
                            // console.log(v)
                            return(
                                <Youhuimxbs item={v} history={this.props.history}></Youhuimxbs>
                            )
                        })
                    }
                    </BetterScroll>


                    <div className='fenglei' style={{display:this.state.zuantai===false?"none":"block"}}>
                        <div>日期
                            <ul>
                                <p>——
                                <article className='articleone'></article>
                                    <DatePicker
                                        value={this.state.start}
                                        extra="2020-10-23 06:23"
                                        // value={this.state.dates}
                                        onChange={v => this.setState({
                                            start:v,
                                            start_time: v.getFullYear() + '-' + (v.getMonth() + 1) + '-' + v.getDate() + ' '+ v.getHours()+ ':'+ v.getMinutes() + ':'+v.getSeconds()
                                        })}
                                    >
                                        <List.Item className="start" arrow="horizontal"></List.Item>
                                    </DatePicker>
                                
                                <article className='articletwo'></article>
                                    <DatePicker
                                        extra="2020-10-23 06:23"
                                        value={this.state.end}
                                        onChange={v => this.setState({
                                            end:v,
                                            end_time: v.getFullYear() + '-' + (v.getMonth() + 1) + '-' + v.getDate() + ' '+ v.getHours()+ ':'+ v.getMinutes() + ':'+v.getSeconds()
                                        })}
                                    >
                                        <List.Item className="end" arrow="horizontal"></List.Item>
                                    </DatePicker>
                                </p>
                            </ul>
                        </div>

                        <div>所属商家
                            <ul>
                                <li>
                                    <Picker
                                        data={this.state.store_id}
                                        cols={1}
                                        className="forss"
                                        extra="所属商家"
                                        value={this.state.sValue}
                                        onChange={v => this.setState({ sValue: v })}
                                        onOk={v => this.setState({ IDsj: v })}
                                    >
                                        <List.Item className='times' arrow="horizontal"></List.Item>
                                    </Picker>
                                </li>

                            </ul>
                        </div>

                        <div >收银员
                            <ul>
                                <li>
                                    <Picker
                                        data={this.state.shouyinyuan}
                                        cols={1}
                                        className="forss"
                                        extra="收银员"
                                        value={this.state.Value}
                                        onChange={v => this.setState({ Value: v })}
                                        onOk={v => this.setState({ IDsyy: v })}
                                    >
                                        <List.Item className='time' arrow="horizontal"></List.Item>
                                    </Picker>
                                </li>
                            </ul>
                        </div>

                        <div className='btn' onClick={() => { this.queding() }}>确定</div>
                    </div>
                    
                    {/* <div className='caigoudan'>
                        <div className='dan'>
                            <div className='dan-top'>
                                <p>
                                    <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                                </p>
                                <div className='caigoudanhao'>零售单号：111111111</div>
                                <div className='zuantai'></div>
                            </div>
                            <div className='dan-footer'>
                                <p>单据日期：11111</p>
                                <p>所属商家：111111111111</p>
                                <p>收银员：111111111111</p>
                                <p>优惠总额：111111111111</p>
                            </div>
                        </div>
                    </div> */}
                    <div className='foot'>
                    <div>当前结果：<span>11111</span></div>
                    <div style={{marginLeft:".8rem"}}>总计优惠：<span>22222</span></div>
                </div>


                </div>
            </YouhuimxbStyle>
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
            // console.log(111)
            getRetailList({
                action: 'getRetailList', data: {
                    uniacid: store.getState().uniacid,
                    uid: store.getState().uid,
                    // starttime:"2020-10-1 13:41:08",
                    // endtime:"2020-10-24 13:41:08",
                    // createid:'59',
                    // store_id:"38",
                    limit: "10",
                    page: "1"
                }
            }).then((res) => {
                // console.log(res.data.data.data)

                // 如果长度不等于得时候加载 那么是到底了
                if (res.data.data.data.length < this.state.limit) {
                    this.isLoadMore = false
                    /* let bottomTip = document.querySelector('.bottom-tip')
                    bottomTip.style.visibility = 'visible'
                    bottomTip.innerHTML = '商品已经全部加载完成' */
                }
                this.setState({
                    linshou: [...this.state.linshou, ...res.data.data.data],
                    loadingMore: false
                }, () => {
                    let page=this.state.page
                    this.setState({
                        page: page += 1
                    })


                    loading = false
                    this.refs.scroll.BScroll.finishPullUp()
                    this.refs.scroll.BScroll.refresh()
                })
            })
        } else {
            /* let bottomTip = document.querySelector('.bottom-tip')
            bottomTip.style.visibility = 'visible'
            bottomTip.innerHTML = '商品已经全部加载完成' */
        }
    }
}
const YouhuimxbStyle = styled.div`
// }
// .btn{
//     // position:absolute;
//     // bottom:.2rem;
//     color:#fff;
//     width:100%;
//     background-color: #ed7912;
//     height:1rem;
//     line-height:1rem;
//     text-align:center;
//     border-radius:.1rem;
// }
.foot div span{
    color:#cf2424;
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
.am-list-item .am-list-line .am-list-extra{
    padding-top:.5rem;
    color:#a9a9a9;
    text-align: left;
    font-size:.32rem;
    padding-left:.1rem;
}
.am-list-item .am-list-line .am-list-arrow{

    background-image: none;
    opacity:0;
}
.onetimes{
    position:absolute;
    left:1.8rem;
    top:-.2rem;
    // padding-top:.3rem;
    color: red;
    width:12rem;
    background-color: transparent;
}
.start{
    position:absolute;
    left:0rem;
    top:.5rem;
    // padding-top:.3rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.end{
    position:absolute;
    left:5rem;
    top:.5rem;
    // padding-top:.3rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;

}
.am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
}




// .wrapper .CommissionHeader{
//     height:1.09rem;
// }
// .wrapper .CommissionHeader .navbar li{
//     // height:1.09rem;
//     padding-top:.15rem;
// }
// .wrapper .CommissionHeader .navbar .active{
//     padding-bottom: .28rem;
// }
// .stor_name{
//     font-size:0.32rem;
//     height:1.17rem;
//     line-height:1.17rem;
// }
.am-list-item .am-list-line{
    width:6rem;
}
.am-list-item .am-list-line .am-list-extra{
    // padding-top:.5rem;
    color:#a9a9a9;
    text-align: left;
    font-size:.45rem;
    padding-left:.1rem;
    width:3rem;
}
.am-list-item .am-list-line .am-list-arrow{
    margin-left:4.5rem !important;
    // background-image: none;
    // opacity:0;
}
.onetimes{
    position:absolute;
    left:1.8rem;
    top:-.2rem;
    // padding-top:.3rem;
    color: red;
    width:12rem;
    background-color: transparent;
}
.time{
    position:absolute;
    left:0rem;
    top:4rem;
    // padding-top:.3rem;
    color: #a9a9a9;
    width:12rem;
    // height:1rem;
    background-color: transparent;
    // border:1px solid #dcdcdc;
    // background-color: #f6f6f6;
}
.times{
    position:absolute;
    left:0rem;
    top:2.2rem;
    // padding-top:.3rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
    // 
}

.articleone{
    position:absolute;
    top:.85rem;
    left:.2rem;
    width:4.1rem;
    height:1rem;
    border:1px solid #dcdcdc;
}
.articletwo{
    position:absolute;
    top:.85rem;
    left:5.4rem;
    width:4.2rem;
    height:1rem;
    border:1px solid #dcdcdc;
}


.fenglei div ul p{
    width:9.3rem;
    height:.9rem;
    line-height:.9rem;
    text-align:center;
    margin:.2rem 0rem;
    border-radius:.1rem;
    // border:1px solid #dcdcdc;
    // background-color: #f6f6f6;
}
.fenglei div ul li{
    width:9.3rem;
    height:.9rem;
    line-height:.9rem;
    text-align:center;
    
    margin:.2rem 0rem;
    border-radius:.1rem;
    border:1px solid #dcdcdc;
    background-color: #f6f6f6;
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
    background-color: #f0f0f0;
    // height:4rem;
}
.btn{
    margin-top:.3rem;
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




.dan-footer p{
    margin-top:.28rem;
    margin-left:.4rem;
    font-size:.38rem;
    color: #969696;
}
.zuantai{
    margin-top:.15rem;
    // margin-left:2.1rem;
    font-size:.38rem;
    color: #ed5f21;
}
.caigoudanhao{
    margin-top:.15rem;
    margin-left:.2rem;
    width:7.5rem;
    font-size:.38rem;
    color: #333333;
}
.dan-top p img{
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
.dan-top p{
    margin-top:.24rem;
    margin-left:.3rem;
    width: .4rem;  
    height: .4rem;
}
.dan-top{
    display:flex;
    width: 100%;  
    height: .9rem;
    border-bottom:1px solid #dddddd;
}
.dan{
    margin:.4rem .4rem;
    width: 9.1rem;  
    height: 4.7rem;
    background-color: #fff;
    border-radius:.2rem;
    border:1px solid #dddddd;
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


