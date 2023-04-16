/** @format */

/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import {
	AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN,
	AUTH_TYPE_WPCOM_OAUTH_MESSAGING_BY_TOKEN,
	AUTH_TYPE_WPCOM_PROXY_IFRAME,
} from './strategies';
import WPcomOAuth from './strategies/wpcom/oauth';
import WPcomOAuthMessaging from './strategies/wpcom/oauth-messaging';
import WPcomProxyIframe from './strategies/wpcom/proxy-iframe';

/**
 * Module variables
 */
let strategy;
const debug = debugFactory( 'happychat-client:auth' );

/**
 * Initialize authentication library (authenticator). Based on the authentication type a strategy
 * will be prepared.
 *
 * The package acts like a singleton. Both the strategy and the authentication options are saved in
 * the package's object which allows us to only initialize the library once. Meaning that after we
 * initialize the library it will be shared throughout the entire codebase without the need of
 * re-initialization.
 *
 * Currently implemented strategies are:
 *  - 'wpcom-oauth-by-token' regular wpcom oAuth based on given token using `wpcom-xhr-request`
 *  - 'wpcom-proxy-iframe'   proxy iframe wpcom authentication using Calypso's wpcom object
 *
 * @param {Object} auth information about the authentication type and its options
 * @param {string} auth.type authentication type (one of the implemented strategies)
 * @param {Object} auth.options set of options sent to auth implementations
 * @param {string} auth.options.token oauth accessToken used by `wpcom-oauth-by-token`
 * @param {Object} auth.options.proxy wpcom proxy object used by `wpcom-proxy-iframe`
 *
 * @throws {Error} if a strategy method used is not implemented.
 */
const init = auth => {
	debug( 'Authentication library was initialized', auth );

	switch ( auth.type ) {
		case AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN:
			if ( ! auth.options ) {
				throw new Error( `Strategy ${ auth.type } requires parameter 'options'.` );
			}
			if ( ! auth.options.token ) {
				throw new Error( `Strategy ${ auth.type } requires parameter 'options.token'.` );
			}

			strategy = new WPcomOAuth( auth );
			break;

		case AUTH_TYPE_WPCOM_OAUTH_MESSAGING_BY_TOKEN:
			if ( ! auth.options ) {
				throw new Error( `Strategy ${ auth.type } requires parameter 'options'.` );
			}
			if ( ! auth.options.token ) {
				throw new Error( `Strategy ${ auth.type } requires parameter 'options.token'.` );
			}

			strategy = new WPcomOAuthMessaging( auth );
			break;

		case AUTH_TYPE_WPCOM_PROXY_IFRAME:
			if ( ! auth.options ) {
				throw new Error( `Strategy ${ auth.type } requires parameter 'options'.` );
			}
			if ( ! auth.options.proxy ) {
				throw new Error( `Strategy ${ auth.type } requires parameter 'options.proxy'.` );
			}
			strategy = new WPcomProxyIframe( auth );
			break;

		default:
			throw new Error( `Authentication strategy ${ auth.type } is not supported.` );
	}
};

/**
 * Mimics an authentication interface which forwards calls to the selected strategy. All exposed
 * interface methods have to be implemented in all strategies.
 *
 * IMPORTANT: Whenever we expose a new method add it should be added to the base controller also
 * which can be found at strategies/index.js and the method should be overriden by all strategies
 *
 * @typedef {Object} AuthInterface authentication interface implemented by different strategies
 * @property {function} authorizeChat authorize a chat session against WPcom api by signing a JWT
 * @property {function} getUser get current user details via WPcom api endpoint (/me)
 * @property {function} init initializes the authentication interface, see docs above.
 * @property {function} login start the strategy login flow (currently wpcom oauth)
 */
export default {
	/**
	 * Returns a promise that authorizes a chat session against WPcom api by signing a JWT, resolves
	 * if there is no selected strategy.
	 * @param {Object} args all parameters are merged into an object and sent to the strategy method
	 * @returns {Promise} which contains authorize data returned by the strategy
	 */
	authorizeChat: ( ...args ) =>
		strategy ? strategy.authorizeChat( ...args ) : Promise.resolve(),
	/**
	 * Get current user details via WPcom api endpoint (/me), resolves if there is no selected
	 * strategy.
	 * @returns {Promise} that grabs the current user details
	 */
	getUser: () => ( strategy ? strategy.getUser() : Promise.resolve() ),
	/**
	 * Initializes the authentication interface, see docs above.
	 */
	init,
	/**
	 * Login using the strategy's login flow (currently wpcom oauth), resolves if there is no
	 * selected strategy.
	 * @returns {Promise} which contains login data returned by the strategy
	 */
	login: () => ( strategy ? strategy.login() : Promise.resolve() ),
	getFile: ( sessionId, fileId ) =>
		strategy ? strategy.getFile( sessionId, fileId ) : Promise.resolve(),
};
