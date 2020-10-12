import React, { Component } from 'react'
import styled from 'styled-components'


export default class AddPurchaseOrder extends Component {
    render() {
        return (
            <AddPurchaseOrderStyle>
                <div>
                <ul className='biao'>
                    <li>*采购仓库：</li>
                    <li>供应商：</li>
                    <li>预付款：</li>
                    <li>合同编号：</li>
                    <li style={{border:"none"}}>备注：</li>
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
.biao li{
    // text-align:center;
    color:#646464; 
    width: 100%;
    height: 1.4rem;
    border-bottom: 1px solid #dbdbdb;

}



`