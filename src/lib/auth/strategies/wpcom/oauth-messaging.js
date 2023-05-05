/** @format */

/**
 * Internal dependencies
 */
import WPcomOAuth from './oauth';

function mapReasonForContactToZendeskTag( reasonForContact ) {
	switch ( reasonForContact ) {
		case 'broken':
			return 'contact_reason_woo_product';

		case 'before-buy':
			return 'contact_reason_woo_before_i_buy';

		case 'account':
			return 'contact_reason_woo_account';

		case 'vendor':
			return 'contact_reason_woo_marketplace_vendors';

		default:
			return 'contact_reason_unrecognized';
	}
}

export default class WPcomOAuthMessaging extends WPcomOAuth {
	authorizeChat() {
		return () => {};
	}

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

	saveCustomFields( {
		ssr = 'Not required in this contact type',
		website,
		product,
		reasonForContact,
	} ) {
		const body = {
			fields: {
				contact_reason: mapReasonForContactToZendeskTag( reasonForContact ),
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
