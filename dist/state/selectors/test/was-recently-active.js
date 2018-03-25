'use strict';

var _wasRecentlyActive = require('../was-recently-active');

var _wasRecentlyActive2 = _interopRequireDefault(_wasRecentlyActive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TIME_SECOND = 1000; /** @format */

/**
 * Internal dependencies
 */

var TIME_MINUTE = TIME_SECOND * 60;
var TIME_HOUR = TIME_MINUTE * 60;

// Simulate the time Feb 27, 2017 05:25 UTC
var NOW = 1488173100125;

describe('#wasRecentlyActive()', function () {
	Date.now = jest.fn();
	Date.now.mockReturnValue(NOW);

	test('should return false if no activity', function () {
		var result = (0, _wasRecentlyActive2.default)({
			chat: { lastActivityTimestamp: null }
		});

		expect(result).toBeFalsy();
	});

	test('should return false if last activity was 3 hours ago', function () {
		var result = (0, _wasRecentlyActive2.default)({
			chat: { lastActivityTimestamp: NOW - TIME_HOUR * 3 }
		});

		expect(result).toBeFalsy();
	});

	test('should return true if last activity was 5 minutes ago', function () {
		var result = (0, _wasRecentlyActive2.default)({
			chat: { lastActivityTimestamp: NOW - TIME_MINUTE * 5 }
		});

		expect(result).toBeTruthy();
	});
});