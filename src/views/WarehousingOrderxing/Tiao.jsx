import React, { Component } from 'react'
import { Modal, Button } from 'antd-mobile';
const prompt = Modal.prompt;
export default class Tiao extends Component {
    constructor(){
        super()
        this.state={
            value:''
        }
    }
    shuliang= (value,tiao) => {
        console.log(value,tiao)
        this.props.parent.getChildrenMsg( value,tiao)
        this.setState({
            value
        })
    }
    render() {
        let tiao = this.props.item
        return (
            <div className='tiao' style={{position:"relative"}}>
            <img className='t-img-l' src="" alt="" />
            <ul className='wen-zi'>
                <li className='wen-zi-t'>
                    <div className='name'>{tiao.goods_name}</div>
                    <p></p>
                </li>
                <li className='wen-zi-f'>
                    <div>采购数量：{tiao.gnum}</div>
                    <p>入库数量：<span>{this.state.value!==''?this.state.value:tiao.innum}</span></p>
                    <Button
                        style={{ position: "absolute", left: "6.6rem", color: "transparent", background: "transparent",width:"9rem" }}
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
                                        this.shuliang(value,tiao)
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