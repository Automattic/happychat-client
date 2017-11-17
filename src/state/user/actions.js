/** @format */

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_USER_CURRENT_SET,
	HAPPYCHAT_USER_GROUPS_SET,
	HAPPYCHAT_USER_LOCALE_SET,
} from 'src/state/action-types';

export function setCurrentUser( currentUser ) {
	return {
		type: HAPPYCHAT_USER_CURRENT_SET,
		currentUser,
	};
}

export function setGroups( groups ) {
	return {
		type: HAPPYCHAT_USER_GROUPS_SET,
		groups,
	};
}

export function setLocale( locale ) {
	return {
		type: HAPPYCHAT_USER_LOCALE_SET,
		locale,
	};
}
