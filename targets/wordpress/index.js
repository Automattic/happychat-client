/** @format */

/**
 * Internal dependencies
 */
import { initHappychat, subscribeTo, unsubscribeFrom } from 'src/api';

// TODO enable form
// form is not ready to be embedded, so hold off enabling the API in the meanwhile
window.Happychat = {
	// open: ( { nodeId, groups, accessToken, howCanWeHelpOptions, howDoYouFeelOptions } ) => {
	open: ( { nodeId, groups, accessToken } ) => {
		// initHappychat( { nodeId, groups, accessToken, howCanWeHelpOptions, howDoYouFeelOptions } );
		initHappychat( { nodeId, groups, accessToken } );
	},
	on: ( eventName, subscriber ) => subscribeTo( eventName, subscriber ),
	off: ( eventName, subscriber ) => unsubscribeFrom( eventName, subscriber ),
};
