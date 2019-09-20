import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import { Row, Col, Icon } from 'antd'
import '../../common/song-list-style.scss'
const QQsearchResult = (props) => {
  const [songList, setSongList] = useState([]); //歌曲列表数据
  useEffect(()=>{
    let pathState = props.location.state
    axios.get(`/qpi/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=${pathState.searchVlue}`).then(res=>{

      let str = res.data.slice(9)
      str = str.slice(0,str.length-1)
      let data = JSON.parse(str)
      setSongList(data.data.song.list)
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
            songList.map((song,index) =>{
              return(
                <li className="song" key={index}>
                  <Row>
                    <Col span={9}>
                      <Icon type="heart" className="m-r-5 c-p collect-icon"/>
                      <span className="m-r-5 c-p">{song.songname}</span>
                    </Col>
                    <Col span={5}>{singers(song.singer)}</Col>
                    <Col span={8}>{song.albumname || ''}</Col>
                    {/* <Col span={2}>{setFormat(song.interval,'minute')} : {setFormat(song.interval,'second')}</Col> */}
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
const singers = (singers)=> {
  let arr = singers.map(item=>{
    return item.name
  })
  return arr.join('/')
}
const setFormat = (number,type) => {
  let res = null
  if (type === 'minute') {
    res = Math.floor((number%3600)/60000)
  }else{
    res = Math.floor((number%60)/1000)
  }
  if (res<10) return res = '0' + res
  return res
}
const QQsearchResultRouter = withRouter(QQsearchResult);
export default QQsearchResultRouter