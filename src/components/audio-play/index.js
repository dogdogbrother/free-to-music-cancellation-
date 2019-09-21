import React, { useState, useEffect } from 'react'
import { Icon } from 'antd'
import './style.scss'

// 这个组件现在还在思索中,到底应该怎么写
// 先把布局写一下吧 首先他分上下两段,上面那段是进度条,下面是主要的区域内容
const AudioPlay = ({url})=>{
  return (
    <div className="play-footer">
      <div className="play-footer-main d-f-b">
        <div className="song-content d-f">
          <div className="img-box">
            <img src="//y.gtimg.cn/music/photo_new/T001R150x150M0000025NhlN2yWrP4.jpg?max_age=2592000"/> 
          </div>
          <div className="song-info">
            <p className="info">
              <span className="name">一路向北</span>
              <span> - </span>
              <span>周杰伦</span>
            </p>
            <div className="song-icon d-f-b">
              <Icon type="heart" />
              <Icon type="align-left" />
            </div>
          </div>
        </div>
        <div className="play-operate d-f">
          <div className="small-icon">
            <Icon type="fast-backward" />
          </div>
          <audio 
            controls="controls"
            src="http://m10.music.126.net/20190921171649/531f50c258d0c87fa87c25daf1ba3821/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"/>
          <div className="small-icon">
            <Icon type="fast-forward" />
          </div>
        </div>

        <div>
          列表
        </div>
      </div>
 
    </div>
  )
}

export default AudioPlay