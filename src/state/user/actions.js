/** @format */

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_USER_CURRENT_SET,
	HAPPYCHAT_USER_GROUPS_SET,
	HAPPYCHAT_USER_LOCALE_SET,
} from 'src/state/action-types';

/**
 * Returns an action object that sets the current chat message
 *
 * @param  { Object } currentUser Current user to be set
 * @return { Object } Action object
 */
export function setCurrentUser( currentUser ) {
	return {
		type: HAPPYCHAT_USER_CURRENT_SET,
		currentUser,
	};
}

/**
 * Returns an action object that sets the user groups
 *
 * @param  { Array } groups Groups to be set
 * @return { Object } Action object
 */
export function setGroups( groups ) {
	return {
		type: HAPPYCHAT_USER_GROUPS_SET,
		groups,
	};
}

/**
 * Returns an action object that sets the current chat message
 *
 * @param  { String } locale Locale to be set
 * @return { Object } Action object
 */
export function setLocale( locale ) {
	return {
		type: HAPPYCHAT_USER_LOCALE_SET,
		locale,
	};
}
