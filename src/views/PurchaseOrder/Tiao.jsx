import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Tiao extends Component {
    aa(item){
        this.props.history.push(`/PurchaseOrderDetailed/${item.id}`)
    }
    render() {
        let item =this.props.item
        let statusname=item.statusname
        let Color=''
        if(statusname==="审核成功"){
            Color="#22a31b"
        }else if(statusname==="待提交"){
            Color="#d92929"
        }
        return (
            <div className='caigoudan'  onClick={() => { this.aa(item) }}>
                    <div className='dan'>
                        <div className='dan-top'>
                            <p>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt=""/>
                            </p>
                            <div className='caigoudanhao'>采购单号：{item.docno}</div>
                            <div className='zuantai' style={{color:Color}}>{item.statusname}</div>
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


