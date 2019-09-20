/**
  hooks的值有
    1. platform,0为QQ音乐/1为网易云音乐/2为林悦台
 */
import React, { useState } from 'react'
import { Typography, Input, Radio  } from 'antd';
import './style.scss'
import { withRouter } from "react-router-dom";
const DefaultSearchPage = ()=> {
  const { Search } = Input;
  const [platform, setPlatform] = useState(0);
  /**
   * 
   */
  const handlerSearch = (searchVlue,history)=> {  
    //点击搜索按钮时执行此函数,给新路由带上搜索的 search 值和 platform 值
    if (platform === 0) {
      history.push({ pathname:'qq-search-result', state:{ searchVlue, platform }})
    }else if(platform === 1){
      history.push({ pathname:'wy-search-result', state:{ searchVlue, platform }})
    }else{

    }
    
  }
  const SearchButton = withRouter(({history})=>{
    return (
      <Search
        placeholder="暂时只支持搜索歌曲名称"
        enterButton="搜索"
        size="large"
        onSearch={value => { handlerSearch(value,history) }}
        style={{ width: 280 }}
      />
    )
  })
  return(
    <div className="default-search-page">
      <Presentation/>
      <div className="search-box">
        <div className="m-b-20">
          <SearchButton/>
        </div>
        <div>
          <Radio.Group defaultValue={platform} buttonStyle="solid" onChange={(evnt)=>{setPlatform(evnt.target.value)}}>
            <Radio.Button value={0}>QQ音乐</Radio.Button>
            <Radio.Button value={1}>网易云音乐</Radio.Button>
            <Radio.Button value={2} disabled>林悦台</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    </div>
  )
}

/**
 * 搜索页面的介绍组件
 */
const Presentation = ()=> {
  const { Title, Paragraph, Text } = Typography
  return(
    <div className="presentation">
      <div>
        <Title level={2}>搜索功能介绍</Title>
        <Paragraph>
          你可以通过选择下面的按钮来控制你搜索的结果来源是<Text strong> 网易云音乐 </Text>还是<Text strong> QQ音乐 </Text>.
          如果因为 <Text mark>版权</Text> 或是 <Text mark>封禁原因</Text> 而搜索不到歌曲或是播放不成功时,可以选择 <Text strong> 林悦台 </Text>试一试.
        </Paragraph>
        <Paragraph>
          <Text strong> 林悦台 </Text>是我个人的服务器,里面上传了一些百度云下载的音乐,目前已上传的有 <Text underline>周杰伦</Text> 的大部分歌曲, <Text underline>李志</Text> 的全部歌曲.
          如果后续有时间也同样能力的话,我会写一个上传接口,提供用户自定义上传歌曲.
        </Paragraph>
      </div>
    </div>
  )
}

/**
 *搜索页面的搜索功能组件
 */
export default DefaultSearchPage