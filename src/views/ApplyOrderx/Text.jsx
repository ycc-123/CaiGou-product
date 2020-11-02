import React, { Component } from 'react'
import styled from 'styled-components'

export default class text extends Component {
    constructor(){
        super()
        this.state={
            showModal: false,
            inputsl:'',
            inputjg:''

        }
    }


    /**

   * 弹窗

   */

  showDialogBtn() {

    this.setState({

      showModal: true

    })

  }

  /**

   * 弹出框蒙层截断touchmove事件

   */

  preventTouchMove() {

  }

  /**

   * 隐藏模态对话框

   */

  hideModal() {

    this.setState({

      showModal:false

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
    console.log("确定" + this.state.inputsl,this.state.inputjg)
    // this.hideModal();

    this.hideModal();


  }
  inputChangesl(e){
    console.log(e.target.value)
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  inputChangejg(e){
      console.log(e.target.value)
      this.setState({
        [e.target.name]: e.target.value
    })
  }
    render() {
        return (
            <TextStyle>
                <button class="show-btn" onClick={()=>{this.showDialogBtn()}}>导出导购商品汇总</button>

                {/* <div>1111111111111111111111111111</div> */}
              <div className="modal-mask" onClick={()=>{this.hideModal()}} 
            style={{display:this.state.showModal===false?"none":"block"}}
            ></div>
     <div className="modal-dialog" 
    style={{display:this.state.showModal===false?"none":"block"}}
    > 
        <div className="modal-title">邮箱</div>
        <div className="modal-content">
            <div className="modal-input">
               <p> <input className="input" placeholder="数量" name="inputsl" 
                                    onChange={this.inputChangesl.bind(this)}
                                    value={this.state.inputsl} type="text"/></p>
              
                <p><input className="input" placeholder="价格" name="inputjg" 
                                    onChange={this.inputChangejg.bind(this)}
                                    value={this.state.inputjg} type="text"/></p>
            </div>
        </div>
        <div className="modal-footer">
            <div className="btn-cancel" onClick={()=>{this.onCancel()}} >取消</div>
            <div className="btn-confirm" onClick={()=>{this.onConfirm()}} >确定</div>
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
  
    background: #f9f9f9;
  
    margin: -4rem 2rem;
  
    border-radius: .2rem;
  
  }
  
  .modal-title {
  
    padding-top: .3rem;
  
    font-size: 0.5rem;
  
    color: #030303;
  
    text-align: center;
  
  }
  
  .modal-content {
  
    padding: .3rem .4rem;
  
  }
  
  .modal-input {
  
    // display: flex;
  
    // background: #fff;
  
    // border: 2px solid #ddd;
  
    border-radius: .1rem;
  
    font-size: .7rem;
  
  }
  
  .input {
  
    width: 100%;
  
    height: .5rem;
  
    font-size: .4rem;
  
    line-height: .5rem;
  
    // padding: 0 .5rem;
  
    box-sizing: border-box;
  
    color: #333;
  
  }
  
  input-holder {
  
    color: #666;
  
    font-size: 60px;
  
  }
  
  .modal-footer {
  
    display: flex;
  
    flex-direction: row;
  
    height: .8rem;
  
    border-top: 1px solid #dedede;
  
    font-size: .5rem;
  
    line-height: .8rem;
  
  }
  
  .btn-cancel {
  
    width: 50%;
  
    color: #666;
  
    text-align: center;
  
    border-right: 1px solid #dedede;
  
  }
  
  .btn-confirm {
  
    width: 50%;
  
    color: #ec5300;
  
    text-align: center;
  
  }



`