/** @format */
const path = require( 'path' );
const webpack = require( 'webpack' );
const LodashModuleReplacementPlugin = require( 'lodash-webpack-plugin' );

module.exports = {
	entry: './index.js',
	output: {
		filename: './targets/wordpress/assets/happychat.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				include: [ path.resolve( __dirname, 'src' ), path.resolve( __dirname, 'targets' ) ],
			},
		],
	},
	plugins: [
		new LodashModuleReplacementPlugin(),
		new webpack.DefinePlugin( {
			'process.env.NODE_ENV': JSON.stringify( 'development' ),
		} ),
	],
	resolve: {
		extensions: [ '.js', '.jsx' ],
		modules: [ path.resolve( __dirname ), path.resolve( __dirname, 'node_modules' ) ],
	},
};
