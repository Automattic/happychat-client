/** @format */
const path = require( 'path' );
const webpack = require( 'webpack' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

const env = process.env.NODE_ENV;

const config = {
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
		config.plugins.push( new UglifyJsPlugin() );
		break;

	case 'analyze':
		config.mode = 'production';
		config.plugins.push( new UglifyJsPlugin() );
		// same as production + bundle analyzer
		config.plugins.push( new BundleAnalyzerPlugin() );
		break;
}

module.exports = config;
