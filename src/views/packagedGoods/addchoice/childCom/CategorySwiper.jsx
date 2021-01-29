import React, { Component } from 'react'
import styled from 'styled-components'
import { store } from "store/index";
import DocumentTitle from 'react-document-title'
import { getPackgeProductDetail ,delPackgeProduct} from 'network/Api'
import { Toast } from 'antd-mobile';

export default class ApplyOrderx extends Component {
  constructor() {
    super()
    this.state = {
      quan: [],
      tiao: [],
      sum: '',
      remark: '',
      inputSearch: "",
      goods: []
    }
  }

  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  seach() {
    getPackgeProductDetail({
      action: 'getPackgeProductDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        id: this.props.match.params.id,
        search: this.state.inputSearch,
        limit: "1000",
        page: "1"
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        this.setState({
          goods: res.data.data.packgeList
        })
      } else {
        Toast.info(res.data.msg, 2)
      }
    })
  }
  componentDidMount = () => {
    getPackgeProductDetail({
      action: 'getPackgeProductDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        id: this.props.match.params.id,
        limit: "1000",
        page: "1"
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        this.setState({
          goods: res.data.data.packgeList
        })
      } else {
        Toast.info(res.data.msg, 2)
      }
    })

  
    // console.log(store.getState().modifyPrice)
    // this.setState({
    //   goods: store.getState().modifyPrice
    // })
   
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
    return (
      <ApplyOrderxStyle>
        <DocumentTitle title={'打包商品明细'} />
        <div>
          <div className='search'>
            <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="inputSearch"
              onChange={this.inputChange.bind(this)}
              value={this.state.inputSearch} />
            <div className='img' onClick={() => { this.seach() }}>
              <img className='img-search' src="https://res.lexiangpingou.cn/images/applet/99968search.png" alt="search" />
            </div>
          </div>
          {
            this.state.goods.map((v, k) => {
              return (
                <div style={{position:'relative'}}>
                <div className='tiao' key={k} style={{zIndex:"9",position:"relative"}}>
                  <img className='t-img-l' src={v.albumpath ? v.albumpath : "https://res.lexiangpingou.cn/images/applet/99955tupian.png"} alt="" />
                  <ul className='wen-zi'>
                    <li className='wen-zi-t'>
                      <div className='name'>{v.name}</div>
                    </li>
                    <li className='wen-zi-c'>
                      <div >商品编码：{v.barcode}</div>
                      <p>{v.posprice}元/{v.unitname}</p>
                    </li>

                    <li className='wen-zi-f'>
                      <div></div>
                      <p>打包数量：<span>{v.num}</span></p>
                    </li>
                  </ul>
                </div>
                <div className='del' onClick={() => { this.deleteGoods(v) }}>
                  <img src='https://res.lexiangpingou.cn/images/vip/delete.png' alt="''" />
                </div>
                </div>
              )
            })
          }
        </div>
      </ApplyOrderxStyle>
    )
  }
  deleteGoods(v){
    delPackgeProduct({
      action: 'delPackgeProduct', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        packge_goodsid: this.props.match.params.id,
        barcodeid: v.barcodeid,
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
const ApplyOrderxStyle = styled.div`
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



.baocun{
    margin-right:.2rem;
    border-radius:.2rem;
    font-size:.4rem;
    color:#fff;
    text-align:center;
    width: 2.04rem;
    height: 1.17rem;
    line-height: 1.17rem;
    background-color: #ED7913;
  }
  .tijiao{
    margin-right:.2rem;
    border-radius:.2rem;
    font-size:.4rem;
    color:#fff;
    text-align:center;
    width: 2.04rem;
    height: 1.17rem;
    line-height: 1.17rem;
    background-color: #ED7913;
  }
.am-button::before {
    border: none !important;
}
.yuan{
    // padding-top:.1rem;
    text-align:center;
    // margin:auto;
    position:absolute;
    top: .2rem;
    left:1.3rem;
    color:#fff;
    width:.51rem;
    height:.51rem;
    line-height:.51rem;
    border-radius:.5rem;
    background-color: #E01616;
    font-size:.24rem;
  }
  .foot_conton span{
    color:#cf2424;
  }
  .foot_conton{
    width: 12rem;
    // height: 100%rem;
    line-height:1.6rem;
    text-align:center;
    font-size:.4rem;
  }
  .left img{
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
  }
  .left{
    padding-left:.48rem;
    padding-top:.45rem;
    width:3rem;
    
  }
  .right{
    font-size:.4rem;
    color:#fff;
    text-align:center;
    width: 2.76rem;
    height: 1.6rem;
    line-height:1.6rem;
    background-color: #ED7913;
  }
  .foot{
    display:flex;
    width: 100%;
    height: 1.6rem;
    background-color: #fff;
    position:absolute;
    bottom:0;
  }


  
    .wen-zi-f p span{
        color:#cf2424;
    }
    .wen-zi-t p{
        color:#646464;
        font-size:.29rem;
    }
    .wen-zi-f div{
        font-size:.29rem;
        color:#646464;
    }
    .wen-zi-f p{
        font-size:.29rem;
        color:#646464;
    }
    .name{
        font-size:.35rem;
        width: 3.2rem;
        color:#1a1a1a;
    }
    .wen-zi-f{
        display:flex;
        justify-content: space-between;
    }
    .wen-zi-t{
        display:flex;
        justify-content: space-between;
        width: 7.5rem;
        // height: 1.1rem;
        // background-color: yellow;
    }
    .wen-zi-c{
        display:flex;
        justify-content: space-between;
        font-size:.29rem;
        // margin-bottom:.27rem;
    }
    .wen-zi{
        margin-bottom: .24rem;
        padding-top:.25rem;
        margin-left: .32rem;
        width: 7.5rem;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
    }
    .t-img-l{

        margin-left: .37rem;
        margin-top:.24rem;
        margin-bottom:.24rem;
        width: 1.33rem;
        height: 1.33rem;
        // background-color: orange;
    }
    .t-img{
        // padding-top: .2rem;
        margin-left: .2rem;
        width: 1.5rem;
        height: 1.8rem;
        background-color: red;
    }
    .tiao{
        display:flex;
        width: 100%;
        // height: 2rem;
        background-color: #fff;
        border-bottom:2px solid #dadada;
        
    
    }
    .footer{
        font-size:.35rem;
        margin-top: .33rem;
        margin-left: .45rem;
        color:#646464;
        margin-bottom: .32rem;

    
    }
    .conten-c p{ 
        color:#646464;
        font-size:.32rem;
        padding-bottom:.25rem;
        margin-left: .35rem;
    }
    .conten-c{
        width: 9.3rem;  
        // height: 3.4rem;  
        margin:0 .37rem;
        background-color: #f8f8f8;
    
    }
    .conten-top p img{ 
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
    }
    .conten-top div{
        height:.89rem;
        line-height:.89rem;
        font-size:.35rem;
        color:#646464;
        // margin-top: .25rem;
        margin-left:.2rem;
    }
    .conten-top p{
        margin-top: .23rem;
        margin-left:.45rem;
        width:.33rem;
        height:.37rem;
    }
    .conten-top{
        display:flex;
        height:.89rem;
    
    }
    .conten{
        border-bottom:2px solid #dadada;
        margin-top:.2rem;
        width:100%;
        background-color: #fff;
    
    }

      
      input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size:.35rem;
      }
      .img{
        width: .55rem;  
        height: .55rem; 
        // line-height: .5rem; 
        margin-left:2.45rem;
      }
      .img-search{
        margin-top:.12rem;
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
      }
        
      .input{
        font-size:.37rem;
        border:none;
        width:6rem;
        // margin-top:.21rem;
        margin-left:.17rem;
        height: .75rem;
        line-height: .75rem;
        // background-color: red;
      
      }
      .search{
        display:flex;
        margin-top:.21rem;
        margin-bottom:.21rem;

        margin-left:.32rem;
        width:9.36rem;
        height: .75rem;
        border-radius:.15rem;
        background-color: #fff;
      
      }



`