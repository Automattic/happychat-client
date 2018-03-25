'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<FormTextInput />', function () {
	test('should add the provided class names', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: 'test', isError: true, isValid: true }));

		expect(wrapper.html()).toBe('<input type="text" class="form-text-input test is-error is-valid"/>');
	});

	test('should have form-text-input class name', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

		expect(wrapper.html()).toBe('<input type="text" class="form-text-input"/>');
	});

	test("should not pass component's own props down to the input", function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { isValid: true, isError: true, selectOnFocus: true }));

		expect(wrapper.getElement().props).not.toHaveProperty('isValid');
		expect(wrapper.getElement().props).not.toHaveProperty('isError');
		expect(wrapper.getElement().props).not.toHaveProperty('selectOnFocus');
	});

	test("should pass props aside from component's own to the input", function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { placeholder: 'test placeholder' }));

		expect(wrapper.getElement().props).toHaveProperty('placeholder');
	});

	test('should call select if selectOnFocus is true', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { selectOnFocus: true }));
		var event = {
			target: {
				select: jest.fn()
			}
		};
		wrapper.simulate('click', event);

		expect(event.target.select).toHaveBeenCalledTimes(1);
	});

	test('should not call select if selectOnFocus is false', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { selectOnFocus: false }));
		var event = {
			target: {
				select: jest.fn()
			}
		};
		wrapper.simulate('click', event);

		expect(event.target.select).not.toHaveBeenCalled();
	});
});

/**
 * Internal dependencies
 */
/** @format */
/**
 * External dependencies
 */