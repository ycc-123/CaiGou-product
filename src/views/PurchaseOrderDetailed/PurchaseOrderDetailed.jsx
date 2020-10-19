import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseDetail } from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'

export default class PurchaseOrderDetailed extends Component {
    constructor(){
        super()
        this.state={
            purchaseDetail:{}
        }
    }
    componentDidMount(){
        getPurchaseDetail({ action: 'getPurchaseDetail', data: {
            uniacid: "53",
            uid:"2271",
            purchaseId:"679",
            type:"1",
            limit:"30",
            page:"2"
          } }).then((res) => {
            console.log(res.data)
            if(res.data.status===4001){
                console.log(res.data.data.purchaseDetail)
                this.setState({
                    purchaseDetail: res.data.data.purchaseDetail
                }, () => {
                    
                })
            }else{
                Toast.fail('网络错误', 2)
            }
        })
    }
    render() {
        return (
            <PurchaseOrderDetailedStyle>
                <div>
                    <div className='search'>
                        <input type="search" className='input' placeholder="请输入商品名称或商品编码" />
                        <div className='img'>
                            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                        </div>
                    </div>

                    <div className='conten'>
                        <div className='conten-top'>
                            <p>
                                <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/dingdan.png" alt="" />
                            </p>
                            <div>CG20201009123456789</div>
                        </div>

                        <div className='conten-c'>
                            <p>单据日期：{this.state.purchaseDetail.docdate}</p>
                            <p>单据仓库：{this.state.purchaseDetail.warehousename}</p>
                            <p>单据状态：<span style={{ color: "#ed5f21" }}>待审核</span></p>
                        </div>

                    <div className='footer'>
                            采购备注：
                    </div>
                </div>

                    <div className='tiao'>
                       
                            {/* <p className='t-img'> */}
                                <img className='t-img-l' src="" alt=""/>
                            {/* </p> */}
                            <ul className='wen-zi'>
                                <li className='wen-zi-t'>
                                    <div className='name'>北海盗白色恋人巧克力饼干</div>
                                    <p>99.9公斤</p>
                                </li>
                                <li className='wen-zi-f'>
                                    <div>￥：85元/盒</div>
                                    <p>999.9</p>
                                </li>
                            </ul>
                       
                    </div>
                </div>
            </PurchaseOrderDetailedStyle>
        )
    }
}
const PurchaseOrderDetailedStyle = styled.div`
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
    background-color: orange;
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
    height: 2.6rem;  
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
    height:4.5rem;
    background-color: #fff;

}
input::-webkit-input-placeholder {
    color: #c9c9c9;
    font-size:.4rem;
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


