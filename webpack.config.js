const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		babelpolyfill: '@babel/polyfill',
		index: './src/js/main.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js',
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},


		host: '0.0.0.0', // или ваш публичный адрес
        port: 4000, // или любой другой порт
        allowedHosts: 'all', 


	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
};
