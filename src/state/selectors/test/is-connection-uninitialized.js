/** @format */

/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED,
	HAPPYCHAT_CONNECTION_STATUS_CONNECTED,
	HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED,
	HAPPYCHAT_CONNECTION_STATUS_CONNECTING,
	HAPPYCHAT_CONNECTION_STATUS_RECONNECTING,
} from 'src/state/constants';
import isConnectionUninitialized from '../is-connection-uninitialized';

describe( '#isConnectionUninitialized', () => {
	it( 'should return true for UNINITIALIZED', () => {
		const stateUnitialized = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED,
			},
		} );
		expect( isConnectionUninitialized( stateUnitialized ) ).toBeTruthy();
	} );

	it( 'should return false for CONNECTED', () => {
		const stateConnected = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_CONNECTED,
			},
		} );
		expect( isConnectionUninitialized( stateConnected ) ).toBeFalsy();
	} );

	it( 'should return false for DISCONNECTED', () => {
		const stateDisconnected = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED,
			},
		} );
		expect( isConnectionUninitialized( stateDisconnected ) ).toBeFalsy();
	} );

	it( 'should return false for CONNECTING', () => {
		const stateConnecting = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_CONNECTING,
			},
		} );
		expect( isConnectionUninitialized( stateConnecting ) ).toBeFalsy();
	} );

	it( 'should return false for RECONNECTING', () => {
		const stateReconnecting = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_RECONNECTING,
			},
		} );
		expect( isConnectionUninitialized( stateReconnecting ) ).toBeFalsy();
	} );
} );
