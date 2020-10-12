import React from 'react'
import { HashRouter as Router, Redirect } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import Home from 'views/home/Home'
// import Baobiao from 'views/baobiao/Baobiao'
// import My from 'views/my/My'
// import SalesVolume from 'views/SalesVolume/SalesVolume'
// import CategorySummary from 'views/CategorySummary/CategorySummary'
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
        {/* <CacheRoute path="/Baobiao" exact when='always' component={Baobiao}></CacheRoute>
        <CacheRoute path='/My' when='always' component={My} ></CacheRoute>
        <CacheRoute path='/SalesVolume' when='always' component={SalesVolume} ></CacheRoute>
        <CacheRoute path='/CategorySummary' when='always' component={CategorySummary} ></CacheRoute>
        <CacheRoute path='/timeManage' when='always' component={timeManage} ></CacheRoute>
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
