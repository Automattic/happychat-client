/** @format */

/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

/**
 * Internal dependencies
 */
// utils
import { hasTouch } from 'src/lib/touch-detect';
import getUser from 'src/lib/wpcom/get-wpcom-user';
// UI components
import Happychat, { ENTRY_FORM } from 'src/form';
import { MessageForm } from 'src/ui/components/message-form';
// state: general, actions, selectors
import reducer from 'src/state/reducer';
import { socketMiddleware } from 'src/state/middleware';
import { HAPPYCHAT_GROUP_WPCOM } from 'src/state/constants';
import { sendEvent, sendUserInfo } from 'src/state/connection/actions';
import { setAssetsLoaded } from 'src/state/ui/actions';
import { setCurrentUser, setGroups, setLocale } from 'src/state/user/actions';
import getChatStatus from 'src/state/selectors/get-chat-status';
import getUserInfo from 'src/state/selectors/get-user-info';
import isAvailable from 'src/state/selectors/is-available';

const store = createStore(
	reducer,
	{},
	compose( applyMiddleware( socketMiddleware() ), devToolsEnhancer() )
);

const subscribers = {
	availability: [],
	chatStatus: [],
};

let oldAvailability = false;
let oldChatStatus = 'new';
store.subscribe( () => {
	const newAvailability = isAvailable( store.getState() );
	if ( newAvailability !== oldAvailability ) {
		oldAvailability = newAvailability;
		subscribers.availability.forEach( subscriber => subscriber( newAvailability ) );
	}

	const newChatStatus = getChatStatus( store.getState() );
	if ( newChatStatus !== oldChatStatus ) {
		oldChatStatus = newChatStatus;
		subscribers.chatStatus.forEach( subscriber => subscriber( newChatStatus ) );
	}
} );

const dispatchAssetsFinishedDownloading = () => store.dispatch( setAssetsLoaded() );

/**
 * Creates an iframe in the node provided by the nodeId prop.
 *
 * We want this iframe to be non-blocking respect of the main window onload event,
 * but also we want to notify happychat when all assets are done downloading.
 *
 * @param  {Function} renderMethod A method that will render the Happychat widget.
 * @param  {Object} props Properties used by the renderMethod.
 * @param  {Function} assetsLoadedHook Callback to be executed when all assets are done downloading.
 */
const createIframe = ( renderMethod, props, assetsLoadedHook = () => {} ) => {
	const { nodeId } = props;
	const iframeElement = document.createElement( 'iframe' );

	// style iframe element
	iframeElement.width = '100%';
	iframeElement.height = '500em';
	iframeElement.frameBorder = 0;
	iframeElement.scrolling = 'no';

	document.getElementById( nodeId ).appendChild( iframeElement );

	// Force FF (and maybe other browsers?) to write the changes to this iframe;
	// otherwise, the changes wont' be applied.
	iframeElement.contentDocument.open();
	iframeElement.contentDocument.write();
	iframeElement.contentDocument.close();

	// We want to show a loading indicator while the rest of assets
	// are downloading. This CSS pertains to the loading indicator
	// and needs to be available since the very beginning.
	const styleLoading = document.createElement( 'style' );
	styleLoading.setAttribute( 'type', 'text/css' );
	styleLoading.appendChild(
		document.createTextNode( `
			@-webkit-keyframes spinner-line__animation {
			  0% {
			    background-position: 0 0;
			  }
			  100% {
			    background-position: 600px 0;
			  }
			}
			@keyframes spinner-line__animation {
			  0% {
			    background-position: 0 0;
			  }
			  100% {
			    background-position: 600px 0;
			  }
			}

			hr.spinner-line {
			  border: none;
			  height: 3px;
			  margin: 24px 0;
			  background-image: linear-gradient(to right, #a8bece 0%, #c8d7e1 50%, #a8bece 100%);
			  background-size: 300px 100%;
			  -webkit-animation: spinner-line__animation 1.2s infinite linear;
			          animation: spinner-line__animation 1.2s infinite linear;
			}
		` )
	);
	iframeElement.contentDocument.head.appendChild( styleLoading );

	// Then, we inject two stylesheets: the noticon custom font and Happychat.
	// We want to tell Happychat when they are downloaded, and we do so by Promise.all()
	const styleNoticon = document.createElement( 'link' );
	const styleNoticonPromise = new Promise( resolve => {
		styleNoticon.onload = () => resolve();
	} );
	const styleHC = document.createElement( 'link' );
	const styleHCPromise = new Promise( resolve => {
		styleHC.onload = () => resolve();
	} );
	Promise.all( [ styleNoticonPromise, styleHCPromise ] ).then( () => assetsLoadedHook() );

	// config noticon styles: append it to the iframe's head will trigger the network request
	styleNoticon.setAttribute( 'rel', 'stylesheet' );
	styleNoticon.setAttribute( 'type', 'text/css' );
	styleNoticon.setAttribute( 'href', 'https://s1.wp.com/i/noticons/noticons.css' );
	iframeElement.contentDocument.head.appendChild( styleNoticon );

	// config noticon styles: append it to the iframe's head will trigger the network request
	styleHC.setAttribute( 'rel', 'stylesheet' );
	styleHC.setAttribute( 'type', 'text/css' );
	styleHC.setAttribute( 'href', 'https://widgets.wp.com/happychat/happychat.css' );
	iframeElement.contentDocument.head.appendChild( styleHC );

	// some CSS styles depend on these top-level classes being present
	iframeElement.contentDocument.body.classList.add( hasTouch() ? 'touch' : 'notouch' );

	// React advises to use an element -not the body itself- as the target render,
	// that's why we create this wrapperElement inside the iframe.
	const targetNode = document.createElement( 'div' );
	iframeElement.contentDocument.body.appendChild( targetNode );

	renderMethod( targetNode, props );
};

