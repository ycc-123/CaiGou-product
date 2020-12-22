import React, { Component } from 'react'

export default class GoodDiscounts extends Component {
  render() {
    let item = this.props.item
    // console.log(item.goods_name.length)
    return (
      <div className='tiao'>
        <ul className='header'>
          <li className='order'>零售单号：{item.orderno}</li>
          <li className='store_name'>{item.storeName}</li>
        </ul>
        <div className='conten'>
          <img className='t-img-l' src={item.image ? item.image : "https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />

          <ul className='wen-zi'>
            <li className='wen-zi-t'>
              <div className='name'>{item.goods_name.length > 7 ? item.goods_name.substring(0, 7) + "..." : item.goods_name}</div>
              <p style={{ color: "#858585" }}>{item.num}{item.unitname}</p>
            </li>
            <li className='wen-zi-f'>
              <div>原价：{item.posprice}元/{item.unitname}</div>
              <p><span style={{ fontWeight: "100" }}>小计优惠: </span>{item.subtotal_fee}</p>
            </li>
            <li className='wen-zi-f'>
              <div>售价：{item.modifyprice}元/{item.unitname}</div>
              <p><span style={{ fontWeight: "100" }}>订单优惠分摊: </span>{item.subtotal}</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
