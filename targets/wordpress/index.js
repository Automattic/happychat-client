/** @format */

/**
 * Internal dependencies
 */
import { initHappychat, subscribeTo, unsubscribeFrom } from 'src';

window.Happychat = {
	open: ( { nodeId, groups, accessToken, howCanWeHelpOptions, howDoYouFeelOptions } ) => {
		initHappychat( { nodeId, groups, accessToken, howCanWeHelpOptions, howDoYouFeelOptions } );
	},
	on: ( eventName, subscriber ) => subscribeTo( eventName, subscriber ),
	off: ( eventName, subscriber ) => unsubscribeFrom( eventName, subscriber ),
};
