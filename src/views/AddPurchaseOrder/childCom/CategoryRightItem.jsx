import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Modal, Button, Toast } from 'antd-mobile';
import { getProductCategoryAll, searchProduct, addPurchaseDetail } from 'network/Api'
import  Model  from 'common/bulletFrame'

const textInput = React.createRef();
// import Model from './Model'
const prompt = Modal.prompt;



class CategoryRightgoods extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: this.props.goods.num,
      login: '',
      password: '',
      visible: false
    }
    this.click = true

  }
  zjian = (login, password, goods) => {
    if (login === '' ) {
      Toast.info('请填写采购数量')
    } else if(password === ''){
      Toast.info('请填写采购单价')
    }else{
      this.setState({
        login,
        password
      })
      this.props.parent.getChildrenMsg(this, login, password, goods)
    }
  }


  closeModal() {
    console.log('我是onClose回调')
    this.setState({

    },()=>{
      this.setState({
        visible: false
      })
    })
  }

  confirms=(num,price)=> {
    if(num===""){
      Toast.info("请输入数量",1.5)
    }else{
      if(price===""){
        Toast.info("请输入价格",1.5)
      }else{
        console.log(num,price)
        this.props.parent.getChildrenMsg(this,num,price, this.props.goods)
        console.log('我是confirm回调')
          this.setState({
          },()=>{
            this.setState({
              visible: false,
              login: num
            })
          })
      }
    }
  }

  


  render() {
    const { goods } = this.props
    let input = ''
    if (this.state.login !== '') {
      input = this.state.login
    } else {
      input = goods.realnum
    }
   
    return (
      <CategoryRightgoodsStyle>
        <Modal/>
        <div className="rrr"></div>
        <li className='category-goods clearfix' onClick={()=>{this.setState({visible: true})}}>
          <img className='category-img' src={goods.albumpath ? goods.albumpath : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />
          <div className='category-goods-info'>
            <div style={{ fontSize: ".35rem", color: '#1a1a1a', width: "4rem" }}>{goods.name}</div>
            <div className='shuliang' style={{ color: '#1a1a1a', paddingTop: ".1rem" }} onClick={() => { console.log(2222) }}>
              <article>编码：{goods.code}</article>
              <div>{goods.posprice}元/{goods.unitname}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {
                input ? <div style={{ width: "100%", textAlign: "right", paddingTop: ".2rem", color: "#CD2323", fontSize: ".35rem" }}>
                  {input}</div> :
                  <img className='category-goods-img'
                    src='https://res.lexiangpingou.cn/images/applet/99956jia.png'
                    alt="" />
              }
            </div>
         
            <Model ref={textInput} goods={goods} visible={this.state.visible} unitname={goods.unitname} confirms={this.confirms} models={this}
        onClose={this.closeModal}/>
             
          </div>
        </li>
      </CategoryRightgoodsStyle>
    );
  }
  
}

const CategoryRightgoodsStyle = styled.div`
.showbtn {
  margin: 0 0.64rem;
  background-color: #2E5BFF;
  color: white;
}
.modalmask {
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

.modaldialog {
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
.centenmt{
  padding-top: .3rem;
  font-size: 0.4rem;
  color: #888;
  text-align: center;
}
.modaltitle {
  padding-top: .3rem;
  font-size: 0.5rem;
  color: #000;
  text-align: center;
}
.modalcontent {
  padding: .3rem .4rem;
}
.modalinput {
  border-radius: .1rem;
  font-size: .4rem;
}
input::-webkit-input-placeholder {
  color: #ccc;
  font-size:.35rem;
}
.input {
  font-family: sans-serif;
  border:1px solid #eee;
  width: 3rem;
  height: .8rem;
  font-size: .4rem;
  line-height: .8rem;
  box-sizing: border-box;
  color: #000;
}
inputholder {
  color: #666;
  font-size: 60px;
}
.modalfooter {
  display: flex;
  flex-direction: row;
  height: 1.1rem;
  border-top: 1px solid #eee;
  font-size: .48rem;
  line-height: 1.1rem;
}
.btncancel {
  width: 50%;
  color: #000;
  text-align: center;
  border-right: 1px solid #eee;
}

.btnconfirm {
  width: 50%;
  color: #108ee9;
  text-align: center;
}







.category-goods-img {
  margin-top:.2rem;
  margin-left:4.65rem;
  width: 0.43rem;
  height: 0.43rem;
}
.shuliang span{
  margin-left:1.5rem;
}
.shuliang{
  // margin-top:.8rem;
  font-size:.29rem;
  display:flex;
  justify-content: space-between;
}
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
  padding: .24rem .37rem;
  border-bottom:1px solid #ccc;
  // margin-bottom: .17rem;
  // border-radius: .2rem;
  background-color: #fff;
}
.category-img {
  display: block;
  float: left;
  width: 1.33rem;
  height: 1.33rem;
  margin-right: .32rem;
}
.category-goods-info {
  position: relative;
  width: calc(100% - 1.65rem);
  height: 100%;
  float: left;
}
.category-goods-info p:first-child {
  font-size: .32rem;
  // margin-bottom: .24rem;
  // margin-top: .05rem;
  text-align: justify;
  // overflow: hidden;
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