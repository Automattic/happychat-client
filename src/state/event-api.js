/** @format */

/**
 * Internal dependencies
 */
import { sendEvent, sendUserInfo } from 'src/state/connection/actions';
import { setChatStatus } from 'src/state/ui/actions';
import isChatFormOpen from 'src/state/selectors/is-chatform-open';
import getChatStatus from 'src/state/selectors/get-chat-status';
import getUserInfo from 'src/state/selectors/get-user-info';
import isAvailable from 'src/state/selectors/is-available';

const eventAPI = store => {
	const subscribers = {
		availability: [],
		chatStatus: [],
		chatPanelOpen: [],
	};

	let oldChatOpenStatus = false;
	let oldAvailability = false;
	let oldChatStatus = 'new';
	store.subscribe( () => {
		const state = store.getState();
		const newAvailability = isAvailable( state );
		if ( newAvailability !== oldAvailability ) {
			oldAvailability = newAvailability;
			subscribers.availability.forEach( subscriber => subscriber( newAvailability ) );
		}

		const newChatStatus = getChatStatus( state );
		if ( newChatStatus !== oldChatStatus ) {
			oldChatStatus = newChatStatus;
			subscribers.chatStatus.forEach( subscriber => subscriber( newChatStatus ) );
		}

		const newChatOpenStatus = isChatFormOpen( state );
		if ( newChatOpenStatus !== oldChatOpenStatus ) {
			oldChatOpenStatus = newChatOpenStatus;
			subscribers.chatPanelOpen.forEach(
				subscriber => subscriber( isChatFormOpen( state ) )
			);
		}
	} );

	const eventNameExist = eventName => subscribers.hasOwnProperty( eventName );

	const isSubscribed = ( eventName, subscriber ) =>
		subscribers[ eventName ].indexOf( subscriber ) > -1; // eslint-disable-line max-len

	const subscribeTo = ( eventName, subscriber ) =>
		eventNameExist( eventName ) &&
		! isSubscribed( eventName, subscriber ) &&
		subscribers[ eventName ].push( subscriber );

	const unsubscribeFrom = ( eventName, subscriber ) =>
		eventNameExist( eventName ) &&
		isSubscribed( subscriber, eventName ) &&
		subscribers[ eventName ].splice( subscribers[ eventName ].indexOf( subscriber ), 1 );

	const sendEventMsg = msg => store.dispatch( sendEvent( msg ) );

	const sendUserInfoMsg = userInfo =>
		store.dispatch( sendUserInfo( getUserInfo( store.getState() )( userInfo ) ) );

	const setChatOpen = ( status ) => store.dispatch( setChatStatus( status ) );

	return {
		subscribeTo,
		unsubscribeFrom,
		sendEventMsg,
		sendUserInfoMsg,
		setChatOpen,
	};
};

export default eventAPI;
