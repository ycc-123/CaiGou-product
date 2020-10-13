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
                </div>
            </AddPurchaseOrderStyle>
        )
    }
}
const AddPurchaseOrderStyle = styled.div`
.biao{
    width: 100%;
    height: 7rem;
    background-color: #fff;
}
.biao li input{
    border:none;
    width:7rem;
    height:.8rem;
}
.biao li span{
    color:#e41515; 
}
.biao li{
    padding-left:.3rem;
    color:#646464;
    padding-top:.4rem;
    // text-align:center;
    font-size:.45rem;
    color:#646464; 
    width: 100%;
    height: 1.4rem;
    border-bottom: 1px solid #dbdbdb;

}



`