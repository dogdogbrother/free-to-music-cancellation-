import React from 'react'
import { Button } from 'antd';
// import OSS from 'ali-oss'
import axios from 'axios'

import './style.scss'

const SongMenu = ()=> {

  
  const updateFn = async (val)=> {
    //先处理文件问题，得到数据的名字和内容
    let file = val.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result)
      //加载完成了，开始执行 oss 了

      // let client = new OSS({
      //   region: 'oss-cn-hangzhou',
      //   accessKeyId: 'LTAI4FovhkFEKifXapYhrJGf',
      //   accessKeySecret: '0WZwmxQ86rW3O42gb9CSoguBYY0jN6',
      //   // bucket: 'public-read-write',
      //   bucket:'music-song'
      // })
      
      
      // client().multipartUpload('测试上传一个mp4',reader.result)

      axios.post('/spi/user/updatesong',{song:reader.result}).then(res=>{
        console.log(res);
        console.log('测试是否上传成功了');
      })
      
    }

    
    
    // new File()
    
    // let fileBtn = document.querySelector('#fileinp')
    
    



















  }
  return(
    <div className="update-page">
      <label htmlFor="fileinp" >
        <Button type="primary" shape="round" icon="upload" size="large">请选择歌曲进行上传</Button>
        <input type="file" name="" id="fileinp" onChange={ (val)=>{ updateFn(val) } }/>
      </label>
    </div>
  )
}

export default SongMenu