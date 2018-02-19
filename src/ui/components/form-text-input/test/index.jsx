/** @format */
/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import React from 'react';

/**
 * Internal dependencies
 */
import FormTextInput from '../';

describe( '<FormTextInput />', () => {
	test( 'should add the provided class names', () => {
		const wrapper = shallow( <FormTextInput className="test" isError isValid /> );

		expect( wrapper.html() ).toBe(
			'<input type="text" class="form-text-input test is-error is-valid"/>'
		);
	} );

	test( 'should have form-text-input class name', () => {
		const wrapper = shallow( <FormTextInput /> );

		expect( wrapper.html() ).toBe( '<input type="text" class="form-text-input"/>' );
	} );

	test( "should not pass component's own props down to the input", () => {
		const wrapper = shallow( <FormTextInput isValid isError selectOnFocus /> );

		expect( wrapper.getElement().props ).not.toHaveProperty( 'isValid' );
		expect( wrapper.getElement().props ).not.toHaveProperty( 'isError' );
		expect( wrapper.getElement().props ).not.toHaveProperty( 'selectOnFocus' );
	} );

	test( "should pass props aside from component's own to the input", () => {
		const wrapper = shallow( <FormTextInput placeholder="test placeholder" /> );

		expect( wrapper.getElement().props ).toHaveProperty( 'placeholder' );
	} );

	test( 'should call select if selectOnFocus is true', () => {
		const wrapper = shallow( <FormTextInput selectOnFocus={ true } /> );
		const event = {
			target: {
				select: jest.fn(),
			},
		};
		wrapper.simulate( 'click', event );

		expect( event.target.select ).toHaveBeenCalledTimes( 1 );
	} );

	test( 'should not call select if selectOnFocus is false', () => {
		const wrapper = shallow( <FormTextInput selectOnFocus={ false } /> );
		const event = {
			target: {
				select: jest.fn(),
			},
		};
		wrapper.simulate( 'click', event );

		expect( event.target.select ).not.toHaveBeenCalled();
	} );
} );
