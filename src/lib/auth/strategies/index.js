/** @format */

/**
 * Constants representing allowed and implemented authentication strategies
 */
export const AUTH_TYPE_WPCOM_OAUTH = 'wpcom-oauth';
export const AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN = 'wpcom-oauth-by-token';
export const AUTH_TYPE_WPCOM_PROXY_IFRAME = 'wpcom-proxy-iframe';

 /**
  * "Abstract" class representing a base strategy, it should be extended by implemented strategies
  * as a fail safe that all exposed methods are implemented.
  *
  * IMPORTANT: It should contain all exposed methods of the authentication library. And throw an
  * error for each of them. That way if a child class is not implementing a method but it is using
  * it, the error will be thrown.
  */
export class BaseStrategy {
	/**
	 * Set the type of the strategy, used in errors.
	 * @param {string} type of child strategy that implements this
	 */
	constructor( type ) {
		this.type = type;
	}

	/**
	 * Authorize chat session placeholder
	 * @throws {Error} if the method is not implemented by child classes
	 */
	authorizeChat() {
		throw new Error( `${ this.type } 'authorizeChat' method is used but not implemented` );
	}

	/**
	 * Get current user details placeholder
	 * @throws {Error} if the method is not implemented by child classes
	 */
	getUser() {
		throw new Error( `${ this.type } 'getUser' method is used but not implemented` );
	}

	/**
	 * Login placeholder
	 * @throws {Error} if the method is not implemented by child classes
	 */
	login() {
		throw new Error( `${ this.type } 'login' method is used but not implemented` );
	}
}
