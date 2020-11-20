import React, { Component } from 'react'
import styled from 'styled-components'
import BetterScroll from 'common/betterScroll/BetterScroll'
import { store } from "store/index";
export default class InventoryListDetails extends Component {
    constructor() {
        super()
        this.state = {
            zcck:store.getState().tiaoboxqck[0].label?store.getState().tiaoboxqck[0].label:"",
            zrvk:store.getState().tiaoboxqck[2].label?store.getState().tiaoboxqck[2].label:"",
            danhao:store.getState().tiaoboxqck[3]?store.getState().tiaoboxqck[3]:"",
            beiz:store.getState().tiaoboxqck[1]?store.getState().tiaoboxqck[1]:""
        }
    }
    componentDidMount() {
        console.log(store.getState().tiaoboxqck)
        console.log(store.getState().tiaobogoods)
    }
   
    render() {
        const scrollConfig = {
            probeType: 1
        }
        var day2 = new Date();
        day2.setTime(day2.getTime());
        var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
        return (
            <WarehousingOrderxingStyle>
                <div>
                <div className='search'>
                        <input type="search" className='input' placeholder="请输入商品名称或商品编码"  />
                        <div className='img' onClick={() => { }}>
                            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                        </div>
                    </div>



                    <div className='conten'>
                        <div className='conten-top'>
                            <p>
                                <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/dingdan.png" alt="" />
                            </p>
                            <div>{this.state.danhao}</div>
                        </div>

                        <div className='conten-c'>
                            <p>单据日期：{s2}</p>
                            <p>转出仓库：{this.state.zcck}</p>
                            <p>转入仓库：{this.state.zrvk}</p>
                            <p>单据状态：<span style={{ color: "#d92929" }}>待提交</span></p>
                        </div>

                        <div className='footer'>
                            备注：{this.state.beiz}
                        </div>
                    </div>
                    <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "6.6rem", bottom: "1.6rem" }}>
                        {
                            store.getState().tiaobogoods.map((value, key) => {
                                console.log(value)
                                let tiao = value
                                return (
                                    <div className='tiao'>
                                        <img className='t-img-l' src={tiao.img ? tiao.img : "https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />
                                        <ul className='wen-zi'>
                                            <li className='wen-zi-t'>
                                                <div className='name'>{tiao.name}</div>
                                                <p>{tiao.gnum}{tiao.unit_name}</p>
                                            </li>
                                            <li className='wen-zi-f'>
                                                <div>￥：{tiao.price}元/{tiao.unit_name}</div>
                                                <p>{tiao.price*tiao.gnum}</p>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </BetterScroll>
                    </div>
            </WarehousingOrderxingStyle>
        )
    }
}
const WarehousingOrderxingStyle = styled.div`
.am-button::before {
    border: none !important;
}
.yuan{
    // padding-top:.1rem;
    text-align:center;
        // margin:auto;
        position:absolute;
        top: .2rem;
        left:1.6rem;
        color:#fff;
        width:.5rem;
        height:.5rem;
        line-height:.5rem;
        border-radius:.5rem;
        background-color: red;
      }
      .foot_conton span{
        color:#cf2424;
      }
      .foot_conton{
        width: 10rem;
        // height: 100%rem;
        line-height:1.6rem;
        text-align:center;
        font-size:.4rem;
      }
      .left img{
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
      }
      .left span{
          color:rgb(217, 41, 41);
      }
      .left{
        padding-left:.3rem;
        margin:auto;
        width: 22rem;
        height: 1rem;
        line-height: 1rem;
        font-size:.35rem;
      }
      .right{
        font-size:.4rem;
        color:#fff;
        text-align:center;
        width: 100%;
        margin:auto;
        height: 1.6rem;
        line-height:1.6rem;
        background-color: #ED7913;
      }
      .foot{
        display:flex;
        width: 100%;
        height: 1.6rem;
        background-color: #fff;
        position:absolute;
        bottom:0;
      }
    
      .wen-zi-t p{
        color:#646464;
        font-size:.35rem;
    }
    .wen-zi-f div{
        font-size:.35rem;
        color:#646464;
    }
    .wen-zi-f p{
        font-size:.35rem;
        color:#cf2424;
    }
    .name{
        font-size:.35rem;
        width: 3.2rem;
        height: 100%;
        color:#1a1a1a;
        // background-color: pink;
    }
    .wen-zi-f{
        display:flex;
        justify-content: space-between;
    }
    .wen-zi-t{
        display:flex;
        justify-content: space-between;
        width: 7.5rem;
        height: 1.1rem;
        // background-color: yellow;
    }
    .wen-zi{
        
        padding-top:.2rem;
        margin-left: .2rem;
        width: 7.5rem;
        height: 1.7rem;
        // background-color: red;
    }
    .t-img-l{
        margin-left: .2rem;
        margin-top:.2rem;
        width: 1.5rem;
        height: 1.5rem;
        // background-color: orange;
    }
    .t-img{
        // padding-top: .2rem;
        margin-left: .2rem;
        width: 1.5rem;
        height: 1.8rem;
        background-color: red;
    }
    .tiao{
        display:flex;
        width: 100%;
        height: 2rem;
        background-color: #fff;
        border-bottom:2px solid #dadada;
        
    
    }
    
    
    

    .footer{
        font-size:.4rem;
        margin-top: .1rem;
        margin-left: .3rem;
        color:#969696;
    
    }
    .conten-c p{ 
        color:#8f8f8f;
        font-size:.4rem;
        padding-top:.2rem;
        margin-left: .3rem;
    }
    .conten-c{
        width: 9.3rem;  
        height: 3.4rem;  
        margin:0 .3rem;
        background-color: #f8f8f8;
    
    }
    .conten-top p img{ 
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
    }
    .conten-top div{
        font-size:.45rem;
        margin-top: .25rem;
        margin-left:.2rem;
    }
    .conten-top p{
        margin-top: .3rem;
        margin-left:.3rem;
        width:.4rem;
        height:.7rem;
    }
    .conten-top{
        display:flex;
    
    }
    .conten{
        border-bottom:2px solid #dadada;
        margin-top:.2rem;
        width:100%;
        height:5.3rem;
        background-color: #fff;
    
    }
    input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size:.35rem;
    }
    .img{
        width: .8rem;  
        height: .6rem; 
    }
    .img-search{
        margin-top:.1rem;
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
    }
        
    .input{
        font-size:.35rem;
        border:none;
        width:8.3rem;
        margin-top:.1rem;
        margin-left:.3rem;
        height: .6rem;
        // background-color: red;
    
    }
    .search{
        display:flex;
        margin: .3rem .2rem 0;
        width:9.5rem;
        height: .8rem;
        border-radius:.5rem;
        background-color: #fff;
    
    }
    
    
    
    `



