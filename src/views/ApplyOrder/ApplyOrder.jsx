import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseApplyList } from 'network/Api'
// import { SearchBar, Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
// import Tiao from './Tiao'
import { setTitle } from 'commons/utils'
import { store } from "store/index";
export default class ApplyOrder extends Component {
    constructor() {
        super()
        this.state = {
            tiao: [],
            inputSearch:''
        }
    }
    componentDidMount() {
        setTitle('采购申请单')
        getPurchaseApplyList({
            action: 'getPurchaseApplyList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                // type:"1",
                limit: "1000",
                page: "1"
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                tiao: res.data.data.data
            }, () => {
                this.refs.scroll.BScroll.refresh()
            })
        })
    }
    inputChange(e){
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    search(){
        getPurchaseApplyList({
            action: 'getPurchaseApplyList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                search: this.state.inputSearch,
                limit: "1000",
                page: "1"
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                tiao: res.data.data.data
            }, () => {
                this.refs.scroll.BScroll.refresh()
            })
        })
    }
    render() {
        const scrollConfig = {
            probeType: 1
        }
        return (
            <ApplyOrderStyle>
                <div style={{ width: "100%" }}>
                    <div className='search'>
                        <input type="search" className='input' placeholder="请输入采购申请单号" name="inputSearch" 
                                    onChange={this.inputChange.bind(this)}
                                    value={this.state.inputSearch}/>
                        <div className='img' onClick={()=>{this.search()}}>
                            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                        </div>
                    </div>

                    <div className='caigoudan' >
                    <BetterScroll config={scrollConfig} ref='scroll' style={{ top:"1.3rem",bottom:"0"}}>
                        {
                            this.state.tiao.map((v, k) => {
                                return (
                                    <div className='dan' onClick={()=>{this.props.history.push(`/ApplyOrderx/${v.id}`)}}>
                                        <div className='dan-top'>
                                            <p>
                                                <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                                            </p>
                                            <div className='caigoudanhao'>采购单号：{v.docno}</div>
                                            <div className='zuantai'>{v.statusname}</div>
                                        </div>
                                        <div className='dan-footer'>
                                            <div>
                                                <p>单据日期：{v.docdate}</p>
                                                <p>申请数量：{v.totalnum}</p>
                                            </div>
                                            <div className='btn_sh' onClick={() => { }}
                                            style={{display:v.statusname==="提交成功"?"none":''}}
                                            >提交</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </BetterScroll>


                    </div>
                </div>
            </ApplyOrderStyle>
        )
    }
}
const ApplyOrderStyle = styled.div`
.btn_sh{
    width: 1.7rem;  
    height: .9rem;
    color:#fff;
    font-size:.35rem;
    border-radius:.2rem;
    line-height: .9rem;
    text-align:center;
    background-color: #ed7913;
    margin-top: 1rem;
    margin-right:.2rem;
}
.dan-footer{
    display:flex;
    justify-content: space-between;

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
    width:6.3rem;
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