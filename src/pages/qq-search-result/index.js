import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import SongList from '../../components/song-list'
import axios from 'axios'
import '../../common/song-list-style.scss'
const QQsearchResult = (props) => {
  //歌曲列表数据 这个songlist要求比较严格,因为是要送到子组件去使用的
  const [songList, setSongList] = useState([]); 
  useEffect(()=>{
    let pathState = props.location.state
    axios.get(`/qpi/c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=57753463161831399&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=${pathState.searchVlue}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`)
    .then(res=>{
      setSongList(res.data.data.song.list.map(item=>{
        return {
          name:item.title,
          art:singers(item.singer),
          album:item.album.name || '',
          duration:item.interval * 1000,
          source:'qq',
          id:item.mid
        }
      }))
      // let str = res.data.slice(9)
      // str = str.slice(0,str.length-1)
      // let data = JSON.parse(str)
      // setSongList(data.data.song.list)
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
const singers = (singers)=> {
  let arr = singers.map(item=>{
    return item.name
  })
  return arr.join('/')
}
const QQsearchResultRouter = withRouter(QQsearchResult);
export default QQsearchResultRouter