const proxy = require('http-proxy-middleware')



module.exports = function(app) {
  app.use(proxy('/wpi', { 
    target: 'http://49.233.185.168:3000/',
    changeOrigin:true,
    pathRewrite: {
      "^/wpi": "/"
    }
  }))
  app.use(proxy('/spi', {   // spi 的s就是森林的意思,我自己的接口
    // target: 'http://49.233.185.168:3004/',
    target: 'http://localhost:3004',
    changeOrigin:true,
    pathRewrite: {
      "^/spi": "/"
    }
  }))
}
