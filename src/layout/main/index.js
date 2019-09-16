import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import DefaultPage from '../../pages/default-page'
import SearchPage from '../../pages/search-page'

const LayoutMain = ()=> {
  return(
    <div className="layout-main-box">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DefaultPage}/>
          <Route exact path="/search" component={SearchPage}/>
          {/* <Route exact path="/page2" component={组件2}/>
          <Route exact path="/page1/add" component={add组件}/> */}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default LayoutMain