/**
 * 因为思前想后,还是模仿的QQ音乐的客户端的UI/交互/布局
 * 作为入口,需要有 layout 管理大体的显示内容
 * 如果有其他的路由内容,再添加
 */
import React from 'react';
import LayoutBox from './layout'
import './style/reset-style.css'
import './style/public-use.css'
import './style/and-style.css'

function App() {
  return (
    <div className="App">
      <LayoutBox></LayoutBox>
    </div>
  );
}

export default App;
