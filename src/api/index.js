import axios from 'axios'
import { message } from 'antd'

class Http {
  http({ url, method="get", parm={}, loding="" }) {
    return new Promise((resolve, reject) => {
      const hide = message.loading(loding, 0);
      if (document.cookie) {
        // 这个地方拿到cokie中的token值,再赋值到 Authorization 头中
        let token = document.cookie.split('oken=')[1]
        axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
      }
      axios({
        method,
        url,
        data:parm,
        'responseType': 'json'
      }).then(res => {
        hide()
        resolve(res.data)
      }).catch( error => {
        hide()
        reject({
          msg: error
        })
      })
    })
  }
}
let http = new Http()
export default http.http