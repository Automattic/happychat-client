/** @format */

/**
 * External dependencies
 */
import isEmpty from 'lodash/isEmpty';

/**
 * Internal dependencies
 */
import { createTargetNode, eventAPI, renderHappychat, renderError } from './index';
import authenticator from 'src/lib/auth';

/** @format */

const api = {
	/**
	 * Renders a Happychat or Support form in the HTML Element provided by the nodeId.
	 *
	 * @param {Object} authentication Mandatory. Set of authentication options
	 * @param {string} authentication.type Mandatory. Type of authentication strategy used
	 * @param {Object} authentication.options Optional. Authentication options
	 * @param {Object} authentication.options.happychatUrl Optional. Alternate socket server URL
	 * @param {Object} authentication.options.token Optional. WP.com oAuth access token to be used
	 * @param {Object} authentication.options.proxy Optional. WP.com proxy object to be used
	 * @param {boolean} canChat Optional. Whether the user can be offered chat. True by default.
	 * @param {string} entry Optional. Valid values are ENTRY_FORM, ENTRY_CHAT.
	 * @param {Object} entryOptions Optional. Contains options to configure the selected entry.
	 * @param {Array} groups Mandatory. Happychat groups this user belongs to.
	 * @param {Array} theme Optional. The theme to use, valid values are the names of the groups.
	 * 		If no provided the theme associated to the group will be used.
	 * @param {string} nodeId Mandatory. HTML Node id where Happychat will be rendered.
	 * @param {Object} user Optional. Customer information.
	 */
	open: ( { authentication, canChat, entry, entryOptions, groups, nodeId, plugins, theme, user } ) => {
		authenticator.init( authentication );

		const targetNode = createTargetNode( { nodeId, theme, groups, entryOptions } );

		authenticator
			.login()
			.then( () => ( isEmpty( user ) ? authenticator.getUser() : Promise.resolve( user ) ) )
			.then( userObject =>
				renderHappychat( targetNode, {
					userObject,
					canChat,
					groups,
					entry,
					entryOptions,
					plugins,
				} )
			)
			.catch( error => renderError( targetNode, { error } ) );
	},
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
