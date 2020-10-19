import React, { Component } from 'react'
import styled from 'styled-components'

export default class LossReportm extends Component {
    render() {
        return (
            <WarehousingOrderStyle>
            <div style={{width:"100%"}}>
                <div className='search'>
                    <input type="search" className='input' placeholder="请输入采购申请单号"/>
                    <div className='img'>
                    <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search"/>
                    </div>
                </div>

                <div className='caigoudan' >
                    <div className='dan'>
                        <div className='dan-top'>
                            <p>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt=""/>
                            </p>
                            <div className='caigoudanhao'>报损单号：CG20201009123456789</div>
                            <div className='zuantai'>待审核</div>
                        </div>
                        <div className='dan-footer'>
                            <div>   
                            <p>单据日期：2020-10-08</p>
                            <p>报损仓库：火蝶云三号店</p>
                            </div>
                            <div className='btn_sh' onClick={()=>{this.props.history.push('/LossReportf')}}>审核</div>
                        </div>
                    </div>
                </div>
            </div>
            </WarehousingOrderStyle>
        )
    }
}
const WarehousingOrderStyle = styled.div`
.btn_sh{
    width: 1.5rem;  
    height: .9rem;
    color:#fff;
    font-size:.35rem;
    border-radius:.2rem;
    line-height: .9rem;
    text-align:center;
    background-color: #ed5f21;
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
    width:6.8rem;
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