'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @format */
/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


exports.default = CompactCard;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CompactCard(props) {
	return _react2.default.createElement(
		_index2.default,
		_extends({}, props, { className: (0, _classnames2.default)(props.className, 'is-compact') }),
		props.children
	);
}