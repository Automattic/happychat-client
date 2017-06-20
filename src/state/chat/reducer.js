/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import { concat, get, map, filter, sortBy } from 'lodash';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_CHAT_EVENT_RECEIVE,
	HAPPYCHAT_CHAT_MESSAGE_SEND,
	HAPPYCHAT_CHAT_MESSAGE_SET,
	HAPPYCHAT_CHAT_STATUS_SET,
	HAPPYCHAT_CHAT_TRANSCRIPT_RECEIVE
} from 'src/state/action-types';
import { HAPPYCHAT_CHAT_STATUS_DEFAULT } from 'src/state/constants';

/**
 * Tracks the state of the happychat chat. Valid states are:
 *
 *  - HAPPYCHAT_CHAT_STATUS_DEFAULT : no chat has been started
 *  - HAPPYCHAT_CHAT_STATUS_PENDING : chat has been started but no operator assigned
 *  - HAPPYCHAT_CHAT_STATUS_ASSIGNING : system is assigning to an operator
 *  - HAPPYCHAT_CHAT_STATUS_ASSIGNED : operator has been connected to the chat
 *  - HAPPYCHAT_CHAT_STATUS_MISSED : no operator could be assigned
 *  - HAPPYCHAT_CHAT_STATUS_ABANDONED : operator was disconnected
 *  - HAPPYCHAT_CHAT_STATUS_CLOSED : chat was closed
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
const status = ( state = HAPPYCHAT_CHAT_STATUS_DEFAULT, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_CHAT_STATUS_SET:
			return action.status;
	}
	return state;
};

/**
 * Tracks the current message the user has typed into the happychat client
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
export const currentMessage = ( state = '', action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_CHAT_MESSAGE_SEND:
			return '';
		case HAPPYCHAT_CHAT_MESSAGE_SET:
			return action.message;
	}
	return state;
};

const lastActivityTimestamp = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_CHAT_MESSAGE_SEND:
		case HAPPYCHAT_CHAT_EVENT_RECEIVE:
			return Date.now();
	}
	return state;
};

const createEvent = ( state = {}, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_CHAT_EVENT_RECEIVE:
			const event = action.event;
			return Object.assign(
				{},
				{
					id: event.id,
					source: event.source,
					message: event.text,
					name: event.user.name,
					image: event.user.avatarURL,
					timestamp: event.timestamp,
					user_id: event.user.id, // eslint-disable-line camelcase
					type: get( event, 'type', 'message' ),
					links: get( event, 'meta.links' )
				}
			);
	}
	return state;
};
const sortTimeline = timeline => sortBy( timeline, event => parseInt( event.timestamp, 10 ) );

/**
 * Adds timeline events for happychat
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
const timeline = ( state = [], action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_CHAT_EVENT_RECEIVE:
			// if meta.forOperator is set, skip so won't show to user
			if ( get( action, 'event.meta.forOperator', false ) ) {
				return state;
			}
			const event = createEvent( {}, action );
			const existing = find( state, ( { id } ) => event.id === id );
			return existing ? state : concat( state, [ event ] );
		case HAPPYCHAT_CHAT_TRANSCRIPT_RECEIVE:
			const messages = filter( action.messages, msg => {
				if ( ! msg.id ) {
					return false;
				}

				// if meta.forOperator is set, skip so won't show to user
				if ( get( msg, 'meta.forOperator', false ) ) {
					return false;
				}

				return ! find( state, { id: msg.id } );
			} );
			return sortTimeline(
				state.concat(
					map( messages, msg => {
						return Object.assign( {
							id: msg.id,
							source: msg.source,
							message: msg.text,
							name: msg.user.name,
							image: msg.user.picture,
							timestamp: msg.timestamp,
							user_id: msg.user.id, // eslint-disable-line camelcase
							type: get( msg, 'type', 'message' ),
							links: get( msg, 'meta.links' )
						} );
					} )
				)
			);
	}
	return state;
};

export default combineReducers( {
	chatStatus: status,
	currentMessage,
	lastActivityTimestamp,
	timeline
} );
