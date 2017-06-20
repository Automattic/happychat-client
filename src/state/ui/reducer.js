/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_UI_BLUR,
	HAPPYCHAT_UI_FOCUS,
	HAPPYCHAT_UI_MINIMIZING,
	HAPPYCHAT_UI_OPEN
} from 'src/state/action-types';

/**
 * Tracks the visibility of the happychat component
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
const isChatOpen = ( state = false, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_UI_OPEN:
			// by double-negating isOpen prop, we make undefined and null values falsy
			// meanwhile bool values will remain the same
			return !! action.isOpen;
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
const isChatMinimizing = ( state = false, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_UI_MINIMIZING:
			return action.isMinimizing ? true : false;
	}
	return state;
};

/**
 * Tracks the last time Happychat had focus. This lets us determine things like
 * whether the user has unread messages. A numerical value is the timestamp where focus
 * was lost, and `null` means HC currently has focus.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export const lostFocusAt = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_UI_BLUR:
			return Date.now();
		case HAPPYCHAT_UI_FOCUS:
			return null;
	}
	return state;
};

export default combineReducers( {
	open: isChatOpen,
	isMinimizing: isChatMinimizing,
	lostFocusAt
} );
