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
	HAPPYCHAT_IO_RECEIVE_MESSAGE,
	HAPPYCHAT_IO_RECEIVE_TYPING,
	HAPPYCHAT_IO_SEND_MESSAGE_EVENT,
	HAPPYCHAT_IO_SEND_MESSAGE_LOG,
	HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE,
	HAPPYCHAT_IO_SEND_MESSAGE_USERINFO,
	HAPPYCHAT_IO_SEND_PREFERENCES,
	HAPPYCHAT_IO_SEND_TYPING,
} from 'src/state/action-types';
import { sendEvent } from 'src/state/connection/actions';
import { setOperatorIsTyping, setHasUnreadMessages } from 'src/state/chat/actions';
import buildConnection from 'src/state/socketio';
import makeRequest from 'src/state/xhr';
import isConnectionConnected from 'src/state/selectors/is-connection-connected';
import isChatAssigned from 'src/state/selectors/is-chat-assigned';
import isDisplayingNewMessages from 'src/state/selectors/is-displaying-new-messages';

const eventMessage = {
	HAPPYCHAT_BLUR: 'Stopped looking at Happychat',
	HAPPYCHAT_FOCUS: 'Started looking at Happychat',
};

export const socketMiddleware = ( connection = null ) => {
	// Allow a connection object to be specified for
	// testing. If blank, use a real connection.
	if ( connection == null ) {
		connection = buildConnection();
	}

	return store => {
		const clearOperatorIsTyping = throttle( () => {
			store.dispatch( setOperatorIsTyping( false ) );
		}, 3000, { leading: false } );

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
					if ( ! isDisplayingNewMessages( store.getState() ) ) {
						store.dispatch( setHasUnreadMessages( true ) );
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

export default socketMiddleware();
