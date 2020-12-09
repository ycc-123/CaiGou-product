import React, { Component } from 'react'
import styled from 'styled-components'
import { getWarehouseList, getSupplierList, createPurchase } from 'network/Api'
import { Picker, List, Toast } from 'antd-mobile';
import DocumentTitle from 'react-document-title'
import { store } from "store/index";

export default class AddPurchaseOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Value: '',
            sValue: '',
            data: [],
            supplier: [],
            IDck: [],
            IDgy: [],
            inputAmount: '',
            inputHetong: '',
            inputbeiz: '',
            jj: true
        }
    }
    componentDidMount() {
        getWarehouseList({
            action: 'getWarehouseList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                type: "1",
                limit: "1000",
                page: "1"
            }
        }).then((res) => {
            if (res.data.status === 4001) {
                var result = res.data.data.data.map(o => { return { value: o.id, label: o.name } });
                this.setState({
                    data: result
                })
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
        getSupplierList({
            action: 'getSupplierList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                limit: "1000",
                page: "1"
            }
        }).then(res => {
            if (res.data.status === 4001) {
                var supplier = res.data.data.data.map(o => { return { value: o.id, label: o.name } });
                this.setState({
                    supplier
                })
            } else {
                this.setState({
                    jj: false
                })
                Toast.info(res.data.msg, 2)
            }
        })
    }
    createPurchase() {
        let idgy = this.state.IDgy.toString()
        let idkc = this.state.IDck.toString()
        createPurchase({
            action: 'createPurchase', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                type: "1",
                supplierid: idgy,
                warehouseid: idkc,
                beforepay: this.state.inputAmount,
                contract: this.state.inputHetong,
                remark: this.state.inputbeiz,
            }
        }).then(res => {
            if (res.data.status === 4001) {
                this.props.history.push(`/category/${res.data.data.id}`)
                Toast.success('新建采购单成功', 2)
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
    }
    inputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    inputChangeht(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    inputChangebz(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <AddPurchaseOrderStyle>
                <DocumentTitle title={'新建采购单'} />
                <div>
                    <ul className='biao'>
                        <li><span>*</span>采购仓库：
                            <Picker
                                data={this.state.data}
                                cols={1}
                                className="forss"
                                extra="请选择采购仓库"
                                value={this.state.sValue}
                                onChange={v => this.setState({ sValue: v })}
                                onOk={v => this.setState({ IDck: v })}
                            >
                                <List.Item className='times' arrow="horizontal"></List.Item>
                            </Picker>
                        </li>
                        <li><span>*</span>供应商：
                        <Picker
                                data={this.state.supplier}
                                cols={1}
                                className="forss"
                                extra="请选择供应商"
                                value={this.state.Value}
                                onChange={v => this.setState({ Value: v })}
                                onOk={v => this.setState({ IDgy: v })}
                            >
                                <List.Item className='pdlx' arrow="horizontal"></List.Item>
                            </Picker>
                        </li>
                        <li>
                            <div>预付款：</div>
                            <input name="inputAmount"
                                onChange={this.inputChange.bind(this)}
                                value={this.state.inputAmount} type="text" /></li>
                        <li>
                            <div>合同编号：</div>
                            <input name="inputHetong"
                                onChange={this.inputChangeht.bind(this)}
                                value={this.state.inputHetong} type="text" /></li>
                        <li style={{ border: "none" }}>
                            <div>备注：</div>
                            <input name="inputbeiz"
                                onChange={this.inputChangebz.bind(this)}
                                value={this.state.inputbeiz} type="text" /></li>
                    </ul>
                    <div className='foot'>
                        <div></div>
                        <div className='btn' onClick={() => { this.state.jj === false ? console.log() : this.createPurchase() }}>下一步</div>
                    </div>
                </div>
            </AddPurchaseOrderStyle>
        )
    }
}
const AddPurchaseOrderStyle = styled.div`
.wrapper .CommissionHeader{
    height:1.09rem;
}
.wrapper .CommissionHeader .navbar li{
    // height:1.09rem;
    padding-top:.15rem;
}
.wrapper .CommissionHeader .navbar .active{
    padding-bottom: .28rem;
}
.stor_name{
    font-size:0.32rem;
    height:1.17rem;
    line-height:1.17rem;
}
.am-list-item .am-list-line{
    width:6rem;
}
.am-list-item .am-list-line .am-list-extra{
    // padding-top:.5rem;
    color:#a9a9a9;
    text-align: left;
    font-size:.35rem;
    padding-left:.1rem;
    width:3rem;
}
.am-list-item .am-list-line .am-list-arrow{
    margin-left:2.5rem !important;
    // background-image: none;
    // opacity:0;
}

.pdlx{
    position:absolute;
    left:2.5rem;
    top:1.4rem;
    // padding-top:.3rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.yycgsq{
    position:absolute;
    left:2.5rem;
    top:2.65rem;
    // padding-top:.3rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.times{
    position:absolute;
    left:2.5rem;
    top:.1rem;
    // padding-top:.3rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
    // 
}


.btn{
    width: 2.04rem;
    height: 1.17rem;
    line-height:1.17rem;
    text-align:center;

    color:#fff;
    background: #ED7913;
    border-radius: .2rem;
    font-size:0.37rem;    
    margin-right:.2rem;
    margin-top:.2rem;
}

.foot{
    display:flex;
    justify-content: space-between;

    width: 100%;
    height: 1.6rem;
    line-height:1.6rem;
    background-color: #fff;
    position:absolute;
    bottom:0;
}


.biao{
    width: 100%;
    height: 7rem;
    
}
.biao li input{
    border:none;
    outline:none;
    font-size:.35rem;
    width:7rem;
    height:.65rem;
    color:#646464; 
}
.biao li span{
    color:#e41515; 
}
.biao li div{
    // background-color: pink;
}
.biao li{
    display:flex;
    background-color: #fff;
    padding-left:.3rem;
    color:#646464;
    padding-top:.3rem;
    // text-align:center;
    font-size:.35rem;
    color:#646464; 
    width: 100%;
    height: 1.3rem;
    line-height: .7rem;
    border-bottom: 1px solid #dbdbdb;

}



`