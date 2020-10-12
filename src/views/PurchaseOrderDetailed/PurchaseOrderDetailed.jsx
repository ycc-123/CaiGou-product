import React, { Component } from 'react'
import styled from 'styled-components'

export default class PurchaseOrderDetailed extends Component {
    render() {
        return (
            <PurchaseOrderDetailedStyle>
            <div>
            <div className='search'>
                    <input type="search" className='input' placeholder="请输入商品名称或商品编码"/>
                    <div className='img'>
                    <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search"/>
                    </div>
            </div>

            <div className='conten'>
                <div className='conten-top'>
                    <p>
                    <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/dingdan.png" alt=""/>
                    </p>
                    <div>24242342342</div>
                </div>

                <div className='conten-c'>
                    <p>单据日期：2020-09-05</p>
                    <p>单据仓库：火蝶云一号店</p>
                    <p>单据状态：<span style={{color:"#ed5f21"}}>待审核</span></p>
                </div>

                <div className='footer'>
                    采购备注：
                </div>
            </div>





            </div>
            </PurchaseOrderDetailedStyle>
        )
    }
}
const PurchaseOrderDetailedStyle = styled.div`
.footer{
    font-size:.4rem;
    margin-top: .15rem;
    margin-left: .3rem;
    color:#969696;

}
.conten-c p{ 
    color:#8f8f8f;
    font-size:.4rem;
    padding-top:.3rem;
    margin-left: .3rem;
}
.conten-c{
    width: 9.3rem;  
    height: 2.6rem;  
    margin:0 .3rem;
    background-color: #f8f8f8;

}
.conten-top p img{ 
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
.conten-top div{
    font-size:.5rem;
    margin-top: .4rem;


}
.conten-top p{
    margin-top: .3rem;
    margin-left:.3rem;
    width:1rem;
    height:1rem;
}
.conten-top{
    display:flex;

}
.conten{
    border-bottom:2px solid #dadada;
    margin-top:.2rem;
    width:100%;
    height:4.7rem;
    background-color: #fff;

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
    margin: .3rem .2rem 0;
    width:9.5rem;
    height: .8rem;
    border-radius:.5rem;
    background-color: #fff;

}




`


