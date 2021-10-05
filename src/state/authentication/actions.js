/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_SET_AUTHENTICATION,
} from 'src/state/action-types';

export const setAuthentication = ( authentication ) => ( {
	type: HAPPYCHAT_SET_AUTHENTICATION,
	authentication,
} );
