/** @format */

/**
 * Internal dependencies
 */
import { initHappychat, eventAPI } from './index';

const api = {
	open: initHappychat,
	on: ( eventName, callback ) => eventAPI.subscribeTo( eventName, callback ),
	off: ( eventName, callback ) => eventAPI.unsubscribeFrom( eventName, callback ),
	sendEvent: msg => eventAPI.sendEventMsg( msg ),
	sendUserInfo: userInfo => eventAPI.sendUserInfoMsg( userInfo ),
};

export default api;
