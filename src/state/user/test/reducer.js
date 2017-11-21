/** @format */

/**
 * Internal dependencies
 */
import { HAPPYCHAT_IO_RECEIVE_INIT } from 'src/state/action-types';
import { geoLocation } from '../reducer';

describe( '#geoLocation()', () => {
	test( 'should default to null', () => {
		const state = geoLocation( undefined, {} );

		expect( state ).toBeNull();
	} );

	test( 'should set the current user geolocation', () => {
		const state = geoLocation( null, {
			type: HAPPYCHAT_IO_RECEIVE_INIT,
			user: {
				geoLocation: {
					country_long: 'Romania',
					city: 'Timisoara',
				},
			},
		} );

		expect( state ).toMatchObject( { country_long: 'Romania', city: 'Timisoara' } );
	} );
} );
