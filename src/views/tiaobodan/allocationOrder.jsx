import React, { Component } from 'react'
import styled from 'styled-components'
import { getWarehouseChangeList } from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
export default class InventoryList extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            limit: 10,
            page: 1,
            inputSearch: ''
        }
        this.isLoadMore = true
    }
    componentDidMount() {

        getWarehouseChangeList({
            action: 'getWarehouseChangeList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                // type: "1",
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            console.log(res.data.data.data)
            if (res.data.status === 4001) {

                this.setState({
                    data: res.data.data.data
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                Toast.info('网络错误', 2)
            }
        })
    }
    inputChange(e) {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    Search() {
        console.log(111)
        getWarehouseChangeList({
            action: 'getWarehouseChangeList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                // type: "1",
                search: this.state.inputSearch,
                // warehouseName:this.state.inputSearch,
                limit: "1000",
                page: "1"
            }
        }).then((res) => {
            if (res.data.status === 4001) {
                this.setState({
                    data: res.data.data.data
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
    }

    render() {
        const scrollConfig = {
            probeType: 1
        }
        return (
            <WarehousingOrderStyle>
    <DocumentTitle title={'调拨单'} />

                {/* <div style={{width:"100%"}}> */}
                <div style={{display:"flex"}}>
                <div className='search'>
                    <input type="search" className='input' placeholder="请输入调拨单单号" name="inputSearch"
                        onChange={this.inputChange.bind(this)}
                        value={this.state.inputSearch} />
                    <div className='img' onClick={() => { this.Search() }}>
                        <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                    </div>
                </div>
                <div
          onClick={()=>{this.props.history.push('/addallocationList')}}
           className='add'>新增<span style={{fontSize:".4rem"}}>+</span></div>
          </div>
                <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "1.17rem", bottom: "0" }} loadMore={this.loadMore}
                    isLoadMore={this.isLoadMore}>
                    {
                        this.state.data.map((value, key) => {
                            // console.log(value)
                            let data = value
                            let Color = ''
                            if (data.status === "提交成功") {
                                Color = "#22a31b"
                            } else if (data.status === "待提交") {
                                Color = "#E80D0D"
                            }
                            return (
                                <div className='caigoudan' >
                                    <div className='dan' onClick={() => { this.props.history.push(`/allocationListDetails/${data.id}`) }}>
                                        <div className='dan-top'>
                                            <p>
                                                <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                                            </p>
                                            <div className='t-right'>
                                                <div className='caigoudanhao'>调拨单号：{data.docno}</div>
                                                <div className='zuantai' style={{ color: Color }}>{data.status}</div>
                                            </div>
                                        </div>
                                        <div className='dan-footer'>
                                            <p>单据日期：{data.docdate}</p>
                                            <p>转出仓库：{data.outwarehouse}</p>
                                            <p>转入仓库：{data.inwarehouse}</p>
                                            <div style={{ display: "flex" ,justifyContent: "space-between"}}>
                                                <p>移库总数量：{data.transfer_totalnumber}</p>
                                                <p style={{ marginRight: ".4rem" }}>移库总金额：{data.transfer_totalmoney}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* </div> */}
                </BetterScroll>
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
            // console.log(111)
            getWarehouseChangeList({
                action: 'getWarehouseChangeList', data: {
                    uniacid: store.getState().uniacid,
                    uid: store.getState().uid,
                    type: "1",
                    limit: this.state.limit,
                    page: this.state.page
                }
            }).then(res => {
                console.log(res.data.data.data)
                if (res.data.data.data.length < this.state.limit) {
                    this.isLoadMore = false
                }
                this.setState({
                    data: [...this.state.data, ...res.data.data.data],
                    loadingMore: false
                }, () => {
                    let page = this.state.page
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
const WarehousingOrderStyle = styled.div`
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