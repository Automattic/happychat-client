/**
 * External dependencies
 */
import IO from 'socket.io-client';
import { EventEmitter } from 'events';
import { v4 as uuid } from 'uuid';

/**
 * Internal dependencies
 */
import config from 'src/config';

/*
 * Happychat client connection for Socket.IO
 */
const debug = require( 'debug' )( 'happychat-embedded:socket' );

class Connection extends EventEmitter {
	open( user_id, token, locale ) {
		if ( ! this.openSocket ) {
			debug( 'initialize socket' );
			this.openSocket = new Promise( resolve => {
				const url = config( 'happychat_url' );
				debug( 'connecting socket to ', url );
				const socket = new IO( url );
				socket
					.once( 'connect', () => debug( 'connected' ) )
					.on( 'init', () => {
						debug( 'init' );
						this.emit( 'connected' );
						resolve( socket );
					} )
					.on( 'token', handler => {
						debug( 'token' );
						handler( { signer_user_id: user_id, jwt: token, locale } );
					} )
					.on( 'unauthorized', () => {
						debug( 'unauthorized' );
						socket.close();
					} )
					.on( 'disconnect', reason => {
						debug( 'disconnect' );
						this.emit( 'disconnect', reason );
					} )
					.on( 'reconnecting', () => {
						debug( 'reconnecting' );
						this.emit( 'reconnecting' );
					} )
					// Received a chat message
					.on( 'message', message => {
						debug( 'message' );
						this.emit( 'message', message );
					} )
					// Received chat status new/assigning/assigned/missed/pending/abandoned
					.on( 'status', status => {
						debug( 'status' );
						this.emit( 'status', status );
					} )
					// If happychat is currently accepting chats
					.on( 'accept', accept => {
						debug( 'accept' );
						this.emit( 'accept', accept );
					} );
			} );
		} else {
			debug( 'socket already initialized' );
		}
		debug( 'this is what I have' );
		return this.openSocket;
	}

	typing( message ) {
		this.openSocket.then(
			socket => socket.emit( 'typing', { message } ),
			e => debug( 'failed to send typing', e )
		);
	}

	notTyping() {
		this.openSocket.then(
			socket => socket.emit( 'typing', false ),
			e => debug( 'failed to send typing', e )
		);
	}

	send( message ) {
		this.openSocket.then(
			socket => socket.emit( 'message', { text: message, id: uuid() } ),
			e => debug( 'failed to send message', e )
		);
	}

	sendEvent( message ) {
		this.openSocket.then(
			socket =>
				socket.emit( 'message', {
					text: message,
					id: uuid(),
					type: 'customer-event',
					meta: { forOperator: true, event_type: 'customer-event' }
				} ),
			e => debug( 'failed to send message', e )
		);
	}

	// This is a temporary measure — we want to start sending some events that are
	// picked up by the staged HUD but not by the production HUD. The only way to do this
	// now is to send a different event type, and make the staging HUD render this event.
	// Once the HUD side ships to production, we should delete this function and just use
	// sendEvent for event messages.
	sendStagingEvent( message ) {
		this.openSocket.then(
			socket =>
				socket.emit( 'message', {
					text: message,
					id: uuid(),
					type: 'customer-event-staging',
					meta: { forOperator: true, event_type: 'customer-event-staging' }
				} ),
			e => debug( 'failed to send message', e )
		);
	}

	sendLog( message ) {
		this.openSocket.then(
			socket =>
				socket.emit( 'message', {
					text: message,
					id: uuid(),
					type: 'log',
					meta: { forOperator: true, event_type: 'log' }
				} ),
			e => debug( 'failed to send message', e )
		);
	}

	info( message ) {
		this.openSocket.then(
			socket =>
				socket.emit( 'message', { text: message.text, id: uuid(), meta: { forOperator: true } } ),
			e => debug( 'failed to send message', e )
		);
	}

	transcript( timestamp ) {
		return this.openSocket.then( socket =>
			Promise.race( [
				new Promise( ( resolve, reject ) => {
					socket.emit( 'transcript', timestamp || null, ( e, result ) => {
						if ( e ) {
							return reject( new Error( e ) );
						}
						resolve( result );
					} );
				} ),
				new Promise( ( resolve, reject ) =>
					setTimeout( () => {
						reject( Error( 'timeout' ) );
					}, 10000 )
				)
			] )
		);
	}
}

export default () => new Connection();
