import Swiper from "swiper"
import "swiper/css/swiper.css"
// import "swiper/swiper.less"


import React, { Component } from 'react'

export default class Text extends Component {
  constructor(){
    super()
    this.state={

    }
  }
  componentDidMount(){
    new Swiper ('.swiper-container', {
  direction: 'horizontal', // 垂直切换选项
  loop: true, // 循环模式选项

  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
})
}
  render() {
    return (
      <div className="swiper-container">
      <div className="swiper-wrapper">
          <div className="swiper-slide" style={{width:"2rem",height:"2rem"}}>Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
      </div>   
       {/* <!-- 如果需要分页器 -->    */}
       <div className="swiper-pagination"></div>    
    {/* <!-- 如果需要导航按钮 --> */}
    {/* <div className="swiper-button-prev"></div> */}
     {/* <div className="swiper-button-next"></div> */}
     
     {/* <!-- 如果需要滚动条 --> */}
     {/* <div className="swiper-scrollbar"></div> */}
 </div>
    )
  }
}
