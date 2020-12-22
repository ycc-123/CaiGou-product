import React, { Component } from 'react'

export default class Tiao extends Component {
  render() {
    let data = this.props.item
    let Color = ''
    if (data.statusname === "审核通过") {
      Color = "#22a31b"
    } else if (data.statusname === "待提交") {
      Color = "#d92929"
    }
    return (
      <div>
        <div className='dan' onClick={() => { this.props.history.push(`/WarehousingOrderxing/${data.id}`) }}>
          <div className='dan-top'>
            <p>
              <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
            </p>
            <div className='t-right'>
              <div className='caigoudanhao'>入库单号：{data.docno}</div>
              <div className='zuantai' style={{ color: Color }}>{data.statusname}</div>
            </div>
          </div>
          <div className='dan-footer'>
            <p>单据日期：{data.docdate}</p>
            <p>入库仓库：{data.warehousename}</p>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>采购总数量：{data.total_gnum ? data.total_gnum : 0}</p>
              <p style={{ marginRight: ".27rem" }}>入库总数量：{data.total_innum ? data.total_innum : 0}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
