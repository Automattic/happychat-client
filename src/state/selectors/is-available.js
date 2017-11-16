/** @format **/

/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import isConnectionConnected from 'src/state/selectors/is-connection-connected';

/**
 * Returns true if Happychat client is connected and server is available to take new chats
 * @param {Object} state - global redux state
 * @return {Boolean} Whether new chats can be taken
 */
export default function( state ) {
	return isConnectionConnected( state ) && get( state, 'connection.isAvailable' );
}
