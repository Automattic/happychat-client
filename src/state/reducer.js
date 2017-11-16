/** @format */

/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Calypso dependencies
 */
import chat from 'state/happychat/chat/reducer';
import connection from 'state/happychat/connection/reducer';
import ui from 'state/happychat/ui/reducer';

/**
 * Internal dependencies
 */
import user from 'src/state/user/reducer';

export default combineReducers( {
	chat,
	connection,
	ui,
	user,
} );
