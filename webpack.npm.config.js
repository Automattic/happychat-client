/** @format */
const path = require( 'path' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );

const env = process.env.NODE_ENV;

const config = {
	entry: './src/api.js',
	output: {
		filename: 'happychat.js',
		path: path.resolve( __dirname, 'targets/npm' ),
	},
	plugins: [],
};

switch ( env ) {
	case 'development':
		config.mode = 'development';
		config.devtool = 'source-map';
		config.devServer = {
			contentBase: path.resolve( __dirname, 'targets/npm' ),
			publicPath: '/',
			port: 9000,
		};
		break;

	case 'production':
		config.mode = 'production';
		config.plugins.push( new UglifyJsPlugin( { parallel: true, extractComments: true } ) );
		break;
}

module.exports = merge( common, config );
