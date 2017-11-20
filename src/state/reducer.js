/** @format */

/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import chat from 'src/state/chat/reducer';
import connection from 'src/state/connection/reducer';
import ui from 'src/state/ui/reducer';
import user from 'src/state/user/reducer';

export default combineReducers( {
	chat,
	connection,
	ui,
	user,
} );
