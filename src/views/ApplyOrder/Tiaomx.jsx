import React, { Component } from 'react'
import { Toast,Button,Modal } from 'antd-mobile';
import { editPurchaseApplyDetail ,delPurchaseApplyDetail} from 'network/Api'
import { store } from "store/index";

const prompt = Modal.prompt;
export default class Tiaomx extends Component {
  constructor(){
    super()
    this.state={
      newNum:""
    }
  }
  bianji(value,v){
    this.setState({ newNum: value })
    editPurchaseApplyDetail({
      action: 'editPurchaseApplyDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        id: this.props.id,
        itemId:v.id,
        goodsnum:value
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        Toast.info("修改成功",1.5)
      }else{
        Toast.info(res.data.msg,1.5)
      }
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
    let v=this.props.value
    return (
      <div style={{position:'relative'}}>
      <div className='tiao' style={{zIndex:"9",position:"relative"}}>
        <img className='t-img-l' src={v.image ? v.image : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />
        <ul className='wen-zi'>
          <li className='wen-zi-t'>
            <div className='name'>{v.goodsname}</div>
          </li>
          <li className='wen-zi-c'>
            <div >商品编码：{v.barcode}</div>
            <p>{v.price}元/{v.unit_name}</p>
          </li>
          <li className='wen-zi-f' >
            <div></div>
            <p>申请数量：<span>{this.state.newNum ? this.state.newNum : v.goodsnum}</span></p>
            <div style={{display:this.props.statusname==="提交成功"?"none":"block",position: "absolute", left: "0",top:"0",}}>
            <Button 
              style={{  color: "transparent", background: "transparent",width: "10rem",
              height: "1.8rem" }}
              className="btn_modal"
              onClick={() => prompt(
                '填写', '请输入申请数量',
                [
                  {
                    text: '取消',
                    onPress: value => console.log(111)
                  },
                  {
                    text: '确定',
                    onPress: value => {
                      this.bianji(value,v)
                    }
                  },
                ], 'default', null, [''])}
            >111111</Button></div>
          </li>
        </ul>
      </div>
      <div className='del' onClick={() => { this.deleteGoods(v) }}>
              <img src='https://res.lexiangpingou.cn/images/vip/delete.png' alt="''" />
            </div>
      </div>
    )
  }
  deleteGoods(v){
    delPurchaseApplyDetail({
      action: 'delPurchaseApplyDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        id: this.props.id,
        itemId:v.id,
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
