'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _constants = require('src/state/constants');

var _hasActiveSession = require('../has-active-session');

var _hasActiveSession2 = _interopRequireDefault(_hasActiveSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal dependencies
 */
describe('#hasActiveSession', function () {
	var inactiveChatStatuses = [_constants.HAPPYCHAT_CHAT_STATUS_BLOCKED, _constants.HAPPYCHAT_CHAT_STATUS_CLOSED, _constants.HAPPYCHAT_CHAT_STATUS_DEFAULT, _constants.HAPPYCHAT_CHAT_STATUS_NEW];
	var activeChatStatuses = [_constants.HAPPYCHAT_CHAT_STATUS_ABANDONED, _constants.HAPPYCHAT_CHAT_STATUS_ASSIGNED, _constants.HAPPYCHAT_CHAT_STATUS_ASSIGNING, _constants.HAPPYCHAT_CHAT_STATUS_MISSED, _constants.HAPPYCHAT_CHAT_STATUS_PENDING];

	test('should be false when chat.status indicates the user has no active session', function () {
		inactiveChatStatuses.forEach(function (status) {
			var state = (0, _deepFreeze2.default)({ chat: { status: status } });
			expect((0, _hasActiveSession2.default)(state)).toBeFalsy();
		});
	});

	test('should be true when chat.status indicates the user has an active session', function () {
		activeChatStatuses.forEach(function (status) {
			var state = (0, _deepFreeze2.default)({ chat: { status: status } });
			expect((0, _hasActiveSession2.default)(state)).toBeTruthy();
		});
	});
}); /** @format */

/**
 * External dependencies
 */