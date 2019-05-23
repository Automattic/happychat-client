/** @format */
const path = require( 'path' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );

const env = process.env.NODE_ENV;

const config = {
	entry: './targets/wordpress/index.js',
	output: {
		filename: 'happychat.js',
		path: path.resolve( __dirname, 'targets/wordpress/assets' ),
	},
	resolve: {
		extensions: [ '.js', '.jsx' ],
		modules: [ path.resolve( __dirname ), path.resolve( __dirname, 'node_modules' ) ],
	},
	plugins: [],
};

switch ( env ) {
	case 'development':
		config.mode = 'development';
		config.devtool = 'source-map';
		config.devServer = {
			contentBase: path.resolve( __dirname, 'targets/wordpress' ),
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
