/** @format */
/**
 * External dependencies
 */
import merge from 'lodash/merge';

/**
 * Internal dependencies
 */
import createConfig from 'src/lib/create-config';

let configFile;
if ( 'development' === process.env.NODE_ENV ) {
	configFile = require( 'src/config/development.json' );
	try {
		// check if we have local git ignored config and use it to override the development.json
		const localConfig = require( 'src/config/development.local.json' );
		merge( configFile, localConfig );
	} catch ( e ) {}
} else {
	configFile = require( 'src/config/production.json' );
}

export default createConfig( configFile );
