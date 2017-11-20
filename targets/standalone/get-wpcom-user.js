/** @format */

/**
 * External dependencies
 */
import request from 'wpcom-xhr-request';
import wpcomOAuthFactory from 'wpcom-oauth-cors';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import config from 'src/config';

const debug = debugFactory( 'happychat-client:standalone:get-wpcom-user' );
const wpcomOAuth = wpcomOAuthFactory( config( 'oauth_client_id' ) );

export default () =>
	new Promise( ( resolve, reject ) => {
		const token = wpcomOAuth.token();
		if ( ! token ) {
			return reject( 'There is no token' );
		}

		debug( 'Fire request getUser' );
		request(
			{
				method: 'GET',
				apiNamespace: 'rest/v1',
				path: '/me',
				authToken: token.access_token,
			},
			( error, body, headers ) => {
				if ( error ) {
					debug( 'Request failed: ', error );
					return reject( error );
				}

				debug( 'Response: ', body, ' headers ', headers );
				return resolve( body );
			}
		);
	} );
