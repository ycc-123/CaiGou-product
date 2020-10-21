import React, { Component } from 'react'
import styled from 'styled-components'
// import { getPurchaseList } from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'

export default class Youhuimxb extends Component {
    render() {
        return (
            <YouhuimxbStyle>
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

                    <div className='caigoudan'>
                    <div className='dan'>
                        <div className='dan-top'>
                            <p>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt=""/>
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
                </div>
                    

                </div>
            </YouhuimxbStyle>
        )
    }
}
const YouhuimxbStyle = styled.div`
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
    height: 4rem;
    background-color: #fff;
    border-radius:.2rem;
    border:1px solid #dddddd;
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


