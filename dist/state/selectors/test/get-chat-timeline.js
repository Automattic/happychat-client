'use strict';

var _getChatTimeline = require('../get-chat-timeline');

var _getChatTimeline2 = _interopRequireDefault(_getChatTimeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#getChatTimeline', function () {
	// Simulate the time Feb 27, 2017 05:25 UTC
	var NOW = 1488173100125;
	var ONE_MINUTE = 1000 * 60;
	var FIVE_MINUTES = ONE_MINUTE * 5;
	var timelineAtTime1 = [{ timestamp: (NOW - FIVE_MINUTES) / 1000, id: '1-1' }, { timestamp: (NOW - ONE_MINUTE) / 1000, id: '1-2' }, { timestamp: NOW / 1000, id: '1-3' }];
	var timelineAtTime2 = [{ timestamp: (NOW - FIVE_MINUTES) / 1000, id: '2-1' }, { timestamp: (NOW - ONE_MINUTE) / 1000, id: '2-2' }, { timestamp: NOW / 1000, id: '2-3' }];
	var timelineWithoutIds1 = [{ timestamp: (NOW - FIVE_MINUTES) / 1000 }, { timestamp: NOW / 1000 }];
	var timelineWithoutIds2 = [{ timestamp: (NOW - ONE_MINUTE) / 1000 }, { timestamp: NOW / 1000 }];

	test('returns the cached timeline if message do not have ids', function () {
		var state = {
			chat: {
				timeline: timelineWithoutIds1
			}
		};
		var timelineCached = (0, _getChatTimeline2.default)(state);
		// force a new reference, but with the same data
		state.chat.timeline = [].concat(timelineWithoutIds2);
		expect((0, _getChatTimeline2.default)(state)).toBe(timelineCached);
	});

	test('returns the cached timeline if messages ids are the same', function () {
		var state = {
			chat: {
				timeline: timelineAtTime1
			}
		};
		var timelineCached = (0, _getChatTimeline2.default)(state);
		// force a new reference, but with the same data
		state.chat.timeline = [].concat(timelineAtTime1);
		expect((0, _getChatTimeline2.default)(state)).toBe(timelineCached);
	});

	test('returns the new timeline if some message id is different', function () {
		var state = {
			chat: {
				timeline: timelineAtTime1
			}
		};
		var timelineCached = (0, _getChatTimeline2.default)(state);
		// force a new reference, but with the same data
		state.chat.timeline = [].concat(timelineAtTime2);
		expect((0, _getChatTimeline2.default)(state)).not.toBe(timelineCached);
	});
}); /** @format */

/**
 * Internal dependencies
 */