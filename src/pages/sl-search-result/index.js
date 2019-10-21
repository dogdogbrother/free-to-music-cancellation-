import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import SongList from '../../components/song-list'
// 这个页面暂时是糊弄页面,不管你发的啥我都是给的周杰伦的歌
const SlSearchResult = (props) => {
  const [songList, setSongList] = useState([]); //歌曲列表数据
  useEffect(()=>{
    // let pathState = props.location.state
    axios.get(`/qpi/senlin`)
    .then(res=>{
      setSongList(res.data.songList.map(item=>{
        return {
          name:item.name,
          art:item.art,
          album:'',
          duration:0,
          source:'sl',
          id:item.id,
          url:item.url
        }
      }))
    })
  },[])
  return(
    <div className="song-list">
      {/* 这里应该是个tabs页,然后点击歌曲就显示歌曲结果,点击歌手就显示搜索歌手的结果*/}
      <div className="res-container">
        <SongList listData={songList}/>
      </div>
    </div>
  )
}



const SlSearchResultRouter = withRouter(SlSearchResult);
export default SlSearchResultRouter