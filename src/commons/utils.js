import { store } from 'store/index'
// import { _wxConfig } from "network/profile"

export function totalPrice() {
  if (store.getState().cartGoods.length !== 0) {
    // 算出总价 
    store.getState().totalPrice = store.getState().cartGoods.filter(item => item.checked
    ).reduce((oldValue, item) => {
      return oldValue + item.oprice * parseInt(item.num)
    }, 0).toFixed(2)
    // 算出总数
    store.getState().totalNumber = store.getState().cartGoods.filter(item => item.checked
    ).reduce((oldValue, item) => {
      return oldValue + parseInt(item.num)
    }, 0)
  }

}

export function cartTotal() {
  store.getState().cartGoods = store.getState().cartGoods.reduce((oldValue, item) => {
    return oldValue + item.num
  }, 0)
}

// 判断是否选择了全部商品
export function isSelectAllGoods() {
  if (!store.getState().cartGoods.find(item => !item.checked)) {
    store.getState().selectAll = true
  } else {
    store.getState().selectAll = false
  }
}


// 防抖函数
export function debounce(func, delay) {
  // func 传入方法名，delay毫秒
  let timer = null;
  return function (...args) {
    // ...args 可以传入多个参数
    if (timer) clearTimeout(timer)
    // 如果计时器为true 清空计时器
    timer = setTimeout(() => {
      //如果在delay时间内不会执行func函数
      //在delay时间外就会执行func函数
      func.apply(this, args)
    }, delay)
  }
}

export function setTitle(title) {
  // let baseUrl = window.location.origin
  document.title = title;
  var i = document.createElement('iframe');
  // i.src = `${baseUrl}/bbb.1ba1183e.png`;
  i.style.display = 'none';
  i.onload = function () {
    setTimeout(function () {
      i.remove();
    }, 9)
  }
  document.body.appendChild(i)
}
/**
 * @desc 函数防抖
 * @param {需要防抖的函数} func
 * @param {延迟时间} wait
 */
export function debounces(func, wait = 500) {
  // 缓存一个定时器id
  let timer = 0;
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

/**
 * @desc 是否滚到到容器底部
 * @param {滚动容器} ele
 * @param {容器高度} wrapHeight
 */
export function isScrollBottom(ele, wrapHeight, threshold = 30) {
  const h1 = ele.scrollHeight - ele.scrollTop;
  const h2 = wrapHeight + threshold;
  const isBottom = h1 <= h2;
  return isBottom;
}






/**
 * [过滤对象]
 * @param  obj [过滤前数据]
 * @param  arr [过滤条件，要求为数组]
*/
export function filterObj(obj, arr) {
  if (typeof (obj) !== "object" || !Array.isArray(arr)) {
    throw new Error("参数格式不正确")
  }
  const result = {}
  Object.keys(obj).filter((key) => arr.includes(key)).forEach((key) => {
    result[key] = obj[key]
  })
  return result
}


export function getSearchString(key) {
  const search = window.location.search.substring(1)
  console.log(search)
  const searchParams = new URLSearchParams(search)
  const value = searchParams.get(key)
  return value
}

export function inputResolve() {
  const ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
  const isIosVerLgThan13 = (ver && ver.length > 3 && ver[1] <= 13)
  return isIosVerLgThan13
}

