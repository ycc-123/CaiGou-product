import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseDeliveryList } from 'network/Api'
import { Toast } from 'antd-mobile';
import Tiao from './Tiao'
import BetterScroll from 'common/betterScroll/BetterScroll'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
import { LoadingMore } from 'common/loading'

export default class WarehousingOrder extends Component {
    constructor(){
        super()
        this.state={
            data:[],
            limit:10,
            page:1,
            inputSearch:'',
            kongbj:true
        }
        this.isLoadMore = true
    }
    componentDidMount() {
        getPurchaseDeliveryList({ action: 'getPurchaseDeliveryList', data: {
            uniacid: store.getState().uniacid,
            uid:store.getState().uid,
            type:"1",
            limit:this.state.limit,
            page:this.state.page
          } }).then((res) => {
            if(res.data.status===4001){
                this.setState({
                    data: res.data.data.data
                },()=>{
                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                this.setState({
                    kongbj:false
                })
                Toast.info(res.data.msg, 2)
            }
        })
    }
    inputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    Search(){
        getPurchaseDeliveryList({ action: 'getPurchaseDeliveryList', data: {
            uniacid: store.getState().uniacid,
            uid:store.getState().uid,
            type:"1",
            search:this.state.inputSearch,
            limit:"1000",
            page:"1"
          } }).then((res) => {
            if(res.data.status===4001){
                this.setState({
                    data: res.data.data.data
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                Toast.info(res.data.msg,2)
            }
        })
    }
    render() {
        const scrollConfig = {
            probeType: 1
        }
        return (
            <WarehousingOrderStyle>
    <DocumentTitle title={'采购入库单'} />
                <div className='search'>
                    <input type="search" className='input' placeholder="请输入入库单号/仓库名称" name="inputSearch" 
                                    onChange={this.inputChange.bind(this)}
                                    value={this.state.inputSearch}/>
                    <div className='img' onClick={()=>{this.Search()}}>
                    <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search"/>
                    </div>
                </div>
                <BetterScroll config={scrollConfig} ref='scroll' style={{ top:"1.17rem",bottom:"0"}} loadMore={this.loadMore}
                    isLoadMore={this.isLoadMore}>
                    {
                        this.state.data.map((value,key)=>{
                            return(
                                <div className='caigoudan' >
                                <Tiao item={value} key={key} history={this.props.history}/>
                                </div>
                            )
                        })
                    }
                    {
                        this.state.data.length > 0 &&
                        <LoadingMore isLoading={this.isLoadMore} />
                    }
            </BetterScroll>
            <div className='kongbj' style={{display:this.state.kongbj===false?"block":"none"}}>
                    <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/kong.png" alt=""/>
                </div>
            </WarehousingOrderStyle>
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
            getPurchaseDeliveryList({ action: 'getPurchaseDeliveryList', data: {
                uniacid: store.getState().uniacid,
                uid:store.getState().uid,
                type:"1",
                limit:this.state.limit,
                page:this.state.page
              } }).then(res => {
                if (res.data.data.data.length < this.state.limit) {
                    this.isLoadMore = false
                }
                this.setState({
                    data: [...this.state.data, ...res.data.data.data],
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
        } else {}
    }
}
const WarehousingOrderStyle = styled.div`
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