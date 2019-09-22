/**
 *  listDta 是数据格式定义好了的数组内容,要求有如下
 *  {
 *    name:string,      歌曲名字
 *    art:string,       作家名字
 *    album:tring       专辑名称
 *    duration:number   时长,这个组件内处理
 *    source:qq or wy   来自于哪个资源
 *    id:number         歌曲的id,用于搜索的唯一键
 *  }
 * 
 *  点击播放的话,先判断是qq还是网易,网易的比较好办,有现成的接口,qq的有加密有点麻烦,虽然多处理处理
 */

import React from 'react'
import { Row, Col, Icon, Tooltip } from 'antd'
import axios from 'axios'
import { setCurrentPlay, pushPlayList } from '../../rxStore/playRx'
import './style.scss'

const SongList = ({listData})=>{

  const playSong = (song) => {
    if (song.source === 'qq') return getQqUrl(song)
    getWyUrl(song)
  }

  const getQqUrl = (song) => {
    // qq音乐的实在是麻烦了,先用mid(id)申请个接口,接口里面有一个purl,拿到这个再拼接一下才能拿到真正播放地址
    let urlData = JSON.stringify({"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"109711786","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"109711786","songmid":[song.id],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}})
    let url = '/qpi/u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey5359184408452244&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=' + urlData
    axios.get(url).then(res=>{
      // 真正的歌曲的url在这呢,注意ip地址会经常换的
      let vkey = res.data.req.data.vkey
      let url = 'http://122.226.161.25/amobile.music.tc.qq.com/'+res.data.req_0.data.midurlinfo[0].purl;
      //拿到了播放地址,要做两个操作.一个是切换当前播放歌曲,二是push进播放列表      
      setCurrentPlay({
        url,
        id:song.id,
        name:song.name,
        art:song.art,
        img:'',//这个没有,qq音乐的要再请求一个接口才有照片的.
      })
      pushPlayList({
        art:song.art,
        url,
        id:song.id,
        name:song.name,
        img:'',
      })
    })
  }
  const getWyUrl = (song) => {
    console.log(song);
    
    axios.get(`/wpi/song/url?id=${song.id}`).then(res=>{
      console.log(res.data.data[0].url)
      setCurrentPlay({
        url:res.data.data[0].url,
        id:song.id,
        name:song.name,
        art:song.art,
        img:'',//这个没有,qq音乐的要再请求一个接口才有照片的.
      })
      pushPlayList({
        art:song.art,
        url:res.data.data[0].url,
        id:song.id,
        name:song.name,
        img:'',
      })
    })
  }
  return(
    <ul className="song-list">
      <li className="title">
        <Row>
          <Col span={9} className="ellipsis">歌曲</Col>
          <Col span={5} className="ellipsis">歌手</Col>
          <Col span={8} className="ellipsis">专辑</Col>
          <Col span={2} className="ellipsis">时长</Col>
        </Row>
      </li>
      {
        listData.map((song,index) =>{
          return(
            <li className="song" key={index}>
              <Row>
                <Col span={9} className="d-f">
                  <Icon type="heart" className="m-r-5 c-p collect-icon"/>
                  <div className="song-name">
                    <span className="m-r-5 c-p ellipsis">{song.name}</span>
                  </div>
                  <div className="d-f d-b-a operation-icon-box">
                    <Tooltip title="播放" placement="bottom">
                      <Icon 
                        type="play-circle" 
                        className="operation-icon"
                        onClick={()=>{playSong(song)}}/>
                    </Tooltip>
                    <Tooltip title="添加至播放列表" placement="bottom">
                      <Icon type="plus-circle" className="operation-icon"/>
                    </Tooltip>
                  </div>
                </Col>
                <Col span={5}>{song.art}</Col>
                <Col span={8}>{song.album || ''}</Col>
                <Col span={2}>{setFormat(song.duration,'minute')} : {setFormat(song.duration,'second')}</Col>
              </Row>
            </li>
          )
        })
      }
    </ul>
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
export default SongList