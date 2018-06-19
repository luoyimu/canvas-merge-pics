/*
* @Author: luominting
* @Date:   2018-06-07 18:47:42
* @Last Modified by:   luominting
* @Last Modified time: 2018-06-19 18:46:48
*/
console.log(__dirname)
let webpack = require('webpack')
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './merge.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{test: /\.js$/,loader: 'babel-loader'}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './merge.html'
		})
	]
}