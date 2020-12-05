import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseApplyDetail, submitDamage, getDamageDetail } from 'network/Api'
import { Toast } from 'antd-mobile';
// import BetterScroll from 'common/betterScroll/BetterScroll'
import { store } from "store/index";
import DocumentTitle from 'react-document-title'
export default class ApplyOrderx extends Component {
    constructor() {
        super()
        this.state = {
            quan: [],
            tiao: [],
            sum: '',
            remark: '',
            inputSearch: ""
        }
    }
    componentDidMount() {
        getDamageDetail({
            action: 'getDamageDetail', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                damageId: this.props.match.params.id,
                limit: "100",
                page: "1"
            }
        }).then((res) => {
            console.log(res)
            if (res.data.status === 4001) {
                let aa = {}
                let arr = []

                res.data.data.data.map((v, k) => {
                    console.log(v, k)
                    aa = v.num
                   return arr.push(aa);

                })
                console.log(arr)

                let sum = 0;
                // let dd = arr
                arr.forEach(item => {
                    console.log(item)
                    sum = sum +Number(item)
                })
                console.log(sum)


                this.setState({
                    quan: res.data.data.damage,
                    // sum: res.data.data.data.length,
                    tiao: res.data.data.data ? res.data.data.data : [],
                    sum
                })
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
    }

    tijiao(e) {

        if (e === "已审核") {

        } else {
            let aa = {}
            let arr = []

            this.state.tiao.map((v, k) => {
                console.log(v, k)
                aa = {
                    stockid: v.stockid,
                    num: v.num
                }
                return arr.push(aa);

            })
            console.log(arr)
            let itemData = arr

            submitDamage({
                action: 'submitDamage', data: {
                    uniacid: store.getState().uniacid,
                    uid: store.getState().uid,
                    warehouseid: this.state.quan.warehouseid,
                    damageId: this.props.match.params.id,
                    remark: this.state.quan.remark,
                    itemData: itemData,
                }
            }).then((res) => {
                console.log(res)
                if (res.data.status === 4001) {
                    window.location.reload();
                    Toast.success(res.data.msg, 1)
                } else {
                    Toast.info(res.data.msg, 1)
                }
            })
        }

    }
    seach() {
        getDamageDetail({
            action: 'getDamageDetail', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                damageId: this.props.match.params.id,
                search: this.state.inputSearch,
                limit: "100",
                page: "1"
            }
        }).then((res) => {
            console.log(res)
            if (res.data.status === 4001) {
                this.setState({
                    tiao: res.data.data.data ? res.data.data.data : [],
                })
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
    }
    inputChange(e) {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    render() {
        console.log(this.state.quan.item)
        return (
            <ApplyOrderxStyle>
                <DocumentTitle title={'采购申请单明细'} />

                <div>
                    <div className='search'>
                        <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="inputSearch"
                            onChange={this.inputChange.bind(this)}
                            value={this.state.inputSearch} />
                        <div className='img' onClick={() => { this.seach() }}>
                            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                        </div>
                    </div>

                    <div className='conten'>
                        <div className='conten-top'>
                            <p>
                                <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/dingdan.png" alt="" />
                            </p>
                            <div>{this.state.quan.ydocno}</div>
                        </div>

                        <div className='conten-c' style={{ paddingTop: ".25rem" }}>
                            <p>单据日期：{this.state.quan.createtime}</p>
                            <p>报损仓库：{this.state.quan.warehouseName}</p>
                            <p>报损数量：{this.state.sum}</p>
                            <p>单据状态：<span style={{ color:this.state.quan.statusName==="已审核"? "rgb(34, 163, 27)":"" }}>{this.state.quan.statusName}</span></p>
                        </div>

                        <div className='footer'>
                            备注：{this.state.quan.remark}
                        </div>
                    </div>

                    {
                        this.state.tiao.map((v, k) => {
                            return (

                                <div className='tiao'>
                                    <img className='t-img-l' src={v.image ? v.image : "https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />

                                    <ul className='wen-zi'>
                                        <li className='wen-zi-t'>
                                            <div className='name'>{v.goods_name}</div>
                                        </li>
                                        <li className='wen-zi-c' style={{margin:" .1rem 0 "}}>
                                            <div >商品编码：{v.barcode}</div>
                                            <p>{v.costprice}元/{v.unitname}</p>
                                        </li>
                                        
                                        <li className='wen-zi-f'>
                                            <div></div>
                                            <p style={{fontSize:".3rem"}}>报损数量：<span>{v.num}</span></p>
                                            {/* <Button
                            style={{ position: "absolute", left: "6.6rem", color: "transparent", background: "transparent", width: "9rem" }}
                            className="btn_modal"
                            onClick={() => prompt(
                                '填写', '请输入入库数量',
                                [
                                    {
                                        text: '取消',
                                        onPress: value => console.log(111)
                                    },
                                    {
                                        text: '确定',
                                        onPress: value => {
                                            this.shuliang(value, tiao)
                                        }

                                    },
                                ], 'default', null, [''])}
                        >111111</Button> */}
                                        </li>
                                    </ul>
                                </div>

                            )
                        })
                    }



                    <div className='foot'>
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            <div className='left'>
                                <div style={{ width: ".8rem", height: ".8rem" }}><img src="https://dev.lexiangpingou.cn/addons/lexiangpingou/data/share/baoshun.png" alt="" /></div>
                                <div className='yuan'>{this.state.tiao.length}</div>
                            </div>

                            <div className="foot_c">总额：<span style={{color:"#cf2424"}}>{this.state.quan.totalPrice}</span></div>

                            <div className='right' 
                            style={{ background: this.state.quan.statusName === "已审核" ? "#B4B4B4" : '' }}
                            onClick={(e) => { this.tijiao(this.state.quan.statusName) }}>
                                {this.state.quan.statusName === "已审核" ? "已审核" : '审核'}
                            </div>
                        </div>
                    </div>

                </div>
            </ApplyOrderxStyle>
        )
    }
}
const ApplyOrderxStyle = styled.div`
.am-button::before {
    border: none !important;
}
.yuan{
    // padding-top:.1rem;
    text-align:center;
    // margin:auto;
    position:absolute;
    top: .2rem;
    left:1.1rem;
    color:#fff;
    width:.51rem;
    height:.51rem;
    line-height:.51rem;
    border-radius:.5rem;
    background-color: #E01616;
    font-size:.24rem;
  }
  .foot_conton span{
    color:#cf2424;
  }
  .foot_conton{
    width: 12rem;
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
    padding-left:.48rem;
    padding-top:.45rem;
    width:3rem;
    
  }
  .foot_c{
    text-align: center;
    font-size:0.37rem;
    height:1.6rem;
    line-height:1.6rem;
    width:4rem;                      
  }
  .right{
    margin-top:.2rem;
    margin-right:.2rem;
    border-radius:.2rem;
    font-size:.4rem;
    color:#fff;
    text-align:center;
    width: 2.04rem;
    height: 1.17rem;
    line-height:1.17rem;
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
        // margin: .1rem 0;
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
        margin-bottom: .24rem;
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