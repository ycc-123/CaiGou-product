import React, { Component } from 'react'

export default class youhuimxbs extends Component {
    render() {
        // console.log(this.props)
        let item = this.props.item
        return (
            <div className='caigoudan' onClick={()=>{this.props.history.push(`/shouyinmxb/${item.id}`)}}>
                <div className='dan'>
                    <div className='dan-top'>
                        <p>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                        </p>
                        <div className='caigoudanhao'>零售单号：{item.orderno}</div>
                        <div className='zuantai'></div>
                    </div>
                    <div className='dan-footer'>
                        <p>单据日期：{item.createtime}</p>
                        <p>所属商家：{item.storeName}</p>
                        <p>收银员：{item.createName}</p>
                        <p>优惠总额：{item.all_fee}</p>
                    </div>
                </div>
            </div>
        )
    }
}
