/** @format */

/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import { WPcomStrategy } from './index';

/**
 * Module variables
 */
const debug = debugFactory( 'happychat-client:standalone:get-wpcom-user' );

export default class WPcomOAuth extends WPcomStrategy {
	constructor( auth ) {
		super( auth.type );
		this.options = auth.options;
	}

	_createAuthenticatedRequest() {
		return ( args ) => {
			return new Promise( ( resolve, reject ) => {
				this.options.proxy.request( args, ( error, response ) => {
					if ( error ) {
						return reject( error );
					}
					resolve( response );
				} );
			} );
		};
	}

	login() {
		// TODO: check how wpcom failures work

		// overload the request method to an authenticated promisified wpcom proxy iframe request
		this.request = this._createAuthenticatedRequest();

		// consider it logged in for now
		return Promise.resolve();
	}

	request() {
		// this will be overloaded at login
		return Promise.reject( `Authentication ${ this.type } error: user not authenticated.` );
	}

	// API endpoints
	//////////////////////////////////////////////////////////////////////////////////////////
	getUser() {
		return this.request( {
			method: 'GET',
			path: '/me',
		} );
	}

	signJWT( payload ) {
		return this.request( {
			method: 'POST',
			path: '/jwt/sign',
			body: { payload: JSON.stringify( payload ) },
		} );
	}

	startChat() {
		return this.request( {
			method: 'POST',
			path: '/happychat/session',
		} );
	}
}
