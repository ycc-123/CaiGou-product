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
  componentDidMount = () => {
    let startX, newX, changeX, deleteW
    if (document.querySelector('.del')) {
      deleteW = document.querySelector('.del').offsetWidth
    }
    let goods = document.querySelectorAll('.category-goods')
    /* let del = document.querySelectorAll('.del') */
    // 将goods伪数组转换为数组以便使用forEach
    goods.forEach((item, index, array) => {
      item.addEventListener('touchstart', (e) => {
        // e.preventDefault()
        // 每次手指放到屏幕上时判断是否此时所有滑动事件的left是否为0,不为0先重置为0
        array.forEach(item => {
          if (item.style.left !== 0) {
            item.style.left = 0
          }
        }, false)
        // 阻止默认事件
        /* e.preventDefault() */
        // 获取手指移入屏幕时的x轴位置
        startX = e.touches[0].pageX
        this.fnMove = (e) => {
          // 实时手指位置X轴的位置 - 手指刚移入屏幕时X轴的位置
          newX = e.touches[0].pageX - startX
          console.log(newX)
          if (newX > -deleteW && newX < 0) {
            item.style.left = newX + 'px'
            if (newX === -deleteW) {
              item.removeEventListener('touchmove', this.fnMove, true)
              item.removeEventListener('touchend', this.fnEnd, true)
            }
          }
        }
        this.fnEnd = (e) => {
          // 手指离开屏幕先移出事件
          item.removeEventListener('touchmove', this.fnMove, true)
          item.removeEventListener('touchend', this.fnEnd, true)
          changeX = e.changedTouches[0].pageX
          if (startX - changeX > deleteW / 2) {
            item.style.left = -deleteW + 'px'
            item.style.transition = '.5s all ease'
          } else {
            item.style.left = 0 + 'px'
            item.style.transition = '.5s all ease'
          }
        }
        // touchmove 当手指在屏幕上滑动的时候连续地触发
        item.addEventListener('touchmove', this.fnMove, true)
        // touchend 当手指离开屏幕时触发
        item.addEventListener('touchend', this.fnEnd, true)
      }, false)
    })
  }
  componentDidUpdate = () => {

    let startX, newX, changeX, deleteW
    if (document.querySelector('.del')) {
      deleteW = document.querySelector('.del').offsetWidth
    }
    let goods = document.querySelectorAll('.category-goods')
    /* let del = document.querySelectorAll('.del') */
    // 将goods伪数组转换为数组以便使用forEach
    goods.forEach((item, index, array) => {
      item.addEventListener('touchstart', (e) => {
        // e.preventDefault()
        console.log(item)
        // 每次手指放到屏幕上时判断是否此时所有滑动事件的left是否为0,不为0先重置为0
        array.forEach(item => {
          if (item.style.left !== 0) {
            item.style.left = 0
          }
        }, false)
        // 阻止默认事件
        /* e.preventDefault() */
        // 获取手指移入屏幕时的x轴位置
        startX = e.touches[0].pageX
        this.fnMove = (e) => {
          // 实时手指位置X轴的位置 - 手指刚移入屏幕时X轴的位置
          newX = e.touches[0].pageX - startX
          if (newX > -deleteW && newX < 0) {
            item.style.left = newX + 'px'
            if (newX === -deleteW) {
              item.removeEventListener('touchmove', this.fnMove, true)
              item.removeEventListener('touchend', this.fnEnd, true)
            }
          }
        }
        this.fnEnd = (e) => {
          // 手指离开屏幕先移出事件
          item.removeEventListener('touchmove', this.fnMove, true)
          item.removeEventListener('touchend', this.fnEnd, true)
          changeX = e.changedTouches[0].pageX
          if (startX - changeX > deleteW / 2) {
            item.style.left = -deleteW + 'px'
            item.style.transition = '.5s all ease'
          } else {
            item.style.left = 0 + 'px'
            item.style.transition = '.5s all ease'
          }
        }
        // touchmove 当手指在屏幕上滑动的时候连续地触发
        item.addEventListener('touchmove', this.fnMove, true)
        // touchend 当手指离开屏幕时触发
        item.addEventListener('touchend', this.fnEnd, true)
      }, true)
    })


  }

  render() {
    const { goods } = this.props
    return (
      <CategoryRightgoodsStyle>
        <div className="rrr"></div>
        <div style={{position:'relative'}}>
        <li className='category-goods clearfix' style={{zIndex:"99"}}
          onClick={() => { this.props.history.push(`/BjGoods/${goods.id}`) }}>
          <img className='category-img' src={goods.albumpath ? goods.albumpath : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />
          <div className='category-goods-info'>
            <p>{goods.name}</p>
            <div className='price'>¥：{goods.posprice}元/{goods.unitname}</div>
          </div>
        </li>
          <div className='del' onClick={() => { this.deleteGoods() }}>
            <img src='https://res.lexiangpingou.cn/images/vip/delete.png' alt="''" />
          </div>
        </div>
      </CategoryRightgoodsStyle>
    );
  }
  deleteGoods(){
    alert("删除成功")
  }
}

const CategoryRightgoodsStyle = styled.div`

.del {
  position: absolute;
  z-index: 1;
  width: 2rem;
  height: 100%;
  right: 0;
  top:0;
  text-align: center;
  line-height: 2.1rem;
  font-size: .8rem;
  background: #ED7A14;
}
.del img{
  width: .7rem;
  height: auto;
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