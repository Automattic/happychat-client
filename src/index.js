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
import { getOptions } from 'src/lib/get-options';
// UI components
import ContactForm, { ENTRY_FORM } from 'src/form';
import { MessageForm } from 'src/ui/components/message-form';
// state: general, actions, selectors
import eventAPIFactory from 'src/state/event-api';
import reducer from 'src/state/reducer';
import { receiveAccept, receiveInit } from 'src/state/connection/actions';
import { messagingMiddleware, socketMiddleware } from 'src/state/middleware';
import { HAPPYCHAT_GROUP_WPCOM } from 'src/state/constants';
import { setAssetsLoaded, setFormDefaultValues } from 'src/state/ui/actions';
import { setCurrentUser, setGroups, setLocale, setEligibility } from 'src/state/user/actions';
import { setFallbackTicketOptions } from 'src/state/fallbackTicket/actions';
import config from 'src/config';

const middleware = config.isEnabled( 'messaging' ) ? messagingMiddleware() : socketMiddleware();
const store = createStore(
	reducer,
	{},
	compose( applyMiddleware( middleware ), devToolsEnhancer() )
);

const dispatchAssetsFinishedDownloading = () => store.dispatch( setAssetsLoaded() );

/**
 *
 * @param {string} theme The theme to use
 * @param {Array} groups Happychat groups: if no theme is provided, it'd use one linked to the group.
 * @returns {string} A string with one of the valid themes.
 */
const getTheme = ( { theme, groups } ) => {
	if ( theme ) {
		return theme;
	}

	return Array.isArray( groups ) && groups.length > 0 ? groups[ 0 ] : null;
};

/**
 * Creates an iframe in the node provided by the nodeId prop.
 *
 * We want this iframe to be non-blocking respect of the main window onload event,
 * but also we want to notify happychat when all assets are done downloading.
 *
 * @param  {Object} props Properties used by the renderMethod.
 * @param  {string} props.nodeId Id of the HTMLNode where the iframe will be created.
 * @param  {Array} props.theme Theme to download and apply.
 * @param  {Function} assetsLoadedHook Callback to be executed when all assets are done downloading.
 * @returns {HTMLNode} Target node where Happychat can hook into.
 */
const createIframe = ( { nodeId, theme }, assetsLoadedHook = () => {} ) => {
	const iframeElement = document.createElement( 'iframe' );

	const cssURLPrefix = config( 'css_url' );

	// style iframe element
	iframeElement.width = '100%';
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

	// Then, we inject the stylesheets: the noticon custom font,
	// Happychat default, and the theme if any.
	// We want to tell Happychat when they are downloaded,
	// and we do so by means of the onload method of the stylesheets,
	// which will resolve the Promise.all()
	const styleNoticon = document.createElement( 'link' );
	styleNoticon.setAttribute( 'rel', 'stylesheet' );
	styleNoticon.setAttribute( 'type', 'text/css' );
	styleNoticon.setAttribute( 'href', 'https://s1.wp.com/i/noticons/noticons.css' );
	const styleNoticonPromise = new Promise( resolve => ( styleNoticon.onload = () => resolve() ) );

	const styleHC = document.createElement( 'link' );
	styleHC.setAttribute( 'rel', 'stylesheet' );
	styleHC.setAttribute( 'type', 'text/css' );
	styleHC.setAttribute( 'href', cssURLPrefix + 'happychat.css?v=' + Date.now() );
	const styleHCPromise = new Promise( resolve => ( styleHC.onload = () => resolve() ) );

	let styleHCThemePromise = Promise.resolve();
	const styleHCTheme = document.createElement( 'link' );
	styleHCTheme.setAttribute( 'rel', 'stylesheet' );
	styleHCTheme.setAttribute( 'type', 'text/css' );
	if ( theme === 'woo' || theme === 'jpop' ) {
		styleHCTheme.setAttribute( 'href', cssURLPrefix + theme + '.css' );
		styleHCThemePromise = new Promise( resolve => ( styleHCTheme.onload = () => resolve() ) );
	}

	Promise.all( [ styleNoticonPromise, styleHCPromise, styleHCThemePromise ] ).then( () =>
		assetsLoadedHook()
	);

	// appending the stylesheets to the iframe will trigger the network request
	iframeElement.contentDocument.head.appendChild( styleNoticon );
	iframeElement.contentDocument.head.appendChild( styleHC );
	iframeElement.contentDocument.head.appendChild( styleHCTheme );

	// some CSS styles depend on these top-level classes being present
	iframeElement.contentDocument.body.classList.add( hasTouch() ? 'touch' : 'notouch' );

	// React advises to use an element -not the body itself- as the target render,
	// that's why we create this wrapperElement inside the iframe.
	const targetNode = document.createElement( 'div' );
	const spinnerLine = document.createElement( 'hr' );
	spinnerLine.className = 'spinner-line';
	targetNode.appendChild( spinnerLine );
	iframeElement.contentDocument.body.appendChild( targetNode );

	setInterval( () => {
		const h = iframeElement.contentDocument.scrollingElement.scrollHeight;
		if ( iframeElement.offsetHeight != h ) {
			iframeElement.setAttribute( 'height', h + 'px' );
		}
	}, 200 );

	return targetNode;
};

const isAnyCanChatPropFalse = (
	canChat,
	{ primaryOptions, secondaryOptions, itemList, defaultValues }
) => {
	const { primarySelected, secondarySelected, itemSelected } = getOptions(
		{ primaryOptions, secondaryOptions, itemList },
		defaultValues
	);

	return (
		false === canChat ||
		false === primarySelected.canChat ||
		false === secondarySelected.canChat ||
		false === itemSelected.canChat
	);
};

/* eslint-disable camelcase */
export const renderContactForm = (
	targetNode,
	{
		userObject: { ID, email, username, display_name, avatar_URL, language },
		groups = [ HAPPYCHAT_GROUP_WPCOM ],
		canChat = true,
		forceTicketForm = false,
		entry = ENTRY_FORM,
		entryOptions = {},
		plugins = {},
	}
) => {
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
	store.dispatch( setFallbackTicketOptions( entryOptions ) );
	store.dispatch( setFormDefaultValues( entryOptions.defaultValues ) );

	setTimeout( () => {
		console.log( 'Simulating availability set to true...' );
		store.dispatch( receiveInit( {} ) );
		store.dispatch( receiveAccept( true ) );
	}, 5000 );

	isAnyCanChatPropFalse( canChat, entryOptions )
		? store.dispatch( setEligibility( false ) )
		: store.dispatch( setEligibility( true ) );

	ReactDOM.render(
		<Provider store={ store }>
			<ContactForm
				entry={ entry }
				canChat={ canChat }
				entryOptions={ entryOptions }
				forceTicketForm={ forceTicketForm }
				plugins={ plugins }
			/>
		</Provider>,
		targetNode
	);
};
/* eslint-enable camelcase */

export const createTargetNode = ( { nodeId, theme, groups } ) => {
	return createIframe(
		{ nodeId, theme: getTheme( { theme, groups } ) },
		dispatchAssetsFinishedDownloading
	);
};

export const renderError = ( targetNode, { error } ) =>
	ReactDOM.render( <MessageForm message={ 'Could not load form. ' + error } />, targetNode );

export const eventAPI = eventAPIFactory( store );
