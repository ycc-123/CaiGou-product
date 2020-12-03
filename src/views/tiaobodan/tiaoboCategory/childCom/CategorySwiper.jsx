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
            // zcck:1111,
            // zrvk:222,
            // danhao:333,
            // beiz:444
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
                            <div>{this.state.beiz}</div>
                        </div>

                        <div className='conten-c' style={{ paddingTop: ".25rem" }}>
                            <p>单据日期：{this.state.s2}</p>
                            <p>转出仓库：{this.state.zcck}</p>
                            <p>转入仓库：{this.state.zrvk}</p>
                            <p>单据状态：<span style={{ color: "#d92929" }}>待提交</span></p>
                        </div>

                        <div className='footer'>
                            备注：{this.state.danhao}
                        </div>
                    </div>
                    {/* <BetterScroll config={scrollConfig} ref='scroll' style={{ }}> */}
                        {
                            store.getState().tiaobogoods.map((value, key) => {
                                console.log(value)
                                let tiao = value
                                return (
                                    <div className='tiao'>
                                    {/* <img className='t-img-l' src={tiao.image} alt="" /> */}
                                    <img className='t-img-l' src={tiao.img ? tiao.img : "https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />

                                    <ul className='wen-zi'>
                                        <li className='wen-zi-c'>
                                            <div >{tiao.barcode}</div>
                                            <p>{tiao.price}元/{tiao.unit_name}</p></li>
                                        <li className='wen-zi-t'>
                                            <div className='name'>{tiao.name}</div>
                                            {/* <p>{tiao.gnum}公斤</p> */}
                                        </li>
                                        <li className='wen-zi-f'>
                                            <div>数量：{tiao.gnum}</div>
                                            <p>总价：{tiao.price*tiao.gnum}</p>


                                        </li>
                                    </ul>
                                </div>
                     
                                )
                            })
                        }
                    {/* </BetterScroll> */}
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
        padding-left:.39rem;
        // margin:auto;
        width: 7rem;
        height: 1.6rem;
        line-height: 1.6rem;
        font-size:.32rem;
      }
      .right{
        font-size:.4rem;
        color:#fff;
        text-align:center;
        width: 2.76rem;
        // margin:auto;
        height: 1.6rem;
        line-height:1.6rem;
        background-color: #ED7913;
      }
      .foot{
        display:flex;
        justify-content: space-between;
        width: 100%;
        height: 1.6rem;
        background-color: #fff;
        position:absolute;
        bottom:0;
      }
    
    
    
    
    
    .wen-zi-f p span{
        color:#cf2424;
    }
    .wen-zi-t p{
        color:#646464;
        font-size:.29rem;
    }
    .wen-zi-f div{
        font-size:.29rem;
        color:#646464;
    }
    .wen-zi-f p{
        font-size:.29rem;
        color:#646464;
    }
    .name{
        font-size:.35rem;
        width: 3.2rem;
        color:#1a1a1a;
        margin: .1rem 0;
    }
    .wen-zi-f{
        display:flex;
        justify-content: space-between;
    }
    .wen-zi-t{
        display:flex;
        justify-content: space-between;
        width: 7.5rem;
        // height: 1.1rem;
        // background-color: yellow;
    }
    .wen-zi-c{
        display:flex;
        justify-content: space-between;
        font-size:.29rem;
        // margin-bottom:.27rem;
    }
    .wen-zi{
        
        padding-top:.25rem;
        margin-left: .32rem;
        width: 7.5rem;
    }
    .t-img-l{

        margin-left: .37rem;
        margin-top:.24rem;
        margin-bottom:.24rem;
        width: 1.33rem;
        height: 1.33rem;
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
        // height: 2rem;
        background-color: #fff;
        border-bottom:2px solid #dadada;
        
    
    }
    .footer{
        font-size:.35rem;
        margin-top: .33rem;
        margin-left: .45rem;
        color:#646464;
        margin-bottom: .32rem;

    
    }
    .conten-c p{ 
        color:#646464;
        font-size:.32rem;
        padding-bottom:.25rem;
        margin-left: .35rem;
    }
    .conten-c{
        width: 9.3rem;  
        // height: 3.4rem;  
        margin:0 .37rem;
        background-color: #f8f8f8;
    
    }
    .conten-top p img{ 
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;
    }
    .conten-top div{
        height:.89rem;
        line-height:.89rem;
        font-size:.35rem;
        color:#646464;
        // margin-top: .25rem;
        margin-left:.2rem;
    }
    .conten-top p{
        margin-top: .28rem;
        margin-left:.45rem;
        width:.33rem;
        height:.37rem;
    }
    .conten-top{
        display:flex;
        height:.89rem;
    
    }
    .conten{
        border-bottom:2px solid #dadada;
        margin-top:.2rem;
        width:100%;
        background-color: #fff;
    
    }

      
      input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size:.35rem;
      }
      .img{
        width: .55rem;  
        height: .55rem; 
        // line-height: .5rem; 
        margin-left:2.45rem;
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
        width:6rem;
        // margin-top:.21rem;
        margin-left:.17rem;
        height: .75rem;
        line-height: .75rem;
        // background-color: red;
      
      }
      .search{
        display:flex;
        margin-top:.21rem;
        margin-left:.32rem;
        width:9.36rem;
        height: .75rem;
        border-radius:.15rem;
        background-color: #fff;
      
      }
    
    
    
    `



