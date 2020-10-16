// import React, { Component, Fragment } from 'react'


// import CategorySwiper from './CategorySwiper'

// // import { store } from 'store/index'
// // import { saveCategoryGoods } from 'store/actionCreators'
// // import { changeCategoryIndex } from 'store/actionCreators'
// // import { getCategoryGoods } from 'network/category'

// class CategoryTabBar extends Component {
//   render() {
//     const { title, goodsList , ys ,kc } = this.props
//     return (
//       <Fragment>
//         <CategorySwiper  goodsList={goodsList}  ys={ys} kc={kc}/>
//         <div className='category-tab-box'>
//           <ul className='category-tab'>
//             {title.map((item, index) => {
//               return (
//                 <li className='category-tab-bar' key={item.id + index} onClick={() => { this.changeSwiper(index) }}>
//                   {item.name}
//                 </li>
//               )
//             })}
//             <div className='tab-un'>
//             </div>
//           </ul>
//         </div>
//       </Fragment>
//     );
//   }
//   changeSwiper = index => {
//     this.props.changeActive(index)
//   }
//   componentDidMount() {
//     const { index } = this.props
//     let tab = document.querySelector('.category-tab')
//     let bar = document.querySelectorAll('.category-tab-bar')
//     let un = document.querySelector('.tab-un')
//     // 获取元素的宽
//     let barW = bar[0].offsetWidth
//     let tabW = 0
//     for (let i = 0; i < bar.length; i++) {
//       tabW += barW
//     }
//     console.log(tabW)
//     tab.style.width = tabW + 'px'
//     // 显示几个tabbar
//     let viewNum = 5
//     // 前几个和后几个切换
//     // 进入右侧判断下划线的位置
//     let viewDefault = Math.floor(viewNum / 2)
//     un.style.left = index * barW + 'px'
//     // 判断ul的left值
//     if (index <= viewDefault) {
//       tab.style.left = 0 + 'px'
//     } else if (index > bar.length - viewDefault - 1) {
//       tab.style.left = - (bar.length - viewDefault * 2 - 1) * barW + 'px'
//     } else {
//       tab.style.left = - (index - 2) * barW + 'px'
//     }
//     // 默认的选中
//     bar[index].classList.add('bar-active')
//     bar.forEach((item, index) => {
//       item.style.left = index * barW + 'px'
//       item.addEventListener('click', (e) => {
//         bar.forEach(item => {
//           item.classList.remove('bar-active')
//         })
//         item.classList.add('bar-active')
//         // 最左侧三个 0 1 2
//         if (index <= viewDefault) {
//           un.style.left = index * barW + 'px'
//           tab.style.left = 0 + 'px'
//         } else if (index > bar.length - viewDefault - 1) { // 最右侧三个  8-5
//           un.style.left = index * barW + 'px'
//           tab.style.left = - (bar.length - viewDefault * 2 - 1) * barW + 'px'
//         } else { // 中间的情况
//           un.style.left = index * barW + 'px'
//           tab.style.left = - (index - 2) * barW + 'px'
//         }
//       })
//     })
//   }
// }

// export default CategoryTabBar;