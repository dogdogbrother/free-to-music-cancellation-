import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import SongList from '../../components/song-list'
const WySearchResult = (props) => {
  const [songList, setSongList] = useState([]); //歌曲列表数据
  useEffect(()=>{
    let pathState = props.location.state
    axios.get(`/wpi/search?keywords=${pathState.searchVlue}`,{}).then(res=>{
      let data = res.data.result 
      if (res.data.code === 200) {
        setSongList(data.songs.map(item=>{
          return {
            name:item.name,
            art:item.artists[0].name,
            album:item.album.name,
            duration:item.duration,
            source:'wy',
            id:item.id
          }
        }))
      }
    })
  },[props.location.state])
  return(
    <div className="song-list">
      <div className="res-container">
        <SongList listData={songList}/>
      </div>
    </div>
  )
}
const WySearchResultRouter = withRouter(WySearchResult);
export default WySearchResultRouter