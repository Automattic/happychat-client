/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_CHAT_EVENT_RECEIVE,
	HAPPYCHAT_CHAT_MESSAGE_SEND,
	HAPPYCHAT_CHAT_MESSAGE_SET,
	HAPPYCHAT_CHAT_STATUS_SET,
	HAPPYCHAT_CHAT_TRANSCRIPT_RECEIVE,
	HAPPYCHAT_CHAT_TRANSCRIPT_REQUEST,
	HAPPYCHAT_CHAT_USERINFO_SEND
} from 'src/state/action-types';

export const setHappychatChatStatus = status => ( {
	type: HAPPYCHAT_CHAT_STATUS_SET,
	status
} );

export const sendChatMessage = message => ( { type: HAPPYCHAT_CHAT_MESSAGE_SEND, message } );

export const setChatMessage = message => ( { type: HAPPYCHAT_CHAT_MESSAGE_SET, message } );
export const clearChatMessage = () => setChatMessage( '' );

export const requestChatTranscript = () => ( { type: HAPPYCHAT_CHAT_TRANSCRIPT_REQUEST } );
export const receiveChatTranscript = ( messages, timestamp ) => ( {
	type: HAPPYCHAT_CHAT_TRANSCRIPT_RECEIVE,
	messages,
	timestamp
} );

export const receiveChatEvent = event => ( { type: HAPPYCHAT_CHAT_EVENT_RECEIVE, event } );

export const sendUserInfo = siteUrl => ( { type: HAPPYCHAT_CHAT_USERINFO_SEND, siteUrl } );
