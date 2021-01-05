import React, { Component } from 'react'
import styled from 'styled-components'
import { getOrderList, get_cashier, get_store } from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import { Picker, List, DatePicker } from 'antd-mobile';
import DocumentTitle from 'react-document-title'
import { store } from "store/index";
import { LoadingMore } from 'common/loading'

function Youhuimxbs(v) {
  let item = v.value
  let statusname = item.statusName
  let Color = ''
  if (statusname === "已付款") {
    Color = "#00B500"
  } else if (statusname === "未付款") {

  } else if (statusname === "部分退款") {
    Color = "red"
  } else if (statusname === "全部退款") {
    Color = "red"
  }
  return (
    <div className='caigoudan' >
      <div className='dan'>
        <div className='dan-top'>
          <p>
            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
          </p>
          <div className='t-right'>
            <div className='caigoudanhao'>零售单号：{item.orderno}</div>
            <div className='zuantai' style={{ color: Color }}>{item.statusName}</div>
          </div>
        </div>
        <div className='dan-footer'>
          <p>单据日期：{item.createtime}</p>
          <p>所属门店：{item.storeName}</p>
          <p>收银员：{item.createName}</p>
          <p>支付方式：{item.pay_type_name}</p>
          <p>原价总额：{item.totalmoney}</p>
          <p>应收金额：{item.price}</p>
        </div>
      </div>
    </div>
  )
}

