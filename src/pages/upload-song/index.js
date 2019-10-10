import React from 'react'
import { Button } from 'antd';
// import OSS from 'ali-oss'

import './style.scss'
import { file } from '@babel/types';

const SongMenu = ()=> {

  

  const updateFn = ()=> {
    // let client = new OSS({
    //   region: 'oss-cn-hangzhou',
    //   accessKeyId: 'LTAI4FovhkFEKifXapYhrJGf',
    //   accessKeySecret: '0WZwmxQ86rW3O42gb9CSoguBYY0jN6',
    //   // bucket: 'public-read-write',
    //   bucket:'music-song'
    // })
    // client.multipartUpload('123').then(res=>{

    // })
    // new File()
    console.log('我就测试下');
    
    let reader = new FileReader();
    reader.onload = function(ev) {
      console.log(ev);
      
    }
    
    
  }
  return(
    <div className="update-page">
      <label htmlFor="fileinp" >
        <Button type="primary" shape="round" icon="upload" size="large">请选择歌曲进行上传</Button>
        <input type="file" name="" id="fileinp" onChange={updateFn(file)}/>
      </label>
    </div>
  )
}

export default SongMenu