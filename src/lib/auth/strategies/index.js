/** @format */
export const AUTH_TYPE_WPCOM_OAUTH = 'wpcom-oauth';
export const AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN = 'wpcom-oauth-by-token';
export const AUTH_TYPE_WPCOM_PROXY_IFRAME = 'wpcom-proxy-iframe';
export const AUTH_TYPE_TEST = 'test';

export class BaseStrategy {
	constructor( type ) {
		this.type = type;
	}

	authorizeChat() {
		throw new Error( `${ this.type } 'authorizeChat' method is used but not implemented` );
	}

	getUser() {
		throw new Error( `${ this.type } 'getUser' method is used but not implemented` );
	}

	login() {
		throw new Error( `${ this.type } 'login' method is used but not implemented` );
	}
}
