/** @format */
const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
	entry: './targets/npm/index.js',
	output: {
		filename: './targets/npm/happychat.js',
		library: 'HappychatClient',
		libraryTarget: 'umd',
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
		new webpack.DefinePlugin( {
			'process.env.NODE_ENV': JSON.stringify( 'production' ),
		} ),
	],
	resolve: {
		extensions: [ '.js', '.jsx' ],
		modules: [ path.resolve( __dirname ), path.resolve( __dirname, 'node_modules' ) ],
	},
};
