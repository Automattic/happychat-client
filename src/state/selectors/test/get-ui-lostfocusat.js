/** @format */

/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import getUILostFocusAt from '../get-ui-lostfocusat';

// Simulate the time Feb 27, 2017 05:25 UTC
const NOW = 1488173100125;

describe( '#getLostFocusTimestamp', () => {
	test( 'returns the current timestamp', () => {
		const state = deepFreeze( { ui: { lostFocusAt: NOW } } );
		expect( getUILostFocusAt( state ) ).toBe( NOW );
	} );
} );
