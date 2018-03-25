'use strict';

var _actionTypes = require('src/state/action-types');

var _reducer = require('../reducer');

// Simulate the time Feb 27, 2017 05:25 UTC
/** @format */

/**
 * Internal dependencies
 */
var NOW = 1488173100125;

describe('reducers', function () {
	describe('#lostFocusAt', function () {
		Date.now = jest.fn();
		Date.now.mockReturnValue(NOW);

		test('defaults to null', function () {
			expect((0, _reducer.lostFocusAt)(undefined, {})).toBeNull();
		});

		test('returns Date.now() on HAPPYCHAT_BLUR actions', function () {
			expect((0, _reducer.lostFocusAt)(null, { type: _actionTypes.HAPPYCHAT_BLUR })).toBe(NOW);
		});

		test('returns null on HAPPYCHAT_FOCUS actions', function () {
			expect((0, _reducer.lostFocusAt)(12345, { type: _actionTypes.HAPPYCHAT_FOCUS })).toBeNull();
		});
	});

	describe('#message()', function () {
		test('defaults to an empty string', function () {
			var result = (0, _reducer.currentMessage)(undefined, {});
			expect(result).toBe('');
		});

		test('saves messages passed from HAPPYCHAT_SET_CURRENT_MESSAGE', function () {
			var action = { type: _actionTypes.HAPPYCHAT_SET_CURRENT_MESSAGE, message: 'abcd' };
			var result = (0, _reducer.currentMessage)(undefined, action);
			expect(result).toBe('abcd');
		});

		test('resets to empty string on HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE', function () {
			var action = { type: _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE, payload: { message: 'abcd' } };
			var result = (0, _reducer.currentMessage)('abcd', action);
			expect(result).toBe('');
		});
	});
});