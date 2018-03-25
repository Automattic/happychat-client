'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gridicons = require('gridicons');

var _gridicons2 = _interopRequireDefault(_gridicons);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */
describe('Button', function () {
	describe('renders', function () {
		test('with modifiers', function () {
			var button = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { scary: true, primary: true, borderless: true, compact: true }));
			expect(button.hasClass('is-compact')).toBeTruthy();
			expect(button.hasClass('is-primary')).toBeTruthy();
			expect(button.hasClass('is-scary')).toBeTruthy();
			expect(button.hasClass('is-borderless')).toBeTruthy;
		});

		test('without modifiers', function () {
			var button = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
			expect(button.hasClass('button')).toBeTruthy();
			expect(button.hasClass('is-compact')).not.toBeTruthy();
			expect(button.hasClass('is-primary')).not.toBeTruthy();
			expect(button.hasClass('is-scary')).not.toBeTruthy();
			expect(button.hasClass('is-borderless')).not.toBeTruthy();
		});

		test('disabled', function () {
			var button = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { disabled: true }));
			expect(button.html()).toBe('<button disabled="" type="button" class="button"></button>');
		});

		test('with child', function () {
			var iconType = 'arrow-left';
			var icon = _react2.default.createElement(_gridicons2.default, { size: 18, icon: iconType });
			var button = (0, _enzyme.shallow)(_react2.default.createElement(
				_2.default,
				null,
				icon
			));
			expect(button.contains(icon)).toBeTruthy();
			expect(button.find(_gridicons2.default).prop('icon')).toBe(iconType);
		});
	});

	describe('with href prop', function () {
		test('renders as a link', function () {
			var button = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { href: 'https://wordpress.com/' }));

			expect(button.is('a')).toBeTruthy();
			expect(button.prop('href')).toBe('https://wordpress.com/');
		});

		test('ignores type prop and renders a link without type attribute', function () {
			var button = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { href: 'https://wordpress.com/', type: 'submit' }));

			expect(button.prop('type')).toBeUndefined();
		});

		test('including target and rel props renders a link with target and rel attributes', function () {
			var button = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { href: 'https://wordpress.com/', target: '_blank', rel: 'noopener noreferrer' }));

			expect(button.prop('target')).toBe('_blank');
			expect(button.prop('rel')).toBe('noopener noreferrer');
		});

		test('adds noopener noreferrer rel if target is specified', function () {
			var button = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { href: 'https://wordpress.com/', target: '_blank' }));

			expect(button.prop('target')).toBe('_blank');
			expect(button.prop('rel')).toBe('noopener noreferrer');
		});
	});

	describe('without href prop', function () {
		var button = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { target: '_blank', rel: 'noopener noreferrer' }));

		test('renders as a button', function () {
			expect(button.is('button')).toBeTruthy();
			expect(button.prop('href')).toBeUndefined();
		});

		test('renders button with type attribute set to "button" by default', function () {
			expect(button.prop('type')).toBe('button');
		});

		test('renders button with type attribute set to type prop if specified', function () {
			var typeProp = 'submit';
			var submitButton = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { target: '_blank', rel: 'noopener noreferrer', type: typeProp }));

			expect(submitButton.prop('type')).toBe(typeProp);
		});

		test('renders button without rel and target attributes', function () {
			expect(button.prop('target')).toBeUndefined();
			expect(button.prop('rel')).toBeUndefined();
		});
	});
});

/**
 * Internal dependencies
 */