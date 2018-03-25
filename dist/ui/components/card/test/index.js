'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _compact = require('../compact');

var _compact2 = _interopRequireDefault(_compact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal dependencies
 */
/** @format */
/**
 * External dependencies
 */
describe('Card', function () {
	// it should have a class of `card`
	test('should have `card` class', function () {
		var card = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
		expect(card.is('.card')).toBe(true);
		expect(card).toMatchSnapshot();
	});

	// it should accept a custom class of `test__ace`
	test('should have custom class of `test__ace`', function () {
		var card = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: 'test__ace' }));
		expect(card.is('.test__ace')).toBe(true);
		expect(card).toMatchSnapshot();
	});

	// check that content within a card renders correctly
	test('should render children', function () {
		var card = (0, _enzyme.shallow)(_react2.default.createElement(
			_2.default,
			null,
			'This is a card'
		));
		expect(card.contains('This is a card')).toBe(true);
		expect(card).toMatchSnapshot();
	});

	// check it will accept a href
	test('should be linkable', function () {
		var card = (0, _enzyme.shallow)(_react2.default.createElement(
			_2.default,
			{ href: '/test' },
			'This is a linked card'
		));
		expect(card.find('a[href="/test"]')).toHaveLength(1);
		expect(card.props().href).toBe('/test');
		expect(card.is('.is-card-link')).toBe(true);
		expect(card).toMatchSnapshot();
	});
});

describe('CompactCard', function () {
	// it should have a class of `is-compact`
	test('should have `is-compact` class', function () {
		var compactCard = (0, _enzyme.shallow)(_react2.default.createElement(_compact2.default, null));
		expect(compactCard.find('.is-compact')).toHaveLength(1);
		expect(compactCard).toMatchSnapshot();
	});

	// it should accept a custom class of `test__ace`
	test('should have custom class of `test__ace`', function () {
		var compactCard = (0, _enzyme.shallow)(_react2.default.createElement(_compact2.default, { className: 'test__ace' }));
		expect(compactCard.is('.test__ace')).toBe(true);
		expect(compactCard).toMatchSnapshot();
	});

	// check that content within a CompactCard renders correctly
	test('should render children', function () {
		var compactCard = (0, _enzyme.shallow)(_react2.default.createElement(
			_compact2.default,
			null,
			'This is a compact card'
		));
		expect(compactCard.contains('This is a compact card')).toBe(true);
		expect(compactCard).toMatchSnapshot();
	});

	// test for card component
	test('should use the card component', function () {
		var compactCard = (0, _enzyme.shallow)(_react2.default.createElement(_compact2.default, null));
		expect(compactCard.find('Card')).toHaveLength(1);
		expect(compactCard).toMatchSnapshot();
	});
});