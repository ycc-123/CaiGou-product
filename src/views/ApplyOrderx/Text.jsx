import React, { Component } from 'react'
import styled from 'styled-components'

export default class text extends Component {
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
        this.setState({
            showModal: true
        })
    }
    /**
     * 隐藏模态对话框
     */
    hideModal() {
        this.setState({
            showModal: false
        })
    }
    /**
     * 对话框取消按钮点击事件
     */
    onCancel() {
        console.log("取消")
        this.hideModal();
    }
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm() {
        console.log("确定" + this.state.inputsl, this.state.inputjg)
        this.hideModal();
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
        return (
            <TextStyle>
                <button class="show-btn" onClick={() => { this.showDialogBtn() }}>1111111111111111111111111111111</button>
                <div className="modal-mask"
                    //   onClick={()=>{this.hideModal()}} 
                    style={{ display: this.state.showModal === false ? "none" : "block" }}
                ></div>
                <div className="modal-dialog"
                    style={{ display: this.state.showModal === false ? "none" : "block" }}
                >
                    <div className="modal-title">邮箱</div>
                    <div className="centen-m-t">请填写采购数量与单价</div>
                    <div className="modal-content">
                        <div className="modal-input">
                            <p>
                                <input className="input" placeholder="请填写采购数量" name="inputsl"
                                    onChange={this.inputChangesl.bind(this)}
                                    value={this.state.inputsl} type="text" />
                            </p>
                            <div style={{ width: "100%", height: ".2rem" }}></div>
                            <p>
                                <input className="input" placeholder="请填写采购单价" name="inputjg"
                                    onChange={this.inputChangejg.bind(this)}
                                    value={this.state.inputjg} type="text" />
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
const TextStyle = styled.div`
.show-btn {
    margin: 0 0.64rem;
    background-color: #2E5BFF;
    color: white;
  }
  .modal-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    overflow: hidden;
    z-index: 9000;
    color: #fff;
  }
  
  .modal-dialog {
    width: 6.4rem;
    overflow: hidden;
    position: fixed;
    top: 40%;
    left: 0;
    z-index: 9999;
    background: #fff;
    margin: -4rem 2rem;
    border-radius: .2rem;
  }
  .centen-m-t{
    padding-top: .3rem;
    font-size: 0.4rem;
    color: #888;
    text-align: center;
  }
  .modal-title {
    padding-top: .3rem;
    font-size: 0.5rem;
    color: #000;
    text-align: center;
  }
  .modal-content {
    padding: .3rem .4rem;
  }
  .modal-input {
    border-radius: .1rem;
    font-size: .5rem;
  }
  input::-webkit-input-placeholder {
    color: #ccc;
    font-size:.35rem;
  }
  .input {
    font-family: sans-serif;
    border:1px solid #eee;
    width: 100%;
    height: .8rem;
    font-size: .4rem;
    line-height: .8rem;
    box-sizing: border-box;
    color: #000;
  }
  input-holder {
    color: #666;
    font-size: 60px;
  }
  .modal-footer {
    display: flex;
    flex-direction: row;
    height: 1.1rem;
    border-top: 1px solid #eee;
    font-size: .48rem;
    line-height: 1.1rem;
  }
  .btn-cancel {
    width: 50%;
    color: #000;
    text-align: center;
    border-right: 1px solid #eee;
  }
  
  .btn-confirm {
    width: 50%;
    color: #108ee9;
    text-align: center;
  }



`