import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Picker, Toast, List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import BetterScroll from 'common/betterScroll/BetterScroll'
import { useRef } from 'react';
import DocumentTitle from 'react-document-title'
import { createProduct, getUnitList, getProductCategoryAll } from 'network/Api'
import { store } from "store/index";
// import { Picker, List, Toast } from 'antd-mobile';


const Into = (props) => {


    const bt_ref = useRef()

    const [goodName, setgoodName] = useState('');
    const [goodCategory, setGoodCategory] = useState('');
    const [goodCode, setGoodCode] = useState('');
    const [stockUnit, setStockUnit] = useState('');
    const [sellUnit, setSellUnit] = useState('');
    const [retailPrice, setRetailPrice] = useState('');
    const [setPrice, setSetPrice] = useState('');
    const [memberInterests, setMemberInterests] = useState(false)
    const [isProduct, setisProduct] = useState(false)
    const [memberPrice, setMemberPrice] = useState(false)
    // const [retailPrice, setRetailPrice] = useState(false)
    const [matchGood, setMatchGood] = useState(false);
    const [matchCode, setMatchCode] = useState('')
    const [goodSort, setGoodSort] = useState('');
    const [unit, setUnit] = useState([]);
    const [classification, setClassification] = useState([]);

    const scrollConfig = {
        probeType: 1
    }

    useEffect(() => {
        getProductCategoryAll({
            action: 'getProductCategoryAll', data: {
                uniacid: store.getState().uniacid,
                // uid:store.getState().uid,

            }
        }).then((res) => {
            console.log(res)
            var result = res.data.data.map(o => { return { value: o.id, label: o.name } });
            console.log(result)
            setClassification(result)
        })


        getUnitList({
            action: 'getUnitList', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,

            }
        }).then((res) => {
            var result = res.data.data.map(o => { return { value: o.id, label: o.name } });
            console.log(result)
            setUnit(result)
        })

        try {
            bt_ref.current.BScroll.refresh()
        } catch (error) {

        }

        return () => {
            // cleanup
        }
    }, [])


    return (
        <>
            <AddGoodsStyle>
                <BetterScroll config={scrollConfig} style={{ height: 'calc(100vh - 1.6rem)' }} ref={bt_ref}>


                    <DocumentTitle title={'新增商品'} />

                    <div className="type flex-column">
                        <div className="item flex-row" style={{
                            justifyContent: 'space-between'
                        }}>
                            <div className="left">
                                <span>商品名称:</span>
                            </div>
                            <div className="right">
                                <input
                                    value={goodName}
                                    type="text"
                                    placeholder='请输入商品名称'
                                    onChange={e => { setgoodName(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="type flex-column">
                        <div className="item flex-row" style={{
                            justifyContent: 'space-between'
                        }}>
                            <div className="left">
                                <span>商品分类: </span>
                            </div>
                            <div className="right">
                                <Picker
                                    data={classification}
                                    cols={1}
                                    className="forss"
                                    extra="选择商品分类"
                                    value={goodCategory}
                                    onChange={e => { setGoodCategory(e) }}
                                    onOk={v => setGoodCategory(v)}
                                >
                                    <List.Item className='time' arrow="horizontal"></List.Item>
                                </Picker>
                            </div>
                        </div>
                    </div>
                    <div className="type flex-column">
                        <div className="item flex-row" style={{
                            justifyContent: 'space-between'
                        }}>
                            <div className="left">
                                <span>商品编码: </span>
                            </div>
                            <div className="right">
                                <input
                                    value={goodCode}
                                    type="text"
                                    placeholder='条码唯一,提交后不支持修改'
                                    onChange={e => { setGoodCode(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="type flex-column">
                        <div className="item flex-row" style={{
                            justifyContent: 'space-between'
                        }}>
                            <div className="left">
                                <span>库存单位: </span>
                            </div>
                            <div className="right">
                            <Picker
                             data={unit} 
                             cols={1}  
                             className="forss"
                             extra="选择库存单位"
                             value={stockUnit}
                             onChange={e => { setStockUnit(e)}}
                             onOk={v => setStockUnit(v)}
                             >
                                <List.Item className='kcdwtimes'  arrow="horizontal"></List.Item>
                            </Picker> */}
                    {/* <input
                                    value={stockUnit}
                                    type="text"
                                    placeholder='选择库存单位'
                                    onChange={e => { setStockUnit(e.target.value) }}
                                /> */}
                    {/* </div>
                        </div>
                    </div> */}
                    <div className="type flex-column">
                        <div className="item flex-row" style={{
                            justifyContent: 'space-between'
                        }}>
                            <div className="left">
                                <span>售出单位: </span>
                            </div>
                            <div className="right">
                                <Picker
                                    data={unit}
                                    cols={1}
                                    className="forss"
                                    extra="选择售出单位"
                                    value={sellUnit}
                                    onChange={e => { setSellUnit(e) }}
                                    onOk={v => setSellUnit(v)}
                                >
                                    <List.Item className='scdwtimes' arrow="horizontal"></List.Item>
                                </Picker>
                                {/* <input
                                    value={sellUnit}
                                    type="text"
                                    placeholder='选择售出单位'
                                    onChange={e => { setSellUnit(e.target.value) }}
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="type flex-column">
                        <div className="item flex-row" style={{
                            justifyContent: 'space-between'
                        }}>
                            <div className="left">
                                <p style={{ fontSize: ".35rem" }}>商品排序: </p>

                            </div>
                            <div className="right">
                                <input
                                    value={goodSort}
                                    type="text"
                                    placeholder='数字越大越靠前'
                                    onChange={e => { setGoodSort(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="type flex-column">
                        <div className="item flex-row" style={{
                            justifyContent: 'space-between'
                        }}>
                            <div className="left">
                                <span>零售价: </span>
                            </div>
                            <div className="right">
                                <input
                                    value={retailPrice}
                                    type="text"
                                    placeholder='收银端零售价'
                                    onChange={e => { setRetailPrice(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>


                    <List
                        renderHeader={() => ''}
                    >
                        <List.Item
                            extra={<Switch
                                checked={isProduct}
                                onChange={() => { setisProduct(!isProduct) }}
                            />}
                        >更多信息</List.Item>
                        <div className='xian'></div>

                        <div style={{ display: isProduct ? "block" : "none" }}>
                            <List.Item
                                extra={<Switch
                                    checked={memberInterests}
                                    onChange={() => { setMemberInterests(!memberInterests) }}
                                />}
                            >启用会员权益
                    <span style={{ color: "#b4b4b4", fontSize: ".35rem", marginLeft: "1rem" }}>是否启用会员权益</span>
                            </List.Item>
                            <div className='xian'></div>
                            <div style={{ display: memberInterests ? "none" : "block" }}>
                            <List.Item 
                                extra={<Switch 
                                    checked={memberPrice}
                                    onChange={() => { setMemberPrice(!memberPrice) }}
                                />}
                            >启用会员价
                    <span style={{ color: "#b4b4b4", fontSize: ".35rem", marginLeft: "1.3rem" }}>是否启用会员价</span>
                            </List.Item>
                            <div className='xian'></div></div>

                            <div className="type flex-column" style={{ display: memberPrice ? "block" : "none" }}>
                                <div className="item flex-row" style={{
                                    justifyContent: 'space-between'
                                }}>
                                    <div className="left">
                                        <p style={{ fontSize: ".35rem" }}>会员价</p>
                                    </div>
                                    <div className="right">
                                        <input
                                            value={setPrice}
                                            type="text"
                                            placeholder='设置会员价'
                                            onChange={e => { setSetPrice(e.target.value) }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <List.Item
                                extra={<Switch style={{ border: "none" }}
                                    checked={matchGood}
                                    onChange={() => { setMatchGood(!matchGood) }}
                                />}
                            >分体称商品
                            <span style={{ color: "#b4b4b4", fontSize: ".35rem", marginLeft: "1.3rem" }}>设置为分体称商品</span>
                            </List.Item>
                            <div className='xian'></div>


                            <div className="type flex-column">
                                <div className="item flex-row" style={{
                                    justifyContent: 'space-between'
                                }}>
                                    <div className="left">
                                        <p style={{ fontSize: ".35rem" }}>分体称PLU编号</p>
                                    </div>
                                    <div className="right">
                                        <input
                                            value={matchCode}
                                            type="text"
                                            placeholder='设置分体称PLU编号'

                                            onChange={e => { setMatchCode(e.target.value) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </List>

                </BetterScroll>
                <div className='foot'>
                    <div className='lbb'></div>
                    <div className='raa' onClick={e => { check() }}>提交</div>
                </div>
            </AddGoodsStyle>
        </>

    )



    function check() {
        console.log(memberPrice)

        createProduct({
            action: 'createProduct', data: {
                uniacid: store.getState().uniacid,
                uid: store.getState().uid,
                categoryid: goodCategory.toString(),
                code: goodCode,
                posprice: retailPrice,
                memberprice: setPrice,
                name: goodName,
                unit: sellUnit.toString(),
                is_membership: memberInterests === true ? "2" : "1",
                is_memberprice: memberPrice === true ? "2" : "1",
                is_plu_goods: matchGood === true ? "2" : "1",
                plu_goods_keyboard_id: matchCode,
                sequence: goodSort,
            }
        }).then((res) => {
            console.log(res)
            if(res.data.status===4001){
                // console.log(0)
                // var result = res.data.data.data.map(o=>{return{value:o.id,label:o.name}});
                //     console.log(result)
                // this.setState({
                //     data: result
                // })
                Toast.success(res.data.msg, 2)
            }else{
                Toast.info(res.data.msg, 2)
            }
        })
        // if (productType === "") {
        //   Toast.info('请选择营业类目', 1)
        // } else if (profeesion === "") {
        //   Toast.info('请选择职业', 1)
        // } else if (storeName === "") {
        //   Toast.info('请填写店铺名称', 1)
        // } else {



    }


}

const AddGoodsStyle = styled.div`
  height: 100%;
  background: #F5F5F5;
  color: #787878;



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
.am-list-item .am-list-line .am-list-arrow{
    display:none;
}
.am-list-item .am-list-line .am-list-extra{
    flex-basis:auto;
    // padding-top:.5rem;
    color:#b4b4b4;
    text-align: left;
    font-size:.35rem;
    padding-left:.1rem;
    text-align: right;
    width:3rem;
}
.am-list-item .am-list-line .am-list-arrow{
    margin-left:2.5rem !important;
    // background-image: none;
    // opacity:0;
}
.kcdwtimes{
    position:absolute;
    left:1.8rem;
    top:2.9rem;
    // padding-top:.3rem;
    color: red;
    width:12rem;
    background-color: transparent;
}
.scdwtimes{
    position:absolute;
    left:2.2rem;
    top:3.6rem;
    // padding-top:.3rem;
    color: red;
    width:12rem;
    background-color: transparent;
}
.time{
    position:absolute;
    left:2.2rem;
    top:1.2rem;
    text-align: left !important;
    // padding-top:.3rem;
    color: #b4b4b4;
    font-size:.35rem;
    width:12rem;
    background-color: transparent;
}

.am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
    // 
}







  .lbb{
    // float:left;
    width: 2rem;
    height: 1.6rem;
    background-color: #fff;
}
.raa{
    // float:right;
    font-size:.4rem;
    color:#fff;
    text-align:center;
    width: 2.76rem;
    // margin-right:0rem;
    height: 1.6rem;
    line-height:1.6rem;
    background-color: #ED7913;
}
.foot{
    display:flex;
    justify-content: space-between;
    width: 100%;
    height: 1.6rem;
    background-color: #fff;
    position:absolute;
    bottom:0;
}








  .xian{
      width:100%;
      height:1px;
      background: #ddd;

  }






 .am-list-line::after {
    background-color: transparent !important;
}
  .am-list-item .am-list-line .am-list-content{
      font-size:.35rem;
      color: #787878;

      
  }

  .type {

    background-color: white;
  }
  .type .item {
    font-size:.35rem;
    justify-content: unset;
    width: 100%;
    height:1.2rem;
    box-sizing: border-box;
    padding: .47rem .43rem;
    border-bottom: solid #E6E6E6 1px;
  }
  .type .item .left {
    // width: 2.58rem;
  }
  .type .item .left span {
    font-size: .35rem;
  }
  .type .item .left span::before {
    content: '*';
    color: #DE0000;
  }
  .type .item .right {
    // margin-right: .9rem;
    margin-right: .3rem;

  }
  .type .item .right input {
    width: 5.82rem;
    border: none;
    font-size: .35rem;
    font-weight: 500;
  }
  .type .item .right input::-webkit-input-placeholder {
    color: #B4B4B4;
    font-size: .35rem;
  }
  .flex-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .flex-column{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

`

export default Into;