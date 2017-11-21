/** @format */

/**
 * Internal dependencies
 */
import createConfig from '../';

describe( 'index', () => {
	describe( 'config without data', () => {
		const config = createConfig( {} );

		test( 'has to return false when the feature flags are not specified', () => {
			const result = config.isEnabled( 'flagA' );

			expect( result ).toBeFalsy();
		} );
	} );

	describe( 'config with data', () => {
		const config = createConfig( {
			keyA: 'value',
			features: {
				flagA: false,
				flagB: false,
				flagC: true,
			},
		} );

		test( 'has to return value of the provided key', () => {
			const result = config( 'keyA' );

			expect( result ).toBe( 'value' );
		} );

		test( 'has to return false when the provided feature flag is disabled', () => {
			const result = config.isEnabled( 'flagA' );

			expect( result ).toBeFalsy();
		} );

		test( 'has to return false when the provided feature flag is enabled', () => {
			const result = config.isEnabled( 'flagC' );

			expect( result ).toBeTruthy();
		} );

		describe( 'error cases', () => {
			const NODE_ENV = process.env.NODE_ENV;
			const fakeKey = 'where did all the errors go?';

			afterEach( () => ( process.env.NODE_ENV = NODE_ENV ) );

			test( `should throw an error when given key doesn't exist (NODE_ENV == development)`, () => {
				process.env.NODE_ENV = 'development';

				expect( () => config( fakeKey ) ).toThrow( ReferenceError );
			} );

			test( `should not throw an error when given key doesn't exist (NODE_ENV != development)`, () => {
				const envs = [ 'client', 'desktop', 'horizon', 'production', 'stage', 'test', 'wpcalypso' ];

				envs.forEach( env => {
					process.env.NODE_ENV = env;

					expect( process.env.NODE_ENV ).toBe( env );
					expect( () => config( fakeKey ) ).not.toThrow( Error );
				} );
			} );
		} );
	} );
} );
