/** @format */

/**
 * Internal dependencies
 */
import { initHappychat, eventAPI } from './index';

const api = {
	/**
	 * Initialize/Open happychat client
	 *
	 * @param {String} nodeId Mandatory. HTML Node id where Happychat will be rendered.
	 * @param {Array} groups Mandatory. Happychat groups this user belongs to.
	 * @param {String|Promise} accessToken Mandatory. A valid WP.com access token,
	 *						   or a Promise that returns one.
	 * @param {String} entry Optional. Valid values are ENTRY_FORM, ENTRY_CHAT.
	 * 			 ENTRY_FORM is the default and will render the contact form.
	 * 			 ENTRY_CHAT will render the chat form.
	 * @param {Object} entryOptions Optional. Contains options to configure the selected entry.
	 * @param {Boolean} canChat Optional. Whether the user can be offered chat. True by default.
	 */
	open: initHappychat,
	on: ( eventName, callback ) => eventAPI.subscribeTo( eventName, callback ),
	off: ( eventName, callback ) => eventAPI.unsubscribeFrom( eventName, callback ),
	sendEvent: msg => eventAPI.sendEventMsg( msg ),
	sendUserInfo: userInfo => eventAPI.sendUserInfoMsg( userInfo ),
};

export default api;
