const path = require( 'path' );

module.exports = {
	entry: './targets/standalone/index.js',
	output: {
		filename: './targets/standalone/public/happychat.js'
	},
	module: {
		rules: [ { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' } ]
	},
	resolve: {
		modules: [ path.resolve( '.' ), 'node_modules' ],
		extensions: [ '.js', '.jsx' ]
	},
	devServer: {
		contentBase: './targets/standalone/public',
		compress: true,
		port: 9000,
		hot: true
	}
};
