'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _item = require('../item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('item', function () {
	describe('component rendering', function () {
		test('should render a list entry', function () {
			var dropdownItem = (0, _enzyme.shallow)(_react2.default.createElement(
				_item2.default,
				null,
				'Published'
			));
			expect(dropdownItem.is('li.select-dropdown__option')).toBeTruthy();
		});

		test('should contain a link', function () {
			var dropdownItem = (0, _enzyme.shallow)(_react2.default.createElement(
				_item2.default,
				null,
				'Published'
			));
			expect(dropdownItem.children('a.select-dropdown__item').length).toBe(1);
			expect(dropdownItem.find('span.select-dropdown__item-text').text()).toBe('Published');
		});

		test('should not have `tabindex` attribute, when the parent dropdown is closed', function () {
			var dropdownItem = (0, _enzyme.shallow)(_react2.default.createElement(
				_item2.default,
				{ isDropdownOpen: false },
				'Published'
			));
			expect(dropdownItem.children({ tabIndex: 0 }).length).toBe(0);
		});

		test('should have `tabindex` attribute set to `0`, only when the parent dropdown is open (issue#9206)', function () {
			var dropdownItem = (0, _enzyme.shallow)(_react2.default.createElement(
				_item2.default,
				{ isDropdownOpen: true },
				'Published'
			));
			expect(dropdownItem.children({ tabIndex: 0 }).length).toBe(1);
		});
	});

	describe('when the component is clicked', function () {
		test('should do nothing when is disabled', function () {
			var onClickSpy = jest.fn();
			var dropdownItem = (0, _enzyme.shallow)(_react2.default.createElement(
				_item2.default,
				{ disabled: true, onClick: onClickSpy },
				'Published'
			));

			var link = dropdownItem.children('a.select-dropdown__item');
			expect(link.hasClass('is-disabled')).toBeTruthy();

			link.simulate('click');
			expect(onClickSpy.mock.calls.length).toBe(0);
		});

		test('should run the `onClick` hook', function () {
			var onClickSpy = jest.fn();
			var dropdownItem = (0, _enzyme.shallow)(_react2.default.createElement(
				_item2.default,
				{ onClick: onClickSpy },
				'Published'
			));
			dropdownItem.children('a.select-dropdown__item').simulate('click');
			expect(onClickSpy.mock.calls.length).toBe(1);
		});
	});
});

/**
 * Internal dependencies
 */
/**
 * @format
 * @jest-environment jsdom
 */

/**
 * External dependencies
 */