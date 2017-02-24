/**
 * External dependencies
 */
import { createStore, compose, applyMiddleware } from 'redux';
import IO from 'socket.io-client';
import { EventEmitter } from 'events';
import logger from 'redux-logger';
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
	getSocket() {
		if ( this.socket ) {
			return Promise.resolve( this.socket );
		}
		this.socket = new IO( 'https://happychat-io-staging.go-vip.co/customer' );
		log( this.socket, 'init', () => {
			this.emit( 'connect' );
		} );
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
					.then( ( { jwt } ) => this.getSocket().then( () => {
						debug( 'socket is open', user, jwt, session_id );
						return Promise.reject( new Error( 'Failed to start' ) );
					} ) )
				)
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
