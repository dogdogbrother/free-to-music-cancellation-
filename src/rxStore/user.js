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
  fonds:[],
  name:'',
  _id:'',
  avatar_url:''
})

export const resetUserInfo = () => {
  userInfo.next({
    loginStatus: false, //默认是未登录状态
    accountName:'',
    gender:'',
    fonds:[],
    name:'',
    _id:'',
    avatar_url:''
  })
}

// 单纯的更新个人信息资料
export const updateUserInfo = (obj) => {
  let value = userInfo.value
  userInfo.next({
    ...value,
    ...obj
  })
}

//就是添加我的喜欢的歌曲
export const addUserFonds = (obj) => {
  let value = userInfo.value
  if(!value.fonds.find(item=>item.id===obj.id)){
    value.fonds.push(obj)
    userInfo.next({
      ...value,
    })
  }
}

//这个其实是delete，但是操作的方式是全部替换，所以叫做 update
export const updateUserFonds = (songArr) => {
  let value = userInfo.value
  value.fonds = songArr
  userInfo.next({
    ...value,
  })
}
