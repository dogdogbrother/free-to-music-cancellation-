import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Icon, Avatar, Popover, message } from 'antd';
import { useObservable } from 'rxjs-hooks'
import { setLoginStatus, userInfo, resetUserInfo } from '../../rxStore/user'

import './style.scss'

const Aside = ()=> {
  // const [state, setState] = useState(false)
  let cUserInfo = useObservable(() => userInfo.asObservable()) || userInfo

  const loginOpration = () => { // 打开登陆卡片
    setLoginStatus({ status: true })
  }
  
  const signOut = () => { // 退出登陆,清除cookie和重置登陆信息
    document.cookie = 'token = expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    resetUserInfo()
    message.success('已退出');
  }
  const infoPopover = (
    <ul className="infoPopover">
      <li>个人中心</li>
      <li>账号设置</li>
      <li onClick={() => { signOut() }}>退出</li>
    </ul>
  )
  return(
    <div className="layout-aside-box p-20">
      {
        cUserInfo.loginStatus ?
        <div style={{textAlign: 'center'}} className="m-b-5">
          <div>
            <Popover placement="bottomLeft" content={infoPopover} trigger="hover" className="m-b-5 c-p" >
              <Avatar size={66} src={cUserInfo.avatar_url}>{cUserInfo.name}</Avatar>
            </Popover>
          </div>
          <span>{cUserInfo.name}</span>
        </div>
        
        :
          <div style={{textAlign: 'center'}}>
            <Avatar size={66} className="c-p" onClick={() => { loginOpration() }}>singo in</Avatar>
          </div>
      }
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
            <Route
              children={(match)=>(
                <li className={match.location.pathname === '/wy-like' ? 'aside-active' : ''}>
                  <Link to="/my-like">
                    <Icon type="heart"/><span>我的喜欢 ({ cUserInfo.fonds ? cUserInfo.fonds.length : ''})</span>
                  </Link>
                </li>
              )}>
            </Route>
              {/* <li>
                <Icon type="heart"/>
                <span>我的喜欢 ({ cUserInfo.fonds ? cUserInfo.fonds.length : ''})</span>
              </li> */}
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