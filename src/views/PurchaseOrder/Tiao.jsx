import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Tiao extends Component {
    aa(item){
        this.props.history.push(`/PurchaseOrderDetailed/${item.id}`)
    }
    render() {
        let item =this.props.item
        return (
            <div className='caigoudan'  onClick={() => { this.aa(item) }}>
                    <div className='dan'>
                        <div className='dan-top'>
                            <p>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt=""/>
                            </p>
                            <div className='caigoudanhao'>采购单号：{item.docno}</div>
                            <div className='zuantai'>{item.statusname}</div>
                        </div>
                        <div className='dan-footer'>
                            <p>单据日期：{item.docdate}</p>
                            <p>采购仓库：{item.warehousename}</p>
                        </div>
                    </div>
                </div>
        )
    }
}

export default withRouter(Tiao)


