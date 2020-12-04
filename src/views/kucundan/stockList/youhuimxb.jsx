import React, { Component } from 'react'
import styled from 'styled-components'
import { getRetailList ,get_cashier,get_store} from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import { Picker, List, DatePicker } from 'antd-mobile';
import Youhuimxbs from './youhuimxbs'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
import { LoadingMore } from 'common/loading'

export default class Youhuimxb extends Component {
    constructor() {
        super()
        this.state = {
            total:{},
            inputSearch:'',
            start:"",
            end:"",
            store_id:[],
            shouyinyuan:[],
            linshou:[],
            limit: "10",
            page: "1",
            zuantai:false,
            IDsyy:'',
            IDsj:'',
            end_time:'',
            start_time:'',
            today_time:"",
            kongbj:true
        }
        this.isLoadMore = true
    }
    componentDidMount() {

        var day2 = new Date();
        day2.setTime(day2.getTime());
        var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
        console.log(s2)
        this.setState({
            today_time: s2
        })
        get_store({
            action: 'get_store', data: {
                uniacid: store.getState().uniacid,
            }
        }).then((res) => {
            // console.log(res)
            var supplier = res.data.data.map(o=>{return{value:o.id,label:o.name}});
                    // console.log(supplier)
            if(res.data.status===4001){
                this.setState({
                    store_id:supplier
                })
            }else{
                Toast.info(res.data.msg,2)
            }
        })
        get_cashier({
            action: 'get_cashier', data: {
                uniacid: store.getState().uniacid,
            }
        }).then((res) => {
            console.log(res)
            
                    // console.log(shouyinyuan)
            if(res.data.status===4001){
                var shouyinyuan = res.data.data.map(o=>{return{value:o.id,label:o.nick_name}});
                this.setState({
                    shouyinyuan
                })
            }else{
                Toast.info(res.data.msg,2)
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
            if(res.data.status===4001){
                this.setState({
                linshou:res.data.data.data,
                total:res.data.data.total
            },()=>{
                this.refs.scroll.BScroll.refresh()
            })
            }else{
                this.setState({
                    kongbj:false
                })
                Toast.info(res.data.msg,2)
            }
            
        })
    }
    shaixuan(){
        this.state.zuantai===false?this.setState({zuantai:true}):this.setState({zuantai:false})
    }
    queding(){
        console.log(this.state.IDsj,"=======",this.state.IDsyy,this.state.end_time,this.state.start_time)
        this.setState({
            zuantai:false,
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
            if(res.data.status===4001){
                this.setState({
                linshou:res.data.data.data,
                total:res.data.data.total,
                kongbj:true
            },()=>{
                // this.refs.scroll.BScroll.refresh()
            })
            }else{
                Toast.info(res.data.msg,1)
                this.setState({
                    kongbj:false,
                    linshou:[],
                    total:{}
                   
                })
            }
            
        })
    }
    search() {
        console.log(this.state.inputSearch)
       
        getRetailList({
            action: 'getRetailList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                search:this.state.inputSearch,
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            if(res.data.status===4001){
                this.setState({
                linshou:res.data.data.data
            },()=>{
                // this.refs.scroll.BScroll.refresh()
            })
            }else{
                Toast.info(res.data.msg,1)
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
        const scrollConfig = {
            probeType: 1
        }
        const {linshou}=this.state
        // console.log(this.state.store_id)
        return (
            <YouhuimxbStyle>
    <DocumentTitle title={'优惠明细表'} />

                <div>
                    <div style={{ display: "flex" }}>
                        <div className='search' >
                            <input type="search" className='input' placeholder="请输入零售单号" name="inputSearch"
                            onChange={this.inputChange.bind(this)}
                            value={this.state.inputSearch} />
                            <div className='img' onClick={()=>{this.search()}}>
                                <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                            </div>
                        </div>
                        <div className='sximg' onClick={()=>{this.shaixuan()}}>
                            <img className='sximg-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/aqwe.png" alt="aaa" />
                        </div>
                    </div>

                    <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "1.17rem", bottom: "1.5rem" }} loadMore={this.loadMore} isLoadMore={this.isLoadMore}>
                    {
                        linshou.map((v,k)=>{
                            // console.log(v.all_fee)
                            return(
                                <Youhuimxbs item={v} page={this.state.page} history={this.props.history}></Youhuimxbs>
                            )
                        })
                    }
                    {

                        linshou.length > 0 &&
                        <LoadingMore isLoading={this.isLoadMore} />
                    }
                    </BetterScroll>


                    <div className='fenglei' style={{display:this.state.zuantai===false?"none":"block"}}>
                        <div>日期
                            <ul>
                                <p><span style={{position:"absolute",top:".85rem",left:"4.7rem"}}>~</span>
                                <article className='articleone'></article>
                                    <DatePicker
                                    mode="date"
                                        value={this.state.start}
                                        extra={this.state.today_time}
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
                                    mode="date"
                                        extra={this.state.today_time}
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
                    <div className='kongbj' style={{display:this.state.kongbj===false?"block":"none"}}>
                    <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/kong.png" alt=""/>
                    </div>
                    <div className='foot'>
                    <div>当前结果：<span>{this.state.total.total_price?this.state.total.total_price:0}</span></div>
                    <div style={{ marginRight: ".3rem" }}>总计优惠：<span>{this.state.total.total_fee?this.state.total.total_fee:0}</span></div>
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
                    limit: this.state.limit,
                    page: this.state.page
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
                    let page=Number(this.state.page)
                    this.setState({
                        page: page  += 1
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
.sximg{
    height:.5rem;
    width:.5rem;
    margin-top:.37rem;
    margin-left:.27rem;

}
.sximg img{
    width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
}

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
    top:1.6rem;
    left:7.8rem;
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

        width: 6.49rem;
        height: 0.33rem;
        margin-top:.25rem;
        margin-left:.31rem;
        // width:7.09rem;
        height:.85rem;
        // line-height:.85rem;
        font-size:.33rem;
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
        margin-right:.2rem;
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
        width:7.3rem;
        // margin-top:.21rem;
        margin-left:.17rem;
        height: .75rem;
        line-height: .75rem;
        // background-color: red;
      
      }
      .search{
        display:flex;
        justify-content: space-between;
        margin-top:.21rem;
        margin-left:.32rem;
        width:8.6rem;
        height: .75rem;
        border-radius:.15rem;
        background-color: #fff;
      
      }


.foot div span{
    color:#cf2424;
    font-weight:900;
}
.foot{
    box-shadow: -1px -1px 2px #ccc;
    padding-left:.3rem;
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




















.conten ul li article div img{
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
.conten ul li article div{
    margin-top:.1rem;
    width:.55rem;
    height:1.15em;
}
.conten ul li article span{
    font-size:.35rem;
}
.conten ul li article{
    display:flex;
}
.conten ul li p{
    margin-top:.35rem;
    font-size:.3rem;
}
.conten ul li{
    padding-left:.2rem;
    
    // margin-left:.1rem;
    border-right:2px solid #c8c8c8;
    width:6rem;
    // background-color: pink;
    height:1.2rem;
    // line-height:1.2rem;
}
.conten ul{
    display:flex;
}
.conten{
    width:100%;
    // background-color: #ed7912;
    height:1.7rem;
}
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
    font-weight:900;
}
.foot{
    box-shadow: -1px -1px 2px #ccc;
    padding-left:.3rem;
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
    left:1.5rem;
    top:.5rem;
    // padding-top:.3rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.end{
    position:absolute;
    left:4.9rem;
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
    top:4.4rem;
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
    top:2.5rem;
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
    // border:1px solid #dcdcdc;
}
.articletwo{
    position:absolute;
    top:.85rem;
    left:5.4rem;
    width:4.2rem;
    height:1rem;
    // border:1px solid #dcdcdc;
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
    overflow: hidden;
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






`

