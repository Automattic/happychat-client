/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_SET_MESSAGE,
	HAPPYCHAT_SEND_MESSAGE,
	HAPPYCHAT_CONNECTION_OPEN,
	HAPPYCHAT_TRANSCRIPT_REQUEST
} from './types';

export const connectChat = user => ( { type: HAPPYCHAT_CONNECTION_OPEN, user } );

export const updateChatMessage = message => ( { type: HAPPYCHAT_SET_MESSAGE, message } );

export const sendChatMessage = message => ( {
	type: HAPPYCHAT_SEND_MESSAGE, message
} );

export const requestTranscript = () => ( { type: HAPPYCHAT_TRANSCRIPT_REQUEST } );
