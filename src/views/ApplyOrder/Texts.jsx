import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'

class NewPortal extends React.Component {
  constructor(props) {
    super(props)
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }
  render() {
    return ReactDOM.createPortal(
      <NewPortalStyle>
      <div id="demo">
      <div className="modalmask" style={{ zIndex: "9999", display: "block"}} ></div>
      <div className="modaldialog"  style={{ zIndex: "9999", display:  "block"}}>
        <div className="modaltitle">添加</div>
        <div className="centenmt">请填写采购数量与单价</div>
        <div className="modalcontent">
          <div className="modalinput">
            <div><span>采购数量：</span>
              <input style={{ width: "2.4rem", fontSize: ".35rem", border: "1px solid #ccc" }} className="input" name="inputsl"
                // onChange={this.inputChangesl.bind(this)}
                // value={this.state.inputsl} 
                /><span> {123}</span>
            </div>
            <div style={{ width: "100%", height: ".2rem" }}></div>
            <div><span>采购单价：</span>
              <input style={{ width: "2.4rem", fontSize: ".35rem", border: "1px solid #ccc" }} className="input" name="inputjg"
                // onChange={this.inputChangejg.bind(this)}
                // value={this.state.inputjg} 
                /><span> 元</span>
            </div>
            <div style={{ width: "100%", height: ".1rem" }}></div>
          </div>
        </div>
        <div className="modalfooter">
          <article className="btncancel"
          //  onClick={() => {
          //   this.setState({
          //   }, () => {
          //     this.setState({
          //       chuankous: "2222"
          //     })
          //   })}} 
            >取消</article>
          <div className="btnconfirm" 
          // onClick={() => {
          //   this.onConfirm(goods)
          // }} 
          >确定</div>
        </div>
      </div>
      </div></NewPortalStyle>,
      this.node,
      
    );
  }
}

const NewPortalStyle = styled.div`
.showbtn {
  margin: 0 0.64rem;
  background-color: #2E5BFF;
  color: white;
}
.modalmask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}

.modaldialog {
  width: 6.4rem;
  overflow: hidden;
  position: fixed;
  top: 40%;
  left: 0;
  z-index: 9999;
  background: #fff;
  margin: -4rem 2rem;
  border-radius: .2rem;
}
.centenmt{
  padding-top: .3rem;
  font-size: 0.4rem;
  color: #888;
  text-align: center;
}
.modaltitle {
  padding-top: .3rem;
  font-size: 0.5rem;
  color: #000;
  text-align: center;
}
.modalcontent {
  padding: .3rem .4rem;
}
.modalinput {
  border-radius: .1rem;
  font-size: .4rem;
}
input::-webkit-input-placeholder {
  color: #ccc;
  font-size:.35rem;
}
.input {
  font-family: sans-serif;
  border:1px solid #eee;
  width: 3rem;
  height: .8rem;
  font-size: .4rem;
  line-height: .8rem;
  box-sizing: border-box;
  color: #000;
}
inputholder {
  color: #666;
  font-size: 60px;
}
.modalfooter {
  display: flex;
  flex-direction: row;
  height: 1.1rem;
  border-top: 1px solid #eee;
  font-size: .48rem;
  line-height: 1.1rem;
}
.btncancel {
  width: 50%;
  color: #000;
  text-align: center;
  border-right: 1px solid #eee;
}

.btnconfirm {
  width: 50%;
  color: #108ee9;
  text-align: center;
}


`





export default NewPortal