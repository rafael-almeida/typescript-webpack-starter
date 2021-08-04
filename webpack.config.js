require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.WEBPACK_MODE;

if (mode !== 'development' && mode !== 'production') {
	throw new Error('invalid mode settings.');
}

console.log(`Webpack ${mode} mode`);

module.exports = {
	mode: mode,
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: './dist',
		hot: true,
	},
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.tsx?/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new CopyPlugin({
			patterns: [{ from: './src/assets', to: 'assets', noErrorOnMissing: true }],
		}),
	],
};
