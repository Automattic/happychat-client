/** @format */

/**
 * External dependencies
 */
import request from 'wpcom-xhr-request';
import debugFactory from 'debug';

const debug = debugFactory( 'happychat-client:standalone:get-wpcom-user' );

export default accessToken =>
	new Promise( ( resolve, reject ) => {
		if ( ! accessToken ) {
			return reject( 'There is no token' );
		}

		debug( 'Fire request getUser' );
		request(
			{
				method: 'GET',
				apiNamespace: 'rest/v1',
				path: '/me',
				authToken: accessToken,
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
