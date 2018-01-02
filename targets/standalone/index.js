/** @format */

/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import getUser from 'targets/common/get-wpcom-user';
import config from 'src/config';
import { renderTo, renderMessage, subscribeTo, unsubscribeFrom } from 'src';

const wpcomOAuth = require( 'wpcom-oauth-cors' )( config( 'oauth_client_id' ) );
const debug = debugFactory( 'happychat-client:standalone' );

const initHappychat = ( nodeId, groups, howCanWeHelpOptions, howDoYouFeelOptions ) => {
	debug( 'get token from wpcom' );
	wpcomOAuth.get( () => {
		/* eslint-disable camelcase */
		debug( 'get user info from wpcom' );
		const accessToken = wpcomOAuth.token().access_token;
		getUser( accessToken )
			.then( ( { ID, email, username, display_name, avatar_URL, language } ) => {
				const user = {
					ID,
					email,
					username,
					display_name,
					avatar_URL,
					language,
					groups,
					accessToken,
				};
				renderTo( nodeId, user, howCanWeHelpOptions, howDoYouFeelOptions );
			} )
			.catch( error => renderMessage( nodeId, 'Could not load support form. ' + error ) );
		/* eslint-enable camelcase */
	} );
};

window.Happychat = {
	open: ( nodeId, groups, howCanWeHelpOptions, howDoYouFeelOptions ) => {
		initHappychat( nodeId, groups, howCanWeHelpOptions, howDoYouFeelOptions );
	},
	on: ( eventName, callback ) => {
		subscribeTo( eventName, callback );
	},
	off: ( eventName, callback ) => {
		unsubscribeFrom( eventName, callback );
	},
};
