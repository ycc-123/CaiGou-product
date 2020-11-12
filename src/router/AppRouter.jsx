import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import Home from 'views/home/Home'
import AddPurchaseOrder from 'views/AddPurchaseOrder/AddPurchaseOrder'
import PurchaseOrder from 'views/PurchaseOrder/PurchaseOrder'
import PurchaseOrderDetailed from 'views/PurchaseOrderDetailed/PurchaseOrderDetailed'
import WarehousingOrder from 'views/WarehousingOrder/WarehousingOrder'
import WarehousingOrderxing from 'views/WarehousingOrderxing/WarehousingOrderxing'
import stockList from 'views/kucundan/stockList/stockList'
import LossReport from 'views/LossReport/LossReport'
import LossReportm from 'views/LossReportm/LossReportm'
import LossReportf from 'views/LossReportf/LossReportf'
import ApplyOrder from 'views/ApplyOrder/ApplyOrder'
import ApplyOrderx from 'views/ApplyOrderx/ApplyOrderx'
import category from 'views/category/Category'
import Sqcgcategory from 'views/sqcgCategory/Category'
import Liebiao from 'views/category/childCom/CategorySwiper'
import Youhuimxb from 'views/kucundan/stockList/youhuimxb'
import Shouyinmxb from 'views/kucundan/stockList/shouyinmxb'
import GoodDiscount from 'views/GoodDiscount/GoodDiscount'
import Pandian from 'views/pandiandan/addInventoryList'
import TransferOrder from 'views/TransferOrder/TransferOrder'
// 测试
import Text from 'views/ApplyOrderx/Text'




const AppRouter = () => {
  return (
    <Router>
      {/* 缓存路由 */}
      <CacheSwitch>
      <CacheRoute path='/category/:id' when='always' component={category}></CacheRoute>
      </CacheSwitch>

      <Switch>
        <Route path='/PurchaseOrderDetailed/:id' exact component={PurchaseOrderDetailed} ></Route>
        <Route path='/home' exact component={Home} ></Route>
        <Route path='/' exact component={Home} ></Route>
        <Route path='/Sqcgcategory' exact component={Sqcgcategory} ></Route>
        <Route path='/ApplyOrderx/:id' exact component={ApplyOrderx} ></Route>
        <Route path='/ApplyOrder' exact component={ApplyOrder} ></Route>
        <Route path='/LossReportf' exact component={LossReportf} ></Route>
        <Route path='/LossReportm' exact component={LossReportm} ></Route>
        <Route path='/LossReport' exact component={LossReport} ></Route>
        <Route path='/stockList' exact component={stockList} ></Route>
        <Route path='/WarehousingOrderxing/:id' exact component={WarehousingOrderxing} ></Route>
        <Route path='/WarehousingOrder' exact component={WarehousingOrder} ></Route>
        <Route path='/PurchaseOrder' exact component={PurchaseOrder} ></Route>
        <Route path='/AddPurchaseOrder' exact component={AddPurchaseOrder} ></Route>
        <Route path='/Liebiao' exact component={Liebiao} ></Route>
        <Route path='/Youhuimxb' exact component={Youhuimxb} ></Route>
        <Route path='/GoodDiscount' exact component={GoodDiscount} ></Route>
        <Route path='/Shouyinmxb/:id' exact component={Shouyinmxb} ></Route>
        <Route path='/Pandian' exact component={Pandian} ></Route>
        <Route path='/TransferOrder' exact component={TransferOrder} ></Route>
        {/* 测试 */}
        <Route path='/Text' exact component={Text} ></Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
