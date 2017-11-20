/** @format */

/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_CHAT_STATUS_ABANDONED,
	HAPPYCHAT_CHAT_STATUS_ASSIGNED,
	HAPPYCHAT_CHAT_STATUS_ASSIGNING,
	HAPPYCHAT_CHAT_STATUS_BLOCKED,
	HAPPYCHAT_CHAT_STATUS_CLOSED,
	HAPPYCHAT_CHAT_STATUS_DEFAULT,
	HAPPYCHAT_CHAT_STATUS_MISSED,
	HAPPYCHAT_CHAT_STATUS_NEW,
	HAPPYCHAT_CHAT_STATUS_PENDING,
} from 'src/state/constants';
import hasActiveSession from '../has-active-session';

describe( '#hasActiveSession', () => {
	const inactiveChatStatuses = [
		HAPPYCHAT_CHAT_STATUS_BLOCKED,
		HAPPYCHAT_CHAT_STATUS_CLOSED,
		HAPPYCHAT_CHAT_STATUS_DEFAULT,
		HAPPYCHAT_CHAT_STATUS_NEW,
	];
	const activeChatStatuses = [
		HAPPYCHAT_CHAT_STATUS_ABANDONED,
		HAPPYCHAT_CHAT_STATUS_ASSIGNED,
		HAPPYCHAT_CHAT_STATUS_ASSIGNING,
		HAPPYCHAT_CHAT_STATUS_MISSED,
		HAPPYCHAT_CHAT_STATUS_PENDING,
	];

	test( 'should be false when chat.status indicates the user has no active session', () => {
		inactiveChatStatuses.forEach( status => {
			const state = deepFreeze( { chat: { status } } );
			expect( hasActiveSession( state ) ).to.be.false;
		} );
	} );

	test( 'should be true when chat.status indicates the user has an active session', () => {
		activeChatStatuses.forEach( status => {
			const state = deepFreeze( { chat: { status } } );
			expect( hasActiveSession( state ) ).to.be.true;
		} );
	} );
} );
