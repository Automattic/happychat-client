/** @format */

/**
 * Internal dependencies
 */
import { initHappychat, eventAPI } from 'src';

window.Happychat = {
	open: ( { nodeId, groups, accessToken, entry, entryOptions } ) =>
		initHappychat( {
			nodeId,
			groups,
			accessToken,
			entry,
			entryOptions,
		} ),
	on: ( eventName, callback ) => eventAPI.subscribeTo( eventName, callback ),
	off: ( eventName, callback ) => eventAPI.unsubscribeFrom( eventName, callback ),
	sendEvent: msg => eventAPI.sendEventMsg( msg ),
	sendUserInfo: userInfo => eventAPI.sendUserInfoMsg( userInfo ),
};
