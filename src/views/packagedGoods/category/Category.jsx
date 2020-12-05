import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import BetterScroll from 'common/betterScroll/BetterScroll'
import CategoryLeftItem from './childCom/CategoryLeftItem'
import CategoryRight from './childCom/CategoryRight'
import DocumentTitle from 'react-document-title'
import { store } from 'store/index'
import { getProductCategoryAll, searchProduct } from 'network/Api'
// import {  _categoryRight } from 'network/category'
import { Toast } from 'antd-mobile';

const scollConfig = {
  probeType: 1
}
const scrollStyle = {
  width: '2.46rem',
  height: 'calc(100vh - 1.48rem)',
  top: '0'
}

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jj:true,
      indexId:'',
      value: [],
      title: [],
      goods: [],
      defaultIndex: 0,
      type: 'goods',
      id: [],
      num: '',
      price: '',
      inputSearch:'',
      Bj:true,
      Id:""
    }
  }
  mingxi() {
    console.log(111)
    this.props.history.push('/Liebiao')
  }
  getChildValue(aa, val) {
    console.log(aa);
    this.setState({
      num: aa,
      price: val
    })
  }
  inputChange(e){
    console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
  }
  Search(){
    console.log(this.state.inputSearch)
    searchProduct({
      action: 'searchProduct', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        // categoryid: this.state.indexId,
        limit:"1000",
        page:1,
        search:this.state.inputSearch
      }
    }).then(res => {
      if(res.data.status===4001){
        this.setState({
            goods: res.data.data.data
        })
      }else{
        Toast.info(res.data.msg,2)
      }
      
    })
  }
  render() {
    const { title, type } = this.state
    console.log(this.props.match.params.id)
    let ida = this.props.match.params.id
    return (
      <CategoryStyle>
    <DocumentTitle title={'打包商品'} />
        <Fragment>
          <div style={{display:"flex"}}>
          <div className='search'>
            <input type="search" className='input' placeholder="请输入商品名称/商品编号" name="inputSearch" 
                                    onChange={this.inputChange.bind(this)}
                                    value={this.state.inputSearch}/>
            <div className='img' onClick={() => { this.Search() }}>
              <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
            </div>
          </div>
          <div
          onClick={()=>{this.state.jj===false?console.log(): this.props.history.push('/editPackagedGoods')}}
           className='add'>新增<span style={{fontSize:".4rem"}}>+</span></div>
          </div>
          <div className='category-main'>
            {type === 'goods' ? <Fragment><div className='categoryLeft'>
              <ul>
                {title.length !== 0 && <BetterScroll config={scollConfig} style={scrollStyle} ref='scroll'>
                  <li className='category-left-head'></li>
                  {title.map((item, index) => {
                    return (
                      <CategoryLeftItem key={item.id + index}
                        item={item}
                        index={index}
                        active={this.state.defaultIndex === index ? true : false}
                        onChangeActive={() => { this.onChangeActive(index) }} />
                    )
                  })}
                </BetterScroll>}
              </ul>
            </div>
             { <CategoryRight index={this.state.Id} goodsList={this.state.goods} onRef={this.onRef} 
             id={ida} aa={this.getChildValue.bind(this)} history={this.props.history} />}
             <div className='Bj' style={{display:this.state.Bj===false?"block":"none"}}>
                    <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/kong.png" alt=""/>
                </div></Fragment> : <Fragment></Fragment>}
          </div>
        </Fragment>
      </CategoryStyle>
    )
  }
  onRef = (ref) => {
    this.child = ref
  }
  click = (e) => {
    this.child.myName()
  }
  componentDidMount = () => {

    // this.refs.scroll.BScroll.refresh()
    // const { appConfig } = store.getState()
    getProductCategoryAll({
      action: 'getProductCategoryAll', data: {
        uniacid: store.getState().uniacid,
      }
    }).then(res => {
      console.log(res.data.data)
      if (res.data.status === 4001) {
        var result = res.data.data.map(o => { return { name: o.name } });
        console.log(result)
        var Id = res.data.data.map(o => { return { id: o.id } });
        console.log(Id)
        var value = res.data.data.map(o => { return { code: o.code } });
        console.log(value)
        searchProduct({
          action: 'searchProduct', data: {
            uniacid: store.getState().uniacid,
            uid: store.getState().uid,
            limit:"1000",
            page:1,
            categoryid: Id[0].id,
            
          }
        }).then(res => {
          console.log(res.data.msg)
          if (res.data.status === 4001) {
            console.log(res.data.data.data)

            this.setState({
              goods: res.data.msg === "成功" ? res.data.data.data : [{}]
            })
          } else {
            Toast.info(res.data.msg, 2)
          }
        })
        this.setState({
          title: result,
          id: Id,
          value
        })
      } else {
      this.setState({
        jj:false
      })
        Toast.info(res.data.msg, 2)
        // Toast.info("无商品",2)
      }
    })
    console.log(this.state.id)
  }

  onChangeActive = index => {
    console.log(this.state.value[index])
    this.setState({
      indexId:this.state.id[index].id,
      index
    })
    searchProduct({
      action: 'searchProduct', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        limit:"1000",
        page:1,
        categoryid: this.state.id[index].id,
      }
    }).then(res => {
      console.log(res.data.msg)
      if (res.data.status === 4001) {
        console.log(res.data.data.data)
        this.setState({
          goods: res.data.data.data,
          Bj: true
        })
      } else {
        this.setState({
          goods: [],
          Bj: false  
        })
        Toast.info(res.data.msg, 2)
        
      }
    })




   
      this.setState({
        defaultIndex: index
      })

  }
}
const CategoryStyle = styled.div`
.Bj img{
  width: 5rem;
  height: 5rem;
}
.Bj{
  position:absolute;
  top:4.5rem;
  left:3.6rem;
  vertical-align: middle;
  text-align: center;
}


.add{
  width: 1.6rem;
  height: 0.75rem;
  line-height: 0.75rem;
  text-align:center;
  color:#fff;
  background: #ED7A14;
  border-radius: .1rem;
  margin-top:.21rem;
  margin-left:.32rem;
  font-size:.37rem;
}

input::-webkit-input-placeholder {
  color: #c9c9c9;
  font-size:.35rem;
}
.img{
  width: .55rem;  
  height: .55rem; 
  // line-height: .5rem; 
  margin-left:.45rem;
}
.img-search{
  margin-top:.12rem;
  width: auto;  
  height: auto;  
  max-width: 100%;  
  max-height: 100%;
}
  
.input{
  width:6rem;
  font-size:.37rem;
  border:none;
  // width:8.3rem;
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
  width:7.44rem;
  height: .75rem;
  border-radius:.15rem;
  background-color: #fff;

}









.yuan{
  // padding-top:.1rem;
  text-align:center;
  // margin:auto;
  position:absolute;
  top: .2rem;
  left:1.5rem;
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





.category-head-button {
  position: absolute;
  z-index: 9999;
  top: .13rem;
  left: 1.23rem;
  transform: translate(-50%, 0);
}

.category-head-button img {
  width: 1.6rem;
  height: auto;
}

.category-left, .category-right {
  width: .8rem;
  height: .53rem;
  border: none;
  background: skyblue;
}

.category-right {
  left: 20%;
}

.category-active {
  background: #ff833a;
  color: #fff;
}

/* 按钮结束 */

.category-main {
  width: 100%;
  margin-top:.21rem;
}

.categoryLeft {
  position: relative;
  float: left;
  width: 2.46rem;
  height: calc(100vh - 1.2rem);
  overflow: hidden;
  background: #F7F7F7;;
}

.wutu {
  position: relative;
  display: inline-block;
  left: .16rem;
  width: 7.26rem;
  height: calc(100vh - 1.28rem);
  overflow: hidden;
}

.categoryRight {
  position: relative;
  display: inline-block;
  // left: .16rem;
  width: 7.5rem;
  height: calc(100vh - 1.2rem);
  overflow: hidden;
}

.category-title {
  text-align:center;
  // display: flex;
  // align-items: center;
  // justify-content: flex-start;
  font-weight: 500;
  // padding-left: .1rem;
  flex-wrap: wrap;
  line-height: 1.17rem;
  width: 100%;
  height: 1.17rem;
  font-size: .32rem;
  background: #f5f5f5;
  overflow: hidden;
}

.category-title-active {
  // border-left: .13rem solid #ff833a;
  background-color: #ff833a;
  color: #fff;
}

.category-left-head {
  width: 100%;
  // height: .8rem;
  background: #f5f5f5;
}

/* 左侧结束 */

/* 右侧开始 */

/* 轮播开始 */

.category-tab-box {
  position: absolute;
  overflow: hidden;
  bottom: 1.28rem;
  width: 100%;
}

.category-tab {
  position: relative;
  overflow: hidden;
  height: 1.33rem;
  z-index: 9999;
  transition: all 1s;
}

.category-tab-bar {
  position: absolute;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 2rem;
  height: 1.33rem;
  word-wrap: break-word;
  word-break: normal;
  text-align: center;
  font-size: .3rem;
  color: #fff;
}

.bar-active {
  font-size: .35rem;
  color: #ff833a;
}

.tab-un {
  position: absolute;
  bottom: 0;
  width: 2rem;
  height: .05rem;
  background-color: #ff833a;
  transition: all 1s;
}

.category-swiper {
  position: relative;
  width: 100%;
  height: calc(100vh - 2.61rem);
}

.category-swiper .swiper-container {
  top: 50%;
  transform: translate(0, -50%);
}

.category-swiper .swiper-wrapper {
  width: 100%;
  padding-bottom: .1rem;
}

.category-swiper .swiper-slide {
  position: relative;
  background: #fff;
  width: 77.33% !important;
  height: 58%;
  transform: scale(0.9);
  transition: all 1s;
  opacity: .5;
  border-radius: .4rem;
  overflow: hidden;
}

.category-swiper .swiper-slide:first-child {
  opacity: 1;
  transform: scale(.95);
}

.swiper-goods-info {
  position: relative;
  width: 6.9339rem;
  height: calc(10.45rem - .8rem - 6.93rem - .4rem);
  margin: 0 .4rem .4rem .4rem;
}

.swiper-slide .swiper-goods-img {
  width: 6.9339rem;
  height: 6.9339rem;
  margin: .4rem .4rem 0 .4rem;
}

/* .category-swiper .swiper-slide-active {
  opacity: 1;
  transform: scale(.95);
} */

.category-swiper .swiper-slide p:nth-of-type(1) {
  margin: .2rem 0;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .4rem;
}

.category-swiper .swiper-slide p:nth-of-type(2) {
  display: flex;
  text-decoration: line-through;
  margin-bottom: .15rem;
  font-size: .3rem;
  align-items: center;
  color: #c1c1c1;
}

.category-swiper .swiper-slide p:nth-of-type(3) {
  position: relative;
  display: flex;
  align-items: center;
  font-size: .4rem;
  color: #f5702a;
  height: .55rem;
}

.category-swiper .swiper-slide p:nth-of-type(3) span {
  font-size: .3rem;
  margin-top: .09rem;
}

.category-swiper .swiper-slide p:nth-of-type(3) .category-button-left {
  left: 2rem;
}

.category-swiper .swiper-slide p:nth-of-type(3) .category-button-right {
  left: 2.825rem;
}

.category-swiper .swiper-slide p:nth-of-type(4) {
  width: 100%;
  position: absolute;
  color: #ccc;
  bottom: 0;
  font-size: .2rem;
}

.category-swiper .swiper-slide p:nth-of-type(4) span {
  margin-right: .4rem;
}

.swiper-goods-info .category-goods-img {
  position: absolute;
  bottom: 0;
  right: 0;
  margin-left: 1rem;
  margin-top: 1rem;
  width: .56rem;
  height: .56rem;
}

.category-swiper .swiper-scrollbar {
  background: #fff;
  width: 2rem;
  left: 50%;
  transform: translate(-50%, 0);
}

.category-swiper .swiper-scrollbar-drag {
  background: #ff762e;
}

.calculate_1 {
  position: absolute;
  box-sizing: content-box;
  right: 0;
  bottom: 0;
  padding: .7rem .16rem .17rem .4rem;
  height: .53rem;
  line-height: .53rem;
  text-align: center;
  font-size: .32rem;
  color: #f5702a;
}

.decrement_1, .increment_1 {
  position: relative;
  width: .53rem;
  height: .53rem;
  border-radius: 50%;
}

.decrement_1 {
  float: left;
  margin-right: .3rem;
  color: #201d1d;
  background: #dadada;
}

.decrement_1::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: .3rem;
  height: .05rem;
  background: #201d1d;
}

.increment_1::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: .3rem;
  height: .05rem;
  background: #fff;
}

.increment_1::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: .05rem;
  height: .3rem;
  background: #fff;
}

.increment_1 {
  float: right;
  margin-left: .3rem;
  ;
  color: #fff;
  background: #ff762e;
}

.＋▂＋ {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.87rem;
  height: auto;
}

.category-button {
  display: flex;
  align-items: center;
  position: relative;
  background: #ff762e;
  bottom: .335rem;
  left: 5.5rem;
  border: none;
  width: 1.85rem;
  height: .8rem !important;
  padding-left: .41rem;
  font-size: .35rem;
  color: white;
  border-top-left-radius: .4rem;
  border-bottom-left-radius: .4rem;
}

.category-button::after {
  content: '';
    position: absolute;
    display: inline-block;
    right: 9%;
    width: .12rem;
    height: .12rem;
    border-top: .03rem solid #fff;
    border-right: .03rem solid #fff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
`

export default Category