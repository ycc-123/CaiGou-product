import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseList } from 'network/Api'
import { SearchBar, Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import Tiao from './Tiao'

export default class PurchaseOrder extends Component {
    constructor(){
        super()
        this.state={
            data:[],
            limit: 100,
            page: 1,
            inputSearch:''
        }
        this.isLoadMore = true
    }

    componentDidMount(){
        getPurchaseList({ action: 'getPurchaseList', data: {
            uniacid: "53",
            uid:"2271",
            type:"1",
            limit:this.state.limit,
            page:this.state.page
          } }).then((res) => {
            if(res.data.status===4001){
                this.setState({
                    data: res.data.data.data
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                Toast.fail('网络错误', 2)
            }
        })
    }
    inputChange(e){
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }
    Search(){
        console.log(111)
        // if(){

        // }else{

        // }
        getPurchaseList({ action: 'getPurchaseList', data: {
            uniacid: "53",
            uid:"2271",
            type:"1",
            docno:this.state.inputSearch,
            // warehouseName:this.state.inputSearch,
            limit:this.state.limit,
            page:this.state.page
          } }).then((res) => {
            if(res.data.status===4001){
                this.setState({
                    data: res.data.data.data
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                // Toast.fail('网络错误', 2)
                getPurchaseList({ action: 'getPurchaseList', data: {
                    uniacid: "53",
                    uid:"2271",
                    type:"1",
                    // docno:this.state.inputSearch,
                    warehouseName:this.state.inputSearch,
                    limit:this.state.limit,
                    page:this.state.page
                  } }).then((res) => {
                    if(res.data.status===4001){
                        this.setState({
                            data: res.data.data.data
                        }, () => {
                            this.refs.scroll.BScroll.refresh()
                        })
                    }
                  })
            }
        })
    }
    render() {
        const scrollConfig = {
            probeType: 1
        }
        const scrollstyle={
            
        }
        return (
            <PurchaseOrderStyle>
                <BetterScroll config={scrollConfig} ref='scroll' style={scrollstyle} loadMore={this.loadMore}
                    isLoadMore={this.isLoadMore}>
                <div className='search' >
                    <input type="search" className='input' placeholder="请输入采购单号/仓库名称" name="inputSearch" 
                                    onChange={this.inputChange.bind(this)}
                                    value={this.state.inputSearch}/>
                    <div className='img' onClick={()=>{this.Search()}}>
                    <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search"/>
                    </div>
                </div>
                    {
                        this.state.data.map((value,key)=>{
                            return(
                                <div >
                                <Tiao item={value} key={key} history={this.props.history}/>
                                </div>
                            )
                        })
                    }
            </BetterScroll>
            </PurchaseOrderStyle>
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
            getPurchaseList({ action: 'getPurchaseList', data: {
                uniacid: "53",
                uid:"2271",
                type:"1",
                limit:this.state.limit,
                page:this.state.page
              } }).then(res => {
                // console.log(res.data.data.data)

                // 如果长度不等于得时候加载 那么是到底了
                if (res.data.data.data.length < this.state.limit) {
                    this.isLoadMore = false
                    /* let bottomTip = document.querySelector('.bottom-tip')
                    bottomTip.style.visibility = 'visible'
                    bottomTip.innerHTML = '商品已经全部加载完成' */
                }
                this.setState({
                    data: [...this.state.data, ...res.data.data.data],
                    loadingMore: false
                }, () => {
                    this.setState({
                        page: this.state.page += 1
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
const PurchaseOrderStyle = styled.div`
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
    width:6.5rem;
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
    height: 3rem;
    background-color: #fff;
    border-radius:.2rem;
    border:1px solid #dddddd;



}
input::-webkit-input-placeholder {
    color: #c9c9c9;
    fontsize:.4rem;
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



