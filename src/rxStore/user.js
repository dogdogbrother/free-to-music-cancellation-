import { BehaviorSubject } from "rxjs"

// 这个的目的是控制登陆注册的弹窗的显示与否
export const loginStatus = new BehaviorSubject({
  status: false
})

export const setLoginStatus = (value) => {
  loginStatus.next({
    status: value
  })
}


// 这个就是全局的用户信息，例如有头像，性别，名字啥的
export const userInfo = new BehaviorSubject({
  loginStatus: false, //默认是未登录状态
  accountName:'',
  gender:'',
  fonds:[]
})

export const updateUserInfo = (obj) => {
  let value = userInfo.value
  userInfo.next({
    ...value,
    ...obj
  })
}