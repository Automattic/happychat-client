/** @format */

/**
 * Internal dependencies
 */
import api from 'src/api';
import config from 'src/config';

const wpcomOAuth = require( 'wpcom-oauth-cors' )( config( 'example_oauth_client_id' ) );

// expose wpcom oauth package
window.wpcomOAuth = wpcomOAuth;

// expose the happychat api
window.Happychat = api;
