/** @format */

/**
 * External dependencies
 */
import { includes } from 'lodash';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_CHAT_STATUS_ABANDONED,
	HAPPYCHAT_CHAT_STATUS_BLOCKED,
	HAPPYCHAT_CHAT_STATUS_DEFAULT,
	HAPPYCHAT_CHAT_STATUS_MISSED,
	HAPPYCHAT_CHAT_STATUS_PENDING,
} from 'state/happychat/constants';
import getChatStatus from 'src/state/selectors/get-chat-status';
import isConnectionConnected from 'src/state/selectors/is-connection-connected';

/**
 * Returns true if the user should be able to send messages to operators based on
 * chat status. For example new chats and ongoing chats should be able to send messages,
 * but blocked or pending chats should not.
 *
 * @param {Object} state - global redux state
 * @return {Boolean} Whether the user is able to send messages
 */
export default state =>
	isConnectionConnected( state ) &&
	! includes(
		[
			HAPPYCHAT_CHAT_STATUS_BLOCKED,
			HAPPYCHAT_CHAT_STATUS_DEFAULT,
			HAPPYCHAT_CHAT_STATUS_PENDING,
			HAPPYCHAT_CHAT_STATUS_MISSED,
			HAPPYCHAT_CHAT_STATUS_ABANDONED,
		],
		getChatStatus( state )
	);
