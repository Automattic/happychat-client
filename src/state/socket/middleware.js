/**
 * External dependencies
 */
import moment from 'moment';
import { isEmpty, throttle } from 'lodash';

/**
 * Internal dependencies
 */
import { startSession, sign } from 'src/lib/wp';
import buildConnection from './connection';
import {
	HAPPYCHAT_CHAT_MESSAGE_SEND,
	HAPPYCHAT_CHAT_MESSAGE_SET,
	HAPPYCHAT_CHAT_TRANSCRIPT_REQUEST,
	HAPPYCHAT_CHAT_USERINFO_SEND,
	HAPPYCHAT_SOCKET_CONNECT,
	HAPPYCHAT_SOCKET_INITIALIZE
} from 'src/state/action-types';
import {
	receiveChatEvent,
	receiveChatTranscript,
	requestChatTranscript,
	setHappychatChatStatus
} from 'src/state/chat/actions';
import {
	setConnected,
	setConnecting,
	setDisconnected,
	setHappychatAvailable,
	setReconnecting
} from 'src/state/socket/actions';
import { setGeoLocation } from 'src/state/user/actions';
import {
	isHappychatConnectionUninitialized,
	wasHappychatRecentlyActive
} from 'src/state/socket/selectors';
import { getCurrentUser, getCurrentUserLocale, getGeoLocation } from 'src/state/user/selectors';

const debug = require( 'debug' )( 'happychat-embedded:middleware' );

const sendTyping = throttle(
	( connection, message ) => {
		connection.typing( message );
	},
	1000,
	{ leading: true, trailing: false }
);

const connectChat = ( connection, { getState, dispatch } ) => {
	debug( 'do connectChat' );
	const state = getState();
	if ( ! isHappychatConnectionUninitialized( state ) ) {
		debug( 'chat has been initialized' );
		// If chat has already initialized, do nothing
		return;
	}

	const user = getCurrentUser( state );
	const locale = getCurrentUserLocale( state );

	debug( 'dispatch setConnecting' );
	// Notify that a new connection is being established
	dispatch( setConnecting() );

	debug( 'opening with chat locale', locale );

	// Before establishing a connection, set up connection handlers
	connection
		.on( 'connected', () => {
			dispatch( setConnected() );

			// TODO: There's no need to dispatch a separate action to request a transcript.
			// The HAPPYCHAT_CONNECTED action should have its own middleware handler that does this.
			dispatch( requestChatTranscript() );
		} )
		.on( 'disconnect', reason => dispatch( setDisconnected( reason ) ) )
		.on( 'reconnecting', () => dispatch( setReconnecting() ) )
		.on( 'message', event => dispatch( receiveChatEvent( event ) ) )
		.on( 'status', status => dispatch( setHappychatChatStatus( status ) ) )
		.on( 'accept', accept => dispatch( setHappychatAvailable( accept ) ) );

	// create new session id and get signed identity data for authenticating
	/* eslint-disable camelcase */
	return startSession()
		.then( ( { session_id, geo_location } ) => {
			debug( 'session id ', session_id );
			debug( 'geo_location ', geo_location );
			if ( geo_location && geo_location.country_long && geo_location.city ) {
				dispatch( setGeoLocation( geo_location ) );
			}
			return sign( { user, session_id } );
		} )
		.then( ( { jwt } ) => {
			debug( 'what is the jwt ', jwt );
			connection.open( user.ID, jwt, locale );
		} )
		.catch( e => debug( 'failed to start happychat session', e, e.stack ) );
	/* eslint-enable camelcase */
};

const requestTranscript = ( connection, { dispatch } ) => {
	debug( 'requesting current session transcript' );

	// passing a null timestamp will request the latest session's transcript
	return connection
		.transcript( null )
		.then(
			result => dispatch( receiveChatTranscript( result.messages, result.timestamp ) ),
			e => debug( 'failed to get transcript', e )
		);
};

const onMessageChange = ( connection, message ) => {
	if ( isEmpty( message ) ) {
		connection.notTyping();
	} else {
		sendTyping( connection, message );
	}
};

const sendMessage = ( connection, message ) => {
	debug( 'sending message', message );
	connection.send( message );
	connection.notTyping();
};

const sendInfo = ( connection, { getState }, siteUrl ) => {
	const siteHelp = `\nSite I need help with: ${ siteUrl }`;
	const screenRes =
		typeof screen === 'object' && `\nScreen Resolution: ${ screen.width }x${ screen.height }`;
	const browserSize =
		typeof window === 'object' && `\nBrowser Size: ${ window.innerWidth }x${ window.innerHeight }`; // eslint-disable-line max-len
	const userAgent = typeof navigator === 'object' && `\nUser Agent: ${ navigator.userAgent }`;
	const localDateTime = `\nLocal Date: ${ moment().format( 'h:mm:ss a, MMMM Do YYYY' ) }`;

	// Geo location
	const state = getState();
	const geoLocation = getGeoLocation( state );
	const userLocation = null !== geoLocation
		? `\nLocation: ${ geoLocation.city }, ${ geoLocation.country_long }`
		: '';

	const msg = {
		text: `Info\n ${ siteHelp } ${ screenRes } ${ browserSize } ${ userAgent } ${ localDateTime } ${ userLocation }` // eslint-disable-line max-len
	};

	debug( 'sending info message', msg );
	connection.info( msg );
};

export const connectIfRecentlyActive = ( connection, store ) => {
	if ( wasHappychatRecentlyActive( store.getState() ) ) {
		connectChat( connection, store );
	}
};

export default function( connection = null ) {
	debug( 'middleware' );
	// Allow a connection object to be specified for
	// testing. If blank, use a real connection.
	if ( connection == null ) {
		debug( 'buildConnection' );
		connection = buildConnection();
	}

	return store => next => action => {
		switch ( action.type ) {
			case HAPPYCHAT_SOCKET_CONNECT:
				debug( 'socket connect' );
				connectChat( connection, store );
				break;

			case HAPPYCHAT_SOCKET_INITIALIZE:
				debug( 'socket initialize' );
				connectIfRecentlyActive( connection, store );
				break;

			case HAPPYCHAT_CHAT_USERINFO_SEND:
				debug( 'chat send userinfo' );
				sendInfo( connection, store, action.siteUrl );
				break;

			case HAPPYCHAT_CHAT_MESSAGE_SEND:
				debug( 'chat send message' );
				sendMessage( connection, action.message );
				break;

			case HAPPYCHAT_CHAT_MESSAGE_SET:
				debug( 'chat set message' );
				onMessageChange( connection, action.message );
				break;

			case HAPPYCHAT_CHAT_TRANSCRIPT_REQUEST:
				debug( 'chat request transcript' );
				requestTranscript( connection, store );
				break;
		}
		return next( action );
	};
}
