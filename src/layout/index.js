/**
 * 作为layout入口文件,整合了三个内容,分别是
 * 左侧的list菜单.
 * 右侧的内容,路由子页面,
 * 下面的播放界面
 * 
 * 其中点击左侧联动右侧,点击右侧里面的播放部分联动底部.点击底部什么都不联动
 * 
 * 除了布局之外，这个根组件页面还承担着axios请求个人信息的功能
 */
import React from 'react'
import Aside from './aside'
import LayoutMain from './main'
import Login from '../components/login'
import AudioPlay from '../components/audio-play'
import { BrowserRouter as Router } from 'react-router-dom'
import { useObservable } from 'rxjs-hooks'
import { loginStatus, updateUserInfo } from '../rxStore/user'
import http from '../api/index'
import './style.scss'
const Layout = () => {
  let currentLoginStatus = useObservable(() => loginStatus.asObservable()) || loginStatus.status
  if (!currentLoginStatus) return(<></>)
  http({
    url:'/spi/user/info',
    loding:'正在获取个人信息'
  }).then(res=>{
    updateUserInfo({ ...res, loginStatus: true })
  })
  return(
    <Router>
      <section className="layout-box">
        <Aside></Aside>
        <LayoutMain></LayoutMain>
      </section>
      <section className="layout-footer">
        <AudioPlay />
      </section>
      { currentLoginStatus.status ? <Login /> : '' }
    </Router>
  )
}
export default Layout
