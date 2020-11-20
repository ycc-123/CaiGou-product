import React, { Component } from 'react'
import styled from 'styled-components'
import { getInventoryList } from 'network/Api'
import { Toast } from 'antd-mobile';
// import Tiao from './Tiao'
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

        getInventoryList({
            action: 'getInventoryList', data: {
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
        getInventoryList({
            action: 'getInventoryList', data: {
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
    componentDidUpdate = () => {
        // // 默认每次加载x=0，y=0 不然会有bug
        // // console.log(this)
        // /* console.log('进来了') */
        // this.refs.scroll.BScroll.scrollTo(0, 0)
        // this.refs.scroll.BScroll.refresh()

    }
    render() {
        const scrollConfig = {
            probeType: 1
        }
        return (
            <WarehousingOrderStyle>
    <DocumentTitle title={'盘点单'} />

                {/* <div style={{width:"100%"}}> */}
                <div className='search'>
                    <input type="search" className='input' placeholder="请输入盘点单单号" name="inputSearch"
                        onChange={this.inputChange.bind(this)}
                        value={this.state.inputSearch} />
                    <div className='img' onClick={() => { this.Search() }}>
                        <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                    </div>
                </div>
                <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "1.3rem", bottom: "0" }} loadMore={this.loadMore}
                    isLoadMore={this.isLoadMore}>
                    {
                        this.state.data.map((value, key) => {
                            console.log(value)
                            let data = value
                            let Color = ''
                            if (data.statusname === "提交成功") {
                                Color = "#22a31b"
                            } else if (data.statusname === "待提交") {
                                Color = "#d92929"
                            }
                            return (
                                <div className='caigoudan' >
                                    <div className='dan' onClick={() => { this.props.history.push(`/InventoryListDetails/${data.id}`) }}>
                                        <div className='dan-top'>
                                            <p>
                                                <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                                            </p>
                                            <div className='caigoudanhao'>盘点单号：{data.docno}</div>
                                            <div className='zuantai' style={{ color: Color }}>{data.statusname}</div>
                                        </div>
                                        <div className='dan-footer'>
                                            <p>单据日期：{data.docdate}</p>
                                            <p>盘点仓库：{data.warehousename}</p>
                                            <div style={{ display: "flex" ,justifyContent: "space-between"}}>
                                                <p>账面总数量：{data.gnum}</p>
                                                <p style={{ margin: ".25rem" }}>实际总数量：{data.realnum}</p>
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
            getInventoryList({
                action: 'getInventoryList', data: {
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
.dan-footer{
    width:100%;
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
        width:6.4rem;
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
        // height: 3rem;
        background-color: #fff;
        border-radius:.2rem;
        border:1px solid #dddddd;
    
    
    
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
        margin: .3rem .2rem;
        width:9.5rem;
        height: .8rem;
        border-radius:.5rem;
        background-color: #fff;
    
    }
    
    `