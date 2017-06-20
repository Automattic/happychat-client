/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_SOCKET_CONNECTED,
	HAPPYCHAT_SOCKET_CONNECTING,
	HAPPYCHAT_SOCKET_DISCONNECTED,
	HAPPYCHAT_SOCKET_RECONNECTING,
	HAPPYCHAT_SOCKET_SERVICE_AVAILABILITY
} from 'src/state/action-types';

import {
	HAPPYCHAT_SOCKET_STATUS_CONNECTED,
	HAPPYCHAT_SOCKET_STATUS_CONNECTING,
	HAPPYCHAT_SOCKET_STATUS_DISCONNECTED,
	HAPPYCHAT_SOCKET_STATUS_RECONNECTING
} from 'src/state/constants';

/**
 * Tracks the state of the happychat SocketIO client connection
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
const connectionStatus = ( state = 'uninitialized', action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_SOCKET_CONNECTING:
			return HAPPYCHAT_SOCKET_STATUS_CONNECTING;
		case HAPPYCHAT_SOCKET_CONNECTED:
			return HAPPYCHAT_SOCKET_STATUS_CONNECTED;
		case HAPPYCHAT_SOCKET_DISCONNECTED:
			return HAPPYCHAT_SOCKET_STATUS_DISCONNECTED;
		case HAPPYCHAT_SOCKET_RECONNECTING:
			return HAPPYCHAT_SOCKET_STATUS_RECONNECTING;
	}
	return state;
};

/**
 * Tracks the error status for happychat SocketIO client connection
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
const connectionError = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_SOCKET_CONNECTED:
			return null;
		case HAPPYCHAT_SOCKET_DISCONNECTED:
			return action.errorStatus;
	}
	return state;
};

/**
 * Tracks whether Happychat service is accepting new chats.
 *
 * @param  {Boolean} state  Current happychat status
 * @param  {Object}  action Action playload
 * @return {Boolean}        Updated happychat status
 */
const isServiceAvailable = ( state = false, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_SOCKET_SERVICE_AVAILABILITY:
			// by double-negating isOpen prop, we make undefined and null values falsy
			// meanwhile bool values will remain the same
			return !! action.isAvailable;
	}
	return state;
};

export default combineReducers( {
	connectionError,
	connectionStatus,
	isAvailable: isServiceAvailable
} );
