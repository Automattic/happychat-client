'use strict';

var _reducer = require('../reducer');

var _actionTypes = require('src/state/action-types');

// Simulate the time Feb 27, 2017 05:25 UTC
/** @format */

/**
 * Internal dependencies
 */
var NOW = 1488173100125;

describe('reducers', function () {
	describe('#lastActivityTimestamp', function () {
		Date.now = jest.fn();
		Date.now.mockReturnValue(NOW);

		test('defaults to null', function () {
			var result = (0, _reducer.lastActivityTimestamp)(undefined, {});
			expect(result).toBeNull();
		});

		test('should update on HAPPYCHAT_IO_RECEIVE_MESSAGE', function () {
			var result = (0, _reducer.lastActivityTimestamp)(null, { type: _actionTypes.HAPPYCHAT_IO_RECEIVE_MESSAGE });
			expect(result).toBe(NOW);
		});

		test('should update on HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE', function () {
			var result = (0, _reducer.lastActivityTimestamp)(null, { type: _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE });
			expect(result).toBe(NOW);
		});

		test('should not update on other actions', function () {
			var result = (0, _reducer.lastActivityTimestamp)(null, { type: _actionTypes.HAPPYCHAT_IO_RECEIVE_INIT });
			expect(result).toBeNull();
		});
	});
});