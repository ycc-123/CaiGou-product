import React, { Component } from 'react'
import styled from 'styled-components'
import { getPurchaseApplyDetail ,submitPurchaseApply} from 'network/Api'
import {  Toast } from 'antd-mobile';
// import BetterScroll from 'common/betterScroll/BetterScroll'
import { store } from "store/index";
import { setTitle } from 'commons/utils'
export default class ApplyOrderx extends Component {
    constructor() {
        super()
        this.state = {
            quan: [],
            tiao: [],
            sum:'',
            remark:'',
            inputSearch:""
        }
    }
    componentDidMount() {
        setTitle('采购申请单明细')
        getPurchaseApplyDetail({
            action: 'getPurchaseApplyDetail', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                id: this.props.match.params.id
            }
        }).then((res) => {
            console.log(res)
            if (res.data.status === 4001) {
                let aa = {}
                let arr = []

                res.data.data.item.map((v, k) => {
                    console.log(v, k)
                    aa = v.goodsnum
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
                    quan: res.data.data,
                    remark:res.data.data.remark,
                    tiao: res.data.data.item ? res.data.data.item : [],
                    sum
                })
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
    }

    tijiao(e){
      
        if(e==="提交成功"){}else{


        submitPurchaseApply({
            action: 'submitPurchaseApply', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                id: this.props.match.params.id,
                // remark: this.state.remark,
                // itemData: itemData,
            }
        }).then((res) => {
            console.log(res)
            if(res.data.status===4001){
                window.location.reload();
                Toast.success(res.data.msg,1)
            }else{
                Toast.info(res.data.msg,1)
            }
        })
    }

    }
    seach() {
        getPurchaseApplyDetail({
            action: 'getPurchaseApplyDetail', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                id: this.props.match.params.id,
                search: this.state.inputSearch,
            }
        }).then((res) => {
            console.log(res)
            if (res.data.status === 4001) {
                this.setState({
                    tiao: res.data.data.item ? res.data.data.item : [],
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
                            <div>{this.state.quan.docno}</div>
                        </div>

                        <div className='conten-c'>
                            <p>单据日期：{this.state.quan.docdate}</p>
                            <p>申请数量：{this.state.sum}</p>
                            <p>单据状态：<span style={{ color: "#ed5f21" }}>{this.state.quan.statusname}</span></p>
                        </div>

                        <div className='footer'>
                            采购备注：{this.state.quan.remark}
                    </div>
                    </div>

                    {
                        this.state.tiao.map((v, k) => {
                            return (
                                <div className='tiao'>
                                    {/* <img className='t-img-l' src="" alt="" /> */}
            <img className='t-img-l' src={v.image?v.image:"https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="" />

                                    <ul className='wen-zi'>
                                        <li className='wen-zi-t'>
                                            <div className='name'>{v.goodsname}</div>
                                            <p></p>
                                        </li>
                                        <li className='wen-zi-f'>
                                            <div></div>
                                            <p>申请数量：<span>{v.goodsnum}</span></p>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                    {/* <div className='tiao'>

                        <img className='t-img-l' src="" alt="" />
                        <ul className='wen-zi'>
                            <li className='wen-zi-t'>
                                <div className='name'>北海盗白色恋人巧克力饼干</div>
                                <p></p>
                            </li>
                            <li className='wen-zi-f'>
                                <div></div>
                                <p>申请数量：<span>999</span></p>
                            </li>
                        </ul>

                    </div> */}

                    <div className='foot'>
                        <div className='left'>

                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/wu.png" alt="" />
                        </div>
                        <div className='yuan'>{this.state.tiao.length}</div>
                        <div className='foot_conton'></div>
                        <div className='right' style={{ background: this.state.quan.statusname === "提交成功" ? "#B4B4B4" : '' }}
                        onClick={(e)=>{this.tijiao(this.state.quan.statusname)}}
                        >提交</div>

                    </div>
                </div>
            </ApplyOrderxStyle>
        )
    }
}
const ApplyOrderxStyle = styled.div`
.yuan{
    // padding-top:.1rem;
    text-align:center;
    // margin:auto;
    position:absolute;
    top: .15rem;
    left:1.7rem;
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
    width: 10rem;
    height: 1.1rem;
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

.wen-zi-f p span{
    color:#cf2424;
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
    color:#646464;
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