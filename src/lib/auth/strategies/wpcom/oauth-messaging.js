/** @format */

/**
 * Internal dependencies
 */
import WPcomOAuth from './oauth';

export default class WPcomOAuthMessaging extends WPcomOAuth {
	signJWT() {}

	startChat() {}

	getFile() {}

	isChatAvailable() {
		return this._request( {
			method: 'GET',
			apiNamespace: 'wpcom/v2',
			path: '/help/messaging/is-available',
			query: {
				group: 'woo_messaging',
				environment: process.env.NODE_ENV,
			},
		} );
	}

	saveCustomFields( { ssr, website, product } ) {
		const body = {
			fields: {
				messaging_product: product,
				messaging_ssr: ssr,
				messaging_url: website,
			},
		};
		return this._request( {
			method: 'POST',
			apiNamespace: 'wpcom/v2',
			path: '/help/zendesk/update-user-fields',
			body,
		} );
	}
}