/* eslint-disable camelcase */
const renderHappychat = (
	targetNode,
	{
		user: {
			ID,
			email,
			username,
			display_name,
			avatar_URL,
			language,
			groups = [ HAPPYCHAT_GROUP_WPCOM ],
			accessToken,
		},
		entry = ENTRY_FORM,
		entryOptions = {},
	}
) => {
	store.dispatch( setCurrentUser( { ID, email, username, display_name, avatar_URL } ) );
	store.dispatch( setLocale( language ) );
	store.dispatch( setGroups( groups ) );

	ReactDOM.render(
		<Provider store={ store }>
			<Happychat accessToken={ accessToken } entry={ entry } entryOptions={ entryOptions } />
		</Provider>,
		targetNode
	);
};
/* eslint-enable camelcase */

const renderError = ( targetNode, { error } ) =>
	ReactDOM.render( <MessageForm message={ 'Could not load form. ' + error } />, targetNode );

/* eslint-disable camelcase */
const getWPComUser = ( accessToken, groups ) =>
	getUser(
		accessToken
	).then( ( { ID, email, username, display_name, avatar_URL, language } ) => ( {
		ID,
		email,
		username,
		display_name,
		avatar_URL,
		language,
		accessToken,
		groups,
	} ) );
/* eslint-enable camelcase */

/**
 * Renders a Happychat or Support form in the HTML Element provided by the nodeId.
 *
 * @param  {String} nodeId Mandatory. HTML Node id where Happychat will be rendered.
 * @param  {Array} groups Mandatory. Happychat groups this user belongs to.
 * @param  {String|Promise} accessToken Mandatory. A valid WP.com access token,
 *  					or a Promise that returns one.
 * @param  {String} entry Optional. Valid values are ENTRY_FORM, ENTRY_CHAT.
 * 			  ENTRY_FORM is the default and will render the contact form.
 * 			  ENTRY_CHAT will render the chat form.
 * @param  {Object} entryOptions Optional. Contains options to configure the selected entry.
 */
export const initHappychat = ( { nodeId, groups, accessToken, entry, entryOptions } ) => {
	let getAccessToken = accessToken;
	if ( 'string' === typeof accessToken ) {
		getAccessToken = () => Promise.resolve( accessToken );
	}

	getAccessToken()
		.then( token => getWPComUser( token, groups ) )
		.then( user =>
			createIframe(
				renderHappychat,
				{
					nodeId,
					user,
					entry,
					entryOptions,
				},
				dispatchAssetsFinishedDownloading
			)
		)
		.catch( error => createIframe( renderError, { nodeId, error } ) );
};

export const subscribeTo = ( eventName, subscriber ) =>
	subscribers.hasOwnProperty( eventName ) && subscribers[ eventName ].indexOf( subscriber ) === -1
		? subscribers[ eventName ].push( subscriber )
		: ''; // do nothing, the subscriber is already in the observers list

export const unsubscribeFrom = ( eventName, subscriber ) =>
	subscribers.hasOwnProperty( eventName ) && subscribers[ eventName ].indexOf( subscriber ) > -1
		? subscribers[ eventName ].splice( subscribers[ eventName ].indexOf( subscriber ), 1 )
		: ''; // do nothing, the subscriber is not in the observers list

export const sendEventMsg = msg => store.dispatch( sendEvent( msg ) );

export const sendUserInfoMsg = userInfo =>
	store.dispatch( sendUserInfo( getUserInfo( store.getState() )( userInfo ) ) );
