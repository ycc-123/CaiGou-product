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
      autoplay:true,
      effect : 'cube',
  cubeEffect: {
    slideShadows: true,
    shadow: true,
    shadowOffset: 100,
    shadowScale: 0.6
  },
  // effect : 'coverflow',
  // slidesPerView: 3,
  // centeredSlides: true,
  // coverflowEffect: {
  //   rotate: 30,
  //   stretch: 10,
  //   depth: 60,
  //   modifier: 2,
  //   slideShadows : true
  // },
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
          <div className="swiper-slide">
            <img  src="https://www.swiper.com.cn/demo/images/nature-1.jpg" alt=""/>
          </div>
          <div className="swiper-slide" style={{width:"2rem",height:"8rem",background:"yellow"}}>
            <img src="https://www.swiper.com.cn/demo/images/nature-2.jpg" alt="11"/>
          </div>
          <div className="swiper-slide" style={{width:"2rem",height:"8rem",background:"pink"}}>Slide 3</div>
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
