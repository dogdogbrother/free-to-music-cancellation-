import React from 'react'
import { Icon } from 'antd'
import { useObservable } from 'rxjs-hooks';
import { currentPlay,setCurrentPlay, playList } from '../../rxStore/playRx'
import './style.scss'

// 这个组件现在还在思索中,到底应该怎么写
// 先把布局写一下吧 首先他分上下两段,上面那段是进度条,下面是主要的区域内容
const AudioPlay = ()=>{
  let play = useObservable(() => currentPlay.asObservable()) || currentPlay.value
  let pList = useObservable(() => playList.asObservable()) || playList.value
  const nextPlay = (id)=> { 
    //点击下一曲和自动播放完了就执行这个函数,首先判断下当前曲目的位置,然后下一曲或是回到第一首,给setCurrentPlay赋值即可
    //事实上这里还有单曲循环啥的很多操作,暂时简化一点
    playList.value.forEach((item,index)=>{
      if (item.id === id) {
        if (index === playList.value.length-1) {
          setCurrentPlay(playList.value[0])
        }else{
          setCurrentPlay(playList.value[index+1])
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
  return (
    <div className="play-footer">
      <div className="play-footer-main d-f-b">
        <div className="song-content d-f">
          <div className="img-box">
            <img src="//y.gtimg.cn/music/photo_new/T001R150x150M0000025NhlN2yWrP4.jpg?max_age=2592000"/> 
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
          <div className="d-f inventory c-p">
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