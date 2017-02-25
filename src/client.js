/**
 * External dependencies
 */
import { createStore, compose, applyMiddleware } from 'redux';
import IO from 'socket.io-client';
import { EventEmitter } from 'events';
import logger from 'redux-logger';
import { v4 as uuid } from 'uuid';
/**
 * Internal dependencies
 */
import enhancer from './enhancer';
import wordpress from './wordpress';
import devConsole from './dev-console';
import { WORDPRESS_REST_REQUEST } from './enhancer/types';

const debug = require( 'debug' )( 'happychat:client' );

const reducer = ( state = {} ) => state;

let client;

const request = ( params ) => ( { type: WORDPRESS_REST_REQUEST, params } );

const sign = ( payload ) => request( {
	method: 'POST',
	path: '/jwt/sign',
	body: { payload: JSON.stringify( payload ) }
} );

const startSession = () => request( {
	method: 'POST',
	path: '/happychat/session' }
);

const me = () => request( {
	method: 'GET',
	path: '/me'
} );

const log = ( emitter, event, listener ) => emitter.on( event, ( ... args ) => {
	debug( 'on', event, ... args );
	return listener( ... args );
} );

class Connection extends EventEmitter {
	constructor( store ) {
		super();
		debug( 'initialize' );
		this.store = store;
	}
	startSocket( token ) {
		const socket = this.socket = new IO( 'https://happychat-io-staging.go-vip.co/customer' );
		log( socket, 'init', () => {
			this.emit( 'connect' );
		} );
		log( socket, 'token', handler => {
			handler( token );
		} );

		log( socket, 'unauthorized', () => {
			socket.close();
			debug( 'not authorized' );
		} );
		// Received a chat message
		log( socket, 'message', message => this.emit( 'message', message ) );
		// Received chat status new/assigning/assigned/missed/pending/abandoned
		log( socket, 'status', status => this.emit( 'status', status ) );
		// If happychat is currently accepting chats
		log( socket, 'accept', accept => this.emit( 'accept', accept ) );
	}
	getSocket() {
		if ( ! this.socket ) {
			return Promise.reject( new Error( 'connection not initialized' ) );
		}
		return Promise.resolve( this.socket );
	}
	isConnected() {
		return false;
	}
	open() {
		const { dispatch } = this.store;
		return dispatch( me() )
			.then( ( user ) => dispatch( startSession() )
				.then( ( { session_id } ) => dispatch( sign( { user, session_id } ) )
					.then( ( { jwt } ) => {
						this.startSocket( { signer_user_id: user.ID, jwt } );
					} )
				)
			);
	}

	send( message ) {
		this.getSocket().then(
			socket => socket.emit( 'message', { text: message, id: uuid() } ),
			e => debug( e )
		);
	}
}

export default () => createStore( reducer, compose(
	devConsole,
	enhancer( ( store ) => {
		debug( 'building client' );
		if ( client ) {
			return Promise.resolve( client );
		}
		client = new Connection( store );
		return Promise.resolve( client );
	} ),
	wordpress,
	applyMiddleware( logger( { console: { log: debug } } ) )
) );
