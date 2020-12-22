import React, { Component } from 'react'

export default class StockListTiao extends Component {
  render() {
    let good = this.props.v
    return (
      <div className='tiao'>
        <img className='t-img-l' src={good.image ? good.image : "https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />

        <ul className='wen-zi'>
          <li className='wen-zi-t'>
            <div className='name'>{good.goods_name}</div>
            <p>{good.gnum}{good.unit_name}</p>
          </li>
          <li className='wen-zi-f'>
            <div>￥：{good.costprice}元/{good.unit_name}</div>
            <p><span>库存金额：</span>{good.costprice_cb}</p>
          </li>
        </ul>
      </div>
    )
  }
}
