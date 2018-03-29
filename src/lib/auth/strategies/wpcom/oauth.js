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
const oAuth = require( 'wpcom-oauth-cors' )( '54006' );

/**
 * WPCOM oAuth strategy, it can be used as with the regular oAuth flow or bypass that by passing it
 * an oAuth access token. After authentication is successfull the access token is saved within the
 * class and a `_request` method is created which uses that token to make authenticated requests
 * to WPCOM api. Because the WPCOM endpoints' payload may differ from the other WPCOM strategy we
 * expose here methods for each WPCOM endpoint that will be used.
 *
 * Supported WPCOM oAuth flows:
 *  - 'wpcom-oauth'          regular wpcom oAuth process using `wpcom-oauth-cors` package
 *  - 'wpcom-oauth-by-token' regular wpcom oAuth based on given token using `wpcom-xhr-request`
 * @extends WPcomStrategy
 */
export default class WPcomOAuth extends WPcomStrategy {
	/**
	 * Pass the authentication type to the parent and save the auth options and access token.
	 * @param {Object} authentication information about the authentication type and its options
	 * @param {string} authentication.type authentication type (wpcom-oauth|wpcom-oauth-by-token)
	 * @param {Object} authentication.options Set of options sent to auth implementations
	 * @param {string} authentication.options.token oauth accessToken
	 */
	constructor( authentication ) {
		super( authentication.type );
		this.options = authentication.options;
		this.token = null;
	}

	/**
	 * Prepare wpcom request parametersby authorizing them via `authToken`.
	 * @param {Object} args request parameters
	 * @returns {Object} passed arguments including the access token
	 * @private
	 */
	_prepareParams( args ) {
		args.authToken = this._getToken();
		return args;
	}

	/**
	 * Method that creates a request handler which will be used when calling endpoints, it will
	 * overwrite the placeholder `_request`.
	 *
	 * @param {Object} token access token
	 * @returns {function} authenticated promisfied wrapper for the 'wpcom-xhr-request' request
	 * @private
	 */
	_createAuthenticatedRequest( token ) {
		/**
		 * It is basically a wrapper that promisifies and adds authentication to the request
		 * method of 'wpcom-xhr-request'
		 *
		 * @param {Object} args request parameters
		 * @returns {Promise} authenticated promisfied wrapper for the 'wpcom-xhr-request' request
		 */
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
	 * Get the access token
	 * @returns {string} The access token
	 * @private
	 */
	_getToken() {
		return this.token;
	}

	/**
	 * Set the access token, used after a login or when we already have the token and we bypass the
	 * oAuth login flow.
	 * @param {string} token The access token
	 */
	setToken( token ) {
		this.token = token;
	}

	/**
	 * Login method for oAuth strategy. If the token was passed when instantiating this strategy
	 * it will just overwrite the request method and return the promisifed token.
	 *
	 * If there is not access token saved, we follow the regular WPCOM oAuth flow in order to get
	 * one, it is then saved and the request method is overwritten.
	 *
	 * It also overwrites the `_request` method with a promisified authenticated one
	 *
	 * @returns {Promise} the oauth access token
	 */
	login() {
		const token = this._getToken();
		if ( token ) {
			debug( 'Token is present, customer is authenticated' );
			// overwrite the request method to an authenticated promisified xhr request
			this._request = this._createAuthenticatedRequest( token );

			// bail if already authenticated
			return Promise.resolve( token );
		}

		return new Promise( ( resolve, reject ) => {
			debug( 'Get token, customer is not authenticated' );
			oAuth.get( ( auth ) => {
				if ( ! auth || ! auth.access_token ) {
					reject( `Authentication ${ this.type } error: token is missing` );
				}

				// overwrite the request method to an authenticated promisified xhr request
				this._request = this._createAuthenticatedRequest( auth.access_token );

				this.setToken( auth.access_token );
				resolve( auth.access_token );
			} );
		} );
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
}
