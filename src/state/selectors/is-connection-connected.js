/** @format **/

/**
 * Internal dependencies
 */
import { HAPPYCHAT_CONNECTION_STATUS_CONNECTED } from 'src/state/constants';
import getConnectionStatus from 'src/state/selectors/get-connection-status';

/**
 * Returns true if connection status is connected
 * @param {Object} state - global redux state
 * @return {Boolean} Whether Happychat connection status is connected
 */
export default function( state ) {
	return getConnectionStatus( state ) === HAPPYCHAT_CONNECTION_STATUS_CONNECTED;
}
