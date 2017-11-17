/** @format */

/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import { renderTo } from 'targets/standalone/api-wrapper';
import config from 'src/config';

const wpcomOAuth = require( 'wpcom-oauth-cors' )( config( 'oauth_client_id' ) );
const debug = debugFactory( 'happychat-embedded:api' );

debug( 'get token' );
wpcomOAuth.get( () => {
	debug( 'load Happychat' );
	renderTo( 'root' );
} );
