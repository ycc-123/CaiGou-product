import React, { Component,createRef } from 'react'
import styled from 'styled-components'
import { store } from "store/index";
// import { Toast } from 'antd-mobile';
import DocumentTitle from 'react-document-title'
import BetterScroll from 'common/betterScroll/BetterScroll'
import { Toast, Button, Modal } from 'antd-mobile';
const alert = Modal.alert;
// import BetterScroll from 'common/betterScroll/BetterScroll'


export default class Home extends Component {

  componentDidMount() {
    this.refs.scroll.BScroll.refresh()
    // this.bt_ref.current.BScroll.refresh()
    // <Title title="" />
    console.log(localStorage.getItem('user'))
    console.log("uid=====", store.getState().uid)
    console.log("uniacid=====", store.getState().uniacid)
    localStorage.clear()
    // Toast.loading('Loading...', 1);
    // console.log( this.bt_ref.current.BScroll.refresh() )
  }
  // componentUpdate(){
  //   console.log( this.bt_ref.current.BScroll.refresh() )
  // }
  // bt_ref = createRef();
  // caigoudan(e){
  //   console.log(111)
  //   this.props.history.push('/PurchaseOrder')
  // }
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

        <BetterScroll config={scrollConfig} style={{ height: "100vh" }} ref='scroll'>
        <div style={{height:".05rem",width:"100%"}}></div>
        <div className='top'>
        <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/base.png" alt=""/></div>
        <ul>
          {/* <li onClick={()=>{this.props.history.push('/AddGoods')}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/add.png" alt=""/></li> */}
          <li onClick={()=>{this.props.history.push('/bjsygoods')}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/bianji.png" alt=""/></li>
          <li onClick={()=>{alert("该功能未实现")}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/tiaojia.png" alt=""/></li>
          <li onClick={()=>{alert("该功能未实现")}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/dabao.png" alt=""/></li>
        </ul>
      </div>
        <DocumentTitle title={'进销存'} />

        <div className='conten'>
          <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/caigou.png" alt="" /></div>
          <ul>
            <li style={{ marginLeft: ".5rem" }} onClick={() => { this.props.history.push('/ApplyOrder') }}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/shengqing.png" alt="" /></li>
            {/* <li style={{ marginLeft: ".4rem" }} onClick={() => { this.props.history.push('/AddPurchaseOrder') }}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/addcaigou.png" alt="" /></li> */}
            <li style={{ marginLeft: ".3rem" }} onClick={() => { this.props.history.push('/PurchaseOrder')} }><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/caigoudan.png" alt="" /></li>
          </ul>
        </div>

        <div className='footer'>
          <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/ckgl.png" alt="" /></div>
          <ul>
            <li style={{ marginLeft: ".5rem" }} onClick={() => { this.props.history.push('/stockCategory') }}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/kucundan.png" alt="" /></li>
            <li style={{ height: "1.6rem", width: "1.95rem", marginLeft: ".4rem" }} onClick={() => { this.props.history.push('/WarehousingOrder') }}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/rkdan.png" alt="" /></li>
           
            <li onClick={()=>{this.props.history.push('/Pandian')}} style={{marginLeft:".2rem"}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/pandiandan.png" alt=""/></li>
            <li onClick={()=>{this.props.history.push('/LossReportList')}} style={{marginLeft:".2rem"}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/baosdan.png" alt=""/></li>
            
            <li onClick={()=>{this.props.history.push('/allocationOrder')}} style={{marginLeft:".5rem",marginTop:".6rem"}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/tiaobodan.png" alt=""/></li>
         
          </ul>
        </div>

        <div className='sujubaobiao' >
          <div style={{ marginLeft: ".3rem" }}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/shujubaobiao.png" alt="" /></div>
          <ul>
            <li style={{ marginLeft: ".3rem" }} >
              <img onClick={()=>{this.props.history.push('/youhuimxb')}} src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/yhmxb.png" alt=""/>
              <img style={{marginLeft:".1rem"}} onClick={()=>{this.props.history.push('/GoodDiscount')}} src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/spyhhz.png" alt=""/>
              <img onClick={() => { this.props.history.push('/LossReport') }} src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/bshz.png" alt="" />
            </li>
          </ul>
        </div>

        <div className='sujubaobiao' style={{position:"relative",marginBottom:".2rem"}}>
          <div style={{ marginLeft: ".7rem" ,fontSize:".45rem",paddingTop:".4rem",fontWeight:"900"}}>版本信息</div>
          <ul>
            <li style={{ marginLeft: ".3rem" }} 
            // onClick={()=>{this.aa()}}
            >
              <div style={{position:"absolute",top:"1rem",left:"0rem"}}>
              <img  src="https://dev.lexiangpingou.cn/addons/lexiangpingou/data/share/bb.jpg" alt=""/>
              </div>
              <div style={{position:"absolute",top:"2.2rem",left:".5rem"}}>版本信息</div>
              <div className="banben">
                  v1.1.1.7.3
              </div>

              <p
              style={{ width: "3rem", height: "2rem", position: "absolute", top: "1rem", left: "0rem", color: "transparent", background: "transparent" }}
              // className="btn_modal"
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
  // background-color: red;
}
.sujubaobiao ul li{
  // margin-left:.5rem;
  height: 1.6rem;
  width:  100%;
  // background-color: yellow;
}
.sujubaobiao ul li img{
  width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
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
  width:  1.8rem;
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
  height: 1.6rem;
  width:  1.8rem;
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
  margin-left:.68rem;
  height: 1.5rem;
  width:  1.5rem;
  // background-color: yellow;
}
.top ul li img{
  width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
`

