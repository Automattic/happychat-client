/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_SOCKET_CONNECT,
	HAPPYCHAT_SOCKET_CONNECTED,
	HAPPYCHAT_SOCKET_CONNECTING,
	HAPPYCHAT_SOCKET_DISCONNECTED,
	HAPPYCHAT_SOCKET_INITIALIZE,
	HAPPYCHAT_SOCKET_RECONNECTING,
	HAPPYCHAT_SOCKET_SERVICE_AVAILABILITY
} from 'src/state/action-types';

export const connectChat = () => ( { type: HAPPYCHAT_SOCKET_CONNECT } );
export const setConnected = () => ( { type: HAPPYCHAT_SOCKET_CONNECTED } );
export const setConnecting = () => ( { type: HAPPYCHAT_SOCKET_CONNECTING } );
export const setDisconnected = errorStatus => ( {
	type: HAPPYCHAT_SOCKET_DISCONNECTED,
	errorStatus
} );
export const setReconnecting = () => ( { type: HAPPYCHAT_SOCKET_RECONNECTING } );

export const setHappychatAvailable = isAvailable => ( {
	type: HAPPYCHAT_SOCKET_SERVICE_AVAILABILITY,
	isAvailable
} );

export const initialize = () => ( { type: HAPPYCHAT_SOCKET_INITIALIZE } );
