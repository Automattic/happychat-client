/** @format */

/**
 * Internal dependencies
 */
import { initHappychat, eventAPI } from './index';

const api = {
	/**
	 * Initialize/Open happychat client. This method accepts an {Object} parameter with the
	 * following properties.
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
	/**
	 * Method to subscribe to Happychat events, either 'availability' or 'chatStatus'.
	 *
	 * @param  {String}   eventName The name of the event to be subscribed to.
	 * @param  {Function} callback  The callback function to subscribe to the event.
	 */
	on: ( eventName, callback ) => eventAPI.subscribeTo( eventName, callback ),
	/**
	 * Method to unsubscribe from Happychat events, either 'availability' or 'chatStatus'.
	 *
	 * @param  {String}   eventName The name of the event to be unsubscribed from.
	 * @param  {Function} callback  The callback function to unsubscribe from the event.
	 */
	off: ( eventName, callback ) => eventAPI.unsubscribeFrom( eventName, callback ),
	/**
	 * Method to send events to the Happychat server, to be shown to operators.
	 * This is useful, for example, to send any action the user may have done in the page, etc.
	 *
	 * @param  {String} msg Message to be sent
	 */
	sendEvent: msg => eventAPI.sendEventMsg( msg ),
	/**
	 * Method to send user information to the Happychat server. This information
	 * will be shown to operators at the beginning of the chat.
	 *
	 * Note that the object shape is still tied to Calypso contact form.
	 * Some changes are required server side before clients can be updated, see
	 * https://github.com/Automattic/happychat/issues/1057
	 *
	 * const userInfo = {
	 * 	site: {
	 * 		ID: String containing a number. Obligatory.
	 * 		URL: String containing a valid URL. Obligatory.
	 * 	},
	 * 	howCanWeHelp: String containing a message. Optional.
	 * 	howYouFeel: String containing a message. Optional.
	 * }
	 *
	 * @param  {Object} userInfo The object shape described above.
	 */
	sendUserInfo: userInfo => eventAPI.sendUserInfoMsg( userInfo ),
};

export default api;
