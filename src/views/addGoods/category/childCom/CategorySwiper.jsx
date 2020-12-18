import React, { Component } from 'react'
import styled from 'styled-components'
import { Toast } from 'antd-mobile';
import { store } from 'store/index'

export default class Liebiao extends Component {
    constructor() {
        super()
        this.state = {
            goodsList: []
        }
    }
    componentDidMount() {
        if (store.getState().goodsList === []) {
            Toast.info("无采购商品", 1.5)
            this.setState({
                goodsList: []
            })
        } else {
            this.setState({
                goodsList: store.getState().goodsList
            })
        }
    }
    render() {
        return (
            <LiebiaoStyle>
                <div>
                    <div className='search' >
                        <input type="search" className='input' placeholder="请输入采购单号/仓库名称" />
                        <div className='img'>
                            <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                        </div>
                    </div>
                </div>
                {
                    this.state.goodsList.map((v, k) => {
                        return (
                            <div className='tiao' key={k}>
                                <img className='t-img-l' src={v.img ? v.img : "https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/tupian.png"} alt="网络卡" />
                                <ul className='wen-zi'>
                                    <li className='wen-zi-t'>
                                        <div className='name'>{v.name}</div>
                                        <p>{v.num}{v.danwei}</p>
                                    </li>
                                    <li className='wen-zi-f'>
                                        <div>￥：{v.price}元/{v.danwei}</div>
                                        <p>{v.amount}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        )
                    })
                }
            </LiebiaoStyle>
        )
    }
}

const LiebiaoStyle = styled.div`
.wen-zi-t p{
    color:#646464;
    font-size:.35rem;
}
.wen-zi-f div{
    font-size:.35rem;
    color:#646464;
}
.wen-zi-f p span{
    color:#646464;
}
.wen-zi-f p{
    font-size:.38rem;
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
    margin: .3rem .2rem;
    width:9.5rem;
    height: .8rem;
    border-radius:.5rem;
    background-color: #fff;

}


`

