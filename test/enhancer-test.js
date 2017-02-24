/**
 * External dependencies
 */
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { EventEmitter } from 'events';
import { equal } from 'assert';
import { ifElse, prop, pipe, equals, cond, always, whereEq } from 'ramda';

/**
 * Internal dependencies
 */
import enhancer from 'enhancer';
import happychat from 'enhancer/reducer';
import { connectChat } from 'enhancer/actions';

class Connection extends EventEmitter {
	isConnected() {
		return false;
	}
	open() {
		return Promise.resolve();
	}
}

const mockIOClient = () => new Connection();

describe( 'enhancer', () => {
	let client, store, dispatch, getState;
	beforeEach( () => {
		client = mockIOClient();
		const enhancers = compose( enhancer( () => Promise.resolve( client ) ) );
		store = createStore( combineReducers( { happychat } ), enhancers );
		( { dispatch, getState } = store );
	} );

	it( 'should start a session', () => dispatch( connectChat() ).then( () => {
		equal( getState().happychat.connectionStatus, 'connecting' );
	} ) );

	it( 'should set as connected when client connects', () => dispatch( connectChat() ).then( () => {
		client.emit( 'connect', 'done' );
		equal( getState().happychat.connectionStatus, 'connected' );
	} ) );
} );
