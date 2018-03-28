/** @format */

/**
 * External dependencies
 */
import wpComRequest from 'wpcom-xhr-request';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import { WPcomStrategy } from './index';

/**
 * Module variables
 */
const debug = debugFactory( 'happychat-client:standalone:get-wpcom-user' );
const oAuth = require( 'wpcom-oauth-cors' )( '54006' );

export default class WPcomOAuth extends WPcomStrategy {
	constructor( auth ) {
		super( auth.type );
		this.options = auth.options;
		this.token = null;
	}

	_prepareParams( args ) {
		args.authToken = this.getToken();
		return args;
	}

	_createAuthenticatedRequest( token ) {
		return ( args ) => {
			return new Promise( ( resolve, reject ) => {
				if ( ! token ) {
					return reject( `Authentication ${ this.type } error: token is missing` );
				}

				const responseHandler = ( error, body ) => {
					if ( error ) {
						debug( `Request ${ args.method }:${ args.path } failed with : ${ error }` );
						return reject( error );
					}

					debug( `${ args.method }:${ args.path } response ${ body }` );
					return resolve( body );
				};

				wpComRequest( this._prepareParams( args ), responseHandler );
			} );
		};
	}

	_request() {
		// this will be overloaded at login
		return Promise.reject( `Authentication ${ this.type } error: user not authenticated.` );
	}

	_getToken() {
		return this.token;
	}

	setToken( token ) {
		this.token = token;
	}

	login() {
		const token = this._getToken();
		if ( token ) {
			// overload the request method to an authenticated promisified xhr request
			this._request = this._createAuthenticatedRequest( token );

			// bail if already authenticated
			return Promise.resolve( token );
		}

		return new Promise( ( resolve, reject ) => {
			oAuth.get( ( auth ) => {
				if ( ! auth || ! auth.access_token ) {
					reject( `Authentication ${ this.type } error: token is missing` );
				}

				// overload the request method to an authenticated promisified xhr request
				this._request = this._createAuthenticatedRequest( auth.access_token );

				this.setToken( auth.access_token );
				resolve( auth.access_token );
			} );
		} );
	}

	// API endpoints
	//////////////////////////////////////////////////////////////////////////////////////////
	getUser() {
		return this.request( {
			method: 'GET',
			apiNamespace: 'rest/v1.1',
			path: '/me',
		} );
	}

	signJWT( payload ) {
		return this.request( {
			method: 'POST',
			apiNamespace: 'rest/v1',
			path: '/jwt/sign',
			body: { payload: JSON.stringify( payload ) },
		} );
	}

	startChat() {
		return this.request( {
			method: 'POST',
			apiNamespace: 'rest/v1',
			path: '/happychat/session',
		} );
	}
}
