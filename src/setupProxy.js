const proxy = require('http-proxy-middleware')



module.exports = function(app) {
  app.use(proxy('/qpi', { 
    // target: 'https://bird.ioliu.cn/v1?url=https://c.y.qq.com/',
    target: 'https://c.y.qq.com/',
    changeOrigin:true,
    pathRewrite: {
      "^/qpi": "/"
    }
  }))
  app.use(proxy('/wpi', { 
    target: 'http://148.70.108.11:3000/',
    changeOrigin:true,
    pathRewrite: {
      "^/wpi": "/"
    }
  }))
}
