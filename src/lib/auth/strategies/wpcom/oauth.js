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
const debug = debugFactory( 'happychat-client:auth:wpcom:oauth' );

/**
 * WPCOM oAuth strategy, it can be used as with the regular oAuth flow or bypass that by passing it
 * an oAuth access token. After authentication is successfull the access token is saved within the
 * class and a `_request` method is created which uses that token to make authenticated requests
 * to WPCOM api. Because the WPCOM endpoints' payload may differ from the other WPCOM strategy we
 * expose here methods for each WPCOM endpoint that will be used.
 *
 * Supported WPCOM oAuth flows:
 *  - 'wpcom-oauth-by-token' regular wpcom oAuth based on given token using `wpcom-xhr-request`
 * @extends WPcomStrategy
 */
export default class WPcomOAuth extends WPcomStrategy {
	/**
	 * Pass the authentication type to the parent and save the auth options and access token.
	 * @param {Object} authentication information about the authentication type and its options
	 * @param {string} authentication.type authentication type (wpcom-oauth-by-token)
	 * @param {Object} authentication.options Set of options sent to auth implementations
	 * @param {string} authentication.options.token oauth accessToken
	 */
	constructor( authentication ) {
		super( authentication.type );
		this.options = authentication.options;
	}

	/**
	 * Prepare wpcom request parametersby authorizing them via `authToken`.
	 * @param {Object} args request parameters
	 * @returns {Object} passed arguments including the access token
	 * @private
	 */
	_prepareParams( args ) {
		args.authToken = this.options.token;
		return args;
	}

	/**
	 * Method that creates a request handler which will be used when calling endpoints, it will
	 * overwrite the placeholder `_request`.
	 *
	 * @returns {function} authenticated promisfied wrapper for the 'wpcom-xhr-request' request
	 * @private
	 */
	_createAuthenticatedRequest() {
		/**
		 * It is basically a wrapper that promisifies and adds authentication to the request
		 * method of 'wpcom-xhr-request'
		 *
		 * @param {Object} args request parameters
		 * @returns {Promise} authenticated promisfied wrapper for the 'wpcom-xhr-request' request
		 */
		return args => {
			return new Promise( ( resolve, reject ) => {
				if ( ! this.options.token ) {
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

	/**
	 * Placeholder methods that will be overwritten by a promisified authenticated request method
	 * after the login is successfull.
	 * @returns {Promise} rejects if the login failed and the method is not overwritten
	 * @private
	 */
	_request() {
		return Promise.reject( `Authentication ${ this.type } error: user not authenticated.` );
	}

	/**
	 * Placeholder method that will be overwritten by a promisified authenticated request method
	 * after the login is successfull.
	 *
	 * _request() is an interface to the wpcom-xhr-request module, which assumes the API response
	 * is JSON. But that won't work in cases where we call to the WPCOM API but the response should
	 * be another format (like a binary image or other file). So _fetch() will make an authenticated
	 * fetch() call.
	 *
	 * @returns {Promise} rejects if the login failed and the method is not overwritten
	 * @private
	 */
	_fetch() {
		return Promise.reject( `Authentication ${ this.type } error: user not authenticated.` );
	}

	/**
	 * Login method for oAuth strategy. If the token was passed when instantiating this strategy
	 * it will just overwrite the request method and return the promisifed token.
	 *
	 * It also overwrites the `_request` method with a promisified authenticated one
	 *
	 * @returns {Promise} the oauth access token
	 */
	login() {
		// overwrite the request method to an authenticated promisified xhr request
		this._request = this._createAuthenticatedRequest( this.options.token );
		this._fetch = ( url, args = {} ) => {
			const newArgs = { headers: {}, ...args };
			newArgs.headers.Authorization = 'Bearer ' + this.options.token;
			return fetch( url, newArgs );
		};

		// bail if already authenticated
		return Promise.resolve( this.options.token );
	}

	// API endpoints
	//////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * Get current user details
	 * @returns {Promise} current user details
	 */
	getUser() {
		return this._request( {
			method: 'GET',
			apiNamespace: 'rest/v1.1',
			path: '/me',
		} );
	}

	/**
	 * Sign a JWT token.
	 * @param {Object} payload jwt token
	 * @returns {Promise} signed JWT token
	 */
	signJWT( payload ) {
		return this._request( {
			method: 'POST',
			apiNamespace: 'rest/v1',
			path: '/jwt/sign',
			body: { payload: JSON.stringify( payload ) },
		} );
	}

	/**
	 * Start a chat session for the authenticated user.
	 * @returns {Promise} signed JWT token
	 */
	startChat() {
		return this._request( {
			method: 'POST',
			apiNamespace: 'rest/v1',
			path: '/happychat/session',
		} );
	}

	/**
	 * Get file data from a session.
	 * @returns {Promise}
	 */
	getFile( sessionId, fileId ) {
		const url = `https://public-api.wordpress.com/wpcom/v2/happychat/sessions/${ sessionId }/files/${ fileId }`;
		return this._fetch( url );
	}
}
