const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry:'./src/main.js',
    output:{
        filename:'buld.js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin(
            {
                template:'./index.html'
            }
        ),
        new CleanWebpackPlugin()
    ]
}