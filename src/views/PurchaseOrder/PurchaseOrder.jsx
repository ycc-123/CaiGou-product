import React, { Component } from 'react'
import styled from 'styled-components'

export default class PurchaseOrder extends Component {
    render() {
        return (
            <PurchaseOrderStyle>
            <div style={{width:"100%"}}>
                <div className='search'>
                    <input type="search" className='input' placeholder="请输入采购单号/仓库名称"/>
                    <div className='img'>
                    <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search"/>
                    </div>
                </div>

                <div className='caigoudan' onClick={()=>{this.props.history.push('/PurchaseOrderDetailed')}}>
                    <div className='dan'>
                        <div className='dan-top'>
                            <p>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt=""/>
                            </p>
                            <div className='caigoudanhao'>采购单号：31231231231</div>
                            <div className='zuantai'>待审核</div>
                        </div>
                        <div className='dan-footer'>
                            <p>单据日期：2020-10-08</p>
                            <p>采购仓库：火蝶云三号店</p>
                        </div>
                    </div>
                </div>
            </div>
            </PurchaseOrderStyle>
        )
    }
}
const PurchaseOrderStyle = styled.div`
.dan-footer p{
    margin-top:.3rem;
    margin-left:.4rem;
    font-size:.5rem;
    color: #969696;
}
.zuantai{
    margin-top:.3rem;
    margin-left:.4rem;
    font-size:.5rem;
    color: #ed5f21;
}
.caigoudanhao{
    margin-top:.3rem;
    margin-left:.4rem;
    font-size:.5rem;
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
    margin-left:.4rem;
    width: .6rem;  
    height: .8rem;
}
.dan-top{
    display:flex;
    width: 100%;  
    height: 1.2rem;
    border-bottom:1px solid #dddddd;
}
.dan{
    margin:.4rem .4rem;
    width: 9.1rem;  
    height: 3.5rem;
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



