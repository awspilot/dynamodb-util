const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	node: false,
	mode: 'production',
	target: 'node',
	context: path.resolve(__dirname, 'src'),
	optimization: {
		minimize: true,
		minimizer: [new UglifyJsPlugin({
			//uglifyOptions: { ecma: 7 },
			//sourceMap: true,
			include: /\.min\.js$/
		})]
	},
	plugins: [
	],
	entry: {
		'awspilot-dynamodb-util.browser': path.resolve(__dirname, './src/index.js'),
		'awspilot-dynamodb-util.browser.min': path.resolve(__dirname, './src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: 'ractive-dynamodb-util',

		// var, this, window, umd
		libraryTarget: 'umd',
		libraryExport: 'default',
		umdNamedDefine: true   // Important
	},
	externals: {
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ifdef-loader",
						options: {
							BROWSER: true,
						}
					},
					{loader: 'babel-loader'},
				]
			}
		]
	}
}
