/** @format */

/**
 * External dependencies
 */
import { noop, throttle } from 'lodash';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_BLUR,
	HAPPYCHAT_FOCUS,
	HAPPYCHAT_IO_INIT,
	HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET,
	HAPPYCHAT_IO_REQUEST_TRANSCRIPT,
	HAPPYCHAT_IO_RECEIVE_ACCEPT,
	HAPPYCHAT_IO_RECEIVE_MESSAGE,
	HAPPYCHAT_IO_RECEIVE_STATUS,
	HAPPYCHAT_IO_RECEIVE_TYPING,
	HAPPYCHAT_IO_SEND_MESSAGE_EVENT,
	HAPPYCHAT_IO_SEND_MESSAGE_LOG,
	HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE,
	HAPPYCHAT_IO_SEND_MESSAGE_USERINFO,
	HAPPYCHAT_IO_SEND_PREFERENCES,
	HAPPYCHAT_IO_SEND_TYPING,
	HAPPYCHAT_IO_SET_CUSTOM_FIELDS,
	HAPPYCHAT_OPEN,
} from 'src/state/action-types';
import { HAPPYCHAT_CHAT_STATUS_ASSIGNED, HAPPYCHAT_CHAT_STATUS_DEFAULT } from 'src/state/constants';
import { receiveAccept, receiveInit, sendEvent } from 'src/state/connection/actions';
import { setOperatorIsTyping, setHasUnreadMessages } from 'src/state/chat/actions';
import buildConnection from 'src/state/socketio';
import makeRequest from 'src/state/xhr';
import postMessage from 'src/state/post-message';
import getChatStatus from 'src/state/selectors/get-chat-status';
import isConnectionConnected from 'src/state/selectors/is-connection-connected';
import isChatAssigned from 'src/state/selectors/is-chat-assigned';
import isDisplayingNewMessages from 'src/state/selectors/is-displaying-new-messages';
import { openChat } from 'src/state/ui/actions';
import { recordEvent } from 'src/lib/tracks';
import authenticator from 'src/lib/auth';

const eventMessage = {
	HAPPYCHAT_BLUR: 'Stopped looking at Happychat',
	HAPPYCHAT_FOCUS: 'Started looking at Happychat',
};

function playAudibleNotice() {
	if ( typeof Audio === 'undefined' ) {
		return;
	}
	const audio = new Audio( '//widgets.wp.com/happychat/chat-pling.wav' );
	const result = audio.play();
	if ( result && result.catch ) {
		result.catch(
			// Safari will throw an error because auto-playing audio is not allowed without
			// user consent, nooping the error handler
			() => {}
		);
	}
}

export const socketMiddleware = ( connection = null ) => {
	// Allow a connection object to be specified for
	// testing. If blank, use a real connection.
	if ( connection == null ) {
		connection = buildConnection();
	}

	return store => {
		const clearOperatorIsTyping = throttle(
			() => {
				store.dispatch( setOperatorIsTyping( false ) );
			},
			3000,
			{ leading: false }
		);

		return next => action => {
			switch ( action.type ) {
				case HAPPYCHAT_IO_INIT:
					connection.init( store.dispatch, action.auth );
					break;

				case HAPPYCHAT_IO_REQUEST_TRANSCRIPT:
					connection.request( action, action.timeout );
					break;

				case HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET:
					makeRequest( store.dispatch, action, action.timeout );
					break;

				case HAPPYCHAT_IO_SEND_MESSAGE_EVENT:
				case HAPPYCHAT_IO_SEND_MESSAGE_LOG:
				case HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE:
				case HAPPYCHAT_IO_SEND_MESSAGE_USERINFO:
				case HAPPYCHAT_IO_SEND_PREFERENCES:
				case HAPPYCHAT_IO_SEND_TYPING:
				case HAPPYCHAT_IO_SET_CUSTOM_FIELDS:
					connection.send( action );
					break;

				case HAPPYCHAT_BLUR:
				case HAPPYCHAT_FOCUS:
					const state = store.getState();
					isConnectionConnected( state ) && isChatAssigned( state ) && eventMessage[ action.type ] // eslint-disable-line max-len
						? store.dispatch( sendEvent( eventMessage[ action.type ] ) )
						: noop;
					break;

				case HAPPYCHAT_IO_RECEIVE_MESSAGE: {
					if ( action.message.source !== 'operator' ) {
						break;
					}
					playAudibleNotice();
					if ( ! isDisplayingNewMessages( store.getState() ) ) {
						store.dispatch( setHasUnreadMessages( true ) );
					}
				}

				case HAPPYCHAT_IO_RECEIVE_STATUS: {
					// If this is the initial status update (current status is `default`) and the new
					// status is `assigned`, that means this user just opened the form into an ongoing
					// chat session. We should skip the form and open chat.
					if (
						getChatStatus( store.getState() ) === HAPPYCHAT_CHAT_STATUS_DEFAULT &&
						action.status === HAPPYCHAT_CHAT_STATUS_ASSIGNED
					) {
						// Since the current status is `default` that means this is the initial status report
						// from Happy Chat. The status is `assigned` which means this user is in an ongoing
						// chat. We should skip the form and open the chat UI.
						store.dispatch( openChat() );
						recordEvent( 'happychatclient_initialized_with_active_chat' );
					}
					break;
				}
				case HAPPYCHAT_IO_RECEIVE_TYPING: {
					store.dispatch( setOperatorIsTyping( true ) );
					clearOperatorIsTyping();
					break;
				}
			}

			return next( action );
		};
	};
};

export const messagingMiddleware = () => {
	return store => {
		return next => action => {
			switch ( action.type ) {
				case HAPPYCHAT_IO_INIT:
					authenticator.isChatAvailable().then( ( { is_available: isAvailable } ) => {
						store.dispatch( receiveAccept( isAvailable ) );
					} );
					break;

				case HAPPYCHAT_IO_RECEIVE_ACCEPT:
					if ( action.isAvailable ) {
						store.dispatch( receiveInit( {} ) );
						postMessage( 'loadSupportChat' );
					}
					break;

				case HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET:
					makeRequest( store.dispatch, action, action.timeout );
					break;

				case HAPPYCHAT_IO_SET_CUSTOM_FIELDS:
					authenticator.saveCustomFields( action.payload );
					break;

				case HAPPYCHAT_OPEN:
					postMessage( 'openSupportChat' );
					break;

				default:
					break;
			}

			return next( action );
		};
	};
};

export default socketMiddleware();
