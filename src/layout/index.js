/**
 * 作为layout入口文件,整合了三个内容,分别是
 * 左侧的list菜单.
 * 右侧的内容,路由子页面,
 * 下面的播放界面
 * 
 * 其中点击左侧联动右侧,点击右侧里面的播放部分联动底部.点击底部什么都不联动
 */
import React from 'react'
import Aside from './aside'
import LayoutMain from './main'
import Footer from './footer'
import './style.scss'

const Layout = () => {
  return(
    <div>
      <section className="layout-box">
        <Aside></Aside>
        <LayoutMain></LayoutMain>
      </section>
      
    </div>
  )
}
export default Layout
