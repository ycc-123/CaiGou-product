import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Toast } from 'antd-mobile';

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
    if (login === '') {
      Toast.info('请填写采购数量')
    } else if (password === '') {
      Toast.info('请填写采购单价')
    } else {
      this.setState({
        login,
        password
      })
      this.props.parent.getChildrenMsg(this, login, password, goods)
    }
  }

  render() {
    const { goods } = this.props
    return (
      <CategoryRightgoodsStyle>
        <div className="rrr"></div>
        <li className='category-goods clearfix'
          onClick={() => { this.props.history.push(`/BjGoods/${goods.id}`) }}
        >
          <img className='category-img' src={goods.albumpath ? goods.albumpath : "https://dev.lexiangpingou.cn/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />
          <div className='category-goods-info'>
            <p>{goods.name}</p>
            <div className='price'>¥：{goods.posprice}元/{goods.unitname}</div>
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
  height: 1.85rem;
  line-height: 1;
  padding: .24rem .37rem;
  border-bottom:1px solid #dadada;
  background-color: #fff;
}
.category-img {
  display: block;
  float: left;
  width: 1.33rem;
  height: 1.33rem;
  margin-right: .33rem;
}
.category-goods-info {
  position: relative;
  width: calc(100% - 2.3704rem);
  height: 100%;
  float: left;
}
.category-goods-info p:first-child {
  font-size: 0.37rem;
  white-space: nowrap;
  color: #1a1a1a;
  font-family: PingFang SC;
  font-weight: 400;
  height:.95rem;
}
.price{
  height: 0.32rem;
  font-size: 0.35rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: #CF2424;
  line-height: 0.4rem;
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