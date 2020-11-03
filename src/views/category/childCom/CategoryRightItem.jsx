import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Modal, Button, Toast } from 'antd-mobile';


const prompt = Modal.prompt;
class CategoryRightgoods extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: this.props.goods.num,
      login: '',
      password: '',
      showModal: false,
      inputsl: '',
      inputjg: ''
    }
    this.click = true
  }
  // zjian = (login, password, goods) => {
    // if (login === '') {
    //   Toast.fail('请填写采购数量')
    // } else if (password === '') {
    //   Toast.fail('请填写采购单价')
    // } else {
    //   console.log(login, password, goods)
    //   this.setState({
    //     login,
    //     password
    //   })
    //   this.props.parent.getChildrenMsg(this, login, password, goods)
    // }
  // }

  // 弹出框

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
    // console.log("确定" + this.state.inputsl, this.props.goods)
    this.hideModal();
    let goods=this.props.goods
    let login=this.state.inputsl
    let password=this.state.inputjg
    if (login === '') {
      Toast.fail('请填写采购数量')
    } else if (password === '') {
      Toast.fail('请填写采购单价')
    } else {
      console.log(login, password, goods)
      this.setState({
        login,
        password
      })
      this.props.parent.getChildrenMsg(this, login, password, goods)
    }
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
    const { goods } = this.props
    console.log(goods)

    return (
      <CategoryRightgoodsStyle>
        <div className="rrr"></div>
        <li className='category-goods clearfix'
        >


          <img className='category-img' src={goods.albumpath ? goods.albumpath : "https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />

          <div className='category-goods-info'>
            <p>{goods.name}</p>
            {/* 弹出框 */}
            <button class="show-btn" 
            style={{height:".5rem", width:".5rem",position: "absolute", top: "1rem", left: "4rem", color: "transparent", background: "transparent" }}
             onClick={(e) =>{this.showDialogBtn() }}>111</button>
            <div className="modal-mask"
              style={{ display: this.state.showModal === false ? "none" : "block" }}
            ></div>
            <div className="modal-dialog"
              style={{ display: this.state.showModal === false ? "none" : "block" }}
            >
              <div className="modal-title">添加</div>
              <div className="centen-m-t">请填写采购数量与单价</div>
              <div className="modal-content">
                <div className="modal-input">
                  <p>
                    <input 
                     className="inputone" placeholder="请填写采购数量" name="inputsl"
                      onChange={this.inputChangesl.bind(this)}
                      value={this.state.inputsl} type="number" />
                  </p>
                    <input className="int-two" placeholder="请填写采购单价" name="inputjg"
                      onChange={this.inputChangejg.bind(this)}
                      value={this.state.inputjg} type="number" />
                </div>
              </div>
              <div className="modal-footer">
                <div className="btn-cancel" onClick={() => { this.onCancel() }} >取消</div>
                <div className="btn-confirm" onClick={() => { this.onConfirm() }} >确定</div>
              </div>
            </div>
            {
              this.state.login ? <div className='category-goods-img' style={{ textAlign: "center", width: "2rem", height: ".5rem", marginTop: ".8rem", marginLeft: "4rem", color: "#d54343", fontSize: ".4rem" }}>{this.state.login}</div> :
                <img className='category-goods-img'
                  src='https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/jia.png'
                  alt="" />
            }


          </div>

        </li>
      </CategoryRightgoodsStyle>
    );
  }
}

const CategoryRightgoodsStyle = styled.div`

// 对话弹出款样式start
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
  top: 58%;
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
.int-two{
  font-family: sans-serif;
  border:1px solid #eee;
  width: 100%;
  height: .8rem;
  font-size: .4rem;
  line-height: .8rem;
  box-sizing: border-box;
  color: #000;
}
.inputone {
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

// 对话弹出款样式end




.am-button::before{
  border:none !important;
}
.yskc{
  font-size: .32rem;
  display:flex;
}
.team {
  position: absolute;
  font-size: .33rem;
  right: 0;
}

.team-img {
  position: absolute;
  right: 1rem;
  width: .35rem;
  height: auto;
}

.__--__ {
  position: absolute;
  z-index: 10;
  bottom: 0;
  right: 0;
  width: 1.87rem;
  height: auto
}

.categoryRight {
  position: relative;
  float: left;
  top: .2rem;
  height: calc(100vh - 1.48rem);
  width: 7.5rem;
  overflow: hidden;
}

.category-goods {
  position: relative;
  overflow: hidden;
  // width: 7.17rem;
  height: 1.85rem;
  line-height: 1;
  padding: .17rem;
  border-bottom:1px solid #ccc;
  // margin-bottom: .17rem;
  // border-radius: .2rem;
  background-color: #fff;
}

.category-img {
  display: block;
  float: left;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: .15rem;
}

.category-goods-info {
  position: relative;
  width: calc(100% - 2.3704rem);
  height: 100%;
  float: left;
}

.category-goods-info p:first-child {
  font-size: .32rem;
  margin-bottom: .24rem;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #4d4d4d;
  font-weight: bold;
}

.category-goods-info p:nth-child(2) {
  position: relative;
  align-items: center;
  text-decoration: line-through;
  margin-bottom: .15rem;
  display: flex;
  font-size: .3rem;
  color: #c2c2c2;
}

.category-goods-info p:nth-child(3) {
  position: relative;
  display: flex;
  font-size: .4rem;
  color: #f5702a;
  height: .5rem;
}

.category-button-left, .category-button-right {
  position: absolute;
  left: 1.5rem;
  height: 100%;
  border: none;
  font-size: .26rem !important;
}

.category-button-left {
  background: #f5702a;
  width: .8rem;
  border-top-left-radius: .08rem;
  border-bottom-left-radius: .08rem;
  color: white;
}

.category-button-right {
  left: 2.3rem;
  width: .93rem;
  font-weight: bold;
  font-size: .27rem !important;
  border-top-right-radius: .08rem;
  border-bottom-right-radius: .08rem;
  color: #ff762e;
  background: #ffe4d5;
}

.category-goods-info p:nth-child(3) span {
  font-size: .3rem;
  margin-top: .09rem;
}

.category-goods-info p:nth-child(4) {
  width: 100%;
  position: absolute;
  color: #484848;
  bottom: 0;
  opacity: .8;
  font-size: .24rem;
}

.category-goods-info p:nth-child(4) span {
  margin-right: .2rem;
}

.category-goods-img {
  margin-top:.4rem;
  margin-left:4.7rem;
  width: .5rem;
  height: .5rem;
}

.category-goods .goods-img img {
  margin-left: 1.2rem;
}

.goods-button {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
    background: #ff762e;
    bottom: .17rem;
    right: 0;
    border: none;
    width: 2rem;
    height: .8rem !important;
    line-height: .8rem;
    font-size: .3rem;
    color: white;
    border-top-left-radius: .4rem;
    border-bottom-left-radius: .4rem;
}

.goods-button::after {
  content: '';
    position: absolute;
    display: inline-block;
    right: 9%;
    width: .12rem;
    height: .12rem;
    border-top: .03rem solid #fff;
    border-right: .03rem solid #fff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

.calculate {
  line-height: .6rem;
  text-align: center;
  color: #f5702a;
}

`

export default withRouter(CategoryRightgoods)