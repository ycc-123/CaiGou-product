import React, { Component } from 'react'

export default class Tiao extends Component {
    render() {
        console.log(this.props.item)
        let data=this.props.item
        return (
            <div>
                <div className='dan'>
                        <div className='dan-top'>
                            <p>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt=""/>
                            </p>
                            <div className='caigoudanhao'>入库单号：{data.docno}</div>
                            <div className='zuantai'>{data.statusname}</div>
                        </div>
                        <div className='dan-footer'>
                            <p>单据日期：{data.docdate}</p>
                            <p>入库仓库：{data.warehousename}</p>
                        </div>
                    </div>
            </div>
        )
    }
}
