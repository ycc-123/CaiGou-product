import React, { Component } from 'react'
import styled from 'styled-components'
import { getDamageList } from 'network/Api'
// import { SearchBar, Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
// import Tiao from './Tiao'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
import { Toast } from 'antd-mobile'
export default class ApplyOrder extends Component {
    constructor() {
        super()
        this.state = {
            tiao: [],
            inputSearch:'',
            limit: "10",
            page: 1,
            kongbj:true
        }
        this.isLoadMore = true
    }
    componentDidMount() {
        getDamageList({
            action: 'getDamageList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            console.log(res)
            if(res.data.status===4001){
                
                this.setState({
                    tiao: res.data.data.data
                }, () => {
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
    inputChange(e){
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    add(){
        this.state.kongbj===false?console.log():this.props.history.push('/addLossReport')
    }
    search(){
        getDamageList({
            action: 'getDamageList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                search: this.state.inputSearch,
                limit: "1000",
                page: "1"
            }
        }).then((res) => {
            console.log(res)
            if(res.data.status===4001){
            this.setState({
                tiao: res.data.data.data
            }, () => {
                this.refs.scroll.BScroll.refresh()
            })
        }
        })
    }
    submit(){
        console.log(1111)
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
          
            getDamageList({
                action: 'getDamageList', data: {
                    uniacid: store.getState().uniacid,
                    uid: store.getState().uid,
                    search:this.state.inputSearch,
                    limit:this.state.limit,
                    page:this.state.page
                }
            }).then((res) => {
               

                // 如果长度不等于得时候加载 那么是到底了
                if (res.data.data.data.length < this.state.limit) {
                    this.isLoadMore = false
                    /* let bottomTip = document.querySelector('.bottom-tip')
                    bottomTip.style.visibility = 'visible'
                    bottomTip.innerHTML = '商品已经全部加载完成' */
                }
                this.setState({
                    tiao: [...this.state.tiao, ...res.data.data.data],
                    // zongnp:res.data.data.total,
                    loadingMore: false
                }, () => {
                    let page=Number(this.state.page)
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
                        <input type="search" className='input' placeholder="请输入报损单号" name="inputSearch" 
                                    onChange={this.inputChange.bind(this)}
                                    value={this.state.inputSearch}/>
                        <div className='img' onClick={()=>{this.search()}}>
                            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                            </div>
                </div>
                <div
          onClick={()=>{this.add()}}
           className='add'>新增<span style={{fontSize:".4rem"}}>+</span></div>
          </div>

                    <div className='caigoudan' >
                    <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "1.17rem", bottom: "0" }} loadMore={this.loadMore}
                    isLoadMore={this.isLoadMore}>
                        {
                            this.state.tiao.map((v, k) => {
                                console.log(v)
                                return (
                                    <div className='dan' >
                                        <div onClick={()=>{this.props.history.push(`/LossReportDetail/${v.id}`)}}>
                                        <div className='dan-top'>
                                            <p>
                                                <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                                            </p>
                                            <div className='t-right'>
                                            <div className='caigoudanhao'>报损单号：{v.ydocno}</div>
                                            <div className='zuantai'>{v.statusName}</div>
                                            </div>
                                        </div>
                                        <div className='dan-footer'>
                                        <div >
                                            <div >
                                                <p>单据日期：{v.createtime}</p>
                                                <p>报损仓库：{v.warehouseName}</p>
                                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                                    <p>报损数量：0</p>
                                                    <p style={{marginRight:".27rem"}}>报损金额：0</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        </div>
                                        </div>
                                        
                                        <div className='btn_sh' onClick={() => { this.submit() }}
                                            style={{display:"none"}}
                                            >审核</div>
                                    </div>
                                )
                            })
                        }
                        </BetterScroll>
                    </div>
                </div>
                <div className='kongbj' style={{display:this.state.kongbj===false?"block":"none"}}>
                    <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/kong.png" alt=""/>
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