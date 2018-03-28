/** @format */

/**
 * Internal dependencies
 */
import {
	AUTH_TYPE_WPCOM_OAUTH,
	AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN,
	AUTH_TYPE_WPCOM_PROXY_IFRAME,
} from './strategies';
import WPcomOAuth from './strategies/wpcom/oauth';
import WPcomProxyIframe from './strategies/wpcom/proxy-iframe';

/**
 * Module variables
 */
let strategy;
let auth;

const init = ( authentication ) => {
	auth = authentication;
	switch ( auth.type ) {
		case AUTH_TYPE_WPCOM_OAUTH:
			strategy = new WPcomOAuth( auth );
			break;

		case AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN:
			if ( ! auth.options ) {
				throw new Error(
					`Authentication strategy ${ auth.type } requires parameter 'options'.`
				);
			}
			if ( ! auth.options.token ) {
				throw new Error(
					`Authentication strategy ${ auth.type } requires parameter 'options.token'.`
				);
			}
			strategy = new WPcomOAuth( auth );
			strategy.setToken( auth.options.token );
			break;

		case AUTH_TYPE_WPCOM_PROXY_IFRAME:
			if ( ! auth.options ) {
				throw new Error(
					`Authentication strategy ${ auth.type } requires parameter 'options'.`
				);
			}
			if ( ! auth.options.proxy ) {
				throw new Error(
					`Authentication strategy ${ auth.type } requires parameter 'options.proxy'.`
				);
			}
			strategy = new WPcomProxyIframe( auth );
			break;

		default:
			throw new Error( `Authentication strategy ${ auth.type } is not supported.` );
	}
};

// whenever you expose a new method add it to the base controller also (./strategies/index.js)
export default {
	authorizeChat: ( ...args ) => strategy ? strategy.authorizeChat( ...args ) : Promise.resolve(),
	getUser: () => strategy ? strategy.getUser() : Promise.resolve(),
	init,
	login: () => strategy ? strategy.login() : Promise.resolve(),
};
