/**
 * External Dependencies
 */
import { throttle, isEmpty } from 'lodash';

/**
 * Internal Dependencies
 */
import {
	HAPPYCHAT_CONNECTING,
	HAPPYCHAT_CONNECTED,
	HAPPYCHAT_DISCONNECTED,
	HAPPYCHAT_SET_MESSAGE,
	HAPPYCHAT_SEND_MESSAGE,
	HAPPYCHAT_RECEIVE_EVENT,
	HAPPYCHAT_SET_AVAILABLE,
	HAPPYCHAT_SET_CHAT_STATUS,
	HAPPYCHAT_CONNECTION_OPEN,
	HAPPYCHAT_TRANSCRIPT_REQUEST,
	HAPPYCHAT_TRANSCRIPT_RECEIVE
} from './types';
import { updateChatMessage } from './actions';

const debug = require( 'debug' )( 'happychat:middleware' );

export default ( { dispatch, getState }, getConnection ) => {
	const setHappychatChatStatus = status => ( {
		type: HAPPYCHAT_SET_CHAT_STATUS, status
	} );

	const setHappychatAvailable = isAvailable => ( { type: HAPPYCHAT_SET_AVAILABLE, isAvailable } );

	const actionOfType = type => () => ( { type } );

	const setChatConnecting = actionOfType( HAPPYCHAT_CONNECTING );
	const setChatConnected = actionOfType( HAPPYCHAT_CONNECTED );
	const setChatDisconnected = actionOfType( HAPPYCHAT_DISCONNECTED );

	const receiveChatEvent = event => ( { type: HAPPYCHAT_RECEIVE_EVENT, event } );

	const connectChat = ( { user } ) => getConnection( { dispatch, getState } ).then( connection => {
		// if chat is already connected then do nothing
		if ( connection.isConnected() ) {
			debug( 'chat already initialized' );
			return;
		}
		debug( 'opening happychat for user', user );

		dispatch( setChatConnecting() );
		// create new session id and get signed identity data for authenticating
		connection
		.on( 'connect', () => {
			debug( 'set connected!' );
			dispatch( setChatConnected() );
		} )
		.on( 'reconnect', () => dispatch( setChatConnecting() ) )
		.on( 'disconnect', () => dispatch( setChatDisconnected() ) )
		.on( 'message', event => dispatch( receiveChatEvent( event ) ) )
		.on( 'status', status => {
			debug( 'set chat status', status );
			dispatch( setHappychatChatStatus( status ) );
		} )
		.on( 'accept', isAvailable => dispatch( setHappychatAvailable( isAvailable ) ) );

		debug( 'opening chat session', user );

		// TODO: middleware shouldn't need to know about WP specific auth stuff
		return connection.open( user )
		.then(
			() => debug( 'session initialized, waiting for connection' ),
			e => debug( 'failed to start happychat session', e )
		);
	} );

	const sendTyping = throttle( message => getConnection().then( connection => {
		connection.typing( message );
	} ), 1000, { leading: true, trailing: false } );

	const onMessageChange = ( message ) => getConnection().then( connection => {
		if ( ! isEmpty( message ) ) {
			sendTyping( message );
		} else {
			connection.notTyping();
		}
	} );

	const sendMessage = ( { message } ) => getConnection().then( connection => {
		dispatch( updateChatMessage( '' ) );
		connection.send( message );
	} );

	const receiveChatTranscript = ( messages, timestamp ) => ( {
		type: HAPPYCHAT_TRANSCRIPT_RECEIVE, messages, timestamp
	} );

	const requestTranscript = ( { timestamp } ) => getConnection().then( connection => {
		connection.transcript( timestamp ).then(
			result => dispatch( receiveChatTranscript( result.messages, result.timestamp ) ),
			e => debug( 'failed to get transcript', e )
		);
	} );

	return next => action => {
		switch ( action.type ) {
			case HAPPYCHAT_CONNECTION_OPEN:
				return connectChat( action );
			case HAPPYCHAT_SET_MESSAGE:
				onMessageChange( action );
				break;
			case HAPPYCHAT_SEND_MESSAGE:
				sendMessage( action );
				break;
			case HAPPYCHAT_TRANSCRIPT_REQUEST:
				requestTranscript( action );
				break;
		}
		return next( action );
	};
};
