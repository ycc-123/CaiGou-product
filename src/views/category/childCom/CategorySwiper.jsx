// import React, { Component, Fragment } from 'react'
// import Swiper from 'swiper'
// import "swiper/css/swiper.css"

// import CategorySwiperItem from './CategorySwiperItem'

// // import { store } from 'store/index'
// // import { getCartData } from 'store/actionCreators'

// // import { _cartApi } from 'network/cart'

// class CategorySwiper extends Component {
//   render() {
//     const { goodsList, ys, kc } = this.props
//     return (
//       <Fragment>
//         <div className='category-swiper'>
//           <div className="swiper-container" ref='swiper'>
//             <div className="swiper-wrapper">
//               {goodsList.length !== 0 ? goodsList.map((item, index) => {
//                 return (
//                   <CategorySwiperItem key={item.id + index} goods={item} ys={ys} kc={kc} />
//                 )
//               }) : <div style={{ color: 'white', width: '100%', height: 'calc(100vh - 2.61rem)' }}>
//                   <img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '2rem', height: '' }} src='https://res.lexiangpingou.cn/images/vip/fengleiwu.png' alt="" />
//                   <p style={{ position: 'absolute', fontSize: '.32rem', top: '65%', left: '50%', transform: 'translate(-50%, 0)', }}>商家正在努力上新中</p>
//                 </div>}
//             </div>
//             <div className="swiper-scrollbar"></div>
//           </div>
//         </div>
//       </Fragment>
//     );
//   }

//   componentDidMount = () => {
//     this.swiper = new Swiper(this.refs.swiper, {
//       freeMode: true,
//       freeModeSticky: true,
//       initialSlide: 0,
//       preloadImages: false,
//       freeModeMomentumVelocityRatio: 0.5,
//       init: false,
//       scrollbar: {
//         el: '.swiper-scrollbar',
//         scrollbarHide: false
//       },
//       on: {
//         slideChangeTransitionStart() {
//           for (let i = 0; i < this.slides.length; i++) {
//             this.slides[i].style.opacity = .5
//             this.slides[i].style.transform = `scale(.85)`
//           }
//         },
//         slideChangeTransitionEnd() {
//           for (let i = 0; i < this.slides.length; i++) {
//             if (i === this.activeIndex) {
//               this.slides[i].style.opacity = 1
//               this.slides[i].style.transform = `scale(.95)`
//             }
//           }
//         }
//       },
//       slidesPerView: 'auto',
//       centeredSlides: true,
//       observer: true,
//       observeParents: true,
//     })
//     this.swiper.init()
//   }
//   componentDidUpdate = () => {
//     if (this.swiper) {
//       this.swiper.destroy(false)
//       this.swiper = new Swiper(this.refs.swiper, {
//         freeMode: true,
//         freeModeSticky: true,
//         freeModeMomentumVelocityRatio: 0.5,
//         preloadImages: false,
//         init: false,
//         scrollbar: {
//           el: '.swiper-scrollbar',
//           scrollbarHide: false
//         },
//         on: {
//           slideChangeTransitionStart() {
//             for (let i = 0; i < this.slides.length; i++) {
//               this.slides[i].style.opacity = .5
//               this.slides[i].style.transform = `scale(.85)`
//             }
//           },
//           slideChangeTransitionEnd() {
//             for (let i = 0; i < this.slides.length; i++) {
//               if (i === this.activeIndex) {
//                 this.slides[i].style.opacity = 1
//                 this.slides[i].style.transform = `scale(.95)`
//               }
//             }
//           }
//         },
//         slidesPerView: 'auto',
//         centeredSlides: true,
//         observer: true,
//         observeParents: true
//       })
//       this.swiper.init()
//     }
//   }
// }

// export default CategorySwiper;