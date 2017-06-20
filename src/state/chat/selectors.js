/**
 * External dependencies
 */
import { includes, get, last } from 'lodash';
import { createSelector } from 'reselect';

/**
 * Internal dependencies
 */
import { getLostFocusTimestamp } from 'src/state/ui/selectors';
import {
	getHappychatConnectionStatus,
	isHappychatAcceptingChats
} from 'src/state/socket/selectors';

import {
	HAPPYCHAT_CHAT_STATUS_ABANDONED,
	HAPPYCHAT_CHAT_STATUS_ASSIGNED,
	HAPPYCHAT_CHAT_STATUS_DEFAULT,
	HAPPYCHAT_CHAT_STATUS_MISSED,
	HAPPYCHAT_CHAT_STATUS_PENDING,
	HAPPYCHAT_SOCKET_STATUS_CONNECTED
} from 'src/state/constants';

/**
 * Gets the current chat session status
 * @param {Object} state - global redux state
 * @return {String} status of the current chat session
 */
export const getHappychatStatus = state => get( state, 'chat.chatStatus' );
export const getHappychatChatStatus = getHappychatStatus; // TODO remove after updating deps

export const isChatAssigned = state =>
	get( state, 'chat.chatStatus' ) === HAPPYCHAT_CHAT_STATUS_ASSIGNED;

export const getHappychatLastActivityTimestamp = state => get( state, 'chat.lastActivityTimestamp' ); // eslint-disable-line max-len

/**
 * Gets timeline chat events from the happychat state
 * @param {Object} state - Global redux state
 * @return {Array} events - an array of timeline chat events
 */
export const getHappychatTimeline = state => get( state, 'chat.timeline' );

export const hasUnreadMessages = createSelector(
	[ getHappychatTimeline, getLostFocusTimestamp ],
	( timeline, lostFocusAt ) => {
		const lastMessageTimestamp = get( last( timeline ), 'timestamp' );

		return (
			typeof lastMessageTimestamp === 'number' &&
			typeof lostFocusAt === 'number' &&
			// Message timestamps are reported in seconds. We need to multiply by 1000 to convert
			// to milliseconds, so we can compare it to other JS-generated timestamps
			lastMessageTimestamp * 1000 >= lostFocusAt
		);
	}
);

export const isHappychatChatAssigned = state =>
	get( state, 'chat.chatStatus' ) === HAPPYCHAT_CHAT_STATUS_ASSIGNED;

// How much time needs to pass before we consider the session inactive:
const HAPPYCHAT_INACTIVE_TIMEOUT_MS = 1000 * 60 * 10;
export const wasHappychatRecentlyActive = state => {
	const lastActive = getHappychatLastActivityTimestamp( state );
	const now = Date.now();

	return now - lastActive < HAPPYCHAT_INACTIVE_TIMEOUT_MS;
};

export const canUserSendMessages = createSelector(
	[ getHappychatConnectionStatus, getHappychatChatStatus, isHappychatAcceptingChats ],
	( connectionStatus, chatStatus, isAcceptingChats ) =>
		connectionStatus === HAPPYCHAT_SOCKET_STATUS_CONNECTED &&
		! includes(
			[
				HAPPYCHAT_CHAT_STATUS_PENDING,
				HAPPYCHAT_CHAT_STATUS_MISSED,
				HAPPYCHAT_CHAT_STATUS_ABANDONED
			],
			chatStatus
		) &&
		isAcceptingChats
);

export const isHappychatChatActive = createSelector(
	[ getHappychatChatStatus, isHappychatAcceptingChats ],
	( chatStatus, isAcceptingChats ) =>
		! includes( [ HAPPYCHAT_CHAT_STATUS_DEFAULT ], chatStatus ) && isAcceptingChats
);

export const isHappychatAvailable = createSelector(
	[ isHappychatAcceptingChats, isHappychatChatActive ],
	( isAcceptingChats, isChatActive ) => isAcceptingChats || isChatActive
);

export const getCurrentChatMessage = ( state ) => get( state, 'chat.currentMessage' );
