'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.geoLocation = exports.currentUser = undefined;

var _redux = require('redux');

var _actionTypes = require('../action-types');

/**
 * Tracks the current user info
 *
 * @param {Object} state Current state
 * @param {Object} action Action payload
 * @return {Object}        Updated state
 */
/** @format */

/**
 * External dependencies
 */
var currentUser = exports.currentUser = function currentUser() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_USER_CURRENT_SET:
			return action.currentUser;
	}
	return state;
};

/**
 * Tracks the current user geo location.
 *
 * @param {Object} state Current state
 * @param {Object} action Action payload
 * @return {Object}        Updated state
 */


/**
 * Internal dependencies
 */
var geoLocation = exports.geoLocation = function geoLocation() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_RECEIVE_INIT:
			var location = action.user.geoLocation;

			if (location && location.country_long && location.city) {
				return location;
			}
			return state;
	}
	return state;
};

/**
 * Tracks the current user groups
 *
 * @param {Object} state Current state
 * @param {Object} action Action payload
 * @return {Object}        Updated state
 */
var groups = function groups() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_USER_GROUPS_SET:
			return action.groups;
	}
	return state;
};

/**
 * Tracks the current user locale
 *
 * @param {Object} state Current state
 * @param {Object} action Action payload
 * @return {Object}        Updated state
 */
var locale = function locale() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_USER_LOCALE_SET:
			return action.locale;
	}
	return state;
};

var isEligible = function isEligible() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_USER_ELIGIBILITY_SET:
			return action.isEligible;
	}
	return state;
};

exports.default = (0, _redux.combineReducers)({
	currentUser: currentUser,
	geoLocation: geoLocation,
	groups: groups,
	isEligible: isEligible,
	locale: locale
});