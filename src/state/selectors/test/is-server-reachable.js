/** @format */

/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_CONNECTION_ERROR_FORCED_CLOSE,
	HAPPYCHAT_CONNECTION_ERROR_PING_TIMEOUT,
	HAPPYCHAT_CONNECTION_ERROR_TRANSPORT_CLOSE,
	HAPPYCHAT_CONNECTION_ERROR_TRANSPORT_ERROR,
} from 'src/state/constants';
import isServerReachable from '../is-server-reachable';

describe( '#isServerReachable', () => {
	it( 'should return true if there is no error', () => {
		const state = deepFreeze( {
			connection: {
				error: null,
			},
		} );
		expect( isServerReachable( state ) ).toBeTruthy();
	} );

	it( 'should return true if error is: Forced Close', () => {
		const state = deepFreeze( {
			connection: {
				error: HAPPYCHAT_CONNECTION_ERROR_FORCED_CLOSE,
			},
		} );
		expect( isServerReachable( state ) ).toBeTruthy();
	} );

	it( 'should return true if error is: Transport Close', () => {
		const state = deepFreeze( {
			connection: {
				error: HAPPYCHAT_CONNECTION_ERROR_TRANSPORT_CLOSE,
			},
		} );
		expect( isServerReachable( state ) ).toBeTruthy();
	} );

	it( 'should return true if error is: Transport Error', () => {
		const state = deepFreeze( {
			connection: {
				error: HAPPYCHAT_CONNECTION_ERROR_TRANSPORT_ERROR,
			},
		} );
		expect( isServerReachable( state ) ).toBeTruthy();
	} );

	it( 'should return false if error is: Ping Timeout', () => {
		const state = deepFreeze( {
			connection: {
				error: HAPPYCHAT_CONNECTION_ERROR_PING_TIMEOUT,
			},
		} );
		expect( isServerReachable( state ) ).toBeFalsy();
	} );
} );
