import React, { Component } from 'react'
import { Toast,Button,Modal } from 'antd-mobile';
import { editPurchaseApplyDetail } from 'network/Api'
import { store } from "store/index";

const prompt = Modal.prompt;
export default class Tiaomx extends Component {
  constructor(){
    super()
    this.state={
      newNum:""
    }
  }
  bianji(value,v){
    this.setState({ newNum: value })
    editPurchaseApplyDetail({
      action: 'editPurchaseApplyDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        id: this.props.id,
        itemId:v.id,
        goodsnum:value
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        Toast.info("修改成功",1.5)
      }else{
        Toast.info(res.data.msg,1.5)
      }
    })
  }
  render() {
    let v=this.props.value
    return (
      <div className='tiao'>
        <img className='t-img-l' src={v.image ? v.image : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />
        <ul className='wen-zi'>
          <li className='wen-zi-t'>
            <div className='name'>{v.goodsname}</div>
          </li>
          <li className='wen-zi-c'>
            <div >商品编码：{v.barcode}</div>
            <p>{v.price}元/{v.unit_name}</p>
          </li>
          <li className='wen-zi-f'>
            <div></div>
            <p>申请数量：<span>{this.state.newNum ? this.state.newNum : v.goodsnum}</span></p>
            <Button
              style={{ position: "absolute", left: "6.6rem", color: "transparent", background: "transparent", width: "9rem" }}
              className="btn_modal"
              onClick={() => prompt(
                '填写', '请输入申请数量',
                [
                  {
                    text: '取消',
                    onPress: value => console.log(111)
                  },
                  {
                    text: '确定',
                    onPress: value => {
                      this.bianji(value,v)
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
