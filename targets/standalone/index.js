/** @format */

/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import config from 'src/config';
import getUser from 'targets/standalone/get-wpcom-user';
import { renderTo } from 'targets/standalone/api-wrapper';

const wpcomOAuth = require( 'wpcom-oauth-cors' )( config( 'oauth_client_id' ) );
const debug = debugFactory( 'happychat-embedded:api' );

debug( 'get token from wpcom' );
wpcomOAuth.get( () => {
	/* eslint-disable camelcase */
	debug( 'get user info from wpcom' );
	getUser()
		.then( ( { ID, email, username, display_name, avatar_URL, language } ) => {
			debug( 'render Happychat' );
			// it is the host responsibility to set the groups on init, although that
			// although that data is not in the wpcom API response
			renderTo( 'root', {
				ID,
				email,
				username,
				display_name,
				avatar_URL,
				language,
				groups: [ 'wpcom' ],
			} );
		} )
		.catch( error => {
			debug( 'could not get user info: ', error );
		} );
	/* eslint-enable camelcase */
} );
