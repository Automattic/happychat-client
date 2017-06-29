/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_USER_CURRENT_SET,
	HAPPYCHAT_USER_LOCALE_SET,
	HAPPYCHAT_USER_GEOLOCATION_SET,
	HAPPYCHAT_USER_TOKEN
} from 'src/state/action-types';

/**
 * Returns an action object to be used in signalling that the current user geo location
 * has been set.
 *
 * @param  {Object} geoLocation Geo location information based on ip
 * @return {Object}        Action object
 */
export function setGeoLocation( geoLocation ) {
	return {
		type: HAPPYCHAT_USER_GEOLOCATION_SET,
		geoLocation
	};
}

export function setCurrentUser( currentUser ) {
	return {
		type: HAPPYCHAT_USER_CURRENT_SET,
		currentUser
	};
}

export function setLocale( locale ) {
	return {
		type: HAPPYCHAT_USER_LOCALE_SET,
		locale
	};
}

export function setToken( token ) {
	return {
		type: HAPPYCHAT_USER_TOKEN,
		token
	};
}
