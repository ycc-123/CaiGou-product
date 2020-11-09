import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseDetail, changePurchaseStatus, submitPurchase } from 'network/Api'
import { Toast, Modal, Button} from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import { setTitle } from 'commons/utils'
import { store } from "store/index";

const alert = Modal.alert;
function Tiao(value) {
    console.log(value)
    let tiao = value.item
    return (
        <div className='tiao'>
            {/* <img className='t-img-l' src={tiao.image} alt="" /> */}
            <img className='t-img-l' src={tiao.image?tiao.image:"https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />

            <ul className='wen-zi'>
                <li className='wen-zi-t'>
                    <div className='name'>{tiao.goods_name}</div>
                    <p>{tiao.gnum}公斤</p>
                </li>
                <li className='wen-zi-f'>
                    <div>￥：{tiao.price}元/{tiao.unitname}</div>
                    <p>{tiao.subtotal}</p>
                </li>
            </ul>
        </div>
    )
}
export default class PurchaseOrderDetailed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            purchaseDetail: {},
            id: this.props.match.params.id,
            data: [],
            purchaseItem: [],
            goodsSearch: ''
        }
    }
    componentDidUpdate = () => {

    }
    componentDidMount() {
        setTitle('采购单明细')
        getPurchaseDetail({
            action: 'getPurchaseDetail', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                purchaseId: this.props.match.params.id,
                type: "1",
                limit: "30",
                page: "1"
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data.status === 4001) {
                console.log(res.data.data.purchaseItem)
                let count = res.data.data.count
                // 商品总价

                // var subtotal = res.data.data.purchaseItem.map(o=>{return{subtotal:o.subtotal,gnum:o.gnum,num:o.gnum,price:o.price,goodsid:o.goodsid}});
                // console.log(subtotal)


                this.setState({
                    purchaseDetail: res.data.data.purchaseDetail,
                    purchaseItem: res.data.data.purchaseItem,
                    count,
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                Toast.info('网络错误', 2)
            }
        })
    }
    shengHe() {
        // let itemData = [{
        //     amount:3,
        //     barcodeid:1988,
        //     barcode:"火龙果，芒果，瓜类0002",
        //     gnum:3,
        //     num:3,
        //     price:1
        // }]
        let purchaseData = { subtotal: 8, snum: 8 }
        if (this.state.purchaseDetail.statusname === "待提交") {
            submitPurchase({
                action: 'submitPurchase', data: {
                    uniacid: store.getState().uniacid,
                    uid: store.getState().uid,
                    purchaseId: this.props.match.params.id,
                    type: "1",
                    status: "2",
                    itemData: [],
                    purchaseData: purchaseData

                }
            }).then((res) => {
                console.log(res.data)
                if (res.data.status === 4001) {
                    window.location.reload();
                    Toast.success(res.data.msg, 2)
                } else {
                    Toast.info(res.data.msg, 2)
                }

            })

        } else {
            console.log(this.props.match.params.id.split())
            let id = this.props.match.params.id.split()
            changePurchaseStatus({
                action: 'changePurchaseStatus', data: {
                    uniacid: store.getState().uniacid,
                    uid: store.getState().uid,
                    purchaseId_list: id,
                    type: "1",
                    status: "4"
                }
            }).then((res) => {
                console.log(res.data)
                if (res.data.status === 4001) {
                    window.location.reload();
                    Toast.success(res.data.msg, 2)
                } else {
                    Toast.info(res.data.msg, 2)
                }
            })
        }
    }

    search() {
        console.log(this.state.goodsSearch)
        getPurchaseDetail({
            action: 'getPurchaseDetail', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                purchaseId: this.props.match.params.id,
                search: this.state.goodsSearch,
                type: "1",
                limit: "30",
                page: "1"
            }
        }).then((res) => {
            if (res.data.status === 4001) {
                console.log(res.data.data.purchaseItem)
                let count = res.data.data.count
                this.setState({
                    purchaseDetail: res.data.data.purchaseDetail,
                    purchaseItem: res.data.data.purchaseItem,
                    count,
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            } else {
                Toast.info('网络错误', 2)
            }
        })
    }
    goodsChange(e) {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const scrollConfig = {
            probeType: 1
        }
        let Color = ''
        if (this.state.purchaseDetail.statusname === "审核成功") {
            Color = "#22a31b"
        } else if (this.state.purchaseDetail.statusname === "待提交") {
            Color = "#d92929"
        } else if (this.state.purchaseDetail.statusname === "待审核") {
            Color = "#ed5f21"
        }
        return (
            <PurchaseOrderDetailedStyle>
                <div>
                    <div className='search'>
                        <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="goodsSearch"
                            onChange={this.goodsChange.bind(this)}
                            value={this.state.goodsSearch} />
                        <div className='img' onClick={() => { this.search() }}>
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
                            <p>单据状态：<span style={{ color: Color }}>{this.state.purchaseDetail.statusname}</span></p>
                        </div>

                        <div className='footer'>
                            采购备注：{this.state.purchaseDetail.remark}
                        </div>
                    </div>
                    <BetterScroll config={scrollConfig} ref='scroll' style={{ top: "5.8rem", bottom: "1.6rem" }}>
                        {
                            this.state.purchaseItem.map((value, key) => {
                                console.log(value)
                                return (
                                    <Tiao item={value} key={key}></Tiao>
                                )
                            })
                        }
                    </BetterScroll>
                    <div className='foot'>
                        <div className='left'>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/wu.png" alt="" />
                        </div>
                        <div className='yuan'>{this.state.purchaseItem.length}</div>
                        {/* <div className='foot_conton'>总额：<span>0</span></div> */}
                        <div style={{ background: this.state.purchaseDetail.statusname === "审核成功" ? "#B4B4B4" : '' }}
                            className='right'
                            onClick={() => { this.shengHe() }}
                        >{this.state.purchaseDetail.statusname === "待提交" ? "提交" : "审核"}</div>

                        <Button
                        style={{display:this.state.purchaseDetail.statusname === "待提交" ? "none" : "block", width:"3rem",height:"2rem", position: "absolute", top: "0rem", left: "6.9rem", color: "transparent", background: "transparent" }}
                        className="btn_modal"
                            onClick={() =>
                                alert('审核', '是否确认审核采购单', [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确定', onPress: () => this.shengHe() },
                                ])
                            }
                        >
                            confirm
                        </Button>

                        {/* <Button
                            style={{ position: "absolute", top: ".3rem", left: "4.6rem", color: "transparent", background: "transparent" }}
                            className="btn_modal"
                            onClick={() => prompt(
                                '添加',
                                '请填写采购数量与单价',
                                (login, password) => this.zjian(login, password, goods),
                                'login-password',
                                null,
                                ['请填写采购数量', '请填写采购单价'],
                            )}
                            visible={false}
                        >111111</Button> */}
                    </div>
                </div>
            </PurchaseOrderDetailedStyle>
        )
    }
}
const PurchaseOrderDetailedStyle = styled.div`
.am-button::before{
    border:none !important;
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
  .left{
    padding-left:.3rem;
    margin:auto;
    width: 22rem;
    height: 1rem;
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


