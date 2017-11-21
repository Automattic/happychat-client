/** @format */

/**
 * Internal dependencies
 */
import getGeoLocation from '../get-user-geolocation';

describe( 'getGeoLocation', () => {
	test( 'should return null if geoLocation is not set', () => {
		const selected = getGeoLocation( {
			user: { geoLocation: null },
		} );
		expect( selected ).toBeNull();
	} );

	test( 'should return value if geoLocation is set', () => {
		const selected = getGeoLocation( {
			user: {
				geoLocation: {
					city: 'Timisoara',
				},
			},
		} );
		expect( selected ).toMatchObject( { city: 'Timisoara' } );
	} );
} );
