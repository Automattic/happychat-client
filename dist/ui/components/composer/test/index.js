'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */
describe('<Composer />', function () {
	describe('onChange event ', function () {
		test('should call onSetCurrentMessage property and send a typing event if message is not empty', function () {
			var onSendNotTyping = jest.fn();
			var onSendTyping = jest.fn();
			var onSetCurrentMessage = jest.fn();
			var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.Composer, {
				message: 'hey',
				onSetCurrentMessage: onSetCurrentMessage,
				onSendTyping: onSendTyping,
				onSendNotTyping: onSendNotTyping,
				translate: _noop2.default
			}));
			wrapper.find('textarea').simulate('change', { target: { value: 'hey' } });
			expect(onSetCurrentMessage).toHaveBeenCalled();
			expect(onSendTyping).toHaveBeenCalled();
			expect(onSendNotTyping).not.toHaveBeenCalled();
		});

		test('should call onSetCurrentMessage property and send a noTyping event if message is empty', function () {
			var onSendNotTyping = jest.fn();
			var onSendTyping = jest.fn();
			var onSetCurrentMessage = jest.fn();
			var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.Composer, {
				message: '',
				onSetCurrentMessage: onSetCurrentMessage,
				onSendTyping: onSendTyping,
				onSendNotTyping: onSendNotTyping,
				translate: _noop2.default
			}));
			wrapper.find('textarea').simulate('change', { target: { value: '' } });
			expect(onSetCurrentMessage).toHaveBeenCalled();
			expect(onSendTyping).not.toHaveBeenCalled();
			expect(onSendNotTyping).toHaveBeenCalled();
		});
	});

	describe('onKeyDown event ', function () {
		test('should call message and noTyping props if message is not empty', function () {
			var onSendMessage = jest.fn();
			var onSendNotTyping = jest.fn();
			var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.Composer, {
				message: 'hey',
				onSendMessage: onSendMessage,
				onSendNotTyping: onSendNotTyping,
				translate: _noop2.default
			}));
			wrapper.find('textarea').simulate('keydown', { which: 13, preventDefault: function preventDefault() {} });
			expect(onSendMessage).toHaveBeenCalled();
			expect(onSendNotTyping).toHaveBeenCalled();
		});

		test('should call message and noTyping props if message is empty', function () {
			var onSendMessage = jest.fn();
			var onSendNotTyping = jest.fn();
			var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.Composer, {
				message: '',
				onSendMessage: onSendMessage,
				onSendNotTyping: onSendNotTyping,
				translate: _noop2.default
			}));
			wrapper.find('textarea').simulate('keydown', { which: 13, preventDefault: function preventDefault() {} });
			expect(onSendMessage).not.toHaveBeenCalled();
			expect(onSendNotTyping).not.toHaveBeenCalled();
		});
	});
});

/**
 * Internal dependencies
 */