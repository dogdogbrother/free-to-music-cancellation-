import axios from 'axios'
import { message } from 'antd'

if (document.cookie && document.cookie.split('oken=')[1]) {
  // 这个地方拿到cokie中的token值,再赋值到 Authorization 头中
  axios.interceptors.request.use(
    config => {
      config.headers["Authorization"] = 'Bearer ' + document.cookie.split('oken=')[1]
      return config
    },
    function (error) {
      return Promise.reject(error) 
    }
  )
}

// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response.status === 401) {
//       message.warning('暂无权限操作,请登陆');
//     }else {
//       return Promise.reject(error)
//     }
    
//   }
// )

class Http {
  http({ url, method="get", parm={}, loding="" }) {
    return new Promise((resolve, reject) => {
      const hide = message.loading(loding, 0);
      axios({
        method,
        url,
        data:parm,
        'responseType': 'json'
      }).then(res => {
        hide()
        resolve(res.data)
      }).catch(error => {
        hide()
        if (error.response.status === 401) {
          message.warning('暂无权限操作,请登陆');
        }else {
          return Promise.reject(error)
        }
        reject({
          msg: error
        })
      })
    })
  }
}
let http = new Http()
export default http.http