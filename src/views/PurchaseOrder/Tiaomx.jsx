import React, { Component } from 'react'
import { delPurchaseDetail } from 'network/Api'
import { store } from "store/index";
import { Toast, Modal, Button } from 'antd-mobile';

const prompt = Modal.prompt;
export default class Tiaomx extends Component {
  constructor(){
    super()
    this.state={
      value:''
    }
  }
  shuliang = (value, tiao) => {
    this.props.parent.getChildrenMsg(value, tiao)
    this.setState({
      value
    })
  }
  componentDidMount = () => {
    let startX, newX, changeX, deleteW
    if (document.querySelector('.del')) {
      deleteW = document.querySelector('.del').offsetWidth
    }
    let goods = document.querySelectorAll('.tiao')
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
    let goods = document.querySelectorAll('.tiao')
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
    console.log(this.props)
    let tiao = this.props.item
    return (
      <div style={{position:'relative'}}>
      <div className='tiao' style={{zIndex:"9"}}>
        <img className='t-img-l' src={tiao.image ? tiao.image : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />

        <ul className='wen-zi'>
          <li className='wen-zi-t'>
            <div className='name'>{tiao.goods_name}</div>
          </li>
          <li className='wen-zi-c'>
            <div >商品编码：{tiao.barcode}</div>
            <p>{tiao.price}元/{tiao.unitname}</p>
          </li>

          <li className='wen-zi-f'>
            <div style={{display:"flex",justifyContent:"space-between",width:"7.5rem"}}>
            <p>采购数量：<span>{this.state.value?this.state.value:tiao.gnum}</span></p>
            <p>采购金额：<span>{(tiao.price*(this.state.value?this.state.value:tiao.gnum)).toFixed(2)}</span></p>


            </div>
            <Button
              style={{display:this.props.statusname==="待提交"?"block":"none", position: "absolute", left: "0",top:"0", color: "transparent", background: "transparent",
              width: "10rem",
              height: "1.8rem" }}
              className="btn_modal"
              onClick={() => prompt(
                '填写', '请输入采购数量',
                [
                  {
                    text: '取消',
                    onPress: value => console.log(111)
                  },
                  {
                    text: '确定',
                    onPress: value => {
                      this.shuliang(value, tiao)
                    }
                  },
                ], 'default', null, [''])}
            >111111</Button>
          </li>
        </ul>
      </div>
      <div className='del' onClick={() => { this.deleteGoods() }}>
              <img src='https://res.lexiangpingou.cn/images/vip/delete.png' alt="''" />
            </div>
      </div>
    )
  }
  deleteGoods(){
    delPurchaseDetail({
      action: 'delPurchaseDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        itemId: this.props.item.id,
        id: this.props.danid
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        window.location.reload();
        Toast.success("删除成功", 1.5)
      } else {
        Toast.info(res.data.msg, 1.5)
      }
    })
  }
}
