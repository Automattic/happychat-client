/** @format */
const path = require( 'path' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );

const env = process.env.NODE_ENV;

const config = {
	entry: './targets/standalone/index.js',
	output: {
		filename: 'happychat.js',
		path: path.resolve( __dirname, 'targets/standalone' ),
	},
	plugins: [],
};

switch ( env ) {
	case 'development':
		config.mode = 'development';
		config.devtool = 'source-map';
		config.devServer = {
			contentBase: path.resolve( __dirname, 'targets/standalone' ),
			historyApiFallback: {
				index: 'example.html',
			},
			publicPath: '/',
			port: 9000,
		};
		break;

	case 'production':
		config.mode = 'production';
		config.plugins.push(
			new UglifyJsPlugin( {
				parallel: true,
				extractComments: true,
			} )
		);
		break;

	case 'analyze':
		config.mode = 'production';
		config.plugins.push(
			new UglifyJsPlugin( {
				parallel: true,
				extractComments: true,
			} )
		);
		// same as production + bundle analyzer
		config.plugins.push( new BundleAnalyzerPlugin() );
		break;
}

module.exports = merge( common, config );
