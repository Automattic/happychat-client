/** @format */

/**
 * Internal dependencies
 */
import { initHappychat, subscribeTo, unsubscribeFrom } from 'src';

window.Happychat = {
	open: ( { nodeId, groups, accessToken, howCanWeHelpOptions, howDoYouFeelOptions, fallbackTicketPath } ) => {
		initHappychat( { nodeId, groups, accessToken, howCanWeHelpOptions, howDoYouFeelOptions, fallbackTicketPath } );
	},
	on: ( eventName, subscriber ) => subscribeTo( eventName, subscriber ),
	off: ( eventName, subscriber ) => unsubscribeFrom( eventName, subscriber ),
};
