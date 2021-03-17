import React, { Component } from 'react'
import styled from 'styled-components'
import { store } from "store/index";
import DocumentTitle from 'react-document-title'
import BetterScroll from 'common/betterScroll/BetterScroll'

import { Toast, Button, Modal } from 'antd-mobile';
const alert = Modal.alert;

export default class Home extends Component {
  constructor(props){
    super()
    props.cacheLifecycles.didCache(this.componentDidCache)
    props.cacheLifecycles.didRecover(this.componentDidRecover)
    this.state={

    }
  }
  componentDidMount() {
    this.refs.scroll.BScroll.refresh()
    console.log(localStorage.getItem('user'))
    console.log("uid=====", store.getState().uid)
    console.log("uniacid=====", store.getState().uniacid)
    // localStorage.clear()
  }
  componentDidCache = () => {
    console.log('List cached')
    this.saveY = this.refs.scroll.BScroll.y

  }
 
  componentDidRecover = () => {
    console.log('List recovered')
    this.refs.scroll.BScroll.refresh()
    this.refs.scroll.BScroll.scrollTo(0, this.saveY)
  }
  aa(){
    localStorage.clear()
    window.location.reload()
  }
  render() {
    const scrollConfig = {
      probeType: 1
  }
    return (
      <HomeStyle>
     <DocumentTitle title={'进销存'} />

        <BetterScroll config={scrollConfig} style={{ height: "100vh" }} ref='scroll'>
        <div style={{height:".05rem",width:"100%"}}></div>
        <div className='top'>
        <div style={{ marginLeft: ".7rem" ,fontSize:".45rem",paddingTop:".4rem",fontWeight:"900"}}>基础资料</div>
        <ul style={{position:"relative"}}>
          <li ><img src="https://res.lexiangpingou.cn/images/53/2021/03/Kpy1AsS8jwA81PPjza4WyqpUAJayqF.png" alt=""/></li>
          <p className="bjsygoods" onClick={()=>{this.props.history.push('/bjsygoods')}}></p>
          <p className="modifyPrice" onClick={()=>{this.props.history.push('/modifyPrice')}}></p>
          <p className="PackagedGoods" onClick={()=>{this.props.history.push('/PackagedGoods')}}></p>
        </ul>
      </div>

        <div className='conten'>
          <div style={{ marginLeft: ".7rem" ,fontSize:".45rem",paddingTop:".4rem",fontWeight:"900"}}>采购管理</div>
          <ul style={{position:"relative"}}>
          <li ><img src="https://res.lexiangpingou.cn/images/53/2021/03/egInluXlioqLmzUIIlpt3PlpHlqMoL.png" alt=""/></li>
              <p className="ApplyOrder" onClick={()=>{this.props.history.push('/ApplyOrder')}}></p>
              <p className="PurchaseOrder" onClick={()=>{this.props.history.push('/PurchaseOrder')}}></p>
          </ul>
        </div>

        <div className='footer'>
          <div style={{ marginLeft: ".7rem" ,fontSize:".45rem",paddingTop:".4rem",fontWeight:"900"}}>仓储管理</div>
          <ul style={{position:"relative"}}>
          <li><img src="https://res.lexiangpingou.cn/images/53/2021/03/Cz308u9w8J28Z3u3j5N83OHN88J598.png" alt=""/></li>
              <p className="stockCategory" onClick={()=>{this.props.history.push('/stockCategory')}}></p>
              <p className="WarehousingOrder" onClick={()=>{this.props.history.push('/WarehousingOrder')}}></p>
              <p className="Pandian" onClick={() => { this.props.history.push('/Pandian') }}></p>
              <p className="LossReportList" onClick={() => { this.props.history.push('/LossReportList') }}></p>
              <p className="allocationOrder" onClick={() => { this.props.history.push('/allocationOrder') }}></p>
          </ul>
        </div>

        <div className='sujubaobiao' >
          <div style={{ marginLeft: ".7rem" ,fontSize:".45rem",paddingTop:".4rem",fontWeight:"900"}}>数据报表</div>
          <ul style={{position:"relative"}}>
            <li><img src="https://res.lexiangpingou.cn/images/53/2021/03/dwT99ce2hHH2I2c2mmWMDt26TdCD6i.png" alt=""/></li>
              <p className="youhuimxb" onClick={()=>{this.props.history.push('/youhuimxb')}}></p>
              <p className="GoodDiscount" onClick={()=>{this.props.history.push('/GoodDiscount')}}></p>
              <p className="LossReport" onClick={() => { this.props.history.push('/LossReport') }}></p>
              <p className="CashierOrder" onClick={() => { this.props.history.push('/CashierOrder') }}></p>
          </ul>
        </div>

        <div className='sujubaobiao' style={{position:"relative",marginBottom:".2rem"}}>
          <div style={{ marginLeft: ".7rem" ,fontSize:".45rem",paddingTop:".4rem",fontWeight:"900"}}>版本信息</div>
          <ul>
            <li style={{ marginLeft: ".3rem" }} >
              <div style={{position:"absolute",top:"1rem",left:"0rem"}}>
              <img  src="https://res.lexiangpingou.cn/images/applet/99983bb.jpg" alt=""/>
              </div>
              <div style={{position:"absolute",top:"2.2rem",left:".5rem"}}>版本信息</div>
              <div className="banben">
                  v1.1.2.4.0
              </div>
              <p
              style={{ width: "3rem", height: "2rem", position: "absolute", top: "1rem", left: "0rem", color: "transparent", background: "transparent" }}
              onClick={() =>
                alert('', '有新版本可供更新', [
                  { text: '确定', onPress: () => this.aa() },
                  { text: '取消', onPress: () => console.log('cancel') },
                ])
              }
            ></p>
            </li>
          </ul>
        </div>
        <div style={{width:"100%",height:".1rem"}}></div>
      </BetterScroll>
      </HomeStyle>
    )
  }
}
const HomeStyle = styled.div`
.am-modal-body{
  color:#000;
}
.banben{
  opacity: .2;
  color: #000;
  font-size: .3rem;
  position: absolute;
  top: 2.7rem;
  left:0rem;
  text-align: center;
}

.sujubaobiao{
  height: 4rem;
  width:  9.3rem;
  background-color: #fff;
  margin-left: .35rem;
  margin-top: .3rem;
  box-shadow: 0px 0px 15px #e4e4e4;
  border-radius:.1rem;
}
.sujubaobiao div img{
  padding-left:.1rem;
  padding-top:.4rem;
  width:100%;
  height:100%;
}
.sujubaobiao div{
  margin-left: .3rem;
  margin-top: .3rem;
  height: 1.2rem;
  width:  2.2rem;
}
.sujubaobiao ul{
  display:flex;
  flex-wrap: wrap;
  margin-top: .6rem;
  height: 2.5rem;
  width:  100%;
}
.sujubaobiao ul li{
  // margin-left:.5rem;
  height: 1.6rem;
  width:  100%;
}

.youhuimxb{
  position: absolute;
  top: -.2rem;
  left: .5rem;
  width: 1.8rem;
  height: 1.8rem;
}
.GoodDiscount{
  position: absolute;
  top: -.2rem;
  left: 2.7rem;
  width: 1.8rem;
  height: 1.8rem;
}
.LossReport{
  position: absolute;
  top: -.2rem;
  left: 4.9rem;
  width: 1.8rem;
  height: 1.8rem;
}
.CashierOrder{
  position: absolute;
  top: -.2rem;
  left: 7rem;
  width: 1.8rem;
  height: 1.8rem;
}


// 仓储管理
.stockCategory{
  position: absolute;
  top: -.2rem;
  left: .5rem;
  width: 1.8rem;
  height: 1.8rem;
}
.WarehousingOrder{
  position: absolute;
  top: -.2rem;
  left: 2.7rem;
  width: 1.8rem;
  height: 1.8rem;
}
.Pandian{
  position: absolute;
  top: -.2rem;
  left: 4.9rem;
  width: 1.8rem;
  height: 1.8rem;
}
.LossReportList{
  position: absolute;
  top: -.2rem;
  left: 7rem;
  width: 1.8rem;
  height: 1.8rem;
}
.allocationOrder{
  position: absolute;
  top: 1.9rem;
  left: .5rem;
  width: 1.8rem;
  height: 1.8rem;
}


// 采购管理
.ApplyOrder{
  position: absolute;
  top: -.2rem;
  left: .5rem;
  width: 1.8rem;
  height: 1.8rem;
}
.PurchaseOrder{
  position: absolute;
  top: -.2rem;
  left: 2.7rem;
  width: 1.8rem;
  height: 1.8rem;
}


.sujubaobiao ul li img{
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}


// 基本资料
.bjsygoods{
  position: absolute;
  top: -.2rem;
  left: .5rem;
  width: 1.8rem;
  height: 1.8rem;
}
.modifyPrice{
  position: absolute;
  top: -.2rem;
  left: 2.7rem;
  width: 1.8rem;
  height: 1.8rem;
}
.PackagedGoods{
  position: absolute;
  top: -.2rem;
  left: 4.9rem;
  width: 1.8rem;
  height: 1.8rem;
}


.conten{
  height: 4rem;
  width:  9.3rem;
  background-color: #fff;
  margin-left: .35rem;
  margin-top: .3rem;
  box-shadow: 0px 0px 15px #e4e4e4;
  border-radius:.1rem;
}
.conten div img{
  padding-left:.1rem;
  padding-top:.4rem;
  width:100%;
  height:100%;
}
.conten div{
  margin-left: .3rem;
  margin-top: .3rem;
  height: 1.2rem;
  width:  2.2rem;
}
.conten ul{
  display:flex;
  flex-wrap: wrap;
  margin-top: .6rem;
  height: 2.5rem;
  width:  100%;
  // background-color: red;
}
.conten ul li{
  // margin-left:.5rem;
  height: 1.6rem;
  width: 7.8rem;
  // background-color: yellow;
}
.conten ul li img{
  width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}

.footer{
  // height: 4rem;
  height: 6rem;

  width:  9.3rem;
  background-color: #fff;
  margin-left: .35rem;
  margin-top: .3rem;
  box-shadow: 0px 0px 15px #e4e4e4;
  border-radius:.1rem;
}
.footer div img{
  padding-left:.1rem;
  padding-top:.4rem;
  width:100%;
  height:100%;
}
.footer div{
  margin-left: .3rem;
  margin-top: .3rem;
  height: 1.2rem;
  width:  2.2rem;
}
.footer ul{
  display:flex;
  flex-wrap: wrap;
  margin-top: .6rem;
  height: 2.5rem;
  width:  100%;
  // background-color: red;
}
.footer ul li{
  // margin-left:.4rem;
  height: 3.6rem;
  width:  11.8rem;
  // background-color: yellow;
}
.footer ul li img{
  width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}



.top{
  height: 4rem;
  width:  9.3rem;
  background-color: #fff;
  margin-left: .35rem;
  margin-top: .3rem;
  box-shadow: 0px 0px 15px #e4e4e4;
  border-radius:.1rem;
}
.top div img{
  padding-left:.1rem;
  padding-top:.4rem;
  width:100%;
  height:100%;
}
.top div{
  margin-left: .3rem;
  margin-top: .3rem;
  height: 1.2rem;
  width:  2.2rem;
}
.top ul{
  display:flex;
  flex-wrap: wrap;
  margin-top: .6rem;
  height: 2.5rem;
  width:  100%;
  // background-color: red;
}
.top ul li{
  height: 6.5rem;
  width: 7.2rem;
  // background-color: yellow;
}
.top ul li img{
  width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
`

