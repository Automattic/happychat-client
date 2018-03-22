/** @format */
const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
	entry: './targets/standalone/index.js',
	output: {
		filename: 'happychat.js',
		path: path.resolve( __dirname, 'targets/standalone' ),
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
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin( {
			'process.env.NODE_ENV': JSON.stringify( 'development' ),
		} ),
	],
	resolve: {
		extensions: [ '.js', '.jsx' ],
		modules: [ path.resolve( __dirname ), path.resolve( __dirname, 'node_modules' ) ],
	},
	devServer: {
		contentBase: path.resolve( __dirname, 'targets/standalone' ),
		publicPath: '/',
		port: 9000,
	},
};
