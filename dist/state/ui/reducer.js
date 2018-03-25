'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isReady = exports.isMinimizing = exports.isOpen = exports.lostFocusAt = exports.currentMessage = undefined;

var _redux = require('redux');

var _actionTypes = require('../action-types');

/**
 * Tracks the current message the user has typed into the happychat client
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
var currentMessage = exports.currentMessage = function currentMessage() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE:
			return '';
		case _actionTypes.HAPPYCHAT_SET_CURRENT_MESSAGE:
			return action.message;
	}
	return state;
};

/**
 * Tracks the last time Happychat had focus. This lets us determine things like
 * whether the user has unread messages. A numerical value is the timestamp where focus
 * was lost, and `null` means HC currently has focus.
 *
 * @param {Object} state Current state
 * @param {Object} action Action payload
 * @return {Object}        Updated state
 */


/**
 * Internal dependencies
 */
var lostFocusAt = exports.lostFocusAt = function lostFocusAt() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_BLUR:
			return Date.now();
		case _actionTypes.HAPPYCHAT_FOCUS:
			return null;
	}
	return state;
};

/**
 * Tracks whether the happychat panel is open
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
var isOpen = exports.isOpen = function isOpen() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_OPEN:
			return !!action.isOpen;
	}
	return state;
};

/**
 * Tracks the state of the happychat minimizing process
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
var isMinimizing = exports.isMinimizing = function isMinimizing() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_MINIMIZING:
			return action.isMinimizing ? true : false;
	}
	return state;
};

var isReady = exports.isReady = function isReady() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_ASSETS_LOADED:
			return true;
	}
	return state;
};

exports.default = (0, _redux.combineReducers)({ currentMessage: currentMessage, isMinimizing: isMinimizing, isOpen: isOpen, isReady: isReady, lostFocusAt: lostFocusAt });