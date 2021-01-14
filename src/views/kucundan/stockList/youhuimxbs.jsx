import React, { Component } from 'react'
import { store } from 'store/index'
import {
  saveyouhuimxbiao
} from 'store/actionCreators'
export default class youhuimxbs extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {
  }
  click(item) {
    const actionuid = saveyouhuimxbiao(item)
    store.dispatch(actionuid)
    this.props.history.push(`/shouyinmxb/${this.props.item.id}/${this.props.page}`)
  }
  render() {
    let item = this.props.item
    return (
      <div className='caigoudan' onClick={() => { this.click(item) }}>
        <div className='dan'>
          <div className='dan-top'>
            <p>
              <img src="https://res.lexiangpingou.cn/images/applet/99963danhao.png" alt="" />
            </p>
            <div className='t-right'>
              <div className='caigoudanhao'>零售单号：{item.orderno}</div>
            </div>
          </div>
          <div className='dan-footer'>
            <p>单据日期：{item.createtime}</p>
            <p>所属门店：{item.storeName}</p>
            <p>优惠总额：{item.all_fee}</p>
          </div>
        </div>
      </div>
    )
  }
}
