import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Toast, List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import BetterScroll from 'common/betterScroll/BetterScroll'

const Into = (props) => {
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
    const scrollConfig = {
        probeType: 1
    }

    useEffect(() => {

        //   getProductList().then(res => {
        //     setproductList(res)
        //   })
        // this.refs.scroll.BScroll.refresh()

        return () => {
            // cleanup
        }
    }, [])


    return (
        // <BetterScroll config={scrollConfig} ref='scroll'>
        <>
            <AddGoodsStyle>
                <div className="type flex-column">
                    <div className="item flex-row" style={{
                        justifyContent: 'space-between'
                    }}>
                        <div className="left">
                            <span>商品名称: </span>
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
                            <input
                                value={goodCategory}
                                type="text"
                                placeholder='选择商品分类'
                                onChange={e => { setGoodCategory(e.target.value) }}
                            />
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
                <div className="type flex-column">
                    <div className="item flex-row" style={{
                        justifyContent: 'space-between'
                    }}>
                        <div className="left">
                            <span>库存单位: </span>
                        </div>
                        <div className="right">
                            <input
                                value={stockUnit}
                                type="text"
                                placeholder='选择库存单位'
                                onChange={e => { setStockUnit(e.target.value) }}
                            />
                        </div>
                    </div>
                </div>
                <div className="type flex-column">
                    <div className="item flex-row" style={{
                        justifyContent: 'space-between'
                    }}>
                        <div className="left">
                            <span>售出单位: </span>
                        </div>
                        <div className="right">
                            <input
                                value={sellUnit}
                                type="text"
                                placeholder='选择售出单位'
                                onChange={e => { setSellUnit(e.target.value) }}
                            />
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
                    
                    <div style={{display:isProduct?"block":"none"}}>
                    <List.Item 
                        extra={<Switch
                            checked={memberInterests}
                            onChange={() => { setMemberInterests(!memberInterests) }}
                        />}
                    >启用会员权益
                    <span style={{color: "#E6E6E6",fontSize: ".35rem"}}>是否启用会员权益</span>
                    </List.Item>
                    <div className='xian'></div>
                    <List.Item 
                        extra={<Switch
                            checked={memberPrice}
                            onChange={() => { setMemberPrice(!memberPrice) }}
                        />}
                    >启用会员价
                    <span style={{color: "#E6E6E6",fontSize: ".35rem"}}>是否启用会员价</span>
                    </List.Item>
                    <div className='xian'></div>
                    
                    <div className="type flex-column">
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
                        extra={<Switch style={{border:"none"}}
                            checked={matchGood}
                            onChange={() => { setMatchGood(!matchGood) }}
                        />}
                    >分体称商品
                    <span style={{color: "#E6E6E6",fontSize: ".35rem"}}>设置为分体称商品</span>
                    </List.Item>
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

            </AddGoodsStyle>
        </>
       
    )

    // function findLabel(val) {

    //   let aa = productList.find((item, key) => {
    //      return item.value === val
    //   })
    //   let bb = aa.label
    //   setproductType( bb )
    //   setisProduct(!isProduct)
    // }

    function check() {

        if (setGoodSort === "") {
            Toast.info('请填写店铺名称', 1)
        } else {

            // let params = {
            //   action: 'platform_apply',
            //   uniacid: store.getState().appConfig.uniacid,
            //   manage_cate_id: productType,
            //   professional_identity: profeesion,
            //   name_of_business: storeName,
            //   scope_of_business: businessScope
            // }

            // let res = await platformApply(params)
            // if (res.status === 200) {
            //   Toast.success(res.msg, 1)
            //   window.location.reload()

            // } else {
            //   Toast.fail(res.msg, 1)
            // }
        }
    }

}

const AddGoodsStyle = styled.div`
  height: 100%;
  background: #F5F5F5;
  color: #474747;
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
      color: #474747;
      
  }

  .type {

    background-color: white;
  }
  .type .item {
    justify-content: unset;
    width: 100%;
    box-sizing: border-box;
    padding: .39rem .33rem;
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
    margin-right: 1rem;
  }
  .type .item .right input {
    width: 5.82rem;
    border: none;
    font-size: .35rem;
    font-weight: 500;
  }
  .type .item .right input::-webkit-input-placeholder {
    color: #E6E6E6;
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