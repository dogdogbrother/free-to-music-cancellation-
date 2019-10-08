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