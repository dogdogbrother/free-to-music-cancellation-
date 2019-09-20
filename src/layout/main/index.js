import React from 'react'
// import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import DefaultSearchPage from '../../pages/default-search-page'
import SongMenu from '../../pages/song-menu'
import WySearchResultRouter from '../../pages/wy-search-result'
import QQsearchResultRouter from '../../pages/qq-search-result'
const LayoutMain = ()=> {
  return(
    <div className="layout-main-box">
      <Switch>
        <Route exact path="/" component={DefaultSearchPage}/>
        <Route exact path="/song-menu" component={SongMenu}/>
        <Route exact path="/wy-search-result" component={WySearchResultRouter}/>
        <Route exact path="/qq-search-result" component={QQsearchResultRouter}/>
        {/* <Route exact path="/page2" component={组件2}/>
        <Route exact path="/page1/add" component={add组件}/> */}
      </Switch>
    </div>
  )
}

export default LayoutMain