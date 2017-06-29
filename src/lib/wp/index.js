/**
 * External dependencies
 */
import request from 'wpcom-xhr-request';

const debug = require( 'debug' )( 'happychat-embedded:wpcom' );

export const getUser = token =>
	new Promise( ( resolve, reject ) => {
		if ( ! token ) {
			return reject( 'There is no token' );
		}

		debug( 'Fire request getUser' );
		request(
			{
				method: 'GET',
				apiNamespace: 'rest/v1',
				path: '/me',
				authToken: token
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

export const startSession = token =>
	new Promise( ( resolve, reject ) => {
		if ( ! token ) {
			return reject( 'There is no token' );
		}

		debug( 'Fire request startSession' );
		request(
			{
				method: 'POST',
				apiNamespace: 'rest/v1',
				path: '/happychat/session',
				authToken: token
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

export const sign = ( payload, token ) =>
	new Promise( ( resolve, reject ) => {
		if ( ! token ) {
			return reject( 'There is no token' );
		}

		debug( 'Fire request sign' );
		request(
			{
				method: 'POST',
				apiNamespace: 'rest/v1',
				path: '/jwt/sign',
				authToken: token,
				body: { payload: JSON.stringify( payload ) }
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
