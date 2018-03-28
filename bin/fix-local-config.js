#!/usr/bin/env node

/**
 * External dependencies
 */
const fs = require( 'fs' );

const localConfigPath = 'src/config/development.local.json';

// create dummy local config file if it doesn't exist
if ( ! fs.existsSync( localConfigPath ) ) {
	fs.writeFileSync( localConfigPath, '{}' );
}