export default class CashierOrderDetails extends Component {
  constructor() {
    super()
    this.state = {
      total: {},
      inputSearch: '',
      start: "",
      end: "",
      store_id: [],
      shouyinyuan: [],
      linshou: [],
      limit: "10",
      page: 0,
      zuantai: false,
      IDsyy: '',
      IDsj: '',
      end_time: '',
      start_time: '',
      today_time: "",
      before_time:"",
      kongbj: true,
      status: [
        { value: "0", label: "待付款" }, 
        { value: "1", label: "已付款" }, 
        { value: "4", label: "全部退款" }, 
        { value: "6", label: "部分退款" }],
      zhifu: [
        { value: "0", label: "现金" },
        { value: "1", label: "微信扫码" },
        { value: "2", label: "支付宝扫码" },
        { value: "3", label: "会员余额" },
        { value: "4", label: "银行卡" },
        { value: "5", label: "个人微信" },
        { value: "6", label: "个人支付宝" },
        { value: "7", label: "混合支付" },
        { value: "8", label: "购物卡" }],
      Value_status: "",
      ID_status: "",
      zhifu_Value: "",
      zhifu_ID: "",
      inputmembername: "",
      inputorder: "",
      loading: true
    }
    this.isLoadMore = true
  }
  componentDidMount() {
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    var s3 = day2.getFullYear()-3 + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();

    console.log(s3)
    this.setState({
      today_time: s2,
      before_time: s3
    })
    get_store({
      action: 'get_store', data: {
        uniacid: store.getState().uniacid,
      }
    }).then((res) => {
      var supplier = res.data.data.map(o => { return { value: o.id, label: o.name } });
      console.log(supplier)
      if (res.data.status === 4001) {
        this.setState({
          store_id: supplier
        })
      } else {
        Toast.info(res.data.msg, 2)
      }
    })
    get_cashier({
      action: 'get_cashier', data: {
        uniacid: store.getState().uniacid,
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        var shouyinyuan = res.data.data.map(o => { return { value: o.id, label: o.nick_name } });
        this.setState({
          shouyinyuan
        })
      } else {
        Toast.info(res.data.msg, 2)
      }
    })
    let IDsyy = this.state.IDsyy.toString()
    let IDsj = this.state.IDsj.toString()
    getOrderList({
      action: 'getOrderList', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        starttime: this.state.start_time,
        endtime: this.state.end_time,
        createid: IDsyy,
        store_id: IDsj,
        limit: this.state.limit,
        page: this.state.page
      }
    }).then((res) => {
      console.log(res)
      if (res.data.status === 4001) {
        this.setState({
          linshou: res.data.data.data,
          total: res.data.data.total
        }, () => {
          this.refs.scroll.BScroll.refresh()
        })
      } else {
        this.setState({
          kongbj: false
        })
        Toast.info(res.data.msg, 2)
      }

    })
  }
  shaixuan() {
    this.isLoadMore = true
    if (this.state.zuantai === false) {
      this.setState({
        zuantai: true
      }, () => {
        this.refs.scroll.BScroll.refresh()
      })
    } else {
      this.setState({
        zuantai: false
      }, () => {
        this.refs.scroll.BScroll.refresh()
      })
    }
  }
  queding() {
    console.log(this.state.zhifu_ID)
    this.setState({
      zuantai: false,
    })
    let zhifu_ID = this.state.zhifu_ID.toString()
    let ID_status = this.state.ID_status.toString()
    let IDsyy = this.state.IDsyy.toString()
    let IDsj = this.state.IDsj.toString()
    getOrderList({
      action: 'getOrderList', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        starttime: this.state.start_time,
        endtime: this.state.end_time,
        createid: IDsyy,
        store_id: IDsj,
        status: ID_status,
        pay_type: zhifu_ID,
        realname: this.state.inputmembername,
        member_mobile: this.state.inputorder,
        limit: this.state.limit,
        page: 1
      }
    }).then((res) => {
      console.log(this.isLoadMore)
      
      if (res.data.status === 4001) {
        this.setState({
          page:2,
          linshou: res.data.data.data,
          total: res.data.data.total,
          kongbj: true
        }, () => {
          this.refs.scroll.BScroll.finishPullUp()
          this.refs.scroll.BScroll.refresh()
        })
      } else {
        Toast.info(res.data.msg, 1)
        this.setState({
          kongbj: false,
          linshou: [],
          total: {}
        })
      }
    })
  }
  search() {
    getOrderList({
      action: 'getOrderList', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        search: this.state.inputSearch,
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        this.setState({
          page:1,
          linshou: res.data.data.data,
          total: res.data.data.total,
          // loading: false
        }, () => {
          this.refs.scroll.BScroll.refresh()
        })
      } else {
        Toast.info(res.data.msg, 1)
      }

    })
  }
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  mingxi(aa) {
    console.log(aa)
    this.props.history.push(`/CashierOrderDetails/${aa}`)
  }
  render() {
    const scrollConfig = {
      probeType: 1
    }
    const { linshou } = this.state
    return (
      <YouhuimxbStyle>
        <DocumentTitle title={'收银订单明细表'} />

        <div>
          <div style={{ display: "flex" }}>
            <div className='search' >
              <input type="search" className='input' placeholder="请输入零售单号" name="inputSearch"
                onChange={this.inputChange.bind(this)}
                value={this.state.inputSearch} />
              <div className='img' onClick={() => { this.search() }}>
                <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
              </div>
            </div>
            <div className='sximg' onClick={() => { this.shaixuan() }}>
              <img className='sximg-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/aqwe.png" alt="aaa" />
            </div>
          </div>

          <div style={{display: this.state.zuantai === false ? "block" : "none"}}>
          <div className='foot' >
            <div style={{ marginRight: ".3rem" }}>
              总计金额：<span>{this.state.total.all_total_price ? this.state.total.all_total_price : 0}</span>
            </div>
            <div style={{ marginRight: ".3rem" }}>
              当前结果：<span>{this.state.total.total_price ? this.state.total.total_price : 0}</span>
            </div>
          </div>
          </div>

          <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "1.17rem", bottom: "1.5rem" }} loadMore={this.loadMore} isLoadMore={this.isLoadMore}>
            <div style={{ display: this.state.zuantai === false ? "block" : "none" }}>
              {
                linshou.map((v, k) => {
                  return (
                    <div onClick={() => { this.mingxi(v.id) }}>
                      <Youhuimxbs value={v} page={this.state.page} history={this.props.history} key={k}></Youhuimxbs>
                    </div>
                  )
                })
              }
              {/* {

                linshou.length > 0 &&
                <div style={{ display: this.state.loading === false ? "none" : "block" }}>
                  <LoadingMore isLoading={this.isLoadMore} /></div>
              } */}
            </div>

            <div className='fenglei' style={{ display: this.state.zuantai === false ? "none" : "block" }}>
              <div>日期
                <ul>
                  <p><span style={{ position: "absolute", top: ".85rem", left: "4.7rem" }}>~</span>
                    <article className='articleone'></article>
                    <DatePicker
                      mode="date"
                      value={this.state.start}
                      extra={this.state.before_time}
                      onChange={v => this.setState({
                        start: v,
                        start_time: v.getFullYear() + '-' + (v.getMonth() + 1) + '-' + v.getDate()
                      })}
                    >
                      <List.Item className="start" arrow="horizontal"></List.Item>
                    </DatePicker>

                    <article className='articletwo'></article>
                    <DatePicker
                      mode="date"
                      extra={this.state.today_time}
                      value={this.state.end}
                      onChange={v => this.setState({
                        end: v,
                        end_time: v.getFullYear() + '-' + (v.getMonth() + 1) + '-' + v.getDate()
                      })}
                    >
                      <List.Item className="end" arrow="horizontal"></List.Item>
                    </DatePicker>
                  </p>
                </ul>
              </div>

              <div>所属商家
                <ul>
                  <li>
                    <Picker
                      data={this.state.store_id}
                      cols={1}
                      className="forss"
                      extra="所属商家"
                      value={this.state.sValue}
                      onChange={v => this.setState({ sValue: v })}
                      onOk={v => this.setState({ IDsj: v })}
                    >
                      <List.Item className='times' arrow="horizontal"></List.Item>
                    </Picker>
                  </li>
                </ul>
              </div>

              <div >收银员
                <ul>
                  <li>
                    <Picker
                      data={this.state.shouyinyuan}
                      cols={1}
                      className="forss"
                      extra="收银员"
                      value={this.state.Value}
                      onChange={v => this.setState({ Value: v })}
                      onOk={v => this.setState({ IDsyy: v })}
                    >
                      <List.Item className='time' arrow="horizontal"></List.Item>
                    </Picker>
                  </li>
                </ul>
              </div>

              <div >单据状态
                <ul>
                  <li>
                    <Picker
                      data={this.state.status}
                      cols={1}
                      className="forss"
                      extra=""
                      value={this.state.Value_status}
                      onChange={v => this.setState({ Value_status: v })}
                      onOk={v => this.setState({ ID_status: v })}
                    >
                      <List.Item className='status' arrow="horizontal"></List.Item>
                    </Picker>
                  </li>
                </ul>
              </div>

              <div >支付方式：
                <ul>
                  <li>
                    <Picker
                      data={this.state.zhifu}
                      cols={1}
                      className="forss"
                      extra=""
                      value={this.state.zhifu_Value}
                      onChange={v => this.setState({ zhifu_Value: v })}
                      onOk={v => this.setState({ zhifu_ID: v })}
                    >
                      <List.Item className='zhifu' arrow="horizontal"></List.Item>
                    </Picker>
                  </li> 
                </ul>
              </div>

              <div >会员名称：
                <ul>
                  <li>
                    <input className="member-name" type="text" placeholder="" name="inputmembername"
                      onChange={this.inputChange.bind(this)}
                      value={this.state.inputmembername} />
                  </li>
                </ul>
              </div>
              <div >手机号
                <ul>
                  <li>
                    <input className="tell" type="text" placeholder="" name="inputorder"
                      onChange={this.inputChange.bind(this)}
                      value={this.state.inputorder} />
                  </li>
                </ul>
              </div>

              <div className='btn' onClick={() => { this.queding() }}>确定</div>
            </div>
          </BetterScroll>
          <div className='kongbj' style={{ display: this.state.kongbj === false ? "block" : "none" }}>
            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/kong.png" alt="" />
          </div>
         
        </div>
      </YouhuimxbStyle>
    )
  }
  loadMore = () => {
  
    
    if (this.isLoadMore) {
      
      let zhifu_ID = this.state.zhifu_ID.toString()
      let ID_status = this.state.ID_status.toString()
      let IDsyy = this.state.IDsyy.toString()
      let IDsj = this.state.IDsj.toString()
      getOrderList({
        action: 'getOrderList', data: {
          uniacid: store.getState().uniacid,
          uid: store.getState().uid,
          starttime: this.state.start_time,
          endtime: this.state.end_time,
          createid: IDsyy,
          store_id: IDsj,
          status: ID_status,
          pay_type: zhifu_ID,
          realname: this.state.inputmembername,
          member_mobile: this.state.inputorder,
          limit: this.state.limit,
          page: this.state.page
        }
      }).then((res) => {
        // 如果长度不等于得时候加载 那么是到底了
        if (res.data.data.data.length < this.state.limit) {
          this.isLoadMore = false
        }
        this.setState({
          linshou: [...this.state.linshou, ...res.data.data.data],
          loadingMore: false
        }, () => {
          let page = Number(this.state.page)
          this.setState({
            page: page += 1
          })
          // loading = false
          this.refs.scroll.BScroll.finishPullUp()
          this.refs.scroll.BScroll.refresh()
        })
      })
    } else { }
  }
}
const YouhuimxbStyle = styled.div`
.member-name{
    border:none;
    height:.7rem;
    width:100%;
    background: transparent;
}
.tell{
    border:none;
    height:.7rem;
    width:100%;
    background: transparent;
}
.sximg{
    height:.5rem;
    width:.5rem;
    margin-top:.37rem;
    margin-left:.27rem;

}
.sximg img{
    width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
}

.kongbj img{
    width: 5rem;
    height: 5rem;
}
.kongbj{
    margin-top:3rem;
    width:100%;
    height: 100%;
    vertical-align: middle;
    text-align: center;
}
.btn_sh{
    position:absolute;
    top:1.6rem;
    left:7.8rem;
    width: 1.33rem;
    height: 0.67rem;
    line-height: 0.67rem;
    color:#fff;
    text-align:center;
    background: #ED7913;
    border-radius: .1rem;
}
.t-right{
    width:8.8rem;
    display:flex;
    justify-content: space-between;
}
.dan-footer{
    margin-top:.27rem;
}
.dan-footer p{
    margin-bottom:.25rem;
    margin-left:.48rem;
    font-size:.35rem;
    color: #969696;
}
.zuantai{
        margin-right:.27rem;
        height:.85rem;
        line-height:.85rem;
        font-size:.35rem;
        color: #ed5f21;
    }
    .caigoudanhao{

        width: 6.49rem;
        margin-left:.31rem;
        height:.85rem;
        line-height:.85rem;
        font-size:.33rem;
        color: #333333;
    }
    .dan-top p img{
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
    }
    .dan-top p{
        margin-top:.22rem;
        margin-left:.37rem;
        width: .29rem;  
        height: .35rem;
    }
    .dan-top{
        display:flex;
        width: 100%;  
        height: .85rem;
        border-bottom:1px solid #dddddd;
    }
    .dan{
        position:relative;
        margin-bottom:.23rem;
        margin-left: .32rem;
        width: 9.36rem;  
        background-color: #fff;
        border-radius:.2rem;
        border:1px solid #dddddd;
    }
    .add{
        width: 1.6rem;
        height: 0.75rem;
        line-height: 0.75rem;
        text-align:center;
        color:#fff;
        background: #ED7A14;
        border-radius: .1rem;
        margin-top:.21rem;
        margin-left:.32rem;
        font-size:.37rem;
      }
      
      input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size:.35rem;
      }
      .img{
        width: .55rem;  
        height: .55rem; 
        margin-right:.2rem;
      }
      .img-search{
        margin-top:.12rem;
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
      }
        
      .input{
        font-size:.37rem;
        border:none;
        width:7.3rem;
        margin-left:.17rem;
        height: .75rem;
        line-height: .75rem;
      }
      .search{
        display:flex;
        justify-content: space-between;
        margin-top:.21rem;
        margin-left:.32rem;
        width:8.6rem;
        height: .75rem;
        border-radius:.15rem;
        background-color: #fff;
      
      }
.foot div span{
    color:#cf2424;
    font-weight:900;
}
.foot{
    box-shadow: -1px -1px 2px #ccc;
    padding-left:.3rem;
    font-size:.38rem;
    display:flex;
    justify-content: space-between;
    width:100%;
    height:1.5rem;
    line-height:1.5rem;
    position:absolute;
    bottom:0rem;
    background-color: #fff;
}
.conten ul li article div img{
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
.conten ul li article div{
    margin-top:.1rem;
    width:.55rem;
    height:1.15em;
}
.conten ul li article span{
    font-size:.35rem;
}
.conten ul li article{
    display:flex;
}
.conten ul li p{
    margin-top:.35rem;
    font-size:.3rem;
}
.conten ul li{
    padding-left:.2rem;
    border-right:2px solid #c8c8c8;
    width:6rem;
    height:1.2rem;
}
.conten ul{
    display:flex;
}
.conten{
    width:100%;
    height:1.7rem;
}

.foot div span{
    color:#cf2424;
    font-weight:900;
}
.foot{
    box-shadow: -1px -1px 2px #ccc;
    padding-left:.3rem;
    font-size:.38rem;
    display:flex;
    justify-content: space-between;
    width:100%;
    height:1.5rem;
    line-height:1.5rem;
    position:absolute;
    bottom:0rem;
    background-color: #fff;
}
.am-list-item .am-list-line .am-list-extra{
    padding-top:.5rem;
    color:#a9a9a9;
    text-align: left;
    font-size:.32rem;
    padding-left:.1rem;
}
.am-list-item .am-list-line .am-list-arrow{
    background-image: none;
    opacity:0;
}
.onetimes{
    position:absolute;
    left:1.8rem;
    top:-.2rem;
    color: red;
    width:12rem;
    background-color: transparent;
}
.start{
    position:absolute;
    left:1.5rem;
    top:.5rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.end{
    position:absolute;
    left:4.9rem;
    top:.5rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
}

.am-list-item .am-list-line{
    width:6rem;
}
.am-list-item .am-list-line .am-list-extra{
    color:#a9a9a9;
    text-align: left;
    font-size:.35rem;
    padding-left:.1rem;
    width:3rem;
}
.am-list-item .am-list-line .am-list-arrow{
    margin-left:4.5rem !important;
}

.time{
    position:absolute;
    left:0rem;
    top:4.5rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.status{
    position:absolute;
    left:0rem;
    top:6.4rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.zhifu{
    position:absolute;
    left:0rem;
    top:8.3rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.times{
    position:absolute;
    left:0rem;
    top:2.6rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
}
.fenglei div ul p{
    width:9.3rem;
    height:.9rem;
    line-height:.9rem;
    text-align:center;
    margin:.2rem 0rem;
    border-radius:.1rem;
}
.fenglei div ul li{
    overflow: hidden;
    width:9.3rem;
    height:.9rem;
    line-height:.9rem;
    text-align:center;
    
    margin:.2rem 0rem;
    border-radius:.1rem;
    border:1px solid #dcdcdc;
    background-color: #f6f6f6;
}
.fenglei div ul{
    display:flex;
    flex-wrap:wrap;
}
.fenglei div{
    font-size:.4rem;
}
.fenglei{
    padding:.2rem .2rem;
    position:relative;
    width:10rem;
    background-color: #f0f0f0;
}
.btn{
    margin-top:.3rem;
    color:#fff;
    width:100%;
    background-color: #ed7912;
    height:1rem;
    line-height:1rem;
    text-align:center;
    border-radius:.1rem;
}






`


