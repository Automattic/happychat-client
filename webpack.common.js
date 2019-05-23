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
				include: [ path.resolve( __dirname, 'src' ), path.resolve( __dirname, 'targets' ) ],
			},
			{
				test: /\.(gif|png|jpe?g|svg|mp4|wav)$/i,
				use: {
					loader: 'file-loader',
					options: { name: '[ext]/[name]-[md5:hash:hex:8].[ext]' },
				},
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