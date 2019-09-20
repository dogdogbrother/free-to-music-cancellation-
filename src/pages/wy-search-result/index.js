import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import { Row, Col, Icon } from 'antd'
import '../../common/song-list-style.scss'
const WySearchResult = (props) => {
  const [songList, setSongList] = useState([]); //歌曲列表数据
  useEffect(()=>{
    let pathState = props.location.state
    axios.get(`/wpi/search?keywords=${pathState.searchVlue}`,{}).then(res=>{
      let data = res.data.result 
      if (res.data.code === 200) {
        setSongList(data.songs)
      }
    })
  },[])
  return(
    <div className="song-list">
      {/* 这里应该是个tabs页,然后点击歌曲就显示歌曲结果,点击歌手就显示搜索歌手的结果*/}
      <div className="res-container">
        {/* 这个div是架子,装歌曲歌手结果的 */}
        <ul className="song-list">
          <li className="title">
            <Row>
              <Col span={10} className="ellipsis">歌曲</Col>
              <Col span={4} className="ellipsis">歌手</Col>
              <Col span={8} className="ellipsis">专辑</Col>
              <Col span={2} className="ellipsis">时长</Col>
            </Row>
          </li>
          {
            songList.map(song =>{
              return(
                <li className="song" key={song.id}>
                  <Row>
                    <Col span={9}>
                      <Icon type="heart" className="m-r-5 c-p collect-icon"/>
                      <span className="m-r-5 c-p">{song.name}</span>
                    </Col>
                    <Col span={5}>{song.artists.length && song.artists[0].name}</Col>
                    <Col span={8}>{song.album.name}</Col>
                    <Col span={2}>{setFormat(song.duration,'minute')} : {setFormat(song.duration,'second')}</Col>
                  </Row>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
const setFormat = (number,type) => {
  let res = null
  if (type === 'minute') {
    res = Math.floor((number%3600000)/60000)
  }else{
    res = Math.floor((number%60000)/1000)
  }
  if (res<10) return res = '0' + res
  return res
}
const WySearchResultRouter = withRouter(WySearchResult);
export default WySearchResultRouter