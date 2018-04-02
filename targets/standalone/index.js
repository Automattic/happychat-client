/** @format */

/**
 * Internal dependencies
 */
import api from 'src/api';
import config from 'targets/standalone/config';

const wpcomOAuth = require( 'wpcom-oauth-cors' )( config( 'oauth_client_id' ) );

// expose the access token promise
window.HappychatAccessTokenPromise = () =>
	new Promise( ( resolve ) => {
		wpcomOAuth.get( () => {
			resolve( wpcomOAuth.token().access_token );
		} );
	} );

// expose the happychat api
window.Happychat = api;
