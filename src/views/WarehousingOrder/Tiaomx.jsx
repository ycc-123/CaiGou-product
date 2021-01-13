import React, { Component } from 'react'
import { Modal, Button } from 'antd-mobile';
const prompt = Modal.prompt;
export default class Tiao extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  // 把用户输入的数量和商品详情传给父组件
  shuliang = (value, tiao) => {
    this.props.parent.getChildrenMsg(value, tiao)
    this.setState({
      value
    })
  }
  render() {
    let tiao = this.props.item
    let rk = ''
    if (Number(tiao.innum) === 0) {
      rk = tiao.gnum
    } else {
      rk = tiao.innum
    }
    return (
      <div className='tiao' style={{ position: "relative" }}>
        <img className='t-img-l' src={tiao.image ? tiao.image : "https://dev.lexiangpingou.cn/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />
        <ul className='wen-zi'>
          <div className='aaa'>
            <li className='wen-zi-t'>
              <div className='name'>{tiao.goods_name}</div>
              <p></p>
            </li>
            <li className='wen-zi-f'>
              <div>商品编码：{tiao.gnum}</div>
              <p>{tiao.price}元/{tiao.unitname}</p>
            </li>
            <li className='wen-zi-f'>
              <div>采购数量：{tiao.gnum}</div>
              <p>入库数量：<span>{this.state.value !== '' ? this.state.value : rk}</span></p>
              <Button
                style={{ position: "absolute", left: "6.6rem", color: "transparent", background: "transparent", width: "9rem" }}
                className="btn_modal"
                onClick={() => prompt(
                  '填写', '请输入入库数量',
                  [
                    {
                      text: '取消',
                      onPress: value => console.log(111)
                    },
                    {
                      text: '确定',
                      onPress: value => {
                        this.shuliang(value, tiao)
                      }
                    },
                  ], 'default', null, [''])}
              >111111</Button>
            </li>
          </div>
        </ul>
      </div>
    )
  }
}
