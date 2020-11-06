import React, { Component } from 'react'
import styled from 'styled-components'
import { getRetailList } from 'network/Api'
// import { Toast } from 'antd-mobile';
// import BetterScroll from 'common/betterScroll/BetterScroll'
import { setTitle } from 'commons/utils'
import { store } from "store/index";
export default class Shouyinmxb extends Component {
    constructor() {
        super()
        this.state = {
            linshou: []
        }
    }
    componentDidMount() {
        setTitle('收银明细表')
        getRetailList({
            action: 'getRetailList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                limit: "50",
                page: "1"
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                linshou: res.data.data.data
            }, () => {
            })
        })
    }
    render() {
        console.log(this.state)
        return (
            <ShouyinmxbStyle>
                {
                    this.state.linshou.map((v, k) => {
                        if (v.id === this.props.match.params.id) {
                            return (
                                <div className='bj'>
                                    <div className='caigoudan'>
                                        <div className='dan'>
                                            <ul>
                                                <li>
                                                    <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/goods_order.png" alt=""/></div>
                                                    <p>{v.orderno}</p>
                                                </li>
                                                <li>
                                                    <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/goods_day.png" alt=""/></div>
                                                    <p>{v.createtime}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='dan'>
                                            <ul>
                                                <li>
                                                    <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/goods_store.png" alt=""/></div>
                                                    <p>{v.storeName}</p>
                                                </li>
                                                <li style={{width:"3.5rem"}}>
                                                    <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/goods_cashier.png" alt=""/></div>
                                                    <p style={{marginTop:".1rem"}}>{v.createName}</p>
                                                </li>
                                            </ul>
                                        </div>

                                    <div className='conten'>
                                        <ul style={{marginTop:"0rem"}}>
                                            <li>
                                                <p>
                                                    支付方式：{v.pay_type_name}
                                                </p>
                                            </li>
                                            <li>
                                                <div>
                                                    订单状态：{v.statusName}
                                                </div>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <p>
                                                    原价总额：{v.totalmoney}
                                                </p>
                                            </li>
                                            <li>
                                                <div>
                                                    总价优惠：{v.all_fee}
                                                </div>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <p>
                                                    小计优惠：{v.all_fee}
                                                </p>
                                            </li>
                                            <li>
                                                <div>
                                                    实收金额：{v.price}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                            
                                            {/* <div className='dan-footer'> */}
                                                {/* <p>单据日期：{v.createtime}</p>
                                                <p>所属商家：{v.storeName}</p>
                                                <p>收银员：{v.createName}</p> */}
                                                {/* <div>
                                                <p>支付方式：{v.pay_type_name}</p>
                                                <p>订单状态：{v.statusName}</p>
                                                </div> */}
                                                {/* <div>
                                                <p>支付方式：{v.pay_type_name}</p>
                                                <p>订单状态：{v.statusName}</p>
                                                </div>
                                                <div>
                                                <p>支付方式：{v.pay_type_name}</p>
                                                <p>订单状态：{v.statusName}</p>
                                                </div> */}
                                                {/* <p>原价总额：{v.price}</p>
                                                <p>优惠金额：{v.total_discount_fee}</p>
                                                <p>实收金额：{v.price}</p> */}
                                            {/* </div> */}
                                        
                                    </div>

                                    <div>
                                        <ul className='title'>
                                            <li className='yuanjia'>原价</li>
                                            <li className='shoujia'>售价</li>
                                            <li className='count'>数量</li>
                                            <li className='xiaojiyh'>小计优惠</li>
                                            <li className='xji'>小计</li>
                                        </ul>
                                    </div>
                                    {
                                        v.collects.map((v, k) => {
                                            return (
                                                <div>
                                                    <div className='name'>{v.goods_name}</div>
                                                    <ul className='title' style={{ color: "#1a1a1a", height: ".8rem" }}>
                                                        <li className='yuanjia'>{v.posprice}</li>
                                                        <li className='shoujia'>{v.modifyprice}</li>
                                                        <li className='count'>{v.num}</li>
                                                        <li className='xiaojiyh'>{v.small_fee}</li>
                                                        <li className='xji'>{v.subtotal}</li>
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        } else {
                            return ''
                        }
                    })
                }
            </ShouyinmxbStyle>
        )
    }
}
const ShouyinmxbStyle = styled.div`
.conten ul li div{
    // margin-left:2rem;
    width:3rem;
}
.conten ul li p{
    
    margin-left:.4rem;
    width:5.9rem;
}
.conten ul{
    padding-top:.1rem;
    margin-top:.3rem;
    display:flex;
    // justify-content:space-between;
}
.conten{
    color:#7d7d7d;
    font-size:.32rem;
    width:9.4rem;
    height:2.5rem;
    margin:0 .2rem;
    background-color: #f5f5f5;
}
.name{
    margin-top:.2rem;
    margin-left:.8rem;
    color:#1a1a1a;
    font-size:.35rem;
}
.xji{
    width:2rem;
    height:100%;
    // background-color: red;
}
.xiaojiyh{
    width:2.2rem;
    height:100%;
    // background-color: pink;
}
.count{
    width:1.6rem;
    height:100%;
    // background-color: yellow;
}
.shoujia{
    width:2rem;
    height:100%;
    // background-color: pink;
}
.yuanjia{
    margin-left:.8rem;
    width:1.6rem;
    height:100%;
    // background-color: red;
}
.title{
    color:#ed7913;
    font-size:.35rem;
    display:flex;
    height:.8rem;
    line-height:.8rem;
    border-bottom:2px solid #dadada;
}
.bj{
    width:100rem;
    height:100rem;
    background-color: #fff;
}
.dan-footer div{
    display:flex;
    width:100%;
}
.dan-footer{
    display:flex;
    background-color: #f8f8f8;
    padding-bottom:.4rem;
}
.dan-footer p{

    padding-top:.28rem;
    margin-left:.4rem;
    font-size:.38rem;
    color: #969696;
}
.zuantai{
    margin-top:.15rem;
    // margin-left:2.1rem;
    font-size:.38rem;
    color: #ed5f21;
}
.caigoudanhao{
    margin-top:.15rem;
    margin-left:.2rem;
    width:6.5rem;
    font-size:.38rem;
    color: #313131;
}
.dan ul li div img{
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
.dan ul li div{
    margin-top:.2rem;
    // margin-left:.3rem;
    width: .35rem;  
    height: .3rem;
}
.dan ul li p{
    margin-top:.15rem;
    font-size:.35rem;
    color:#313131;
}
.dan ul li{
    display:flex;
}
.dan ul{
    display:flex;
    justify-content:space-between;
    width:100%;
    height:.7rem;
    // background-color: red;
}
.dan{
    margin:0rem .3rem;
    width: 9.4rem;  
    // height: 8rem;
    // background-color: #fff;
    // border-radius:.2rem;
    // display:flex;
    // align-content:space-between;
    // // border:1px solid #dddddd;
}




`



