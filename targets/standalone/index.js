/** @format */

/**
 * Internal dependencies
 */
import { initHappychat } from 'src';
import config from 'targets/standalone/config';

const wpcomOAuth = require( 'wpcom-oauth-cors' )( config( 'oauth_client_id' ) );

const accessToken = () =>
	new Promise( ( resolve, reject ) => {
		wpcomOAuth.get( () => {
			resolve( wpcomOAuth.token().access_token );
		} );
	} );

window.Happychat = {
	open: ( { nodeId, groups, entry, entryOptions } ) => {
		initHappychat( {
			nodeId,
			groups,
			accessToken,
			entry,
			entryOptions,
		} );
	},
};
