import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { changePurchaseStatus, submitPurchase } from 'network/Api'
import { store } from "store/index";
import { Toast } from 'antd-mobile';

class Tiao extends Component {
  aa(item) {
    this.props.history.push(`/PurchaseOrderDetailed/${item.id}`)
  }
  submit(e) {
    let purchaseData = { subtotal: e.subtotal, snum: e.snum }
    submitPurchase({
      action: 'submitPurchase', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        purchaseId: e.id,
        type: "1",
        status: "2",
        itemData: [],
        purchaseData: purchaseData
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        window.location.reload();
        Toast.success(res.data.msg, 2)
      } else {
        Toast.info(res.data.msg, 2)
      }
    })
  }
  shenghe(e) {
    let arr = []
    arr.push(e.id)
    changePurchaseStatus({
      action: 'changePurchaseStatus', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        type: "1",
        purchaseId_list: arr,
        status: 4
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        window.location.reload();
        Toast.success(res.data.msg, 1)
      } else {
        Toast.info(res.data.msg, 1)
      }
    })
  }
  render() {
    let item = this.props.item
    let statusname = item.statusname
    let Color = ''
    if (statusname === "审核成功") {
      Color = "#22a31b"
    } else if (statusname === "待提交") {
      Color = "#d92929"
    }
    return (
      <div className='caigoudan'  >
        <div className='dan'>
          <div className='dan-top' onClick={(e) => { this.aa(item) }}>
            <p>
              <img src="https://res.lexiangpingou.cn/images/applet/99963danhao.png" alt="" />
            </p>
            <div className='t-right'>
              <div className='caigoudanhao'>采购单号：{item.docno}</div>
              <div className='zuantai' style={{ color: Color }}>{item.statusname}</div>
            </div>
          </div>
          <div className='dan-footer' onClick={(e) => { this.aa(item) }}>
            <p>单据日期：{item.docdate}</p>
            <p>创建时间：{item.createtime}</p>
            <p>采购仓库：{item.warehousename}</p>
          </div>
          <div className='btn_tj' onClick={() => { this.submit(item) }}
            style={{ display: item.statusname === "待提交" ? "block" : 'none' }}
          >提交</div>

          <div className='btn_sh' onClick={() => { this.shenghe(item) }}
            style={{ display: item.statusname === "待审核" ? "block" : 'none' }}
          >审核</div>
        </div>
      </div>
    )
  }
}

export default withRouter(Tiao)


