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
            Toast.info(this.refs.input.value, 1)
            this.refs.input.blur()
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
                            <img className='img-search' src="https://dev.lexiangpingou.cn/addons/lexiangpingou/data/share/search.png" alt="search" />
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




// export default class Texts extends Component {
//     constructor(){
//         super()
//         this.state={
//             flag:false
//         }
//     }
//     componentDidMount(){

//     }
//     addcart(){
//         // 点击加人购物车
//         this.setState({
//             flag:!this.state.flag
//         })
//         let el = document.getElementById('akk');
//         // el.offsetWidth;
//         el.style.transform="translate(5rem,5rem)";
//         el.style.transition="all 1s ease";

//     }
//     render() {
//         return (
//             <BallStyle>
//             <div>
//                 <transition >
//                 <button className="btn" onClick={()=>{this.addcart()}}>
//                     加入购物
//                 </button></transition>
//                 <div id="akk" className="ball" style={{display:this.state.flag?"block":"none"}}></div>
//             </div>
//             </BallStyle>
//         )
//     }
// }













// 长按事件
// import React, { Component } from 'react'

// export default class App extends Component {
//     constructor() {
//       super()
//       this.handleButtonPress = this.handleButtonPress.bind(this)
//       this.handleButtonRelease = this.handleButtonRelease.bind(this)
//     }
//     handleButtonPress () {
//       this.buttonPressTimer = setTimeout(() => alert('long press activated'), 1000);
//     }

//     handleButtonRelease () {
//       clearTimeout(this.buttonPressTimer);
//     }

//     render() {
//       return (
//         <div  style={{width:"10rem",height:"10rem",background:"red"}}
//         // onClick={()=>{this.handleButtonPress()}}
//             onTouchStart={this.handleButtonPress} 
//             // onTouchEnd={this.handleButtonRelease} 
//             // onMouseDown={this.handleButtonPress} 
//             // onMouseUp={this.handleButtonRelease} 
//             // onMouseLeave={this.handleButtonRelease}
//             >

//         </div>
//       );
//     }
//   }