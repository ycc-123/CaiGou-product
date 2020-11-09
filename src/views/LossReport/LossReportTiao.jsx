import React, { Component } from 'react'

export default class StockListTiao extends Component {
    render() {
        // console.log(this.props.item)
        let good=this.props.item
        return (
            <div className='tiao'>
                        <ul className='header'>
                            <li className='order' style={{color:good.statusName==="已审核"?"#cf2424":""}}>报损单号：{good.ydocno}</li>
                            <li className='store_name'>{good.warehouseName}</li>
                        </ul>
                        <div className='conten'>
                            {/* <img className='t-img-l'  alt="" /> */}
                            <img className='t-img-l'  src={good.image?good.image:"https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />

                            <ul className='wen-zi'>
                                <li className='wen-zi-t'>
                                    <div className='name'>{good.goods_name}</div>
                                    <p style={{ color: "#858585" }}>{good.num}{good.unitname}</p>
                                </li>
                                <li className='wen-zi-f'>
                                    <div>￥：{good.costprice}元/{good.unitname}</div>
                                    <p><span style={{ fontWeight: "100" }}>总价格: </span>{good.subtotal}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
        )
    }
}
