const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const webpack = require( 'webpack' );
const { resolve, join } = require( 'path' );

module.exports = {
	devtool: 'sourcemap',
	entry: {
		vendor: [ 'jquery', './src/jquery.wpcom-proxy-request.js' ],
		app: './src'
	},
	output: {
		path: resolve( './dist' ),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loaders: [ 'babel-loader' ] }
		]
	},
	resolve: {
		extensions: [ '.', '.js', '.jsx' ]
	},
	plugins: [
		new HtmlWebpackPlugin( { title: 'HUD', hash: true } ),
		new webpack.ProvidePlugin( {
			React: 'react',
		} ),
	],
	devServer: {
		historyApiFallback: true
	}
};
