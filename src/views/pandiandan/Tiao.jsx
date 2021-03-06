import React, { Component } from 'react'
import { Toast, Modal, Button } from 'antd-mobile';
const alert = Modal.alert;
const prompt = Modal.prompt;

export default class Tiao extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  shuliang = (value, tiao) => {
    this.props.parent.getChildrenMsg(value, tiao)
    this.setState({
      value
    })
  }
  render() {
    let tiao = this.props.item
    return (
      <div className='tiao'>
        <img className='t-img-l' src={tiao.image ? tiao.image : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />
        <ul className='wen-zi'>
          <li className='wen-zi-t'>
            <div className='name'>{tiao.goods_name}</div>
          </li>
          <li className='wen-zi-c'>
            <div >商品编码：{tiao.barcode}</div>
            <p>{tiao.goods_cost}元/{tiao.unitname}</p></li>
          <li className='wen-zi-f'>
            <div>账面数量：{tiao.gnum}</div>
            <p>实际数量：{this.state.value !== '' ? this.state.value : tiao.realnum}</p>
            <Button
              style={{ position: "absolute", left: "6.6rem", color: "transparent", background: "transparent", width: "9rem" }}
              className="btn_modal"
              onClick={() => prompt(
                '填写', '请输入实际数量',
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
        </ul>
      </div>
    )
  }
}
