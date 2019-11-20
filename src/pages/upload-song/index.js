import React, { useState } from 'react'
import { Upload, message, Button, Icon, Form, Input, Modal } from 'antd';

import http from '../../api'
import './style.scss'

const UpdataSong = (props)=> {

  const [ imageUrl, setImageUrl ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ songPath, setSongPath ] = useState(null); 
  const [ coverPath, setCoverPath ] = useState('');

  const { confirm } = Modal;
  
  const Authorization = 'Bearer ' + document.cookie.split('oken=')[1];
  
  const updateProps = {
    name: 'file',
    action: 'spi/music/updatesong',
    headers: {
      Authorization
    },
    accept:'.mp3,.flac,.wma',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        setSongPath(null)
      }
      if (info.file.status === 'done') {
        setSongPath(info.file.response.data.path)
      } else if (info.file.status === 'error') {
        message.error('上传歌曲失败,请检查是否已登陆');
        setSongPath(null)
      }
    },

  };

  const updateImage = {
    name:"avatar",
    listType:"picture-card",
    className:"avatar-uploader",
    showUploadList:false,
    action:"/spi/music/updatecover",
    accept:'.jpg,.jpeg,.png',
    headers: {
      Authorization
    },
    onChange:info => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        setCoverPath('');
        return;
      }
      if (info.file.status === 'done') {
        setCoverPath(info.file.response.data)
        getBase64(info.file.originFileObj, imageUrl =>{
          setImageUrl(imageUrl)
          setLoading(true);
        });
      }else if (info.file.status === 'error') {
        message.error('上传图片失败,请检查是否已登陆');
        setLoading(false);
      }
    }
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  const handleSubmit = e =>{
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (!songPath) return message.error(`请先上传歌曲!`);
        postUpdateMusic(values, false);
      }
    })
  }

  const postUpdateMusic = (values, verify) => {
    http({
      method:'post',
      url:'/spi/music/updatemusic',
      parm:{ ...values, songPath, coverPath, verify},
      loding:'上传中'
    }).then(res=>{
      if (res.code === 100) {
        message.success('上传成功');
      } else if (res.code === 201) {
        confirm({
          title: '提示',
          content: res.msg,
          onOk() {
            postUpdateMusic(values, true)
          },
        });
        
      }
      
    }).catch( () => {
      message.error('上传失败')
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
          <Upload {...updateImage}>
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