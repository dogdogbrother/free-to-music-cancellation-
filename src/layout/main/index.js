import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import DefaultSearchPage from '../../pages/default-search-page'
import SongMenu from '../../pages/song-menu'
const LayoutMain = ()=> {
  return(
    <div className="layout-main-box">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DefaultSearchPage}/>
          <Route exact path="/song-menu" component={SongMenu}/>
          {/* <Route exact path="/page2" component={组件2}/>
          <Route exact path="/page1/add" component={add组件}/> */}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default LayoutMain