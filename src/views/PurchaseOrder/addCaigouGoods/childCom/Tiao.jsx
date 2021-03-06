import React, { Component } from 'react'
import { Toast,Modal } from 'antd-mobile';

const prompt = Modal.prompt;

export default class Tiao extends Component {
    constructor(){
        super()
        this.state={
            num:"",
            price:""
        }
    }
    zjian(num ,price){
        console.log(num ,price)
        this.setState({
            num,
            price
        })
    }
    render() {
        console.log(this.props)
        let tiao = this.props.item
        return (
            <div className='tiao' style={{position:"relative"}}>
                <img className='t-img-l' src={tiao.img ? tiao.img : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />
                <ul className='wen-zi'>
                    <li className='wen-zi-t'>
                        <div className='name'>{tiao.name}</div>
                    </li>
                    <li className='wen-zi-c'>
                        <div >商品编码：{tiao.barcode}</div>
                        <p>{this.state.price?this.state.price : tiao.price}元/{tiao.danwei}</p>
                    </li>
                    <li className='wen-zi-f'>
                        <div></div>
                        <p>采购数量：<span>{this.state.num?this.state.num : tiao.gnum}</span></p>
                        <div
                            style={{ width: "100%", height: "1.8rem", position: "absolute", top: "0rem", left: "0rem", color: "transparent", background: "transparent" }}
                            className="btn_modal"
                            onClick={() => prompt(
                                '添加',
                                '请填写采购数量与单价',
                                (login, text) => this.zjian(login, text ),
                                'login-password',
                                null,
                                ['请填写采购数量', '请填写采购单价'],
                            )}
                        >111111</div>
                    </li>
                </ul>
            </div>
        )
    }
}
