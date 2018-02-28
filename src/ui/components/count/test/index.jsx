/** @format */

/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import identity from 'lodash/identity';
import React from 'react';

/**
 * Internal dependencies
 */
import { Count } from '../';

describe( 'Count', () => {
	test( 'should use the correct class name', () => {
		const count = shallow( <Count count={ 23 } numberFormat={ identity } /> );
		expect( count.hasClass( 'count' ) ).toBeTruthy();
	} );

	test( 'should call provided as prop numberFormat function', () => {
		const numberFormatSpy = jest.fn();
		shallow( <Count count={ 23 } numberFormat={ numberFormatSpy } /> );
		expect( numberFormatSpy.mock.calls[ 0 ][ 0 ] ).toBe( 23 );
	} );
} );
