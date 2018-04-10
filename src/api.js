/** @format */

/**
 * External dependencies
 */
import isEmpty from 'lodash/isEmpty';

/**
 * Internal dependencies
 */
import {
	createTargetNode,
	eventAPI,
	renderHappychat,
	renderError,
 } from './index';
import authenticator from 'src/lib/auth';
import { LAYOUT_MAX_WIDTH_FIXED_HEIGHT } from './constants';

const api = {
	/**
	 * Renders a Happychat or Support form in the HTML Element provided by the nodeId.
	 *
	 * @param {Object} authentication Mandatory. Set of authentication options
	 * @param {string} authentication.type Mandatory. Type of authentication strategy used
	 * @param {Object} authentication.options Optional. Authentication options
	 * @param {Object} authentication.options.token Optional. WP.com oAuth access token to be used
	 * @param {Object} authentication.options.proxy Optional. WP.com proxy object to be used
	 * @param {boolean} canChat Optional. Whether the user can be offered chat. True by default.
	 * @param {string} entry Optional. Valid values are 'form', 'chat'.
	 * 			 ENTRY_FORM (constant for 'form') is the default and will render the contact form.
	 * 			 ENTRY_CHAT (constant for 'chat') will render the chat form.
	 * @param {Object} entryOptions Optional. Contains options to configure the selected entry.
	 * @param {Array} groups Mandatory. Happychat groups this user belongs to.
	 * @param {String} layout Optional. The chat layout max-width-fixed-height | max-parent-size | panel-fixed-size | panel-max-parent-size
	 * @param {string} nodeId Mandatory. HTML Node id where Happychat will be rendered.
	 * @param {Object} user Optional. Customer information .
	 */
	open: ( {
		authentication,
		canChat,
		entry,
		entryOptions,
		groups,
		layout = LAYOUT_MAX_WIDTH_FIXED_HEIGHT,
		nodeId,
		user,
	} ) => {
		authenticator.init( authentication );

		const targetNode = createTargetNode( { entryOptions, groups, layout, nodeId } );

		authenticator.login()
			.then( () => isEmpty( user ) ? authenticator.getUser() : Promise.resolve( user ) )
			.then( userObject =>
				renderHappychat( targetNode, {
					canChat,
					entry,
					entryOptions,
					groups,
					layout,
					userObject,
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
