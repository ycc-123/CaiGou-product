
import React, { Component } from 'react'
import styled from 'styled-components'
import { getWarehouseList, createDamage } from 'network/Api'
import { Picker, List, Toast } from 'antd-mobile';
import DocumentTitle from 'react-document-title'
import { store } from "store/index";

export default class AddInventoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      inputbeiz: '',
      sValue: '',
      IDck: ""
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
  }
  createPurchase() {
    let idgy = this.state.sValue.toString()
    let bz = '1'
    createDamage({
      action: 'createDamage', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        warehouseid: idgy,
        remark: this.state.inputbeiz
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        this.props.history.push(`/bsCategory/${idgy}/${this.state.inputbeiz ? this.state.inputbeiz : bz}/${res.data.data}`)
      } else {
        Toast(res.data.msg, 2)
      }
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
        <DocumentTitle title={'新建报损单'} />
        <div>
          <ul className='biao'>
            <li><span>*</span>报损仓库：
                                <Picker
                data={this.state.data}
                cols={1}
                className="forss"
                extra="请选择报损仓库"
                value={this.state.sValue}
                onChange={v => this.setState({ sValue: v })}
                onOk={v => this.setState({ IDck: v })}
              >
                <List.Item className='times' arrow="horizontal"></List.Item>
              </Picker>
            </li>
            <li style={{ border: "none" }}>
              <div>备注：</div>
              <input name="inputbeiz"
                onChange={this.inputChangebz.bind(this)}
                value={this.state.inputbeiz} type="text" /></li>
          </ul>
          <div className='foot'>
            <div className='left'></div>
            <div className='right' onClick={() => { this.createPurchase() }}>下一步</div>
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
    .am-list-item{
        padding-left: 1.45rem;
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
        margin-left:2rem !important;
        width:11px;
        height:11px;

    }
    .onetimes{
        position:absolute;
        left:1.8rem;
        top:-.2rem;
        // padding-top:.3rem;
        color: red;
        width:12rem;
        background-color: transparent;
    }
    .time{
        position:absolute;
        left:2.2rem;
        top:2.4rem;
        // padding-top:.3rem;
        color: #a9a9a9;
        width:12rem;
        background-color: transparent;
    }
    .pdlx{
        position:absolute;
        left:2.2rem;
        top:1.2rem;
        // padding-top:.3rem;
        color: #a9a9a9;
        width:12rem;
        background-color: transparent;
    }
    .times{
        position:absolute;
        left:2.2rem;
        // top:.1rem;
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
    
    
    
    .left{
        width: 1rem;
        height: 1.6rem;
        background-color: #fff;
    }
    .right{
        margin-top:.2rem;
        margin-right:.2rem;
        border-radius:.2rem;
        font-size:.4rem;
        color:#fff;
        text-align:center;
        width: 2.04rem;
        height: 1.17rem;
        line-height: 1.17rem;
        background-color: #ED7913;
    }
    .foot{
        display:flex;
        justify-content:space-between;
        width: 100%;
        height: 1.6rem;
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
        font-size:.45rem;
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
        padding-left:.43rem;
        color:#646464;
        // padding-top:.3rem;
        // text-align:center;
        font-size:.35rem;
        color:#787878; 
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        border-bottom: 1px solid #dbdbdb;
    
    }
    
    
    
    `