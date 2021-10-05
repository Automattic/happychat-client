/** @format */

/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import authentication from './authentication/reducer';
import chat from './chat/reducer';
import connection from './connection/reducer';
import fallbackTicket from './fallbackTicket/reducer';
import ui from './ui/reducer';
import user from './user/reducer';

export default combineReducers( {
	authentication,
	chat,
	connection,
	fallbackTicket,
	ui,
	user,
} );
