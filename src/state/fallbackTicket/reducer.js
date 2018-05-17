/** @format */

/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import get from 'lodash/get';
import startsWith from 'lodash/startsWith';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET,
	HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_RECEIVE,
	HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_TIMEOUT,
	HAPPYCHAT_FALLBACK_TICKET_OPTIONS,
} from '../action-types';
import {
	HAPPYCHAT_FALLBACK_TICKET_NEW,
	HAPPYCHAT_FALLBACK_TICKET_INFLIGHT,
	HAPPYCHAT_FALLBACK_TICKET_SUCCESS,
	HAPPYCHAT_FALLBACK_TICKET_FAILURE,
	HAPPYCHAT_FALLBACK_TICKET_TIMEOUT,
} from '../constants';

const status = ( state = HAPPYCHAT_FALLBACK_TICKET_NEW, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET:
			return HAPPYCHAT_FALLBACK_TICKET_INFLIGHT;
		case HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_RECEIVE:
			return startsWith( action.status, '2' ) // HTTP succesful status are 2XX
				? HAPPYCHAT_FALLBACK_TICKET_SUCCESS
				: HAPPYCHAT_FALLBACK_TICKET_FAILURE;
		case HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_TIMEOUT:
			return HAPPYCHAT_FALLBACK_TICKET_TIMEOUT;
	}
	return state;
};

const response = ( state = null, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_RECEIVE:
			return action.responseText;
		case HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET:
		case HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_TIMEOUT:
			return null;
	}
	return state;
};

const defaultHeaders = [];
const headers = ( state = defaultHeaders, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_FALLBACK_TICKET_OPTIONS:
			return get( action, 'options.headers', defaultHeaders );
	}
	return state;
};

const defaultUrl = null;
const url = ( state = defaultUrl, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_FALLBACK_TICKET_OPTIONS:
			return get( action, 'options.url', defaultUrl );
	}
	return state;
};

const defaultMethod = 'POST';
const method = ( state = defaultMethod, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_FALLBACK_TICKET_OPTIONS:
			return get( action, 'options.method', defaultMethod );
	}
	return state;
};

const defaultTimeout = 10000;
const timeout = ( state = defaultTimeout, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_FALLBACK_TICKET_OPTIONS:
			return get( action, 'options.timeout', defaultTimeout );
	}
	return state;
};

const defaultMsgTimeout = 'Sorry, ticket could not be created - API timed out.';
const msgTimeout = ( state = defaultMsgTimeout, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_FALLBACK_TICKET_OPTIONS:
			return get( action, 'options.msgTimeout', defaultMsgTimeout );
	}
	return state;
};

const defaultMsgSending = 'Sending ticket...';
const msgSending = ( state = defaultMsgTimeout, action ) => {
	switch ( action.type ) {
		case HAPPYCHAT_FALLBACK_TICKET_OPTIONS:
			return get( action, 'options.msgSending', defaultMsgSending );
	}
	return state;
};

export default combineReducers( {
	url,
	method,
	headers,
	timeout,
	response,
	status,
	msgTimeout,
	msgSending,
} );
