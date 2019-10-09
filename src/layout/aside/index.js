import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Icon } from 'antd';
import { useObservable } from 'rxjs-hooks'
import { setLoginStatus, userInfo } from '../../rxStore/user'

import './style.scss'

const Aside = ()=> {
  // const [state, setState] = useState(false)
  let cUserInfo = useObservable(() => userInfo.asObservable()) || userInfo
  const loginOpration = () => {
    setLoginStatus({ status: true })
  }
  return(
    <div className="layout-aside-box p-20">
      <h1 className="logo-module">
      {
        cUserInfo.loginStatus ?
          <div className="use-info-box">
            <span>我是{cUserInfo.name}用户</span>
          </div>
        :
          <span className="c-p" onClick={ () => { loginOpration() } }>请登录</span>
      }
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
              <Route
                children={(match)=>(
                  <li className={match.location.pathname === '/upload-song' ? 'aside-active' : ''}>
                    <Link to="/upload-song">
                      <Icon type="upload"/><span>上传歌曲</span>
                    </Link>
                  </li>
                )}>
              </Route>
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