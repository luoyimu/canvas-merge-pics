/*
* @Author: luominting
* @Date:   2018-06-08 11:34:45
* @Last Modified by:   luominting
* @Last Modified time: 2018-06-08 11:44:25
*/
let config = require('./webpack.config.js')
let webpack = require('webpack')
let WebpackDevServer = require('webpack-dev-server')

let server = new WebpackDevServer(webpack(config),{
	publicPath: '',
	stats: {
		colors: true
	}
})

server.listen(8099)