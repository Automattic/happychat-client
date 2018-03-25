'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = require('./index');

var api = {
	open: _index.initHappychat,
	on: function on(eventName, callback) {
		return _index.eventAPI.subscribeTo(eventName, callback);
	},
	off: function off(eventName, callback) {
		return _index.eventAPI.unsubscribeFrom(eventName, callback);
	},
	sendEvent: function sendEvent(msg) {
		return _index.eventAPI.sendEventMsg(msg);
	},
	sendUserInfo: function sendUserInfo(userInfo) {
		return _index.eventAPI.sendUserInfoMsg(userInfo);
	}
}; /** @format */

/**
 * Internal dependencies
 */
exports.default = api;