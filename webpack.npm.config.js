/** @format */
/**
 * This webpack configuration is only used when developing for the npm target in order to serve
 * this local css file instead of using the one deployed. The javascript npm dist will be generated
 * by `babel-cli`.
 */
const path = require( 'path' );
const webpack = require( 'webpack' );

const env = process.env.NODE_ENV;

const config = {
	entry: './targets/npm/api.js',
	output: {
		filename: 'happychat.js',
		path: path.resolve( __dirname, 'targets/npm' ),
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
			'process.env.NODE_ENV': JSON.stringify( env ),
		} ),
	],
	resolve: {
		extensions: [ '.js', '.jsx' ],
		modules: [ path.resolve( __dirname ), path.resolve( __dirname, 'node_modules' ) ],
	},
};

switch ( env ) {
	case 'development':
		config.devtool = 'source-map';
		config.devServer = {
			contentBase: path.resolve( __dirname, 'targets/npm' ),
			publicPath: '/',
			port: 9000,
		};
		break;
}

module.exports = config;
