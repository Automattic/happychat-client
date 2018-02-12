/** @format */

/**
 * Internal dependencies
 */
import { initHappychat, subscribeTo, unsubscribeFrom, sendEventMsg, sendUserInfoMsg } from 'src';

window.Happychat = {
	open: ( { nodeId, groups, accessToken, entry, entryOptions } ) =>
		initHappychat( {
			nodeId,
			groups,
			accessToken,
			entry,
			entryOptions,
		} ),
	on: ( eventName, callback ) => subscribeTo( eventName, callback ),
	off: ( eventName, callback ) => unsubscribeFrom( eventName, callback ),
	sendEvent: msg => sendEventMsg( msg ),
	sendUserInfo: userInfo => sendUserInfoMsg( userInfo ),
};
