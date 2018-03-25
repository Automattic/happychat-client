'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isAvailable = exports.status = exports.error = undefined;

var _redux = require('redux');

var _actionTypes = require('../action-types');

var _constants = require('../constants');

/**
 * Tracks connection errors as defined by the SocketIO library
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */


/**
 * Internal dependencies
 */
var error = exports.error = function error() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_INIT:
			return null;
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_DISCONNECT:
			return action.error;
	}
	return state;
};

/**
 * Tracks the state of the happychat client connection
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
/** @format **/

/**
 * External dependencies
 */
var status = exports.status = function status() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_INIT:
			return _constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTING;
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_INIT:
			return _constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTED;
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_DISCONNECT:
			return _constants.HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED;
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_RECONNECTING:
			return _constants.HAPPYCHAT_CONNECTION_STATUS_RECONNECTING;
	}
	return state;
};

/**
 * Tracks whether happychat.io is accepting new chats.
 *
 * @param  {Boolean} state  Current happychat status
 * @param  {Object}  action Action playload
 * @return {Boolean}        Updated happychat status
 */
var isAvailable = exports.isAvailable = function isAvailable() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_ACCEPT:
			return action.isAvailable;
	}
	return state;
};

exports.default = (0, _redux.combineReducers)({
	error: error,
	isAvailable: isAvailable,
	status: status
});