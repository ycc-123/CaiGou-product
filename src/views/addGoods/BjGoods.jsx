import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Picker, Toast, List, Switch } from 'antd-mobile';
import BetterScroll from 'common/betterScroll/BetterScroll'
import { useRef } from 'react';
import DocumentTitle from 'react-document-title'
import { getUnitList, getProductCategoryAll, getProductDetail, editProduct ,deleteProduct} from 'network/Api'
import { store } from "store/index";
import { useHistory, useParams } from 'react-router-dom';
import {  Modal } from 'antd-mobile';
const alert = Modal.alert;

const Into = (props) => {
  const history = useHistory()
  const params = useParams().id
  const bt_ref = useRef()
  const [goodName, setgoodName] = useState('');
  const [goodCategory, setGoodCategory] = useState('');
  const [goodCode, setGoodCode] = useState('');
  const [stockUnit, setStockUnit] = useState('');
  const [sellUnit, setSellUnit] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [setPrice, setSetPrice] = useState('');
  const [memberInterests, setMemberInterests] = useState()
  const [isProduct, setisProduct] = useState()
  const [memberPrice, setMemberPrice] = useState()
  const [matchGood, setMatchGood] = useState();
  const [zuoFei, setzuoFei] = useState();

  const [matchCode, setMatchCode] = useState('')
  const [goodSort, setGoodSort] = useState('');
  const [unit, setUnit] = useState([]);
  const [classification, setClassification] = useState([]);
  const [morengoods, setMorengoods] = useState({});
  const [erji, seterji] = useState([]);

  const scrollConfig = {
    probeType: 1
  }

  useEffect(() => {
    getProductDetail({
      action: 'getProductDetail', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        id: params
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        setMorengoods(res.data.data);
        setMemberInterests(res.data.data.is_membership === "2" ? true : false);
        setMemberPrice(res.data.data.is_memberprice === "1" ? false : true);
        setMatchGood(res.data.data.is_plu_goods === "1" ? false : true);
      } else {
        Toast.fail(res.data.msg, 2)
      }
    })
    getProductCategoryAll({
      action: 'getProductCategoryAll', data: {
        uniacid: store.getState().uniacid,
      }
    }).then((res) => {
      var result = res.data.data.map(o => {
        return { value: o.id, label: o.name }
      });
      setClassification(res.data.data)
    })
    getUnitList({
      action: 'getUnitList', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
      }
    }).then((res) => {
      var result = res.data.data.map(o => { return { value: o.id, label: o.name } });
      setUnit(result)
    })
    // try {
    //   bt_ref.current.BScroll.refresh()
    // } catch (error) {
    // }
    return () => {
    }
  }, [])
  return (
    <>
      <BetterScroll config={scrollConfig} style={{ height: 'calc(100vh - 1.6rem)' }} ref={bt_ref}>
        <TAddGoodsStyle>
          <DocumentTitle title={'编辑商品'} />

          <div className="type flex-column" style={{ background: "#F8F8F8" }}>
            <div className="item flex-row" style={{
              justifyContent: 'space-between'
            }}>
              <div className="left">
                <span>商品编码: </span>
              </div>
              <div className="right">
                <input style={{ background: "#F8F8F8" }}
                  readonly="readonly"
                  value={goodCode}
                  type="text"
                  placeholder={morengoods.code}
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
                <span>商品分类: </span>
              </div>
              <div className="right">
                <Picker
                  data={classification}
                  cols={4}
                  // className="forss"
                  extra={morengoods.category_name}
                  value={goodCategory}
                  onChange={e => { setGoodCategory(e) }}
                  onOk={v => setGoodCategory(v)}
                >
                  <List.Item className='time' arrow="horizontal"></List.Item>
                </Picker>
              </div>
            </div>
          </div>

          <div className="type flex-column" >
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
                  placeholder={morengoods.name}
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
                <span>售出单位: </span>
              </div>
              <div className="right">
                <Picker
                  data={unit}
                  cols={1}
                  className="forss"
                  extra={morengoods.unit_name}
                  value={sellUnit}
                  onChange={e => { setSellUnit(e) }}
                  onOk={v => setSellUnit(v)}
                >
                  <List.Item className='scdwtimes' arrow="horizontal"></List.Item>
                </Picker>
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
                <Picker
                  data={unit}
                  cols={1}
                  className="forss"
                  extra={morengoods.changeunit_name}
                  value={stockUnit}
                  onChange={e => { setStockUnit(e) }}
                  onOk={v => setStockUnit(v)}
                >
                  <List.Item className='kuncun' arrow="horizontal"></List.Item>
                </Picker>
              </div>
            </div>
          </div>
        </TAddGoodsStyle>
        <AddGoodsStyle>
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
                  placeholder={morengoods.sequence}
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
                  placeholder={morengoods.posprice}
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
                onClick={(checked) => {shuaxin(checked) }}
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
              <List.Item
                extra={<Switch
                  checked={memberPrice}
                  onChange={() => { setMemberPrice(!memberPrice) }}
                />}
              >启用会员价
                            <span style={{ color: "#b4b4b4", fontSize: ".35rem", marginLeft: "1.3rem" }}>是否启用会员价</span>
              </List.Item>
              <div className='xian'></div>

              <div className="type flex-column" style={{ display: memberPrice === true ? "block" : "none" }}>
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
                      placeholder={morengoods.memberprice}
                      onChange={e => { setSetPrice(e.target.value) }}
                    />
                  </div>
                </div>
              </div>
              <List.Item
                extra={<Switch style={{ border: "none" }}
                  checked={matchGood}
                  onChange={() => { setMatchGood(!matchGood) }}
                  onClick={(checked) => {shuaxin(checked) }}
                />}
              >分体称商品
                            <span style={{ color: "#b4b4b4", fontSize: ".35rem", marginLeft: "1.3rem" }}>设置为分体称商品</span>
              </List.Item>
              <div className='xian'></div>

              <div className="type flex-column" style={{ display: matchGood ? "block" : "none" }}>
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
                      placeholder={morengoods.plu_goods_keyboard_id}

                      onChange={e => { setMatchCode(e.target.value) }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </List>


          <List>
          <List.Item style={{marginTop:".5rem"}}
              extra={<Switch
                checked={false}
                onChange={() => { setzuoFei(false) }}
                onClick={(checked) => { zuofei() }}
              />}
            >作废商品：</List.Item></List>

        </AddGoodsStyle>
      </BetterScroll>
      <FAddGoodsStyle>
        <div className='foot'>
          <div className='lbb'></div>
          <div className='raa' onClick={e => { check() }}>提交</div>
        </div>
      </FAddGoodsStyle>
    </>
  )
  function deleteGoods(){
    
    deleteProduct({
      action: 'deleteProduct', data: {
        uniacid: store.getState().uniacid,
        uid: store.getState().uid,
        id: params,
      }
    }).then((res) => {
      if (res.data.status === 4001) {
        history.push("/bjsygoods")
        Toast.success("作废商品成功", 1.5)
      } else {
        Toast.info(res.data.msg, 1.5)
      }
    })
  }
  function zuofei(){
   
   alert('商品作废', '是否确认作废该商品',[
    { text: '取消', onPress: () => setzuoFei(!zuoFei) },
    { text: '确定', onPress: () => deleteGoods() },
   ])
  }
  function shuaxin(e){
    console.log(e)
    if(e===false){
      bt_ref.current.BScroll.refresh()
    }else{
      bt_ref.current.BScroll.refresh()
    }
  }
  function check() {
    if (memberInterests && memberPrice) {
      Toast.info("会员价和会员权益不能同时开启", 2)

    } else {
      let aa = {}
      unit.map((v, k) => {
        if (v.label === morengoods.unit_name) {
          aa = v
        }
      })
      let cc = aa.value
      let bb = {}
      unit.map((v, k) => {
        if (v.label === morengoods.changeunit_name) {
          bb = v
        }
      })
      let kc = bb.value
      console.log(kc,cc)
      editProduct({
        action: 'editProduct', data: {
          uniacid: store.getState().uniacid,
          uid: store.getState().uid,
          id: params,
          categoryid: goodCategory[goodCategory.length - 1] ? goodCategory[goodCategory.length - 1] : morengoods.categoryid,
          code: goodCode ? goodCode : morengoods.code,
          posprice: retailPrice ? retailPrice : morengoods.posprice,
          memberprice: setPrice ? setPrice : morengoods.memberprice,
          name: goodName ? goodName : morengoods.name,
          changeunit: stockUnit.toString() ? stockUnit.toString() : kc,
          unit: sellUnit.toString() ? sellUnit.toString() : cc,
          is_membership: memberInterests === true ? "2" : "1" ? memberInterests === true ? "2" : "1" : morengoods.is_membership,
          is_memberprice: memberPrice === true ? "2" : "1" ? memberPrice === true ? "2" : "1" : morengoods.is_memberprice,
          is_plu_goods: matchGood === true ? "2" : "1" ? matchGood === true ? "2" : "1" : morengoods.is_plu_goods,
          plu_goods_keyboard_id: matchCode ? matchCode : morengoods.plu_goods_keyboard_id,
          sequence: goodSort ? goodSort : morengoods.sequence,
        }
      }).then((res) => {
        if (res.data.status === 4001) {
          history.goBack(-1)
          Toast.success("商品修改成功", 1.5)
        } else {
          Toast.info(res.data.msg, 1.5)
        }
      })
    }
  }
}
const FAddGoodsStyle = styled.div`
.lbb{
    width: 2rem;
    height: 1.6rem;
    background-color: #fff;
}
.raa{
    margin-top:.2rem;
    margin-right:.2rem;
    border-radius:.2rem;
    font-size:.4rem;
    color:#fff;
    text-align:center;
    width: 2.04rem;
    height: 1.17rem;
    line-height: 1.17rem;
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

`

