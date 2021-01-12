import React, { Component } from 'react'
import styled from 'styled-components'
import { Toast } from 'antd-mobile';

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputSearch: ''
    }
  }
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  search() {
    console.log(1111)
    if (this.refs.input.value !== '') {
      // Toast.info(this.refs.input.value, 1)
      this.refs.input.blur()
      this.props.search(this.refs.input.value,this)
    } else {
      Toast.info('搜索内容不能为空')
    }
  }
  focus = () => {
    this.refs.input.focus()

  }
  render() {
    return (
      <SearchStyle>
        <div>
          <div className='search' >
            <form action="" target="frameFile" onSubmit={(e) => { this.search(e) }}>
              <input type="search" ref='input' className='input' placeholder="请输入商品名称/商品编号" name="inputSearch"
                onChange={this.inputChange.bind(this)}
                value={this.state.inputSearch} />
              <iframe name="frameFile" style={{ display: 'none' }} title=''></iframe>
              <div onClick={() => { this.focus() }} className="focus"  ></div>
              <div onClick={() => { this.search() }} className="enter"></div>
            </form>

            <div className='img' onClick={() => { this.search() }}>
              <img className='img-search' src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/search.png" alt="search" />
            </div>
          </div>
        </div>
      </SearchStyle>
    )
  }
}
const SearchStyle = styled.div`
.enter{
    width: .98rem;
    height: 1rem;
    position: absolute;
    top: 0rem;
    left: 6.75rem;
    // background: pink;
    background: transparent;
}
.focus{
    width: 6.7rem;
    height: 1rem;
    position: absolute;
    top: 0rem;
    left: 0rem;
    // background: red;
    background: transparent;
}

input::-webkit-input-placeholder {
    color: #c9c9c9;
    font-size:.35rem;
  }
  .img{
    width: .55rem;  
    height: .55rem; 
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
    margin-left:.17rem;
    height: .75rem;
    line-height: .75rem;
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
`

