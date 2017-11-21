/** @format */

/**
 * External dependencies
 */
import { includes } from 'lodash';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_CHAT_STATUS_BLOCKED,
	HAPPYCHAT_CHAT_STATUS_CLOSED,
	HAPPYCHAT_CHAT_STATUS_DEFAULT,
	HAPPYCHAT_CHAT_STATUS_NEW,
} from 'src/state/constants';
import createSelector from 'src/lib/create-selector';

/**
 * Returns true if there's an active chat session in-progress. Chat sessions with
 * the status `new`, `default`, or `closed` are considered inactive, as the session
 * is not connected to an operator.
 * @param {Object} state - global redux state
 * @return {Boolean} Whether there's an active Happychat session happening
 */
export default createSelector(
	state =>
		! includes(
			[
				HAPPYCHAT_CHAT_STATUS_BLOCKED,
				HAPPYCHAT_CHAT_STATUS_CLOSED,
				HAPPYCHAT_CHAT_STATUS_DEFAULT,
				HAPPYCHAT_CHAT_STATUS_NEW,
			],
			state.chat.status
		),
	state => state.chat.status
);
