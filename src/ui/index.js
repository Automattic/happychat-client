/** @format */

/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Calypso dependencies
 */
import { Happychat } from 'components/happychat/main';
// TODO: implement localize
import { mockLocalize } from 'src/ui/components/localize';

/**
 * Internal dependencies
 */
import {
	blur,
	focus,
	openChat,
	closeChat,
	minimizeChat,
	minimizedChat,
} from 'src/state/ui/actions';
import { sendChatMessage, setChatMessage } from 'src/state/chat/actions';
import { connectChat } from 'src/state/socket/actions';
import { isHappychatMinimizing, isHappychatOpen } from 'src/state/ui/selectors';
import { getHappychatStatus } from 'src/state/chat/selectors';
import {
	getHappychatConnectionStatus,
	isHappychatConnectionUninitialized,
	isHappychatServerReachable,
} from 'src/state/socket/selectors';
import { canUserSendMessages, getCurrentChatMessage } from 'src/state/chat/selectors';
import { getCurrentUser } from 'src/state/user/selectors';
import { getHappychatTimeline } from 'src/state/chat/selectors';

const mapState = state => {
	const currentUser = getCurrentUser( state );
	return {
		chatStatus: getHappychatStatus( state ),
		connectionStatus: getHappychatConnectionStatus( state ),
		currentUserEmail: currentUser.email,
		disabled: ! canUserSendMessages( state ),
		getAuth: () => {}, // TODO: implement
		isChatOpen: isHappychatOpen( state ),
		isConnectionUninitialized: isHappychatConnectionUninitialized( state ),
		/* eslint-disable camelcase */
		isCurrentUser: ( { user_id, source } ) => {
			return user_id.toString() === currentUser.ID.toString() && source === 'customer';
		},
		/* eslint-enable camelcase */
		isHappychatEnabled: true,
		isMinimizing: isHappychatMinimizing( state ),
		isServerReachable: isHappychatServerReachable( state ),
		message: getCurrentChatMessage( state ),
		timeline: getHappychatTimeline( state ),
	};
};

const mapDispatch = {
	onBlurred: blur,
	onCloseChat: closeChat,
	onFocused: focus,
	onInitConnection: connectChat,
	onMinimizeChat: minimizeChat,
	onMinimizedChat: minimizedChat,
	onSendMessage: sendChatMessage,
	onSendNotTyping: () => {},
	onSendTyping: () => {},
	onSetCurrentMessage: setChatMessage,
	onOpenChat: openChat, // TODO: what this mean?
};

export default connect( mapState, mapDispatch )( mockLocalize( Happychat ) );
