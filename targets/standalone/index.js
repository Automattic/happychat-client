/** @format */

/**
 * Internal dependencies
 */
import api from 'src/api';

const wpcomOAuth = require( 'wpcom-oauth-cors' )( '54006' );

// expose the access token
window.accessTokenPromise = () =>
	new Promise( ( resolve ) => {
		wpcomOAuth.get( () => {
			resolve( wpcomOAuth.token().access_token );
		} );
	} );

// expose the happychat api
window.Happychat = api;
