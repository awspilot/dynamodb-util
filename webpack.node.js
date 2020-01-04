const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	node: true,
	mode: 'production',
	target: 'node',
	node: {

	},
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
		'awspilot-dynamodb-util.node': path.resolve(__dirname, './src/index.js'),
		'awspilot-dynamodb-util.node.min': path.resolve(__dirname, './src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: 'ractive-dynamodb-util',

		libraryTarget: 'commonjs2',
		libraryExport: 'default',
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
							BROWSER: false,
						}
					},
					{loader: 'babel-loader'},
				]
			}
		]
	}
}
