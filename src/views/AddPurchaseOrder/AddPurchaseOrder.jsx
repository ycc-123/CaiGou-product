import React, { Component } from 'react'
import styled from 'styled-components'


export default class AddPurchaseOrder extends Component {
    render() {
        return (
            <AddPurchaseOrderStyle>
                <div>
                <ul className='biao'>
                    <li><span>*</span>采购仓库：</li>
                    <li><span>*</span>供应商：</li>
                    <li>预付款：<input type="text"/></li>
                    <li>合同编号：<input type="text"/></li>
                    <li style={{border:"none"}}>备注：<input type="text"/></li>
                </ul>

                <div className='foot'>
                    <div className='left'></div>
                    <div></div>
                    <div className='right' onClick={()=>{this.props.history.push('/category')}}>下一步</div>

                </div>


                </div>
            </AddPurchaseOrderStyle>
        )
    }
}
const AddPurchaseOrderStyle = styled.div`
.left{
    width: 35rem;
    height: 1.6rem;
    background-color: #fff;
}
.right{
    font-size:.4rem;
    color:#fff;
    text-align:center;
    width: 100%;
    margin:auto;
    height: 1.6rem;
    line-height:1.6rem;
    background-color: #ED7913;
}
.foot{
    display:flex;
    width: 100%;
    height: 1.6rem;
    background-color: #fff;
    position:absolute;
    bottom:0;
}


.biao{
    width: 100%;
    height: 7rem;
    background-color: #fff;
}
.biao li input{
    border:none;
    outline:none;
    font-size:.5rem;
    width:7rem;
    height:.9rem;
    color:#646464; 
}
.biao li span{
    color:#e41515; 
}
.biao li{
    padding-left:.3rem;
    color:#646464;
    padding-top:.3rem;
    // text-align:center;
    font-size:.45rem;
    color:#646464; 
    width: 100%;
    height: 1.4rem;
    border-bottom: 1px solid #dbdbdb;

}



`