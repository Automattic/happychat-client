/** @format */

/**
 * Internal dependencies
 */
import { HAPPYCHAT_USER_CURRENT_SET, HAPPYCHAT_USER_LOCALE_SET } from 'src/state/action-types';

export function setCurrentUser( currentUser ) {
	return {
		type: HAPPYCHAT_USER_CURRENT_SET,
		currentUser,
	};
}

export function setLocale( locale ) {
	return {
		type: HAPPYCHAT_USER_LOCALE_SET,
		locale,
	};
}
