/** @format */

/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import React from 'react';

/**
 * Internal dependencies
 */
import Button from '../';
import Gridicon from 'src/ui/components/gridicons/gridicon';

describe( 'Button', () => {
	describe( 'renders', () => {
		test( 'with modifiers', () => {
			const button = shallow( <Button scary primary borderless compact /> );
			expect( button.hasClass( 'is-compact' ) ).toBeTruthy();
			expect( button.hasClass( 'is-primary' ) ).toBeTruthy();
			expect( button.hasClass( 'is-scary' ) ).toBeTruthy();
			expect( button.hasClass( 'is-borderless' ) ).toBeTruthy;
		} );

		test( 'without modifiers', () => {
			const button = shallow( <Button /> );
			expect( button.hasClass( 'button' ) ).toBeTruthy();
			expect( button.hasClass( 'is-compact' ) ).not.toBeTruthy();
			expect( button.hasClass( 'is-primary' ) ).not.toBeTruthy();
			expect( button.hasClass( 'is-scary' ) ).not.toBeTruthy();
			expect( button.hasClass( 'is-borderless' ) ).not.toBeTruthy();
		} );

		test( 'disabled', () => {
			const button = shallow( <Button disabled /> );
			expect( button.html() ).toBe( '<button disabled="" type="button" class="button"></button>' );
		} );

		test( 'with child', () => {
			const iconType = 'arrow-left';
			const icon = <Gridicon size={ 18 } icon={ iconType } />;
			const button = shallow( <Button>{ icon }</Button> );
			expect( button.contains( icon ) ).toBeTruthy();
			expect( button.find( Gridicon ).prop( 'icon' ) ).toBe( iconType );
		} );
	} );

	describe( 'with href prop', () => {
		test( 'renders as a link', () => {
			const button = shallow( <Button href="https://wordpress.com/" /> );

			expect( button.is( 'a' ) ).toBeTruthy();
			expect( button.prop( 'href' ) ).toBe( 'https://wordpress.com/' );
		} );

		test( 'ignores type prop and renders a link without type attribute', () => {
			const button = shallow( <Button href="https://wordpress.com/" type="submit" /> );

			expect( button.prop( 'type' ) ).toBeUndefined();
		} );

		test( 'including target and rel props renders a link with target and rel attributes', () => {
			const button = shallow(
				<Button href="https://wordpress.com/" target="_blank" rel="noopener noreferrer" />
			);

			expect( button.prop( 'target' ) ).toBe( '_blank' );
			expect( button.prop( 'rel' ) ).toBe( 'noopener noreferrer' );
		} );

		test( 'adds noopener noreferrer rel if target is specified', () => {
			const button = shallow( <Button href="https://wordpress.com/" target="_blank" /> );

			expect( button.prop( 'target' ) ).toBe( '_blank' );
			expect( button.prop( 'rel' ) ).toBe( 'noopener noreferrer' );
		} );
	} );

	describe( 'without href prop', () => {
		const button = shallow( <Button target="_blank" rel="noopener noreferrer" /> );

		test( 'renders as a button', () => {
			expect( button.is( 'button' ) ).toBeTruthy();
			expect( button.prop( 'href' ) ).toBeUndefined();
		} );

		test( 'renders button with type attribute set to "button" by default', () => {
			expect( button.prop( 'type' ) ).toBe( 'button' );
		} );

		test( 'renders button with type attribute set to type prop if specified', () => {
			const typeProp = 'submit';
			const submitButton = shallow(
				<Button target="_blank" rel="noopener noreferrer" type={ typeProp } />
			);

			expect( submitButton.prop( 'type' ) ).toBe( typeProp );
		} );

		test( 'renders button without rel and target attributes', () => {
			expect( button.prop( 'target' ) ).toBeUndefined();
			expect( button.prop( 'rel' ) ).toBeUndefined();
		} );
	} );
} );
