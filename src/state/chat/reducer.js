/** @format */
/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import concat from 'lodash/concat';
import filter from 'lodash/filter';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import map from 'lodash/map';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_IO_RECEIVE_MESSAGE,
	HAPPYCHAT_IO_RECEIVE_MESSAGE_UPDATE,
	HAPPYCHAT_IO_RECEIVE_STATUS,
	HAPPYCHAT_IO_REQUEST_TRANSCRIPT_RECEIVE,
	HAPPYCHAT_IO_REQUEST_TRANSCRIPT_TIMEOUT,
	HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE,
	HAPPYCHAT_SET_HAS_UNREAD_MESSAGES,
	HAPPYCHAT_SET_OPERATOR_IS_TYPING,
	HAPPYCHAT_SET_IS_DISPLAYING_NEW_MESSAGES,
} from '../action-types';
import { HAPPYCHAT_CHAT_STATUS_DEFAULT } from '../constants';

// We compare incoming timestamps against a known future Unix time in seconds date
// to determine if the timestamp is in seconds or milliseconds resolution. If the former,
// we "upgrade" it by multiplying by 1000.
//
// This will all be removed once the server-side is fully converted.
const UNIX_TIMESTAMP_2023_IN_SECONDS = 1700000000;
export const maybeUpscaleTimePrecision = ( time ) => ( time < UNIX_TIMESTAMP_2023_IN_SECONDS ? time * 1000 : time );

/**
 * Tracks the last time happychat sent or received a message
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
export const lastActivityTimestamp = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE:
		case HAPPYCHAT_IO_RECEIVE_MESSAGE:
			return Date.now();
	}
	return state;
};

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
export const status = ( state = HAPPYCHAT_CHAT_STATUS_DEFAULT, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_IO_RECEIVE_STATUS:
			return action.status;
	}
	return state;
};

/**
 * Returns a timeline event from the redux action
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 *
 */
const timelineEvent = ( state = {}, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_IO_RECEIVE_MESSAGE:
		case HAPPYCHAT_IO_RECEIVE_MESSAGE_UPDATE:
			const { message } = action;
			return Object.assign(
				{},
				{
					id: message.id,
					source: message.source,
					message: message.text,
					name: message.user.name,
					image: message.user.avatarURL,
					timestamp: maybeUpscaleTimePrecision( message.timestamp ),
					user_id: message.user.id,
					type: get( message, 'type', 'message' ),
					links: get( message, 'meta.links' ),
					isEdited: !! message.revisions,
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
export const timeline = ( state = [], action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_IO_RECEIVE_MESSAGE:
			// if meta.forOperator is set, skip so won't show to user
			if ( get( action, 'message.meta.forOperator', false ) ) {
				return state;
			}
			const event = timelineEvent( {}, action );
			const existing = find( state, ( { id } ) => event.id === id );
			return existing ? state : concat( state, [ event ] );
		case HAPPYCHAT_IO_RECEIVE_MESSAGE_UPDATE:
			const index = findIndex( state, ( { id } ) => action.message.id === id );
			return index === -1 ? state : [
				...state.slice( 0, index ),
				timelineEvent( {}, action ),
				...state.slice( index + 1 ),
			];
		case HAPPYCHAT_IO_REQUEST_TRANSCRIPT_TIMEOUT:
			return state;
		case HAPPYCHAT_IO_REQUEST_TRANSCRIPT_RECEIVE:
			const messages = filter( action.messages, message => {
				if ( ! message.id ) {
					return false;
				}

				// if meta.forOperator is set, skip so won't show to user
				if ( get( message, 'meta.forOperator', false ) ) {
					return false;
				}

				return ! find( state, { id: message.id } );
			} );
			return sortTimeline(
				state.concat(
					map( messages, message => {
						return Object.assign( {
							id: message.id,
							source: message.source,
							message: message.text,
							name: message.user.name,
							image: message.user.picture,
							timestamp: maybeUpscaleTimePrecision( message.timestamp ),
							user_id: message.user.id,
							type: get( message, 'type', 'message' ),
							links: get( message, 'meta.links' ),
							isEdited: !! message.revisions,
						} );
					} )
				)
			);
	}
	return state;
};

export const isOperatorTyping = ( state = false, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_SET_OPERATOR_IS_TYPING: {
			return action.isTyping;
		}
		case HAPPYCHAT_IO_RECEIVE_MESSAGE: {
			return state && action.message.source === 'operator' ? false : state;
		}
	}
	return state;
};

export const hasUnreadMessages = ( state = false, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_SET_HAS_UNREAD_MESSAGES: {
			return action.hasUnreadMessages;
		}
		case HAPPYCHAT_SET_IS_DISPLAYING_NEW_MESSAGES: {
			return action.isDisplayed ? false : state;
		}
	}
	return state;
};

export default combineReducers( {
	lastActivityTimestamp,
	status,
	timeline,
	isOperatorTyping,
	hasUnreadMessages,
} );
