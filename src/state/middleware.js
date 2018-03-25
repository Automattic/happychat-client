/** @format */

/**
 * External dependencies
 */
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_BLUR,
	HAPPYCHAT_FOCUS,
	HAPPYCHAT_IO_INIT,
	HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET,
	HAPPYCHAT_IO_REQUEST_TRANSCRIPT,
	HAPPYCHAT_IO_SEND_MESSAGE_EVENT,
	HAPPYCHAT_IO_SEND_MESSAGE_LOG,
	HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE,
	HAPPYCHAT_IO_SEND_MESSAGE_USERINFO,
	HAPPYCHAT_IO_SEND_PREFERENCES,
	HAPPYCHAT_IO_SEND_TYPING,
} from './action-types';
import { sendEvent } from './connection/actions';
import buildConnection from './socketio';
import makeRequest from './xhr';
import isConnectionConnected from './selectors/is-connection-connected';
import isChatAssigned from './selectors/is-chat-assigned';

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

	return store => next => action => {
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
		}

		return next( action );
	};
};

export default socketMiddleware();
