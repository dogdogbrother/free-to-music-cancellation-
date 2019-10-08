const proxy = require('http-proxy-middleware')



module.exports = function(app) {
  app.use(proxy('/qpi', { 
    target: 'http://148.70.108.11:8080/',
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
  app.use(proxy('/spi', {   // spi 的s就是森林的意思,我自己的接口
    target: 'http://localhost:3030/',
    changeOrigin:true,
    pathRewrite: {
      "^/spi": "/"
    }
  }))
}
