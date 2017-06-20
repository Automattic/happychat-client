const path = require( 'path' );

module.exports = {
	entry: './src/api.js',
	output: {
		filename: './public/happychat.js'
	},
	module: {
		rules: [ { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' } ]
	},
	resolve: {
		modules: [ path.resolve( '.' ), 'node_modules' ],
		extensions: [ '.js', '.jsx' ]
	},
	devServer: {
		contentBase: './public',
		compress: true,
		port: 9000,
		hot: true
	}
};
