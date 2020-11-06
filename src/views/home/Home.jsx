import React, { Component } from 'react'
import styled from 'styled-components'
import { store } from "store/index";



export default class Home extends Component {

  componentDidMount(){
    console.log(store.getState().uid)
    localStorage.clear()
  }
  render() {
    return (
      <HomeStyle>
      {/* <div className='top'>
        <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/base.png" alt=""/></div>
        <ul>
          <li onClick={()=>{alert("该功能未实现")}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/add.png" alt=""/></li>
          <li onClick={()=>{alert("该功能未实现")}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/bianji.png" alt=""/></li>
          <li onClick={()=>{alert("该功能未实现")}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/tiaojia.png" alt=""/></li>
          <li onClick={()=>{alert("该功能未实现")}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/dabao.png" alt=""/></li>
        </ul>
      </div> */}


      <div className='conten'>
        <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/caigou.png" alt=""/></div>
        <ul>
          <li style={{marginLeft:".5rem"}} onClick={()=>{this.props.history.push('/ApplyOrder')}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/shengqing.png" alt=""/></li>
          <li style={{marginLeft:".4rem"}} onClick={()=>{this.props.history.push('/AddPurchaseOrder')}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/addcaigou.png" alt=""/></li>
          <li style={{marginLeft:".3rem"}} onClick={()=>{this.props.history.push('/PurchaseOrder')}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/caigoudan.png" alt=""/></li>
        </ul>
      </div>

      <div className='footer'>
        <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/ckgl.png" alt=""/></div>
        <ul>
          <li style={{marginLeft:".5rem"}} onClick={()=>{this.props.history.push('/stockList')}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/kucundan.png" alt=""/></li>
          <li style={{height:"1.6rem",width:"1.95rem",marginLeft:".4rem"}} onClick={()=>{this.props.history.push('/WarehousingOrder')}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/rkdan.png" alt=""/></li>
          {/* <li onClick={()=>{alert("该功能未实现")}} style={{marginLeft:".2rem"}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/pandiandan.png" alt=""/></li> */}
          {/* <li onClick={()=>{this.props.history.push('/LossReport')}} style={{marginLeft:".2rem"}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/baosdan.png" alt=""/></li> */}
          {/* <li onClick={()=>{alert("该功能未实现")}} style={{marginTop:".8rem",marginLeft:".5rem"}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/tiaobodan.png" alt=""/></li> */}
          {/* <li style={{marginTop:".8rem"}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/dabao.png" alt=""/></li> */}
        </ul>
      </div>

      <div className='sujubaobiao' >
        <div style={{marginLeft:".35rem"}}><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/shujubaobiao.png" alt=""/></div>
        <ul>
        <li style={{marginLeft:".3rem"}} >
          <img onClick={()=>{this.props.history.push('/youhuimxb')}} src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/yhmxb.png" alt=""/>
          {/* </li> */}
          {/* <li style={{marginLeft:".4rem"}}  */}
            <img style={{marginLeft:".1rem"}} onClick={()=>{this.props.history.push('/GoodDiscount')}} src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/spyhhz.png" alt=""/>
            {/* </li> */}
            {/* <li style={{marginLeft:".3rem"}} onClick={()=>{this.props.history.push('/LossReport')}}> */}
              <img  onClick={()=>{this.props.history.push('/LossReport')}} src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/bshz.png" alt=""/>
              </li>
        </ul>
      </div>
      </HomeStyle>

    )
  }
}
const HomeStyle = styled.div`

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
  height: 4.5rem;
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

