/** @format */

/**
 * Internal dependencies
 */
import WPcomOAuth from './oauth';

export default class WPcomOAuthMessaging extends WPcomOAuth {
	/**
	 * Sign a JWT token.
	 * @param {Object} payload jwt token
	 */
	signJWT() {}

	startChat() {
		console.log( 'START CHAT IN AUTHENTICATOR' );
		// sendMessage to parent window
	}

	getFile() {}
}
