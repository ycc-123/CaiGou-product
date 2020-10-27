import React, { Component } from 'react'
import styled from 'styled-components'
import { getRetailList } from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import { setTitle } from 'commons/utils'
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
                uniacid: "53",
                uid: "2271",
                // starttime:"2020-10-1 13:41:08",
                // endtime:"2020-10-24 13:41:08",
                // createid:'59',
                // store_id:"38",
                limit: "50",
                page: "1"
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                linshou: res.data.data.data
            }, () => {
                // this.refs.scroll.BScroll.refresh()
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
                                            <div className='dan-top'>
                                                <p>
                                                    <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                                                </p>
                                                <div className='caigoudanhao'>{v.orderno}</div>
                                                {/* <div className='zuantai'></div> */}
                                            </div>
                                            <div className='dan-footer'>
                                                <p>单据日期：{v.createtime}</p>
                                                <p>所属商家：{v.storeName}</p>
                                                <p>收银员：{v.createName}</p>
                                                <p>支付方式：{v.pay_type_name}</p>
                                                <p>订单状态：{v.statusName}</p>
                                                <p>原价总额：{v.price}</p>
                                                <p>优惠金额：{v.total_discount_fee}</p>
                                                <p>实收金额：{v.price}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <ul className='title'>
                                            <li className='yuanjia'>原价</li>
                                            <li className='shoujia'>售价</li>
                                            <li className='count'>数量</li>
                                            <li className='xiaoji'>小计</li>
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
                                                        <li className='xiaoji'>{v.subtotal}</li>
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    }



                                </div>
                            )
                        } else {
                            // console.log(222)
                        }
                    })
                }
                {/* <div className='bj'>
                    <div className='caigoudan'>
                        <div className='dan'>
                            <div className='dan-top'>
                                <p>
                                    <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                                </p>
                                <div className='caigoudanhao'>111111111</div> */}
                {/* <div className='zuantai'></div> */}
                {/* </div>
                            <div className='dan-footer'>
                                <p>单据日期：11111</p>
                                <p>所属商家：111111111111</p>
                                <p>收银员：111111111111</p>
                                <p>支付方式：111111111111</p>
                                <p>订单状态：11111</p>
                                <p>原价总额：111111111111</p>
                                <p>优惠金额：111111111111</p>
                                <p>实收金额：111111111111</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ul className='title'>
                            <li className='yuanjia'>原价</li>
                            <li className='shoujia'>售价</li>
                            <li className='count'>数量</li>
                            <li className='xiaoji'>小计</li>
                        </ul>
                    </div>

                    <div>
                        <div className='name'>撒大家科技打卡记录的就爱看</div>
                        <ul className='title' style={{ color: "#1a1a1a", height: ".8rem" }}>
                            <li className='yuanjia'>999.99</li>
                            <li className='shoujia'>888.88</li>
                            <li className='count'>999</li>
                            <li className='xiaoji'>9999</li>
                        </ul>
                    </div>


                </div> */}
            </ShouyinmxbStyle>
        )
    }
}
const ShouyinmxbStyle = styled.div`
.name{
    margin-top:.2rem;
    margin-left:.8rem;
    color:#1a1a1a;
    font-size:.35rem;
}
.xiaoji{
    width:2rem;
    height:100%;
    // background-color: pink;
}
.count{
    width:2rem;
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
    width:2rem;
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
.dan-footer{
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
    color: #333333;
}
.dan-top p img{
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
.dan-top p{
    margin-top:.24rem;
    // margin-left:.3rem;
    width: .4rem;  
    height: .4rem;
}
.dan-top{
    display:flex;
    width: 100%;  
    height: .9rem;
    // border-bottom:1px solid #dddddd;
}
.dan{
    margin:0rem .3rem;
    width: 9.1rem;  
    height: 8rem;
    background-color: #fff;
    border-radius:.2rem;
    // border:1px solid #dddddd;
}




`



