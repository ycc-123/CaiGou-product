import React from 'react'
import { HashRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import Home from 'views/home/Home'

import AddPurchaseOrder from 'views/AddPurchaseOrder/AddPurchaseOrder'
import PurchaseOrder from 'views/PurchaseOrder/PurchaseOrder'
import PurchaseOrderDetailed from 'views/PurchaseOrder/PurchaseOrderDetailed'
import WarehousingOrder from 'views/WarehousingOrder/WarehousingOrder'
import WarehousingOrderxing from 'views/WarehousingOrder/WarehousingOrderxing'
import stockList from 'views/kucundan/stockList/stockList'
import stockCategory from 'views/kucundan/stockList/stockListCategory/Category'
import LossReport from 'views/LossReport/LossReport'
import LossReportDetail from 'views/LossReport/LossReportDetail'
import LossReportList from 'views/LossReport/LossReportList'
import addLossReport from 'views/LossReport/addLossReport'
import bsCategory from 'views/LossReport/Category'
import ApplyOrder from 'views/ApplyOrder/ApplyOrder'
import addApplyOrder from 'views/ApplyOrder/addApplyOrder'
import ApplyOrderx from 'views/ApplyOrder/ApplyOrderx'
import category from 'views/AddPurchaseOrder/Category'
import Sqcgcategory from 'views/ApplyOrder/Category'
import Liebiao from 'views/AddPurchaseOrder/childCom/CategorySwiper'
import Youhuimxb from 'views/kucundan/stockList/youhuimxb'
import Shouyinmxb from 'views/kucundan/stockList/shouyinmxb'
import GoodDiscount from 'views/GoodDiscount/GoodDiscount'
import Pandian from 'views/pandiandan/addInventoryList'
import pandianCategory from 'views/pandiandan/pandianCategory/Category'
import quanpanCategory from 'views/pandiandan/quanpanCategory/Category'
import InventoryList from 'views/pandiandan/InventoryList'
import InventoryListDetails from 'views/pandiandan/InventoryListDetails'
import allocationOrder from 'views/tiaobodan/allocationOrder'
import allocationListDetails from 'views/tiaobodan/allocationListDetails'
import tiaoboxq from 'views/tiaobodan/tiaoboCategory/childCom/CategorySwiper'
import addallocationList from 'views/tiaobodan/addallocationList'
import tiaoboCategory from 'views/tiaobodan/tiaoboCategory/Category'
import AddGoods from 'views/addGoods/AddGoods'
import BjGoods from 'views/addGoods/BjGoods'
import bjgoods from 'views/addGoods/category/Category'
import editPackagedGoods from 'views/packagedGoods/PackagedGoods'
import PackagedBjGoods from 'views/packagedGoods/BjGoods'
import PackagedBjGoodsmx from 'views/packagedGoods/category/childCom/CategorySwiper'
import PackagedGoods from 'views/packagedGoods/category/Category'
import choiceGoods from 'views/packagedGoods/choice/Category'
import choiceGoodsmx from 'views/packagedGoods/choice/childCom/CategorySwiper'

// 商品调价
import modifyPrice from 'views/modifyPrice/modifyPrice'
import modifyPriceDetailed from 'views/modifyPrice/modifyPriceDetailed'
import addmodifyPrice from 'views/modifyPrice/addmodifyPrice'
import modifyPriceCategory from 'views/modifyPrice/modifyPriceCategory/Category'
import modifyPriceCategorymx from 'views/modifyPrice/modifyPriceCategory/childCom/CategorySwiper'
// 收银订单明细表
import CashierOrder from 'views/CashierOrderDetails/CashierOrder'
import CashierOrderDetails from 'views/CashierOrderDetails/CashierOrderDetails'
import QuotePurchaseRequest from 'views/QuotePurchaseRequest/Category'
import QuoteApplyOrder from 'views/QuotePurchaseRequest/ApplyOrder'
import QuotePurchasemx from 'views/QuotePurchaseRequest/childCom/CategorySwiper'




// 测试
import Text from 'views/ApplyOrder/Text'




const AppRouter = () => {
  return (
    <Router>
      {/* 缓存路由 */}
      <CacheSwitch>
      {/* <CacheRoute path='/category/:id/:ck/:bz' component={category}></CacheRoute> */}
      <CacheRoute path='/choiceGoods/:id' when='always' component={choiceGoods}></CacheRoute>
      <CacheRoute path='/pandianCategory/:id/:ck/:fl/:name' when='always' component={pandianCategory}></CacheRoute>
      <CacheRoute path='/home' when='always' component={Home}></CacheRoute>
      
      <CacheRoute path='/CashierOrder' when='always' component={CashierOrder}></CacheRoute>
      <CacheRoute path='/Youhuimxb' when='always' component={Youhuimxb}></CacheRoute>
      <Redirect from='/' exact to='/home'></Redirect>


      </CacheSwitch>

      
      <Switch>
        {/* <Route path='/home' exact component={Home} ></Route> */}
        {/* <Route path='/' exact component={Home} ></Route> */}
        {/* 采购申请单 */}
        <Route path='/Sqcgcategory/:id/:bz' exact component={Sqcgcategory} ></Route>
        <Route path='/ApplyOrderx/:id' exact component={ApplyOrderx} ></Route>
        <Route path='/ApplyOrder' exact component={ApplyOrder} ></Route>
        <Route path='/addApplyOrder' exact component={addApplyOrder} ></Route>
        <Route path='/QuotePurchaseRequest/:id/:ck/:gy' exact component={QuotePurchaseRequest} ></Route>
        <Route path='/QuoteApplyOrder/:ck/:gy' exact component={QuoteApplyOrder} ></Route>
        <Route path='/QuotePurchasemx/:id' exact component={QuotePurchasemx} ></Route>


        {/* 报损单 */}
        <Route path='/LossReportList' exact component={LossReportList} ></Route>
        <Route path='/LossReportDetail/:id' exact component={LossReportDetail} ></Route>
        <Route path='/addLossReport' exact component={addLossReport} ></Route>
        <Route path='/bsCategory/:id/:bz/:bsid' exact component={bsCategory} ></Route>
        <Route path='/LossReport' exact component={LossReport} ></Route>
        {/* 库存单 */}
        <Route path='/stockList' exact component={stockList} ></Route>
        <Route path='/stockCategory' exact component={stockCategory} ></Route>
        {/* 采购入库单 */}
        <Route path='/WarehousingOrderxing/:id' exact component={WarehousingOrderxing} ></Route>
        <Route path='/WarehousingOrder' exact component={WarehousingOrder} ></Route>
        {/* 采购单 */}
        <Route path='/PurchaseOrderDetailed/:id' exact component={PurchaseOrderDetailed} ></Route>
        <Route path='/PurchaseOrder' exact component={PurchaseOrder} ></Route>
        <Route path='/category/:id/:ck/:bz' exact component={category} ></Route>
        <Route path='/AddPurchaseOrder' exact component={AddPurchaseOrder} ></Route>
        <Route path='/Liebiao/:ck/:bz' exact component={Liebiao} ></Route>
        {/* 优惠明细表 */}
        {/* <Route path='/Youhuimxb' exact component={Youhuimxb} ></Route> */}
        <Route path='/Shouyinmxb/:id/:page' exact component={Shouyinmxb} ></Route>
        {/* 商品优惠汇总 */}
        <Route path='/GoodDiscount' exact component={GoodDiscount} ></Route>
        {/* 盘点单 */}
        {/* <Route path='/pandianCategory/:id/:ck/:fl/:name' exact component={pandianCategory} ></Route> */}
        <Route path='/addPandian' exact component={Pandian} ></Route>
        <Route path='/Pandian' exact component={InventoryList} ></Route>
        <Route path='/quanpanCategory/:id/:ck' exact component={quanpanCategory} ></Route>
        <Route path='/InventoryListDetails/:id' exact component={InventoryListDetails} ></Route>
        {/* 调拨单 */}
        <Route path='/addallocationList' exact component={addallocationList} ></Route>
        <Route path='/allocationListDetails/:id' exact component={allocationListDetails} ></Route>
        <Route path='/allocationOrder' exact component={allocationOrder} ></Route>
        <Route path='/tiaoboCategory/:id/:ck' exact component={tiaoboCategory} ></Route>
        <Route path='/tiaoboxq' exact component={tiaoboxq} ></Route>
        {/* 新增商品 */}
        <Route path='/AddGoods' exact component={AddGoods} ></Route>
        <Route path='/bjsygoods' exact component={bjgoods} ></Route>
        <Route path='/BjGoods/:id' exact component={BjGoods} ></Route>
        {/* 打包商品 */}
        <Route path='/editPackagedGoods' exact component={editPackagedGoods} ></Route>
        <Route path='/PackagedBjGoods/:id' exact component={PackagedBjGoods} ></Route>
        <Route path='/PackagedGoods' exact component={PackagedGoods} ></Route>
        <Route path='/choiceGoodsmx' exact component={choiceGoodsmx} ></Route>
        <Route path='/PackagedBjGoodsmx/:id' exact component={PackagedBjGoodsmx} ></Route>
        {/* 商品调价 */}
        <Route path='/modifyPrice' exact component={modifyPrice} ></Route>
        <Route path='/addmodifyPrice' exact component={addmodifyPrice} ></Route>
        <Route path='/modifyPriceDetailed/:id' exact component={modifyPriceDetailed} ></Route>
        <Route path='/modifyPriceCategory/:id' exact component={modifyPriceCategory} ></Route>
        <Route path='/modifyPriceCategorymx' exact component={modifyPriceCategorymx} ></Route>
        {/* 收银订单明细表 */}
        <Route path='/CashierOrderDetails/:id' exact component={CashierOrderDetails} ></Route>
        {/* <Route path='/CashierOrder' exact component={CashierOrder} ></Route> */}





        {/* 测试 */}
        <Route path='/Text' exact component={Text} ></Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
