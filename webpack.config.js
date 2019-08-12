const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry:'./src/main.js',
    mode:'development',
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
    ],
    devServer:{
        contentBase:'./dist',
        open:true
    },
    optimization:{
        usedExports:true
    }
}