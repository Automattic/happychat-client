const path = require( 'path' );

module.exports = {
	entry: './targets/wordpress/index.js',
	output: {
		filename: './targets/wordpress/public/happychat.js'
	},
	module: {
		rules: [ { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' } ]
	},
	resolve: {
		modules: [ path.resolve( '.' ), 'node_modules' ],
		extensions: [ '.js', '.jsx' ]
	}
};
