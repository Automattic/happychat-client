'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _actions = require('./connection/actions');

var _getChatStatus = require('./selectors/get-chat-status');

var _getChatStatus2 = _interopRequireDefault(_getChatStatus);

var _getUserInfo = require('./selectors/get-user-info');

var _getUserInfo2 = _interopRequireDefault(_getUserInfo);

var _isAvailable = require('./selectors/is-available');

var _isAvailable2 = _interopRequireDefault(_isAvailable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * Internal dependencies
 */
var eventAPI = function eventAPI(store) {
	var subscribers = {
		availability: [],
		chatStatus: []
	};

	var oldAvailability = false;
	var oldChatStatus = 'new';
	store.subscribe(function () {
		var newAvailability = (0, _isAvailable2.default)(store.getState());
		if (newAvailability !== oldAvailability) {
			oldAvailability = newAvailability;
			subscribers.availability.forEach(function (subscriber) {
				return subscriber(newAvailability);
			});
		}

		var newChatStatus = (0, _getChatStatus2.default)(store.getState());
		if (newChatStatus !== oldChatStatus) {
			oldChatStatus = newChatStatus;
			subscribers.chatStatus.forEach(function (subscriber) {
				return subscriber(newChatStatus);
			});
		}
	});

	var eventNameExist = function eventNameExist(eventName) {
		return subscribers.hasOwnProperty(eventName);
	};

	var isSubscribed = function isSubscribed(eventName, subscriber) {
		return subscribers[eventName].indexOf(subscriber) > -1;
	}; // eslint-disable-line max-len

	var subscribeTo = function subscribeTo(eventName, subscriber) {
		return eventNameExist(eventName) && !isSubscribed(eventName, subscriber) && subscribers[eventName].push(subscriber);
	};

	var unsubscribeFrom = function unsubscribeFrom(eventName, subscriber) {
		return eventNameExist(eventName) && isSubscribed(subscriber, eventName) && subscribers[eventName].splice(subscribers[eventName].indexOf(subscriber), 1);
	};

	var sendEventMsg = function sendEventMsg(msg) {
		return store.dispatch((0, _actions.sendEvent)(msg));
	};

	var sendUserInfoMsg = function sendUserInfoMsg(userInfo) {
		return store.dispatch((0, _actions.sendUserInfo)((0, _getUserInfo2.default)(store.getState())(userInfo)));
	};

	return {
		subscribeTo: subscribeTo,
		unsubscribeFrom: unsubscribeFrom,
		sendEventMsg: sendEventMsg,
		sendUserInfoMsg: sendUserInfoMsg
	};
};

exports.default = eventAPI;