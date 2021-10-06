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
const debug = debugFactory( 'happychat-client:auth:wpcom:proxy' );

/**
 * WPCOM auth strategy by proxy iframe by using `wpcom` object passed from Calypso. It is assuming
 * that the customer is authenticated and a `_request` method is created which uses the passed
 * `wpcom` object to call the WPCOM api. Because the WPCOM endpoints' payload may differ from the
 * other WPCOM strategy we expose here methods for each WPCOM endpoint that will be used.
 *
 * Supported WPCOM oAuth flows:
 *  - 'wpcom-proxy-iframe'   proxy iframe wpcom authentication using passed wpcom object
 * @extends WPcomStrategy
 */
export default class WPcomProxyIframe extends WPcomStrategy {
	/**
	 * Pass the authentication type to the parent and save the auth options and access token.
	 * @param {Object} authentication information about the authentication type and its options
	 * @param {string} authentication.type authentication type (wpcom-oauth-by-token)
	 * @param {Object} authentication.options Set of options sent to auth implementations
	 */
	constructor( authentication ) {
		super( authentication.type );
		this.options = authentication.options;
	}

	/**
	 * Method that creates a request handler which will be used when calling endpoints, it will
	 * overwrite the placeholder `_request`.
	 *
	 * @returns {function} authenticated promisfied wrapper for the passed wpcom object
	 * @private
	 */
	_createAuthenticatedRequest() {
		/**
		 * It is basically a wrapper that promisifies and adds authentication to the request
		 * method of passed wpcom object
		 *
		 * @param {Object} args request parameters
		 * @returns {Promise} authenticated promisfied wrapper for the wpcom object request
		 */
		return ( args ) => {
			return new Promise( ( resolve, reject ) => {
				if ( ! this.options.proxy.hasOwnProperty( 'request' ) ) {
					return reject( 'Method "proxy.request" is required.' );
				}

				this.options.proxy.request( args, ( error, response ) => {
					if ( error ) {
						debug( `Request ${ args.method }:${ args.path } failed with : ${ error }` );
						return reject( error );
					}

					debug( `${ args.method }:${ args.path } response ${ response }` );
					resolve( response );
				} );
			} );
		};
	}

	/**
	 * Placeholder methods that will be overwritten by a promisified authenticated request method
	 * after the login is successful.
	 * @returns {Promise} rejects if the login failed and the method is not overwritten
	 * @private
	 */
	_request() {
		return Promise.reject( `Authentication ${ this.type } error: user not authenticated.` );
	}

	/**
	 * Login method it assumes that the presence of the passed wpcom object means the customer is
	 * authenticated. It also overwrites the `_request` method with a promisified authenticated one
	 *
	 * @returns {Promise} the oauth access token
	 */
	login() {
		// overwrite the request method to an authenticated promisified wpcom proxy iframe request
		this._request = this._createAuthenticatedRequest();

		// consider it logged in for now
		// TODO: check how wpcom failures work
		return Promise.resolve();
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
			path: '/happychat/session',
		} );
	}

	/**
	 * Get file data from a session.
	 * @returns {Promise}
	 */
	getFile( sessionId, fileId ) {
		const path = `/happychat/sessions/${ sessionId }/files/${ fileId }`;
		return this._request( {
			method: 'GET',
			path,
		} );
	}
}
