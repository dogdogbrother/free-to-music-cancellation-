import React, { useState } from 'react'
import { Icon } from 'antd'
import { useObservable } from 'rxjs-hooks'
import { currentPlay, setCurrentPlay, playList, deletePlayList } from '../../rxStore/playRx'
import './style.scss'

const AudioPlay = ()=>{
  let play = useObservable(() => currentPlay.asObservable()) || currentPlay.value
  let pList = useObservable(() => playList.asObservable()) || playList.value
  const [showListBox, setShowListBox] = useState(false)
  const nextPlay = (id)=> { 
    //点击下一曲和自动播放完了就执行这个函数,首先判断下当前曲目的位置,然后下一曲或是回到第一首,给setCurrentPlay赋值即可
    //事实上这里还有单曲循环啥的很多操作,暂时简化一点
    playList.value.forEach((item,index)=>{
      if (item.id === id) {
        if (index === playList.value.length-1) {
          setCurrentPlay(pList[0])
        }else{
          setCurrentPlay(pList[index+1])
        }
      }
    })
  }
  const lastPlay = (id) => {
    playList.value.forEach((item,index)=>{
      if (item.id === id) {
        if (index === 0) {
          alert('已经是第一首了,上一首上不动了')
        }else{
          setCurrentPlay(playList.value[index-1])
        }
      } 
    })
  }
  const deleteSongListItem = (id,index) => {
    if (playList.value.length===1) {
      setCurrentPlay({
        url:'',
        img:'',
        name:'',
        art:'',
        id:''
      })
    }else{
      nextPlay(id)
    }
    deletePlayList(index)
  }
  const isShowSongList = () => {
    setShowListBox(!showListBox)
  }
  const playListSong = (song) => {
    setCurrentPlay(song)
  }
  return (
    <div className="play-footer">
      {/* 我在这个地方暂时插个东西,就是播放列表,样式上我还没想好,先随便写写 */}
      { showListBox && 
        <div className="play-list-box">
          <div className="play-list-box-title">我是头部,播放列表</div>
          <ul>
            { 
              pList.map((item,index)=>{
                return(
                  <li key={item.id} className="m-b-5">
                    <span className="c-p m-r-5" onClick={()=>{playListSong(item)}}>{item.name}</span>
                    {
                      item.id === play.id &&
                      <Icon type="play-circle" className="m-r-5"/>
                    }
                    <Icon type="delete" onClick={()=>{deleteSongListItem(item.id,index)}}/>
                  </li>
                )
              })
            }
          </ul>
        </div>
      }
      <div className="play-footer-main d-f-b">
        <div className="song-content d-f">
          <div className="img-box">
            <img src="//y.gtimg.cn/music/photo_new/T001R150x150M0000025NhlN2yWrP4.jpg?max_age=2592000" alt="歌手头像"/> 
          </div>
          <div className="song-info">
            <p className="info">
              <span className="name">{play.name}</span>
              <span> - </span>
              <span>{play.art}</span>
            </p>
            <div className="song-icon d-f-b">
              <Icon type="heart" />
              <Icon type="align-left" />
            </div>
          </div>
        </div>
        <div className="play-operate d-f">
          <audio 
            className="m-r-10"
            controls="controls"
            autoPlay="autoPlay"
            onEnded={()=>{nextPlay(play.id)}}
            src={play.url}/>
          <div className="small-icon m-r-10">
            <Icon type="fast-backward" onClick={()=>{lastPlay(play.id)}}/>
          </div>
          <div className="small-icon">
            <Icon type="fast-forward" onClick={()=>{nextPlay(play.id)}}/>
          </div>
        </div>

        <div>
          <div className="d-f inventory c-p" onClick={()=>{isShowSongList()}}>
            <span>列表</span>
            <Icon type="menu-unfold" className="menu-unfold"/>
            <span>{pList.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioPlay