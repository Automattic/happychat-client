'use strict';

var _enzyme = require('enzyme');

var _identity = require('lodash/identity');

var _identity2 = _interopRequireDefault(_identity);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */
describe('Count', function () {
	test('should use the correct class name', function () {
		var count = (0, _enzyme.shallow)(_react2.default.createElement(_.Count, { count: 23, numberFormat: _identity2.default }));
		expect(count.hasClass('count')).toBeTruthy();
	});

	test('should call provided as prop numberFormat function', function () {
		var numberFormatSpy = jest.fn();
		(0, _enzyme.shallow)(_react2.default.createElement(_.Count, { count: 23, numberFormat: numberFormatSpy }));
		expect(numberFormatSpy.mock.calls[0][0]).toBe(23);
	});
});

/**
 * Internal dependencies
 */