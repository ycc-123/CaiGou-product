import React, { Component } from 'react'
import styled from 'styled-components'

export default class Texts extends Component {
    constructor(){
        super()
        this.state={
            flag:false
        }
    }
    componentDidMount(){
        
    }
    addcart(){
        // 点击加人购物车
        this.setState({
            flag:!this.state.flag
        })
        let el = document.getElementById('akk');
        // el.offsetWidth;
        el.style.transform="translate(5rem,5rem)";
        el.style.transition="all 1s ease";

    }
    render() {
        return (
            <BallStyle>
            <div>
                <transition >
                <button className="btn" onClick={()=>{this.addcart()}}>
                    加入购物
                </button></transition>
                <div id="akk" className="ball" style={{display:this.state.flag?"block":"none"}}></div>
            </div>
            </BallStyle>
        )
    }
}
const BallStyle = styled.div`
.btn{
    width:2rem;
    height:2rem;
    background-color: #ED7913;
    text-align:center;

}
.ball{
    width:1rem;
    height:1rem;
    border-radius:50%;
    background-color: #ED7913;
    position:absolute;
    top:2rem;
    left:2rem;
    // transform:translate(2erm,2rem);
}





`





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