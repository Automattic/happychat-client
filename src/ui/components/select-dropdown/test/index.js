/**
 * @format
 * @jest-environment jsdom
 */

/**
 * External dependencies
 */
import { shallow, mount } from 'enzyme';
import React from 'react';

/**
 * Internal dependencies
 */
import SelectDropdown from '../index';

describe( 'index', () => {
	describe( 'component rendering', () => {
		test( 'should render a list with the provided options', () => {
			const dropdown = mountDropdown();
			expect( dropdown.find( '.select-dropdown__options li.select-dropdown__label' ).text() ).toBe(
				'Statuses'
			);
			expect( dropdown.find( '.select-dropdown__options li.select-dropdown__option' ).length ).toBe(
				4
			);
		} );

		test( 'should render a separator in place of any falsy option', () => {
			const dropdown = mountDropdown();
			expect(
				dropdown.find( '.select-dropdown__options li.select-dropdown__separator' ).length
			).toBe( 1 );
		} );

		test( 'should be initially closed', () => {
			const dropdown = shallowRenderDropdown();
			expect( dropdown.find( '.select-dropdown' ).length ).toBe( 1 );
			expect( dropdown.find( '.select-dropdown.is-open' ).length ).toBe( 0 );
		} );

		test( 'should execute toggleDropdown when clicked', () => {
			const originalToggleDropdown = SelectDropdown.prototype.toggleDropdown;
			SelectDropdown.prototype.toggleDropdown = jest.fn();

			const dropdown = shallowRenderDropdown();
			dropdown.find( '.select-dropdown__container' ).simulate( 'click' );

			expect( SelectDropdown.prototype.toggleDropdown.mock.calls.length ).toBe( 1 );
			SelectDropdown.prototype.toggleDropdown = originalToggleDropdown;
		} );

		test( 'should be possible to control the dropdown via keyboard', () => {
			const originalNavigateItem = SelectDropdown.prototype.navigateItem;
			SelectDropdown.prototype.navigateItem = jest.fn();

			const dropdown = shallowRenderDropdown();
			dropdown.find( '.select-dropdown__container' ).simulate( 'keydown' );

			expect( SelectDropdown.prototype.navigateItem.mock.calls.length ).toBe( 1 );
			SelectDropdown.prototype.navigateItem = originalNavigateItem;
		} );
	} );

	describe( 'getInitialSelectedItem', () => {
		test( 'should return the initially selected value (if any)', () => {
			const dropdown = shallowRenderDropdown( { initialSelected: 'drafts' } );
			const initialSelectedValue = dropdown.instance().getInitialSelectedItem();
			expect( initialSelectedValue ).toBe( 'drafts' );
		} );

		test( "should return `undefined`, when there aren't options", () => {
			const dropdown = shallow( <SelectDropdown /> );
			expect( dropdown.instance().getInitialSelectedItem() ).toBeUndefined();
		} );

		test( "should return the first not-label option, when there isn't a preselected value", () => {
			const dropdown = shallowRenderDropdown();
			const initialSelectedValue = dropdown.instance().getInitialSelectedItem();
			expect( initialSelectedValue ).toBe( 'published' );
		} );
	} );

	describe( 'getSelectedText', () => {
		test( 'should return the initially selected text (if any)', () => {
			const dropdown = shallowRenderDropdown( { selectedText: 'Drafts' } );
			const initialSelectedText = dropdown.instance().getSelectedText();
			expect( initialSelectedText ).toBe( 'Drafts' );
		} );

		test( 'should return the `label` associated to the selected option', () => {
			const dropdown = shallowRenderDropdown();
			const initialSelectedText = dropdown.instance().getSelectedText();
			expect( initialSelectedText ).toBe( 'Published' );
		} );

		test( "should return the `label` associated to the initial selected option, when there isn't any selected option", () => {
			const originalGetInitialSelectedItem = SelectDropdown.prototype.getInitialSelectedItem;
			SelectDropdown.prototype.getInitialSelectedItem = jest.fn().mockReturnValue( 'scheduled' );
			const dropdown = shallowRenderDropdown();
			const initialSelectedText = dropdown.instance().getSelectedText();
			expect( initialSelectedText ).toBe( 'Scheduled' );
			SelectDropdown.prototype.getInitialSelectedItem = originalGetInitialSelectedItem;
		} );
	} );

	describe( 'selectItem', () => {
		test( 'should run the `onSelect` hook, and then update the state', () => {
			const originalSetState = React.Component.prototype.setState;
			React.Component.prototype.setState = jest.fn();

			const dropdownOptions = getDropdownOptions();
			const onSelectSpy = jest.fn();
			const dropdown = mount(
				<SelectDropdown options={ dropdownOptions } onSelect={ onSelectSpy } />
			);

			const newSelectedOption = dropdownOptions[ 2 ];
			dropdown.instance().selectItem( newSelectedOption );

			expect( onSelectSpy.mock.calls.length ).toBe( 1 );
			expect( React.Component.prototype.setState ).lastCalledWith( {
				selected: newSelectedOption.value,
			} );
			React.Component.prototype.setState = originalSetState;
		} );
	} );

	describe( 'toggleDropdown', () => {
		test( 'should toggle the `isOpen` state property', () => {
			function runToggleDropdownTest( isCurrentlyOpen ) {
				const fakeContext = {
					setState: jest.fn(),
					state: {
						isOpen: isCurrentlyOpen,
					},
				};

				SelectDropdown.prototype.toggleDropdown.call( fakeContext );
				expect( fakeContext.setState.mock.calls.length ).toBe( 1 );
				expect( fakeContext.setState ).lastCalledWith( { isOpen: ! isCurrentlyOpen } );
			}

			runToggleDropdownTest( true );
			runToggleDropdownTest( false );
		} );
	} );

	describe( 'openDropdown', () => {
		test( 'should set the `isOpen` state property equal `true`', () => {
			const setStateSpy = jest.fn();
			const fakeContext = {
				setState: setStateSpy,
			};

			SelectDropdown.prototype.openDropdown.call( fakeContext );

			expect( setStateSpy.mock.calls.length ).toBe( 1 );
			expect( setStateSpy ).lastCalledWith( { isOpen: true } );
		} );
	} );

	describe( 'closeDropdown', () => {
		test( "shouldn't do anything when the dropdown is already closed", () => {
			const setStateSpy = jest.fn();
			const fakeContext = {
				setState: setStateSpy,
				state: {
					isOpen: false,
				},
			};

			SelectDropdown.prototype.closeDropdown.call( fakeContext );

			expect( setStateSpy.mock.calls.length ).toBe( 0 );
		} );

		test( 'should set the `isOpen` state property equal `false`', () => {
			const setStateSpy = jest.fn();
			const fakeContext = {
				focused: 1,
				setState: setStateSpy,
				state: {
					isOpen: true,
				},
			};

			SelectDropdown.prototype.closeDropdown.call( fakeContext );

			expect( setStateSpy.mock.calls.length ).toBe( 1 );
			expect( setStateSpy ).lastCalledWith( { isOpen: false, searchValue: null } );

			expect( fakeContext.focused ).toBeUndefined();
		} );
	} );

	describe( 'navigateItem', () => {
		test( "permits to navigate through the dropdown's options by pressing the TAB key", () => {
			const tabKeyCode = 9;
			const fakeEvent = prepareFakeEvent( tabKeyCode );
			const fakeContext = prepareFakeContext();

			SelectDropdown.prototype.navigateItem.call( fakeContext, fakeEvent );

			expect( fakeContext.navigateItemByTabKey.mock.calls.length ).toBe( 1 );
			expect( fakeContext.navigateItemByTabKey ).lastCalledWith( fakeEvent );
		} );

		test( 'permits to select an option by pressing ENTER, or SPACE', () => {
			function runNavigateItemTest( keyCode ) {
				const fakeEvent = prepareFakeEvent( keyCode );
				const fakeContext = prepareFakeContext();

				SelectDropdown.prototype.navigateItem.call( fakeContext, fakeEvent );

				expect( fakeEvent.preventDefault.mock.calls.length ).toBe( 1 );
				expect( fakeContext.activateItem.mock.calls.length ).toBe( 1 );
			}

			const enterKeyCode = 13;
			const spaceKeyCode = 32;

			[ enterKeyCode, spaceKeyCode ].forEach( runNavigateItemTest );
		} );

		test( 'permits to close the dropdown by pressing ESCAPE', () => {
			const escapeKeyCode = 27;
			const fakeEvent = prepareFakeEvent( escapeKeyCode );
			const fakeContext = prepareFakeContext();

			SelectDropdown.prototype.navigateItem.call( fakeContext, fakeEvent );

			expect( fakeEvent.preventDefault.mock.calls.length ).toBe( 1 );

			const {
				refs: { dropdownContainer: { focus: focusSpy } },
				closeDropdown: closeDropdownSpy,
			} = fakeContext;
			expect( closeDropdownSpy.mock.calls.length ).toBe( 1 );
			expect( focusSpy.mock.calls.length ).toBe( 1 );
		} );

		test( "permits to open the dropdown, and navigate through the dropdown's options by pressing the arrow UP/DOWN keys", () => {
			function runNavigateItemTest( { keyCode, direction } ) {
				const fakeEvent = prepareFakeEvent( keyCode );
				const fakeContext = prepareFakeContext();

				SelectDropdown.prototype.navigateItem.call( fakeContext, fakeEvent );

				expect( fakeEvent.preventDefault.mock.calls.length ).toBe( 1 );

				expect( fakeContext.focusSibling.mock.calls.length ).toBe( 1 );
				expect( fakeContext.focusSibling ).lastCalledWith( direction );

				expect( fakeContext.openDropdown.mock.calls.length ).toBe( 1 );
			}

			const arrowUp = { keyCode: 38, direction: 'previous' };
			const arrowDown = { keyCode: 40, direction: 'next' };

			[ arrowUp, arrowDown ].forEach( runNavigateItemTest );
		} );

		function prepareFakeContext() {
			return {
				refs: {
					dropdownContainer: {
						focus: jest.fn(),
					},
				},
				activateItem: jest.fn(),
				closeDropdown: jest.fn(),
				focusSibling: jest.fn(),
				navigateItemByTabKey: jest.fn(),
				openDropdown: jest.fn(),
			};
		}

		function prepareFakeEvent( keyCode ) {
			return {
				keyCode,
				preventDefault: jest.fn(),
			};
		}
	} );

	/**
	 * Utilities
	 */

	function mountDropdown() {
		const dropdownOptions = getDropdownOptions();
		return mount( <SelectDropdown options={ dropdownOptions } /> );
	}

	function shallowRenderDropdown( props ) {
		const dropdownOptions = getDropdownOptions();
		return shallow( <SelectDropdown options={ dropdownOptions } { ...props } /> );
	}

	function getDropdownOptions() {
		return [
			{ value: 'status-options', label: 'Statuses', isLabel: true },
			{ value: 'published', label: 'Published' },
			{ value: 'scheduled', label: 'Scheduled' },
			{ value: 'drafts', label: 'Drafts' },
			null,
			{ value: 'trashed', label: 'Trashed' },
		];
	}
} );
