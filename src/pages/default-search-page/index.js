/**
  hooks的值有
    1. platform,0为QQ音乐/1为网易云音乐/2为林悦台
 */
import React, { useState } from 'react'
import { Typography, Input, Radio  } from 'antd';
import './style.scss'
import { withRouter } from "react-router-dom";
const { Title, Paragraph, Text } = Typography
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
      history.push({ pathname:'sl-search-result', state:{ searchVlue, platform }})
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
        <div className="m-b-20">
          <Radio.Group defaultValue={platform} buttonStyle="solid" onChange={(evnt)=>{setPlatform(evnt.target.value)}}>
            <Radio.Button value={0}>QQ音乐</Radio.Button>
            <Radio.Button value={1}>网易云音乐</Radio.Button>
            <Radio.Button value={2}>林悦台</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          { platform === 0 && <QqExplain/> }
          { platform === 1 && <WyExplain/> }
          { platform === 2 && <SlExplain/> }
        </div>
      </div>
    </div>
  )
}

/**
 * 搜索页面的介绍组件
 */
const Presentation = ()=> {
  return(
    <div className="presentation">
      <div>
        <Title level={2}>搜索功能介绍</Title>
        <Paragraph>
          你可以通过选择下面的按钮来控制你搜索的结果来源是<Text strong> 网易云音乐 </Text>还是<Text strong> QQ音乐 </Text>.
          如果因为 <Text mark>版权</Text> 或是 <Text mark>封禁原因</Text> 而搜索不到歌曲或是播放不成功时,可以选择 <Text strong> 林悦台 </Text>试一试.
        </Paragraph>
        <Paragraph>
          <Text strong> 林悦台 </Text>是我个人的服务器,你可以在<Text strong>上传歌曲</Text>页面去上传歌曲资源,然后就能搜索到了,目前我已经长传了部分的<Text underline>周杰伦</Text> 歌曲,和 <Text underline>李志</Text> 的歌曲.
        </Paragraph>
      </div>
    </div>
  )
}

/**
 *搜索页面的搜索功能组件
 */
const QqExplain = () => {
  return(
    <div>
      <Title level={2}>QQ音乐的说明</Title>
      <Paragraph>
        你有可能会<Text strong> 播放失败 </Text>是因为有些曲目因为版权问题无法找到资源,而且已经可以播放的歌曲链接也会因为时间而KEY值过期,暂时这样,后面我再想办法优化.如果你发现播放失败,请在播放列表中删除它重新播放吧.
      </Paragraph>
    </div>
  )
}
const WyExplain = () => {
  return(
    <div>
      <Title level={2}>网易云音乐的说明</Title>
      <Paragraph>
        相比较恶心的QQ音乐,网易云的接口就很友好了,github上有nodeJS版本的API,绝大功能都有,如果你需要网易云音乐的一些功能,请<Text strong> 私聊我 </Text>或是在<Text strong> 我要提意见 </Text>里面提出
      </Paragraph>
    </div>
  )
}
const SlExplain = () => {
  return(
    <div>
      <Title level={2}>林悦台的说明</Title>
      <Paragraph>
        我服务器中的歌都是超清的,例如周杰伦的歌30MB左右,李志的歌20MB左右,这会导致播放准备时间比较长,请耐心等待下.
      </Paragraph>
    </div>
  )
}

export default DefaultSearchPage