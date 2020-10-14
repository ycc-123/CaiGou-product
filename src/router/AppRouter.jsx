import React from 'react'
import { HashRouter as Router, Redirect } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import Home from 'views/home/Home'
import AddPurchaseOrder from 'views/AddPurchaseOrder/AddPurchaseOrder'
import PurchaseOrder from 'views/PurchaseOrder/PurchaseOrder'
import PurchaseOrderDetailed from 'views/PurchaseOrderDetailed/PurchaseOrderDetailed'
import WarehousingOrder from 'views/WarehousingOrder/WarehousingOrder'
import WarehousingOrderxing from 'views/WarehousingOrderxing/WarehousingOrderxing'
import stockList from 'views/stockList/stockList'
import LossReport from 'views/LossReport/LossReport'
import LossReportm from 'views/LossReportm/LossReportm'
import LossReportf from 'views/LossReportf/LossReportf'
// import Hot from 'views/Hot/Hot'





const AppRouter = () => {
  return (
    <Router> 
      <CacheSwitch>
        {/* <Route path='/cart' exact component={Cart}></Route> */}
        {/* 精确匹配  总是 */}
        <CacheRoute path='/home' exact when='forward' component={Home} cacheKey='HomeComponent'></CacheRoute>
        <CacheRoute path="/AddPurchaseOrder" exact when='always' component={AddPurchaseOrder}></CacheRoute>
        <CacheRoute path='/PurchaseOrder' when='always' component={PurchaseOrder} ></CacheRoute>
        <CacheRoute path='/PurchaseOrderDetailed' when='always' component={PurchaseOrderDetailed} ></CacheRoute>
        <CacheRoute path='/WarehousingOrder' when='always' component={WarehousingOrder} ></CacheRoute>
        <CacheRoute path='/WarehousingOrderxing' when='always' component={WarehousingOrderxing} ></CacheRoute>
        <CacheRoute path='/stockList' when='always' component={stockList} ></CacheRoute>
        <CacheRoute path='/LossReport' when='always' component={LossReport} ></CacheRoute>
        <CacheRoute path='/LossReportm' when='always' component={LossReportm} ></CacheRoute>
         <CacheRoute path='/LossReportf' when='always' component={LossReportf} ></CacheRoute>

 









        <Redirect from='/' exact to='/home'></Redirect>
      </CacheSwitch>



    </Router>
  )
}

export default AppRouter
