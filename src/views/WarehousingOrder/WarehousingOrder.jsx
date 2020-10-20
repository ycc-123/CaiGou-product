import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseDeliveryList } from 'network/Api'
import { Toast } from 'antd-mobile';
import Tiao from './Tiao'
import BetterScroll from 'common/betterScroll/BetterScroll'
export default class WarehousingOrder extends Component {
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    componentDidMount() {

        getPurchaseDeliveryList({ action: 'getPurchaseDeliveryList', data: {
            uniacid: "53",
            uid:"2271",
            type:"1",
            limit:"30",
            page:"2"
          } }).then((res) => {
            console.log(res.data.data.data)
            if(res.data.status===4001){

                this.setState({
                    data: res.data.data.data
                },()=>{
                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                Toast.fail('网络错误', 2)
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
            <WarehousingOrderStyle>
                <BetterScroll config={scrollConfig} ref='scroll' style={scrollstyle}>
            <div style={{width:"100%"}}>
                <div className='search'>
                    <input type="search" className='input' placeholder="请输入入库单号/仓库名称"/>
                    <div className='img'>
                    <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search"/>
                    </div>
                </div>
                    {
                        this.state.data.map((value,key)=>{
                            console.log(value)
                            return(
                                <div className='caigoudan' onClick={()=>{this.props.history.push(`/WarehousingOrderxing/${key}`)}}>
                                <Tiao item={value} key={key}/>
                                </div>
                            )
                        })
                    }
            </div>
            </BetterScroll>
            </WarehousingOrderStyle>
        )
    }
}
const WarehousingOrderStyle = styled.div`
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