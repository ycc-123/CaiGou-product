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
      password: ''
    }
    this.click = true
  }
  zjian = (login, password, goods) => {
    if (login === '' ) {
      Toast.info('请填写采购数量')
    } else if(password === ''){
      Toast.info('请填写采购单价')
    }else{
      console.log(login, password, goods)
      this.setState({
        login,
        password
      })
      this.props.parent.getChildrenMsg(this, login, password, goods)
    }
  }

  render() {
    const { goods } = this.props
    console.log(goods)

    return (
      <CategoryRightgoodsStyle>
        <div className="rrr"></div>
        <li className='category-goods clearfix'
        onClick={()=>{this.props.history.push(`/AddGoods/${goods.id}`)}}
        >


          <img className='category-img' src={goods.albumpath?goods.albumpath:"https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />

          <div className='category-goods-info'>
            <p>{goods.name}</p>

            <Button
              style={{ position: "absolute", top: ".3rem", left: "4.6rem", color: "transparent", background: "transparent" }}
              className="btn_modal"
              onClick={() => prompt(
                '添加',
                '请填写采购数量与单价',
                (login, text) => this.zjian(login, text, goods),
                'login-password',
                null,
                ['请填写采购数量', '请填写采购单价'],
              )}
              visible={false}
            >111111</Button>
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
  margin-top: .05rem;
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