/** @format */

/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED,
	HAPPYCHAT_CONNECTION_STATUS_CONNECTED,
} from 'src/state/constants';
import isAvailable from '../is-available';

describe( '#isAvailable', () => {
	it( "should be false if there's no active connection", () => {
		const state = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED,
				isAvailable: true,
			},
		} );
		expect( isAvailable( state ) ).to.be.false;
	} );

	it( "should be false if Happychat isn't accepting new connections", () => {
		const state = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_CONNECTED,
				isAvailable: false,
			},
		} );
		expect( isAvailable( state ) ).to.be.false;
	} );

	it( "should be true when there's a connection and connections are being accepted", () => {
		const state = deepFreeze( {
			connection: {
				status: HAPPYCHAT_CONNECTION_STATUS_CONNECTED,
				isAvailable: true,
			},
		} );
		expect( isAvailable( state ) ).to.be.true;
	} );
} );
