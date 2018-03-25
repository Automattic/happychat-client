'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('src/config');

var _config2 = _interopRequireDefault(_config);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
describe('Emojify', function () {
	describe('component rendering', function () {
		var twemojiUrl = (0, _config2.default)('twemoji_cdn_url');
		test('wraps a string in a div', function () {
			var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
				_2.default,
				null,
				'Foo'
			), {
				disableLifecycleMethods: true
			});
			expect(wrapper.html()).toBe('<div class="emojify">Foo</div>');
		});

		test('wraps a block in a div', function () {
			var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
				_2.default,
				null,
				_react2.default.createElement(
					'p',
					null,
					'Bar'
				)
			), { disableLifecycleMethods: true });
			expect(wrapper.html()).toBe('<div class="emojify"><p>Bar</p></div>');
		});

		test('replaces emoji in a string', function () {
			var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
				_2.default,
				{ twemojiUrl: twemojiUrl },
				'\uD83D\uDE42'
			));

			expect(wrapper.html()).toBe('<div class="emojify"><img draggable="false" class="emojify__emoji" alt="🙂" ' + 'src="https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/72x72/1f642.png"></div>');
		});

		test('replaces emoji in a block', function () {
			var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
				_2.default,
				{ twemojiUrl: twemojiUrl },
				_react2.default.createElement(
					'p',
					null,
					'\uD83E\uDDD4\uD83C\uDFFB'
				)
			));

			expect(wrapper.html()).toBe('<div class="emojify"><p><img draggable="false" class="emojify__emoji" alt="🧔🏻" ' + 'src="https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/72x72/1f9d4-1f3fb.png"></p></div>');
		});

		test('maintains custom props', function () {
			var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
				_2.default,
				{ alt: 'bar' },
				'\u05D4\u05E9\u05E0\u05D4 \u05D4\u05D9\u05D0 2017.'
			), {
				disableLifecycleMethods: true
			});
			expect(wrapper.getElement().props.alt).toBe('bar');
		});
	});
});