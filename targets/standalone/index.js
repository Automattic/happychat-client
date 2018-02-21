/** @format */

/**
 * Internal dependencies
 */
import { initHappychat, eventAPI } from 'src';
import config from 'targets/standalone/config';

const wpcomOAuth = require( 'wpcom-oauth-cors' )( config( 'oauth_client_id' ) );

const accessToken = () =>
	new Promise( ( resolve, reject ) => {
		wpcomOAuth.get( () => {
			resolve( wpcomOAuth.token().access_token );
		} );
	} );

window.Happychat = {
	open: ( { nodeId, groups, canChat, entry, entryOptions } ) =>
		initHappychat( {
			nodeId,
			groups,
			canChat,
			accessToken,
			entry,
			entryOptions,
		} ),
	on: ( eventName, callback ) => eventAPI.subscribeTo( eventName, callback ),
	off: ( eventName, callback ) => eventAPI.unsubscribeFrom( eventName, callback ),
	sendEvent: msg => eventAPI.sendEventMsg( msg ),
	sendUserInfo: userInfo => eventAPI.sendUserInfoMsg( userInfo ),
};
