/** @format */

/**
 * Internal dependencies
 */
import config from 'src/config';
import { initHappychat } from 'src/api';

const wpcomOAuth = require( 'wpcom-oauth-cors' )( config( 'oauth_client_id' ) );

const accessToken = () =>
	new Promise( ( resolve, reject ) => {
		wpcomOAuth.get( () => {
			resolve( wpcomOAuth.token().access_token );
		} );
	} );

window.Happychat = {
	open: ( { nodeId, groups, howCanWeHelpOptions, howDoYouFeelOptions } ) => {
		initHappychat( {
			nodeId,
			groups,
			accessToken,
			howCanWeHelpOptions,
			howDoYouFeelOptions,
		} );
	},
};
