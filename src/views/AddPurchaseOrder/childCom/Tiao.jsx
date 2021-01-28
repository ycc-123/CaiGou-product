import React, { Component } from 'react'
import { Toast,Modal } from 'antd-mobile';
import { editPurchaseDetail } from 'network/Api'
import { store } from 'store/index'
const prompt = Modal.prompt;

export default class Tiao extends Component {
    constructor(){
        super()
        this.state={
            num:"",
            price:""
        }
    }
    zjian(num ,price,tiao){
        console.log(num ,price)
        this.setState({
            num,
            price
        })
        editPurchaseDetail({
            action: 'editPurchaseDetail', data: {
              uniacid: store.getState().uniacid,
              uid: store.getState().uid,
              id: this.props.danid,
              itemId: tiao.id,
              price: price,
              gnum: num,
            }
          }).then((res) => {
            if (res.data.status === 4001) {
              Toast.info("修改成功", 1)
            } else {
              Toast.info(res.data.msg, 2)
            }
          })
    }
    render() {
        console.log(this.props)
        let tiao = this.props.item
        return (
            <div className='tiao' style={{position:"relative"}}>
                <img className='t-img-l' src={tiao.image ? tiao.image : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />
                <ul className='wen-zi'>
                    <li className='wen-zi-t'>
                        <div className='name'>{tiao.goods_name}</div>
                    </li>
                    <li className='wen-zi-c'>
                        <div >商品编码：{tiao.barcode}</div>
                        <p>{this.state.price?this.state.price : tiao.price}元/{tiao.unitname}</p>
                    </li>
                    <li className='wen-zi-f' style={{width:"7.5rem"}}>
                        <div style={{display:"flex",justifyContent:"space-between",width:"7.5rem"}}>
                        <p>采购数量：<span>{this.state.num?this.state.num : tiao.gnum}</span></p>
                        <p>采购金额：<span>{(tiao.price*tiao.gnum).toFixed(3)}</span></p>

                        </div>
                        {/* <div
                            style={{ width: "100%", height: "1.8rem", position: "absolute", top: "0rem", left: "0rem", color: "transparent", background: "transparent" }}
                            className="btn_modal"
                            onClick={() => prompt(
                                '添加',
                                '请填写采购数量与单价',
                                (login, text) => this.zjian(login, text,tiao ),
                                'login-password',
                                null,
                                ['请填写采购数量', '请填写采购单价'],
                            )}
                        >111111</div> */}
                    </li>
                </ul>
            </div>
        )
    }
}
