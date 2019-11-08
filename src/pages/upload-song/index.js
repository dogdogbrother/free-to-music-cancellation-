import React, { useState } from 'react'
import { Upload, message, Button, Icon, Form, Input } from 'antd';

import http from '../../api'
import './style.scss'

const UpdataSong = (props)=> {

  const [ imageUrl, setImageUrl ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ songPath, setSongPath ] = useState(null);

  const updateProps = {
    name: 'file',
    action: 'spi/music/updatesong',
    headers: {
      Authorization: 'Bearer ' + document.cookie.split('oken=')[1]
    },
    accept:'.mp3,.flac,.wma',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setSongPath(info.file.response.data)
      } else if (info.file.status === 'error') {
        setSongPath(null)
      }
    },
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setImageUrl(imageUrl)
        setLoading(true);
      });
    }
  };
  
  const handleSubmit = e =>{
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (!songPath) return message.error(`请先上传歌曲!`);
        http({
          method:'post',
          url:'/spi/music/updatemusic',
          parm:{ ...values, songPath},
          loding:'上传中'
        }).then(res=>{
          message.success('上传成功');
        }).catch( error => {
          message.error('上传失败')
        })
      }
    })
  }
  const { getFieldDecorator } = props.form

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return(
    <div className="update-page">
      
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          <Upload {...updateProps}>
            <Button>
              <Icon type="upload" />上传歌曲
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('songName', {
            rules: [{ required: true, message: '歌曲不能为空' }],
          })(
            <Input
              prefix={<Icon type="customer-service" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="歌曲名称"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('author', {
            rules: [{ required: true, message: '歌手不能为空' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="歌手"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('describe')(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="歌曲描述"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
  
}



const WrappedUpdate = Form.create({ name: 'update_song' })(UpdataSong);

export default WrappedUpdate






// let client = new OSS({
      //   region: 'oss-cn-hangzhou',
      //   accessKeyId: 'LTAI4FovhkFEKifXapYhrJGf',
      //   accessKeySecret: '0WZwmxQ86rW3O42gb9CSoguBYY0jN6',
      //   // bucket: 'public-read-write',
      //   bucket:'music-song'
      // })
      
      
    //   // client().multipartUpload('测试上传一个mp4',reader.result)