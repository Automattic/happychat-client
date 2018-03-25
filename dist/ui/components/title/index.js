'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Title = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cross = require('gridicons/dist/cross');

var _cross2 = _interopRequireDefault(_cross);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * React component for rendering title bar
 */
/** @format */

/**
 * External dependencies
 */
var Title = exports.Title = function Title(_ref) {
	var onCloseChat = _ref.onCloseChat,
	    translate = _ref.translate;
	return _react2.default.createElement(
		'div',
		{ className: 'happychat__title' },
		_react2.default.createElement(
			'div',
			{ className: 'happychat__active-toolbar' },
			_react2.default.createElement(
				'h4',
				null,
				translate('Support Chat')
			),
			_react2.default.createElement(
				'div',
				{ onClick: onCloseChat },
				_react2.default.createElement(_cross2.default, null)
			)
		)
	);
};