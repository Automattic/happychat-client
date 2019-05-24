/* @format */
const webpack = require( 'webpack' );
const path = require( 'path' );

const env = process.env.NODE_ENV;

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
				include: [ path.resolve( __dirname, 'src' ), path.resolve( __dirname, 'targets' ) ],
			},
		],
	},
	resolve: {
		extensions: [ '.js', '.jsx' ],
		modules: [ path.resolve( __dirname ), path.resolve( __dirname, 'node_modules' ) ],
	},
	plugins: [
		new webpack.DefinePlugin( {
			'process.env.NODE_ENV': JSON.stringify( env ),
		} ),
	],
}