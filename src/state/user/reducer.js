/** @format */

/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_IO_RECEIVE_INIT,
	HAPPYCHAT_USER_CURRENT_SET,
	HAPPYCHAT_USER_ELIGIBILITY_SET,
	HAPPYCHAT_USER_GROUPS_SET,
	HAPPYCHAT_USER_LOCALE_SET,
} from '../action-types';

/**
 * Tracks the current user info
 *
 * @param {Object} state Current state
 * @param {Object} action Action payload
 * @return {Object}        Updated state
 */
export const currentUser = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_USER_CURRENT_SET:
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
export const geoLocation = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_IO_RECEIVE_INIT:
			const { user: { geoLocation: location } } = action;
			if ( location && location.country_long && location.city ) {
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
const groups = ( state = [], action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_USER_GROUPS_SET:
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
const locale = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_USER_LOCALE_SET:
			return action.locale;
	}
	return state;
};

const isEligible = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_USER_ELIGIBILITY_SET:
			return action.isEligible;
	}
	return state;
};

export default combineReducers( {
	currentUser,
	geoLocation,
	groups,
	isEligible,
	locale,
} );
