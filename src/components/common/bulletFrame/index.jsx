import React, { Component } from 'react'
import { TextStyle }from './style'

export default class BulletFrame extends Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
            inputsl: '',
            inputjg: ''
        }
    }
    /*
   * 弹窗
   */
    showDialogBtn() {
      console.log(this.props.model)
        this.setState({
            showModal: this.props.model
        })
    }
    /**
     * 隐藏模态对话框
     */
    hideModal() {
      this.props.parent.getChildrenMsg(false)



        this.setState({
            showModal: true
        })
    }
    /**
     * 对话框取消按钮点击事件
     */
    onCancel() {
      this.props.parent.getChildrenMsg(false)
        console.log("取消")
        // this.hideModal();
    }
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm() {
      this.props.parent.getChildrenMsg(false,this.state.inputsl, this.state.inputjg)
        console.log("确定" + this.state.inputsl, this.state.inputjg)
        // this.hideModal();
    }
    inputChangesl(e) {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    inputChangejg(e) {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
      console.log(this.props.model)
        return (
            <TextStyle>
                {/* <button onClick={() => { this.showDialogBtn() }} style={{width:"5rem",height:"5rem",background:"red"}}>出来吧</button> */}
                <div className="modal-mask" style={{ display: this.props.model===false?"none" : "block"}}></div>
                <div className="modal-dialog" style={{ display: this.props.model===false?"none" : "block"}}>
                    <div className="modal-title">添加</div>
                    <div className="centen-m-t">请填写采购数量与单价</div>
                    <div className="modal-content">
                        <div className="modal-input">
                            <p><span>采购数量：</span>
                                <input className="input" placeholder="请填写采购数量" name="inputsl"
                                    onChange={this.inputChangesl.bind(this)}
                                    value={this.state.inputsl}  /><span> kg</span>
                            </p>
                            <div style={{ width: "100%", height: ".2rem" }}></div>
                            <p><span>采购单价：</span> 
                                <input className="input" placeholder="请填写采购单价" name="inputjg"
                                    onChange={this.inputChangejg.bind(this)}
                                    value={this.state.inputjg}  /><span> 元</span>
                            </p>
                            <div style={{ width: "100%", height: ".1rem" }}></div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="btn-cancel" onClick={() => { this.onCancel() }} >取消</div>
                        <div className="btn-confirm" onClick={() => { this.onConfirm() }} >确定</div>
                    </div>
                </div>
            </TextStyle>
        )
    }
}
