import React, { useState, useEffect, useRef } from 'react'
import { Route, Link } from 'react-router-dom'
import { Icon } from 'antd';
import './style.scss'

const Aside = ({ test })=> {
  return(
    <div className="layout-aside-box p-20">
      <h1 className="logo-module">
        <span>请登录</span>
      </h1>
        <div>
          <p className="menu-title">在线音乐</p>
          <ul>
            <Route
              children={(match)=>(
                <li className={match.location.pathname === '/' ? 'aside-active' : ''}>
                  <Link to="/">
                    <Icon type="search"/><span>搜索歌曲</span>
                  </Link>
                </li>
              )}>
            </Route>
            <Route
              children={(match)=>(
                <li className={match.location.pathname === '/song-menu' ? 'aside-active' : ''}>
                  <Link to="/song-menu">
                    <Icon type="customer-service"/><span>查看歌单</span>
                  </Link>
                </li>
              )}>
            </Route>
          </ul>
        </div>
          <div>
            <p className="menu-title">我的音乐</p>
            <ul>
              <li>
                <Icon type="heart"/>
                <span>我的喜欢</span>
              </li>
              <li>
                <Icon type="desktop" />
                <span>本地和下载</span>  
              </li>
            </ul>
          </div>
          <div>
          <p className="menu-title">音乐台介绍</p>
          <ul>
            <li>
              <Icon type="exception"/>
              <span>功能介绍</span>
            </li>
            <li>
              <Icon type="pushpin" />
              <span>我要提意见</span>  
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Aside