const TAddGoodsStyle = styled.div`
  height: 100%;
  background: #F5F5F5;
  color: #787878;

  .wrapper .CommissionHeader{
    height:1.09rem;
}
.wrapper .CommissionHeader .navbar li{
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
    color:#000;
    text-align: left;
    font-size:.35rem;
    padding-left:.1rem;
    text-align: left;
    width:8rem;
}
.am-list-item .am-list-line .am-list-arrow{
    margin-left:2.5rem !important;
}
.kcdwtimes{
    position:absolute;
    left:1.8rem;
    top:2.9rem;
    color: red;
    width:12rem;
    background-color: transparent;
}
.scdwtimes{
    position:absolute;
    left:3rem;
    top:3.6rem;
    color: red;
    width:12rem;
    background-color: transparent;
}
.kuncun{
  position:absolute;
  left:3rem;
  top:4.8rem;
  color: red;
  width:12rem;
  background-color: transparent;
}
.time{
    position:absolute;
    left:2.9rem;
    top:1.2rem;
    text-align: left !important;
    color: #b4b4b4;
    font-size:.35rem;
    width:12rem;
    background-color: transparent;
}

.am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
  
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
  .type .item .left span {
    font-size: .35rem;
  }
  .type .item .left span::before {
    content: '*';
    color: #DE0000;
  }
  .type .item .right {
    margin-right: .3rem;

  }
  .type .item .right input {
    width: 5.82rem;
    height: 1rem;
    border: none;
    font-size: .35rem;
    font-weight: 500;
  }
  .type .item .right input::-webkit-input-placeholder {
    color: #000;
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

const AddGoodsStyle = styled.div`
  height: 100%;
  background: #F5F5F5;
  color: #787878;

  .wrapper .CommissionHeader{
    height:1.09rem;
}
.wrapper .CommissionHeader .navbar li{
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
}
.kcdwtimes{
    position:absolute;
    left:1.8rem;
    top:2.9rem;
    color: red;
    width:12rem;
    background-color: transparent;
}
.scdwtimes{
    position:absolute;
    left:2.2rem;
    top:3.6rem;
    color: red;
    width:12rem;
    background-color: transparent;
}
.time{
    position:absolute;
    left:2.2rem;
    top:1.2rem;
    text-align: left !important;
    color: #b4b4b4;
    font-size:.35rem;
    width:12rem;
    background-color: transparent;
}

.am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
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
    height: 1rem;
    border: none;
    font-size: .35rem;
    font-weight: 500;
  }
  .type .item .right input::-webkit-input-placeholder {
    color: #000;
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