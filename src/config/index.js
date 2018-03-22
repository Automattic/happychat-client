/** @format */
/**
 * External dependencies
 */
import merge from 'lodash/merge';

/**
 * Internal dependencies
 */
import createConfig from '../lib/create-config';

let configFile;
if ( 'development' === process.env.NODE_ENV ) {
	configFile = require( './development.json' );
	try {
		// check if we have local git ignored config and use it to override the development.json
		const localConfig = require( './development.local.json' );
		merge( configFile, localConfig );
	} catch ( e ) {}
} else {
	configFile = require( './production.json' );
}

export default createConfig( configFile );
