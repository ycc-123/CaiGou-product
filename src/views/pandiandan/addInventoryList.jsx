
import React, { Component } from 'react'
import styled from 'styled-components'
import { getWarehouseList, getProductCategoryAll, createInventory } from 'network/Api'
import { Picker, List, Toast } from 'antd-mobile';
import { setTitle } from 'commons/utils'
import { store } from "store/index";

export default class AddInventoryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Value: '',
            sValue: '',
            data: [],
            supplier: [],
            IDck: [],
            IDgy: [],
            inputbeiz: '',
            leixing:[{label:"全盘",value:"1"},{label:"抽盘",value:"2"},{label:"随机盘点",value:"3"}],
            lxValue:'',
            lxID:''


        }
    }
    componentDidMount() {
        setTitle('新建采购单')
        getWarehouseList({
            action: 'getWarehouseList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                type: "1",
                limit: "1000",
                page: "1"
            }
        }).then((res) => {
            console.log(res.data.data.data)
            if (res.data.status === 4001) {
                console.log(0)
                var result = res.data.data.data.map(o => { return { value: o.id, label: o.name } });
                console.log(result)
                this.setState({
                    data: result
                })
            } else {
                Toast.info('网络错误', 2)
            }
        })
        getProductCategoryAll({
            action: 'getProductCategoryAll', data: {
                uniacid: store.getState().uniacid,
                // uid: store.getState().uid,
                // limit: "1000",
                // page: "1"
            }
        }).then(res => {
            console.log(res)
            if (res.data.status === 4001) {
                console.log(res.data.data)
                var supplier = res.data.data.map(o => { return { value: o.id, label: o.name } });
                console.log(supplier)
                this.setState({
                    supplier
                })
            } else {
                Toast.info('网络错误', 2)
            }
        })
    }
    createPurchase() {
        // console.log(this.state.IDgy)
        let idgy = this.state.IDgy.toString()
        let flname={}
        this.state.supplier.map((v,k)=>{
            // console.log(v)
            if(v.value===idgy){
                flname=v
            }
        })
        console.log(flname.label)
        console.log(this.state.lxID)
       
        // let idgy = this.state.IDgy.toString()
        let idkc = this.state.IDck.toString()
        this.props.history.push('/pandiancategory')
        var parame=encodeURI(flname.label);
        createInventory({
            action: 'createInventory', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                type: this.state.lxID,
                warehouseid: idkc,
                categoryid: idgy,
                remark: this.state.inputbeiz,
            }
        }).then(res => {
            console.log(res)
            if (res.data.status === 4001) {
                this.props.history.push(`/pandianCategory/${res.data.data}/${idkc}/${idgy}/${parame}`)
                console.log(res.data.data)
                Toast.success('新建盘点单成功', 2)
            } else {
                Toast.info(res.data.msg, 2)
            }
        })
    }

    inputChangebz(e) {
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
                        <li><span>*</span>盘点仓库：
                                <Picker
                                data={this.state.data}
                                cols={1}
                                className="forss"
                                extra="请选择对应盘点仓库"
                                value={this.state.sValue}
                                onChange={v => this.setState({ sValue: v })}
                                onOk={v => this.setState({ IDck: v })}
                            >
                                <List.Item className='times' arrow="horizontal"></List.Item>
                            </Picker>
                        </li>
                        <li><span>*</span>盘点类型：
                                <Picker
                                data={this.state.leixing}
                                cols={1}
                                className="forss"
                                extra="全盘"
                                value={this.state.lxValue}
                                onChange={v => this.setState({ lxValue: v })}
                                onOk={v => this.setState({ lxID: v.toString() })}
                            >
                                <List.Item className='pdlx' arrow="horizontal"></List.Item>
                            </Picker>
                        </li>
                        <li style={{display:this.state.lxID==="2"?"block":"none"}}><span>*</span>商品分类：
                            <Picker
                                data={this.state.supplier}
                                cols={1}
                                className="forss"
                                extra="请选择分类"
                                value={this.state.Value}
                                onChange={v => this.setState({ Value: v })}
                                onOk={v => this.setState({ IDgy: v })}
                            >
                                <List.Item className='time' arrow="horizontal"></List.Item>
                            </Picker>

                        </li>

                        <li style={{ border: "none" }}>
                            <div>备注：</div>
                            <input name="inputbeiz"
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
        top:2.65rem;
        // padding-top:.3rem;
        color: #a9a9a9;
        width:12rem;
        background-color: transparent;
    }
    .pdlx{
        position:absolute;
        left:2.2rem;
        top:1.4rem;
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
        
    }
    .biao li input{
        border:none;
        outline:none;
        font-size:.45rem;
        width:7rem;
        height:.65rem;
        color:#646464; 
    }
    .biao li span{
        color:#e41515; 
    }
    .biao li div{
        // background-color: pink;
    }
    .biao li{
        display:flex;
        background-color: #fff;
        padding-left:.3rem;
        color:#646464;
        padding-top:.3rem;
        // text-align:center;
        font-size:.45rem;
        color:#646464; 
        width: 100%;
        height: 1.3rem;
        line-height: .7rem;
        border-bottom: 1px solid #dbdbdb;
    
    }
    
    
    
    `