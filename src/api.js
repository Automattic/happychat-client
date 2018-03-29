/** @format */

/**
 * External dependencies
 */
import isEmpty from 'lodash/isEmpty';

/**
 * Internal dependencies
 */
import {
	createIframe,
	dispatchAssetsFinishedDownloading,
	eventAPI,
	renderHappychat,
	renderError,
 } from './index';
import authenticator from 'src/lib/auth';
import { AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN } from 'src/lib/auth/strategies';

const api = {
	/**
	 * Renders a Happychat or Support form in the HTML Element provided by the nodeId.
	 *
	 * @param {Object} authentication Mandatory. Set of authentication options
	 * @param {string} authentication.type Mandatory. Type of authentication strategy used
	 * @param {Object} authentication.options Optional. Authentication options
	 * @param {Object} authentication.options.token Optional. WP.com oAuth access token to be used
	 * @param {Object} authentication.options.proxy Optional. WP.com proxy object to be used
	 * @param {string} accessToken Optional. A valid WP.com access token.
	 * @param {boolean} canChat Optional. Whether the user can be offered chat. True by default.
	 * @param {string} entry Optional. Valid values are ENTRY_FORM, ENTRY_CHAT.
	 * @param {Object} entryOptions Optional. Contains options to configure the selected entry.
	 * @param {Array} groups Mandatory. Happychat groups this user belongs to.
	 * @param {string} nodeId Mandatory. HTML Node id where Happychat will be rendered.
	 * @param {Object} user Optional. Customer information .
	 * 			 ENTRY_FORM is the default and will render the contact form.
	 * 			 ENTRY_CHAT will render the chat form.
	 */
	open: ( {
		authentication,
		accessToken,
		canChat,
		entry,
		entryOptions,
		groups,
		nodeId,
		user,
	} ) => {
		// backwards compatibility for older accessToken only authentication
		if ( accessToken && isEmpty( authentication ) ) {
			authentication = {
				type: AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN,
				options: {
					token: accessToken,
				},
			};
		}

		authenticator.init( authentication );

		const targetNode = createIframe(
			{ nodeId, entryOptions },
			dispatchAssetsFinishedDownloading
		);

		authenticator.login()
			.then( () => isEmpty( user ) ? authenticator.getUser() : Promise.resolve( user ) )
			.then( userObject =>
				renderHappychat( targetNode, {
					userObject,
					canChat,
					groups,
					entry,
					entryOptions,
				} )
			)
			.catch( error => renderError( targetNode, { error } ) );
	},
	on: ( eventName, callback ) => eventAPI.subscribeTo( eventName, callback ),
	off: ( eventName, callback ) => eventAPI.unsubscribeFrom( eventName, callback ),
	sendEvent: msg => eventAPI.sendEventMsg( msg ),
	sendUserInfo: userInfo => eventAPI.sendUserInfoMsg( userInfo ),
};

export default api;
