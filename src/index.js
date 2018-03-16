/** @format */

/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import find from 'lodash/find';

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
import eventAPIFactory from 'src/state/event-api';
import reducer from 'src/state/reducer';
import { socketMiddleware } from 'src/state/middleware';
import { HAPPYCHAT_GROUP_WPCOM } from 'src/state/constants';
import { setAssetsLoaded } from 'src/state/ui/actions';
import { setCurrentUser, setGroups, setLocale, setEligibility } from 'src/state/user/actions';
import { setFallbackTicketOptions } from 'src/state/fallbackTicket/actions';

const store = createStore(
	reducer,
	{},
	compose( applyMiddleware( socketMiddleware() ), devToolsEnhancer() )
);

const dispatchAssetsFinishedDownloading = () => store.dispatch( setAssetsLoaded() );

/**
 * Creates an iframe in the node provided by the nodeId prop.
 *
 * We want this iframe to be non-blocking respect of the main window onload event,
 * but also we want to notify happychat when all assets are done downloading.
 *
 * @param  {Object} props Properties used by the renderMethod.
 * @param  {Function} assetsLoadedHook Callback to be executed when all assets are done downloading.
 * @returns {HTMLNode} Target node where Happychat can hook into.
 */
const createIframe = ( props, assetsLoadedHook = () => {} ) => {
	const { nodeId, entryOptions } = props;
	const iframeElement = document.createElement( 'iframe' );

	const primaryHasAnySecondary = options =>
		Array.isArray( options ) && find( options, opt => opt.secondaryOptions );

	const isThereAnySecondaryOptions = options =>
		options &&
		( options.secondaryOptions || primaryHasAnySecondary( entryOptions.primaryOptions ) );

	// Calculate height based on the number of components
	// the iframe may need to render.
	let iframeHeight = 480;
	iframeHeight = iframeHeight + ( entryOptions && entryOptions.primaryOptions ? 110 : 0 );
	iframeHeight = iframeHeight + ( isThereAnySecondaryOptions( entryOptions ) ? 110 : 0 );
	iframeHeight = iframeHeight + ( entryOptions && entryOptions.itemList ? 70 : 0 );

	// style iframe element
	iframeElement.width = '100%';
	iframeElement.height = iframeHeight + 'em';
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
	styleHC.setAttribute( 'href', '/happychat.css' );
	iframeElement.contentDocument.head.appendChild( styleHC );

	// some CSS styles depend on these top-level classes being present
	iframeElement.contentDocument.body.classList.add( hasTouch() ? 'touch' : 'notouch' );

	// React advises to use an element -not the body itself- as the target render,
	// that's why we create this wrapperElement inside the iframe.
	const targetNode = document.createElement( 'div' );
	const spinnerLine = document.createElement( 'hr' );
	spinnerLine.className = 'spinner-line';
	targetNode.appendChild( spinnerLine );
	iframeElement.contentDocument.body.appendChild( targetNode );

	return targetNode;
};

const isAnyCanChatPropFalse = ( canChat, entryOptions ) =>
	false === canChat ||
	( Array.isArray( entryOptions.primaryOptions ) &&
		entryOptions.primaryOptions.length > 0 &&
		false === entryOptions.primaryOptions[ 0 ].canChat ) ||
	( Array.isArray( entryOptions.secondaryOptions ) &&
		entryOptions.secondaryOptions.length > 0 &&
		false === entryOptions.secondaryOptions[ 0 ].canChat ) ||
	( Array.isArray( entryOptions.itemList ) &&
		entryOptions.itemList.length > 0 &&
		false === entryOptions.itemList[ 0 ].canChat );

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
			canChat = true,
		},
		entry = ENTRY_FORM,
		entryOptions = {},
	}
) => {
	const { fallbackTicket } = entryOptions;
	store.dispatch(
		setCurrentUser( {
			ID,
			email,
			username,
			display_name,
			avatar_URL,
		} )
	);
	store.dispatch( setGroups( groups ) );
	store.dispatch( setLocale( language ) );
	store.dispatch( setFallbackTicketOptions( fallbackTicket ) );

	isAnyCanChatPropFalse( canChat, entryOptions )
		? store.dispatch( setEligibility( false ) )
		: store.dispatch( setEligibility( true ) );

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
const getWPComUser = ( accessToken, groups, canChat ) =>
	getUser( accessToken ).then(
		( { ID, email, username, display_name, avatar_URL, language } ) => ( {
			ID,
			email,
			username,
			display_name,
			avatar_URL,
			language,
			accessToken,
			groups,
			canChat,
		} )
	);
/* eslint-enable camelcase */

/**
 * Renders a Happychat or Support form in the HTML Element provided by the nodeId.
 *
 * @param {String} nodeId Mandatory. HTML Node id where Happychat will be rendered.
 * @param {Array} groups Mandatory. Happychat groups this user belongs to.
 * @param {String|Promise} accessToken Mandatory. A valid WP.com access token,
 * 				       or a Promise that returns one.
 * @param {String} entry Optional. Valid values are ENTRY_FORM, ENTRY_CHAT.
 * 			 ENTRY_FORM is the default and will render the contact form.
 * 			 ENTRY_CHAT will render the chat form.
 * @param {Object} entryOptions Optional. Contains options to configure the selected entry.
 * @param {Boolean} canChat Optional. Whether the user can be offered chat. True by default.
 */
export const initHappychat = ( { nodeId, groups, accessToken, entry, entryOptions, canChat } ) => {
	let getAccessToken = accessToken;
	if ( 'string' === typeof accessToken ) {
		getAccessToken = () => Promise.resolve( accessToken );
	}

	const targetNode = createIframe( { nodeId, entryOptions }, dispatchAssetsFinishedDownloading );
	getAccessToken()
		.then( token => getWPComUser( token, groups, canChat ) )
		.then( user =>
			renderHappychat( targetNode, {
				user,
				entry,
				entryOptions,
			} )
		)
		.catch( error => renderError( targetNode, { error } ) );
};

export const eventAPI = eventAPIFactory( store );
