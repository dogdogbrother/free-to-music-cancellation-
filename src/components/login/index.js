import React, { useState } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import axios from 'axios'
import http from '../../api'
import { setLoginStatus, updateUserInfo } from '../../rxStore/user'

import './style.scss'

const Login = (props)=> {
  const [ isLogin, setIsLogin ] = useState(true);
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        if (isLogin) {  //假如 isLogin 是true,就代表是登陆,否则就是注册
          http({
            method:'post',
            url:'/spi/login',
            parm:values,
            loding:'登陆中'
          }).then(res=>{
            message.success('登陆成功');
            setLoginStatus(false)
            updateUserInfo({ ...res.user, loginStatus: true })
          }).catch( error => {
            message.error('账号密码错误')
          })
        }else{
          if (values.password !== values.affirmPassword) {
            return message.error('密码不一致,请检查')
          }
          http({
            method:'post',
            url:'/spi/register',
            parm:values
          }).then(res=>{
            message.success('注册成功,请登录')
            values.name = ''
            values.password = ''
            values.affirmPassword = ''
            setIsLogin(true)
          }).catch(err=>{
            message.error('注册失败')
          })
        }
      }
    });
  }
  const { getFieldDecorator } = props.form
  return(
    <div className="login-wrapper">
      <div className="box">
        <div className="wrapper-header d-f-b">
          <span>{ isLogin ? '登录' : '注册'}</span>
          <Icon type="close" className="icon c-p" onClick={ () => { setLoginStatus(false) } }/>
        </div>
        {
          isLogin ?
          <div className="login">
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '用户名不能为空' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="name"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '密码不能为空' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"

                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form.Item>
            </Form>
            <div className="d-f opreation">
                <span className="m-r-20 c-p" onClick={()=>{setIsLogin(false)}}>注册</span>
                <span className="c-p">忘记密码</span>
            </div>
          </div>
          :
          <div className="register">
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '用户名不能为空' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '密码不能为空' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="密码"
                    type="password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('affirmPassword', {
                  rules: [{ required: true, message: '确认密码不能为空' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请确认密码"
                    type="password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form.Item>
            </Form>
            <div className="d-f opreation">
                <span className="m-r-20 c-p" onClick={()=>{setIsLogin(true)}}>已有账户去登录</span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);
export default WrappedLogin