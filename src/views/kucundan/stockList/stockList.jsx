import React, { Component } from 'react'
import styled from 'styled-components'
import { getStockList ,getWarehouseList ,getProductCategoryAll,showProductCategory} from 'network/Api'
import { Toast } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import StockListTiao from './stockListTiao'
// import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import { setTitle } from 'commons/utils'
export default class stockList extends Component {
    constructor(){
        super()
        this.state={
            goods:[],
            totalgnum:'',
            totalcostprice:'',
            xian:false,
            result:[],
            fenleiName:[],
            cankuID:'',
            yijifenleiID:'',
            childrens:[],
            erjifenlei:'',
            erji:false,
            yikey:'',
            ckkey:'',
            inputSearch:''
        }
    }
    componentDidMount(){
        setTitle('库存单')
        getStockList({
            action: 'getStockList', data: {
                uniacid: "53",
                uid: "2271",
            }
        }).then((res) => {
            console.log(res)
            if(res.data.status===4001){
                var result = res.data.data.data.map(o=>{return{id:o.warehouseid,name:o.name}});
                    console.log(result)
                this.setState({
                    goods: res.data.data.data,
                    totalcostprice: res.data.data.totalcostprice,
                    totalgnum: res.data.data.totalgnum
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                Toast.fail(res.data.msg,2)
            }
        })

        getWarehouseList({
            action: 'getWarehouseList', data: {
                uniacid: "53",
                uid: "2271",
                type:"1",
                limit:"8",
                page:"1"
            }
        }).then((res) => {
            console.log(res)
            if(res.data.status===4001){
                var result = res.data.data.data.map(o=>{return{id:o.id,name:o.name}});
                    console.log(result)
                this.setState({
                    result
                })
            }else{
                Toast.fail(res.data.msg,2)
            }
        })
        // 分类
        getProductCategoryAll({
            action: 'getProductCategoryAll', data: {
                uniacid: "53",
               
            }
        }).then((res) => {
            console.log(res)
            if(res.data.status===4001){
                var result = res.data.data.map(o=>{return{id:o.id,name:o.name}});
                    console.log(result)
                this.setState({
                   fenleiName:result

                })
            }else{
                Toast.fail(res.data.msg,2)
            }
        })
        
    }
    // 获取二级分类
    yijifenlei(v,k){
        
        console.log(v,k)
        showProductCategory({
            action: 'showProductCategory', data: {
                uniacid: "53",
                id:v.id
            }
        }).then((res) => {
            console.log(res)
            if(res.data.status===4001){
                var result = res.data.data.childrens.map(o=>{return{id:o.id,name:o.name}});
                    console.log(result)
                this.setState({
                    childrens:result,
                    erji:true,
                    yikey:v.id
                })
            }else{
                Toast.fail(res.data.msg,2)
            }
            
        })
    }
    xianyin(){
        // console.log(111)
        if(this.state.xian===false){
            this.setState({
                xian:true
            })
        }else{
            this.setState({
                xian:false
            })
        }
    }
    canku(v,k){
        console.log(v.id)
        this.setState({
            cankuID:v.id,
            ckkey:v.id
        })
    }
    erjifenlei(v){
        this.setState({
            erjifenlei:v.id,
            ekey:v.id
        })
    }
    queding(){
        this.setState({
            xian:false
        })
        console.log(this.state.childrens)
        getStockList({
            action: 'getStockList', data: {
                uniacid: "53",
                uid: "2271",
                warehouseid:this.state.cankuID,
                categoryid:this.state.childrens===[]?this.state.yijifenleiID:this.state.erjifenlei
            }
        }).then((res) => {
            if(res.data.status===4001){
                // var result = res.data.data.data.map(o=>{return{id:o.warehouseid,name:o.name}});
                //     console.log(result)
                this.setState({
                    goods: res.data.data.data!==null?res.data.data.data:[],
                    totalcostprice: res.data.data.totalcostprice,
                    totalgnum: res.data.data.totalgnum
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                Toast.fail(res.data.msg,2)
            }
        })
    }
    search(){
        console.log(this.state.inputSearch)
        getStockList({
            action: 'getStockList', data: {
                uniacid: "53",
                uid: "2271",
                search:this.state.inputSearch,
                
            }
        }).then((res) => {
            console.log(res)
            if(res.data.status===4001){
                var result = res.data.data.data.map(o=>{return{id:o.warehouseid,name:o.name}});
                    console.log(result)
                this.setState({
                    goods: res.data.data.data,
                    totalcostprice: res.data.data.totalcostprice,
                    totalgnum: res.data.data.totalgnum
                }, () => {
                    this.refs.scroll.BScroll.refresh()
                })
            }else{
                Toast.fail(res.data.msg,2)
            }
        })
    }
    inputChange(e){
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        console.log(this.state.childrens)
        const scrollConfig = {
            probeType: 1
        }
        const scrollstyle={
            // position:"absolute",
            top:"2rem"
        }
        console.log(this.state.goods)
        return (
            <StockListStyle>
                
                
                    <div style={{ display: "flex" }}>
                        <div className='search'  >
                            <input type="search" className='input' placeholder="请输入商品名称或商品编码" name="inputSearch" 
                                    onChange={this.inputChange.bind(this)}
                                    value={this.state.inputSearch}/>
                            <div className='img' onClick={()=>{this.search()}}>
                                <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
                            </div>
                        </div>
                        <div className='sximg' >
                            <img className='sximg-search' onClick={()=>{ this.xianyin() }} src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/aqwe.png" alt="aaa" />
                        </div>
                    </div>
                    <BetterScroll config={scrollConfig} ref='scroll' style={{ top:"1rem",bottom:"1.5rem"}}>
                    {
                        this.state.goods.map((v,k)=>{

                            return(
                                <StockListTiao v={v} k={k}/>
                            )
                        })
                    }
                </BetterScroll>
                {/* <BetterScroll config={scrollConfig} ref='scrolls' style={{ top:"1rem",bottom:"1.5rem"}}> */}
                    <div className='fenglei' style={{display: this.state.xian===false?"none":"block"}}>
                        <div>仓库名称
                            <ul>
                                {
                                    this.state.result.map((v,k)=>{
                                        return(
                                            <li onClick={(e)=>{this.canku(v,k)}}
                                            style={{background:this.state.ckkey===v.id?"#fff5ed":'',color:this.state.ckkey===v.id?"#ed7913":'',border:this.state.ckkey===v.id?"1px solid #ed7913":''}}
                                            >{v.name}</li>
                                        )
                                    })
                                }
                                {/* <li>1</li> */}
                                
                            </ul>
                        </div>

                        <div>一级分类
                            <ul>
                                {
                                    this.state.fenleiName.map((v,k)=>{
                                        return(
                                            <li onClick={(e)=>{this.yijifenlei(v,k)}} 
                                            style={{background:this.state.yikey===v.id?"#fff5ed":'',color:this.state.yikey===v.id?"#ed7913":'',border:this.state.yikey===v.id?"1px solid #ed7913":''}}
                                            >{v.name}</li>
                                        )
                                    })
                                }
                                
                            </ul>
                        </div>

                        <div style={{display:this.state.erji===false?"none":"block"}}>二级分类
                            <ul>
                                {
                                    this.state.childrens.map((v,k)=>{
                                        return(
                                            <li onClick={(e)=>{this.erjifenlei(v,k)}}
                                            style={{background:this.state.ekey===v.id?"#fff5ed":'',color:this.state.ekey===v.id?"#ed7913":'',border:this.state.ekey===v.id?"1px solid #ed7913":''}}
                                            >{v.name}</li>
                                        )
                                    })
                                }
                                {/* <li>2</li> */}
                            </ul>
                        </div>
                                
                        <div className='btn' onClick={()=>{this.queding()}}>确定</div>
                    </div>
                    {/* </BetterScroll> */}
                    
                <div className='foot' >
                    <div>总库存：<span>{this.state.totalgnum}</span></div>
                    <div style={{marginLeft:".8rem"}}>总库存金额：<span>{this.state.totalcostprice}</span></div>
                </div>
            </StockListStyle>
        )
    }
}
const StockListStyle = styled.div`
.fenglei div ul li{
    width:2.8rem;
    height:.8rem;
    line-height:.8rem;
    text-align:center;
    background-color: #f6f6f6;
    margin:.2rem .2rem;
    border-radius:.1rem;
    border:1px solid #dcdcdc;
}
.fenglei div ul{
    display:flex;
    flex-wrap:wrap;
}
.fenglei div{
    font-size:.4rem;
}
.fenglei{
    padding:.2rem .2rem;
    position:relative;
    width:10rem;
    background-color: #f0f0f0;
    // height:4rem;
}
.btn{
    // position:absolute;
    // bottom:.2rem;
    color:#fff;
    width:100%;
    background-color: #ed7912;
    height:1rem;
    line-height:1rem;
    text-align:center;
    border-radius:.1rem;
}
.foot div span{
    color:#cf2424;
}
.foot{
    padding-left:.9rem;
    font-size:.38rem;
    display:flex;
    width:100%;
    height:1.5rem;
    line-height:1.5rem;
    position:absolute;
    bottom:0rem;
    background-color: #fff;
}
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


.sximg{
    margin-left:.2rem;
    margin-top:.2rem;
    width: .8rem;  
    height: .6rem; 
}
.sximg-search{
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;
}
input::-webkit-input-placeholder {
    color: #c9c9c9;
    fontsize:.4rem;
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
    margin: .1rem .2rem;
    width:8.5rem;
    height: .8rem;
    border-radius:.5rem;
    background-color: #fff;

}





`