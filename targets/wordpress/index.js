/** @format */

/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import getUser from 'targets/common/get-wpcom-user';
import { renderTo } from 'src';

const debug = debugFactory( 'happychat-client:standalone' );
debug( 'loading happychat library ' );

const initHappychat = ( nodeId, groups, token ) => {
	debug( 'starting happychat' );
	/* eslint-disable camelcase */
	getUser( token )
		.then( ( { ID, email, username, display_name, avatar_URL, language } ) => {
			debug( 'render Happychat' );
			// it is the host responsibility to set the groups on init, although that
			// although that data is not in the wpcom API response
			renderTo(
				nodeId,
				{
					ID,
					email,
					username,
					display_name,
					avatar_URL,
					language,
					groups: groups,
				},
				token
			);
		} )
		.catch( error => {
			debug( 'could not get user info: ', error );
		} );
	/* eslint-enable camelcase */
};

window.Happychat = {
	open: ( nodeId, groups, token ) => {
		initHappychat( nodeId, groups, token );
	},
};
