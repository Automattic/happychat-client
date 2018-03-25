'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _emojify = require('components/emojify');

var _emojify2 = _interopRequireDefault(_emojify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */

var EmojifyExample = function EmojifyExample() {
	var textToEmojify = 'This 🙈 will be converted 🙉🙊🙂';

	return _react2.default.createElement(
		'div',
		{ className: 'design-assets__group' },
		_react2.default.createElement(
			_emojify2.default,
			null,
			textToEmojify
		)
	);
};

/**
 * Internal dependencies
 */


EmojifyExample.displayName = 'Emojify';

exports.default = EmojifyExample;