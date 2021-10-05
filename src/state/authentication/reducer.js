/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_SET_AUTHENTICATION,
} from '../action-types';

export default ( state = {}, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_SET_AUTHENTICATION: {
			return action.authentication;
		}
	}
	return state;
};
