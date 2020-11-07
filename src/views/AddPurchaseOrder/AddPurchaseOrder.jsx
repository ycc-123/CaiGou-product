import React, { Component } from 'react'
import styled from 'styled-components'
import { getWarehouseList,getSupplierList,createPurchase} from 'network/Api'
import { Picker, List, Toast } from 'antd-mobile';
import { setTitle } from 'commons/utils'
import { store } from "store/index";



export default class AddPurchaseOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Value:'',
            sValue: '',
            data:[],
            supplier:[],
            IDck:[],
            IDgy:[],
            inputAmount:'',
            inputHetong:'',
            inputbeiz:''


        }
    }
    componentDidMount() {
        setTitle('新建采购单')
        getWarehouseList({ action: 'getWarehouseList', data: {
            uniacid: store.getState().uniacid,
            uid:store.getState().uid,
            type:"1",
            limit:"1000",
            page:"1"
          } }).then((res) => {
            console.log(res.data.data.data)
            if(res.data.status===4001){
                console.log(0)
                var result = res.data.data.data.map(o=>{return{value:o.id,label:o.name}});
                    console.log(result)
                this.setState({
                    data: result
                })
            }else{
                Toast.info('网络错误', 2)
            }
        })
        getSupplierList({ action: 'getSupplierList', data: {
            uniacid: store.getState().uniacid,
            uid:store.getState().uid,
            limit:"1000",
            page:"1"
          } }).then(res=>{
            console.log(res)
            if(res.data.status===4001){
                console.log(res.data.data.data)
                var supplier = res.data.data.data.map(o=>{return{value:o.id,label:o.name}});
                    console.log(supplier)
                    this.setState({
                        supplier
                    })
            }else{
                Toast.info('网络错误', 2)
            }
        }) 
    }
    createPurchase(){
        // console.log(this.state.inputbeiz)
        let idgy=this.state.IDgy.toString()
        let idkc=this.state.IDck.toString()
        // console.log(idkc)
        // this.props.history.push('/category')
        createPurchase({ action: 'createPurchase', data: {
            uniacid: store.getState().uniacid,
            uid:store.getState().uid,
            type:"1",
            supplierid:idgy,
            warehouseid:idkc,
            beforepay:this.state.inputAmount,
            contract:this.state.inputHetong,
            remark:this.state.inputbeiz,
          } }).then(res=>{
            console.log(res)
            if(res.data.status===4001){
                this.props.history.push(`/category/${res.data.data}`)
                console.log(res.data.data)
                Toast.success('新建采购单成功', 2)
            }else{
                Toast.info(res.data.msg, 2)
            }
        })
    }
    inputChange(e) {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    inputChangeht(e){
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    inputChangebz(e){
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <AddPurchaseOrderStyle>
                <div>
                    <ul className='biao'>
                        <li><span>*</span>采购仓库：
                            <Picker
                             data={this.state.data} 
                             cols={1}  
                             className="forss"
                             extra="请选择采购仓库"
                             value={this.state.sValue}
                             onChange={v => this.setState({ sValue: v })}
                             onOk={v => this.setState({ IDck: v })}
                             >
                                <List.Item className='times' arrow="horizontal"></List.Item>
                            </Picker>
                        </li>
                        <li><span>*</span>供应商：
                        <Picker
                             data={this.state.supplier} 
                             cols={1}  
                             className="forss"
                             extra="请选择供应商"
                             value={this.state.Value}
                             onChange={v => this.setState({Value: v})}
                             onOk={v => this.setState({ IDgy: v })}
                             >
                                <List.Item className='time' arrow="horizontal"></List.Item>
                            </Picker>
                        
                        </li>
                        <li>预付款：<input name="inputAmount" 
                                    onChange={this.inputChange.bind(this)}
                                    value={this.state.inputAmount} type="text"/></li>
                        <li>合同编号：<input name="inputHetong" 
                                    onChange={this.inputChangeht.bind(this)}
                                    value={this.state.inputHetong} type="text" /></li>
                        <li style={{ border: "none" }}>备注：<input name="inputbeiz" 
                                    onChange={this.inputChangebz.bind(this)}
                                    value={this.state.inputbeiz} type="text" /></li>
                    </ul>

                    <div className='foot'>
                        <div className='left'></div>
                        <div></div>
                        <div className='right' onClick={() => { this.createPurchase() }}>下一步</div>

                    </div>


                </div>
            </AddPurchaseOrderStyle>
        )
    }
}
const AddPurchaseOrderStyle = styled.div`
.wrapper .CommissionHeader{
    height:1.09rem;
}
.wrapper .CommissionHeader .navbar li{
    // height:1.09rem;
    padding-top:.15rem;
}
.wrapper .CommissionHeader .navbar .active{
    padding-bottom: .28rem;
}
.stor_name{
    font-size:0.32rem;
    height:1.17rem;
    line-height:1.17rem;
}
.am-list-item .am-list-line{
    width:6rem;
}
.am-list-item .am-list-line .am-list-extra{
    // padding-top:.5rem;
    color:#a9a9a9;
    text-align: left;
    font-size:.45rem;
    padding-left:.1rem;
    width:3rem;
}
.am-list-item .am-list-line .am-list-arrow{
    margin-left:2.5rem !important;
    // background-image: none;
    // opacity:0;
}
.onetimes{
    position:absolute;
    left:1.8rem;
    top:-.2rem;
    // padding-top:.3rem;
    color: red;
    width:12rem;
    background-color: transparent;
}
.time{
    position:absolute;
    left:2.2rem;
    top:1.5rem;
    // padding-top:.3rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.times{
    position:absolute;
    left:2.2rem;
    top:.1rem;
    // padding-top:.3rem;
    color: #a9a9a9;
    width:12rem;
    background-color: transparent;
}
.am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
    // 
}



.left{
    width: 25rem;
    height: 1.6rem;
    background-color: #fff;
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


.biao{
    width: 100%;
    height: 7rem;
    background-color: #fff;
}
.biao li input{
    border:none;
    outline:none;
    font-size:.5rem;
    width:7rem;
    height:.9rem;
    color:#646464; 
}
.biao li span{
    color:#e41515; 
}
.biao li{
    padding-left:.3rem;
    color:#646464;
    padding-top:.3rem;
    // text-align:center;
    font-size:.45rem;
    color:#646464; 
    width: 100%;
    height: 1.4rem;
    border-bottom: 1px solid #dbdbdb;

}



`