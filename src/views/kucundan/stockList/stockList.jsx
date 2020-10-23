import React, { Component } from 'react'
import styled from 'styled-components'
import { getStockList } from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import StockListTiao from './stockListTiao'

export default class stockList extends Component {
    constructor(){
        super()
        this.state={
            goods:[],
            totalgnum:'',
            totalcostprice:''
        }
    }
    componentDidMount(){
        getStockList({
            action: 'getStockList', data: {
                uniacid: "53",
                uid: "2271",
            }
        }).then((res) => {
            console.log(res)
            if(res.data.status===4001){
                this.setState({
                    goods: res.data.data.data,
                    totalcostprice: res.data.data.totalcostprice,
                    totalgnum: res.data.data.totalgnum
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                Toast.fail(res.data.msg,2)
            }
        })
    }
    render() {
        const scrollConfig = {
            probeType: 1
        }
        const scrollstyle={
            
        }
        console.log(this.state.goods)
        return (
            <StockListStyle>
                <BetterScroll config={scrollConfig} ref='scroll' style={scrollstyle}>
                <div>
                    <div style={{ display: "flex" }}>
                        <div className='search' >
                            <input type="search" className='input' placeholder="请输入商品名称或商品编码" />
                            <div className='img'>
                                <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                            </div>
                        </div>
                        <div className='sximg'>
                            <img className='sximg-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/aqwe.png" alt="aaa" />
                        </div>
                    </div>
                    
                    {
                        this.state.goods.map((v,k)=>{

                            return(
                                <StockListTiao v={v} k={k}/>
                            )
                        })
                    }
                </div>
                </BetterScroll>
                <div className='foot'>
                    <div>总库存：<span>{this.state.totalgnum}</span></div>
                    <div style={{marginLeft:".8rem"}}>总库存金额：<span>{this.state.totalcostprice}</span></div>
                </div>
            </StockListStyle>
        )
    }
}
const StockListStyle = styled.div`
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
.wen-zi-t p{
    color:#646464;
    font-size:.35rem;
}
.wen-zi-f div{
    font-size:.35rem;
    color:#646464;
}
.wen-zi-f p span{
    color:#646464;
}
.wen-zi-f p{
    font-size:.38rem;
    color:#cf2424;
}
.name{
    font-size:.35rem;
    width: 3.2rem;
    height: 100%;
    color:#1a1a1a;
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
    
    padding-top:.2rem;
    margin-left: .2rem;
    width: 7.5rem;
    height: 1.7rem;
    // background-color: red;
}
.t-img-l{
    margin-left: .2rem;
    margin-top:.2rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: orange;
}
.t-img{
    // padding-top: .2rem;
    margin-left: .2rem;
    width: 1.5rem;
    height: 1.8rem;
    background-color: red;
}
.tiao{
    display:flex;
    width: 100%;
    height: 2rem;
    background-color: #fff;
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
    margin: .1rem .2rem;
    width:8.5rem;
    height: .8rem;
    border-radius:.5rem;
    background-color: #fff;

}





`