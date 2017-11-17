/** @format */

/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Calypso dependencies
 */
import { geoLocation } from 'state/happychat/user/reducer';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_USER_CURRENT_SET,
	HAPPYCHAT_USER_GROUPS_SET,
	HAPPYCHAT_USER_LOCALE_SET,
} from 'src/state/action-types';

const currentUser = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_USER_CURRENT_SET:
			return action.currentUser;
	}
	return state;
};

const groups = ( state = [], action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_USER_GROUPS_SET:
			return action.groups;
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

export default combineReducers( {
	currentUser,
	geoLocation,
	groups,
	locale,
} );
