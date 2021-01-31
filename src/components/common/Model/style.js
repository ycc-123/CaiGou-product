import styled from 'styled-components'


export const TextStyle = styled.div`
.show-btn {
  margin: 0 0.64rem;
  background-color: #2E5BFF;
  color: white;
}
.modal-mask {
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

.modal-dialog {
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
.centen-m-t{
  padding-top: .3rem;
  font-size: 0.4rem;
  color: #888;
  text-align: center;
}
.modal-title {
  padding-top: .3rem;
  font-size: 0.5rem;
  color: #000;
  text-align: center;
}
.modal-content {
  padding: .3rem .4rem;
}
.modal-input {
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
input-holder {
  color: #666;
  font-size: 60px;
}
.modal-footer {
  display: flex;
  flex-direction: row;
  height: 1.1rem;
  border-top: 1px solid #eee;
  font-size: .48rem;
  line-height: 1.1rem;
}
.btn-cancel {
  width: 50%;
  color: #000;
  text-align: center;
  border-right: 1px solid #eee;
}

.btn-confirm {
  width: 50%;
  color: #108ee9;
  text-align: center;
}
`