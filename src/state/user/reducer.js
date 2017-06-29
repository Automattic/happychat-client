/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_USER_LOCALE_SET,
	HAPPYCHAT_USER_CURRENT_SET,
	HAPPYCHAT_USER_GEOLOCATION_SET,
	HAPPYCHAT_USER_TOKEN
} from 'src/state/action-types';

/**
 * Tracks the current user geo location.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
const geoLocation = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_USER_GEOLOCATION_SET:
			return action.geoLocation;
	}
	return state;
};

const currentUser = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_USER_CURRENT_SET:
			return action.currentUser;
	}
	return state;
};

const locale = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_USER_LOCALE_SET:
			return action.locale;
	}
	return state;
};

const token = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_USER_TOKEN:
			return action.token;
	}
	return state;
};

export default combineReducers( {
	geoLocation,
	currentUser,
	locale,
	token
} );
