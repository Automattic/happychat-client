/** @format */

/**
 * Internal dependencies
 */
import { initHappychat, subscribeTo, unsubscribeFrom } from 'src';

window.Happychat = {
	open: ( { nodeId, groups, accessToken } ) => {
		initHappychat( { nodeId, groups, accessToken } );
	},
	on: ( eventName, subscriber ) => subscribeTo( eventName, subscriber ),
	off: ( eventName, subscriber ) => unsubscribeFrom( eventName, subscriber ),
};
