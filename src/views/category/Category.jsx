import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import BetterScroll from 'common/betterScroll/BetterScroll'
import CategoryLeftItem from './childCom/CategoryLeftItem'
import CategoryRight from './childCom/CategoryRight'
import { setTitle } from 'commons/utils'
import { store } from 'store/index'
import { getProductCategoryAll, searchProduct } from 'network/Api'
import {  _categoryRight } from 'network/category'
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
      indexId:'',
      value: [],
      title: [],
      goods: [],
      defaultIndex: 0,
      type: 'goods',
      id: [],
      num: '',
      price: '',
      inputSearch:''
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
        categoryid: this.state.indexId,
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
        <Fragment>
          <div className='search'>
            <input type="search" className='input' placeholder="请输入商品名称/商品编号" name="inputSearch" 
                                    onChange={this.inputChange.bind(this)}
                                    value={this.state.inputSearch}/>
            <div className='img' onClick={() => { this.Search() }}>
              <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
            </div>
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
              <CategoryRight goodsList={this.state.goods} onRef={this.onRef} id={ida} aa={this.getChildValue.bind(this)} history={this.props.history} />
            </Fragment> : <Fragment>
              </Fragment>}
          </div>
          <div className='foot'>
            <div className='left' onClick={() => { this.mingxi() }}>
              <img src="https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/wu.png" alt="" />
            </div>

            <div className='yuan'>{this.state.num ? this.state.num : 0}</div>

            <div className='foot_conton' onClick={() => { this.mingxi() }}>总额：
                    <span>{this.state.price ? this.state.price : 0}</span></div>
            <div className='right' onClick={this.click}>提交</div>

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
    setTitle('新建采购单')
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
        Toast.info('网络错误', 2)
      }
    })
    console.log(this.state.id)
  }

  onChangeActive = index => {
    console.log(this.state.value[index])
    this.setState({
      indexId:this.state.id[index].id
    })
    searchProduct({
      action: 'searchProduct', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        categoryid: this.state.id[index].id,
      }
    }).then(res => {
      console.log(res.data.msg)
      if (res.data.status === 4001) {
        console.log(res.data.data.data)
        this.setState({
          goods: res.data.data.data
        })
      } else {
        this.setState({
          goods: []
        })
        Toast.info(res.data.msg, 2)
      }
    })
  }
}
const CategoryStyle = styled.div`
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
  margin: .15rem .2rem;
  width:9.5rem;
  height: .8rem;
  border-radius:.5rem;
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
}

.categoryLeft {
  position: relative;
  float: left;
  width: 2.46rem;
  height: calc(100vh - 2.7rem);
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
  height: calc(100vh - 2.7rem);
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
`

export default Category