/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_SET_OPERATOR_IS_TYPING,
	HAPPYCHAT_SET_HAS_UNREAD_MESSAGES,
} from 'src/state/action-types';

export const setOperatorIsTyping = ( isTyping ) => ( {
	type: HAPPYCHAT_SET_OPERATOR_IS_TYPING,
	isTyping,
} );

export const setHasUnreadMessages = hasUnreadMessages => ( {
	type: HAPPYCHAT_SET_HAS_UNREAD_MESSAGES,
	hasUnreadMessages,
} );
