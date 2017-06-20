/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_SOCKET_CONNECTION_ERROR_PING_TIMEOUT,
	HAPPYCHAT_SOCKET_STATUS_CONNECTED,
	HAPPYCHAT_SOCKET_STATUS_UNINITIALIZED
} from 'src/state/constants';

/**
 * Gets the current happychat connection status
 * @param {Object} state - global redux state
 * @return {String} current state value
 */
export const getHappychatConnectionStatus = state => get( state, 'socket.connectionStatus' );

export const isHappychatConnectionUninitialized = state =>
	getHappychatConnectionStatus( state ) === HAPPYCHAT_SOCKET_STATUS_UNINITIALIZED;

export const isHappychatClientConnected = state =>
	getHappychatConnectionStatus( state ) === HAPPYCHAT_SOCKET_STATUS_CONNECTED;

export const isHappychatAcceptingChats = state => get( state, 'socket.isAvailable' );

export const isHappychatServerReachable = state =>
	get( state, 'socket.connectionError' ) !== HAPPYCHAT_SOCKET_CONNECTION_ERROR_PING_TIMEOUT;
