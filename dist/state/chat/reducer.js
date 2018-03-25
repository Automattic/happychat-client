'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.timeline = exports.status = exports.lastActivityTimestamp = undefined;

var _redux = require('redux');

var _concat = require('lodash/concat');

var _concat2 = _interopRequireDefault(_concat);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _actionTypes = require('../action-types');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tracks the last time happychat sent or received a message
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */


/**
 * Internal dependencies
 */
var lastActivityTimestamp = exports.lastActivityTimestamp = function lastActivityTimestamp() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE:
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_MESSAGE:
			return Date.now();
	}
	return state;
};

/**
 * Tracks the state of the happychat chat. Valid states are:
 *
 *  - HAPPYCHAT_CHAT_STATUS_DEFAULT : no chat has been started
 *  - HAPPYCHAT_CHAT_STATUS_PENDING : chat has been started but no operator assigned
 *  - HAPPYCHAT_CHAT_STATUS_ASSIGNING : system is assigning to an operator
 *  - HAPPYCHAT_CHAT_STATUS_ASSIGNED : operator has been connected to the chat
 *  - HAPPYCHAT_CHAT_STATUS_MISSED : no operator could be assigned
 *  - HAPPYCHAT_CHAT_STATUS_ABANDONED : operator was disconnected
 *  - HAPPYCHAT_CHAT_STATUS_CLOSED : chat was closed
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
/** @format */

/**
 * External dependencies
 */
var status = exports.status = function status() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.HAPPYCHAT_CHAT_STATUS_DEFAULT;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_STATUS:
			return action.status;
	}
	return state;
};

/**
 * Returns a timeline event from the redux action
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
var timelineEvent = function timelineEvent() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_MESSAGE:
			var message = action.message;

			return Object.assign({}, {
				id: message.id,
				source: message.source,
				message: message.text,
				name: message.user.name,
				image: message.user.avatarURL,
				timestamp: message.timestamp,
				user_id: message.user.id,
				type: (0, _get2.default)(message, 'type', 'message'),
				links: (0, _get2.default)(message, 'meta.links')
			});
	}
	return state;
};

var sortTimeline = function sortTimeline(timeline) {
	return (0, _sortBy2.default)(timeline, function (event) {
		return parseInt(event.timestamp, 10);
	});
};

/**
 * Adds timeline events for happychat
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
var timeline = exports.timeline = function timeline() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_MESSAGE:
			// if meta.forOperator is set, skip so won't show to user
			if ((0, _get2.default)(action, 'message.meta.forOperator', false)) {
				return state;
			}
			var event = timelineEvent({}, action);
			var existing = (0, _find2.default)(state, function (_ref) {
				var id = _ref.id;
				return event.id === id;
			});
			return existing ? state : (0, _concat2.default)(state, [event]);
		case _actionTypes.HAPPYCHAT_IO_REQUEST_TRANSCRIPT_TIMEOUT:
			return state;
		case _actionTypes.HAPPYCHAT_IO_REQUEST_TRANSCRIPT_RECEIVE:
			var messages = (0, _filter2.default)(action.messages, function (message) {
				if (!message.id) {
					return false;
				}

				// if meta.forOperator is set, skip so won't show to user
				if ((0, _get2.default)(message, 'meta.forOperator', false)) {
					return false;
				}

				return !(0, _find2.default)(state, { id: message.id });
			});
			return sortTimeline(state.concat((0, _map2.default)(messages, function (message) {
				return Object.assign({
					id: message.id,
					source: message.source,
					message: message.text,
					name: message.user.name,
					image: message.user.picture,
					timestamp: message.timestamp,
					user_id: message.user.id,
					type: (0, _get2.default)(message, 'type', 'message'),
					links: (0, _get2.default)(message, 'meta.links')
				});
			})));
	}
	return state;
};

exports.default = (0, _redux.combineReducers)({
	lastActivityTimestamp: lastActivityTimestamp,
	status: status,
	timeline: timeline
});