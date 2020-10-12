import React, { Component } from 'react'
import BScroll from 'better-scroll'


class BetterScroll extends Component {
  render() {
    return (
      <div className='wrapper' ref='wrapper' style={this.props.style}>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
  componentDidMount() {
    // const ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    /* alert(ver) */
    // 判断ios是否大于13.4
    // const isIosVerLgThan1304 = (ver && ver.length > 3 && ver[1] >= 13 && ver[2] >= 4) || (ver && ver.length > 3 && ver[1] >= 14);
    const { probeType } = this.props.config
    this.BScroll = new BScroll(this.refs.wrapper, {
      // probeType  侦测 要不要侦测滚动 0 不侦测实时位置 1侦测
      // 2 在手指滚动过程中侦测，手指离开后惯性滚动不侦测
      // 3 只要是滚动都侦测
      probeType,
      // better-sroll 默认不监听按钮点击
      click: true,
      // 监听上来加载更多
      pullUpLoad: true,
      // 监听下拉事件
      // pullDownRefresh: true,
      // 默认回弹动画
      bounceTime: 1000,
      // 阻止冒泡事件
      // stopPropagation: true,
      // 开启鼠标滚轮
      mouseWheel: true,
      // 立即停止滑动
      // bindToWrapper: true,
      useTransition:false,
      /* bounce: {
        top: true,
        bottom: false
      } */
      // ios端13.4以上快速滑动bug解决办法
      // useTransition: false
    })
    // 监听滚动事件
   /*  this.BScroll.on('scroll', position => {
      console.log(position.y)
    }) */
    // 上拉事件
    this.BScroll.on('pullingUp', () => {
      if (this.props.loadMore && this.props.isLoadMore) {
        this.props.loadMore()
      } 
    })
    // 手指离开屏幕事件
    this.BScroll.on('scrollEnd', position => {
      // console.log(this.BScroll)
      /* if (this.BScroll.maxScrollY === position.y) {
        
        this.BScroll.options.bounce = { bottom: false }
      } */
      /* console.log(this.BScroll.isInTransition) */
    })
    // 上拉事件
    /* this.BScroll.on('pullingDown', () => {
      this.BScroll.finishPullDown()
    }) */
    // 销毁
    this.BScroll.on('destroy', () => {
      console.log('销毁成功')
    })
    // 当ios系统大于13.4
    /* if (isIosVerLgThan1304) {
      this.BScroll.options.useTransition = false
    } */
    this.BScroll.on('scrollEnd', () => {
      this.BScroll.isInTransition  = false
    })
  }
  componentWillUnmount() {
    console.log('销毁了')
  }
}



export default BetterScroll;