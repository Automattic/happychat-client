/** @format */

/**
 * Internal dependencies
 */
import createConfig from 'src/lib/create-config';

let configFile;
if ( 'development' === process.env.NODE_ENV ) {
	configFile = require( 'src/config/development.json' );
} else {
	configFile = require( 'src/config/production.json' );
}

export default createConfig( configFile );
