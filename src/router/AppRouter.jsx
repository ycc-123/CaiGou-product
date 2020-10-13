import React from 'react'
import { HashRouter as Router, Redirect } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import Home from 'views/home/Home'
import AddPurchaseOrder from 'views/AddPurchaseOrder/AddPurchaseOrder'
import PurchaseOrder from 'views/PurchaseOrder/PurchaseOrder'
import PurchaseOrderDetailed from 'views/PurchaseOrderDetailed/PurchaseOrderDetailed'
import Category from 'views/category/Category'
// import Category from 'views/category/Category'
// import MemberBusiness from 'views/MemberBusiness/MemberBusiness'
// import timeManage from 'views/timeManage/timeManage'
// import CollectionCompose from 'views/CollectionCompose/CollectionCompose'
// import ShoppingGuide from 'views/ShoppingGuide/ShoppingGuide'
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
         <CacheRoute path='/Category' when='always' component={Category} ></CacheRoute>
       {/* <CacheRoute path='/timeManage' when='always' component={timeManage} ></CacheRoute>
        <CacheRoute path='/MemberBusiness' when='always' component={MemberBusiness} ></CacheRoute>
        <CacheRoute path='/CollectionCompose' when='always' component={CollectionCompose} ></CacheRoute>
        <CacheRoute path='/ShoppingGuide' when='always' component={ShoppingGuide} ></CacheRoute>
        <CacheRoute path='/Hot' when='always' component={Hot} ></CacheRoute> */}

 









        <Redirect from='/' exact to='/home'></Redirect>
      </CacheSwitch>



    </Router>
  )
}

export default AppRouter
