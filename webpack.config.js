var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	context: __dirname + "/src",
	entry: {
		app: "./js/app.js"
	},
	resolve: {
		root: path.resolve('src/'),
		extensions: ['', '.js', 'scss']
	},
	output: {
		path: __dirname + "/build",
		filename: "js/app-[chunkhash].js",
		hash: true
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},{
			test: /\.scss$/,
			loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
		},{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		},{
			test: /\.(eot|woff|ttf|svg|woff2)$/,
			loader: "file-loader"
		},{
			test: /\.tpl.html$/,
			loader: "raw-loader"
		},{
			test: /\.json$/,
			loader: "json-loader"
		}]
	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors-[chunkhash].js'),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};
