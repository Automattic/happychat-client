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
import isConnectionConnected from '../is-connection-connected';

describe( '#isConnectionConnected', () => {
	it( 'should return false for UNINITIALIZED', () => {
		const stateUnitialized = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED,
			},
		} );
		expect( isConnectionConnected( stateUnitialized ) ).toBeFalsy();
	} );

	it( 'should return true for CONNECTED', () => {
		const stateConnected = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_CONNECTED,
			},
		} );
		expect( isConnectionConnected( stateConnected ) ).toBeTruthy();
	} );

	it( 'should return false for DISCONNECTED', () => {
		const stateDisconnected = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED,
			},
		} );
		expect( isConnectionConnected( stateDisconnected ) ).toBeFalsy();
	} );

	it( 'should return false for CONNECTING', () => {
		const stateConnecting = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_CONNECTING,
			},
		} );
		expect( isConnectionConnected( stateConnecting ) ).toBeFalsy();
	} );

	it( 'should return false for RECONNECTING', () => {
		const stateReconnecting = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_RECONNECTING,
			},
		} );
		expect( isConnectionConnected( stateReconnecting ) ).toBeFalsy();
	} );
} );
