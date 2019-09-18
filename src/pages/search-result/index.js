import React, { useState } from 'react'
import { withRouter } from "react-router-dom";


const SearchResult = (props) => {
  let pathState = props.location.state
  let resultData = getData(pathState.searchVlue,pathState.platform)
  
  return(
    <>
    我是搜索结果
    </>
  )
}
const getData = (searchValue,platformType)=>{
  const getUrl = null
  if (platformType === 0) {
    getUrl = 'www.qq.com'
  }else{
    platformType === 1 ? getUrl="www.wy.com" : getUrl="www.wl.com"
  }
}
const SearchResultRouter = withRouter(SearchResult);
export default SearchResultRouter