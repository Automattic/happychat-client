/** @format */

/**
 * Internal dependencies
 */
import getChatLastActivityTimestamp from './get-chat-lastactivitytimestamp';

// How much time needs to pass before we consider the session inactive:
const HAPPYCHAT_INACTIVE_TIMEOUT_MS = 1000 * 60 * 10;

export default state => {
	const lastActive = getChatLastActivityTimestamp( state );
	const now = Date.now();
	return now - lastActive < HAPPYCHAT_INACTIVE_TIMEOUT_MS;
};
