import React, { Component } from 'react'
import styled from 'styled-components'
// import { getPurchaseList } from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'

export default class Shouyinmxb extends Component {
    render() {
        return (
            <ShouyinmxbStyle>
                <div className='bj'>
            <div className='caigoudan'>
                    <div className='dan'>
                        <div className='dan-top'>
                            <p>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt=""/>
                            </p>
                            <div className='caigoudanhao'>零售单号：111111111</div>
                            {/* <div className='zuantai'></div> */}
                        </div>
                        <div className='dan-footer'>
                            <p>单据日期：11111</p>
                            <p>所属商家：111111111111</p>
                            <p>收银员：111111111111</p>
                            <p>支付方式：111111111111</p>
                            <p>订单状态：11111</p>
                            <p>原价总额：111111111111</p>
                            <p>优惠金额：111111111111</p>
                            <p>实收金额：111111111111</p>
                            
                        </div>
                    </div>
                </div>
                </div>
            </ShouyinmxbStyle>
        )
    }
}
const ShouyinmxbStyle = styled.div`
.bj{
    width:100rem;
    height:100rem;
    background-color: #fff;
}
.dan-footer{
    background-color: #f8f8f8;
    padding-bottom:.4rem;
}
.dan-footer p{

    padding-top:.28rem;
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
    // margin-left:.3rem;
    width: .4rem;  
    height: .4rem;
}
.dan-top{
    display:flex;
    width: 100%;  
    height: .9rem;
    // border-bottom:1px solid #dddddd;
}
.dan{
    margin:0rem .4rem;
    width: 9.1rem;  
    height: 4rem;
    background-color: #fff;
    border-radius:.2rem;
    // border:1px solid #dddddd;
}




`



