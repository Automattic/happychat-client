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
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
// utils
import { hasTouch } from 'src/lib/touch-detect';
// UI components
import Happychat from 'src/form';
import { MessageForm } from 'src/ui/components/message-form';
// state: general, actions, selectors
import eventAPIFactory from 'src/state/event-api';
import reducer from 'src/state/reducer';
import { socketMiddleware } from 'src/state/middleware';
import { HAPPYCHAT_GROUP_WPCOM } from 'src/state/constants';
import { setAssetsLoaded } from 'src/state/ui/actions';
import { setCurrentUser, setGroups, setLocale, setEligibility } from 'src/state/user/actions';
import { setFallbackTicketOptions } from 'src/state/fallbackTicket/actions';
import config from 'src/config';
import {
	ENTRY_FORM,
	LAYOUT_MAX_WIDTH_FIXED_HEIGHT,
	LAYOUT_MAX_PARENT_SIZE,
	LAYOUT_PANEL_FIXED_SIZE,
	LAYOUT_PANEL_MAX_PARENT_SIZE,
	THEME_CALYPSO,
} from 'src/constants';

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
	const { entryOptions, groups, layout, nodeId, theme } = props;
	const iframeElement = document.createElement( 'iframe' );

	let iframeHeight = 0;
	let iframeWidth = 0;
	switch ( layout ) {
		case LAYOUT_MAX_WIDTH_FIXED_HEIGHT:
	const primaryHasAnySecondary = options =>
		Array.isArray( options ) && find( options, opt => opt.secondaryOptions );

	const isThereAnySecondaryOptions = options =>
		options &&
		( options.secondaryOptions || primaryHasAnySecondary( entryOptions.primaryOptions ) );

	// Calculate height based on the number of components
	// the iframe may need to render.
			iframeHeight = 480;
	iframeHeight = iframeHeight + ( entryOptions && entryOptions.primaryOptions ? 110 : 0 );
	iframeHeight = iframeHeight + ( isThereAnySecondaryOptions( entryOptions ) ? 110 : 0 );
	iframeHeight = iframeHeight + ( entryOptions && entryOptions.itemList ? 70 : 0 );

			iframeHeight = iframeHeight + 'em';
			iframeWidth = '100%';
			break;

		case LAYOUT_PANEL_FIXED_SIZE:
			iframeHeight = '330em';
			iframeWidth = '150em';
			break;

		case LAYOUT_MAX_PARENT_SIZE:
		case LAYOUT_PANEL_MAX_PARENT_SIZE:
			iframeHeight = '100%';
			iframeWidth = '100%';
			break;
	}

	// style iframe element
	iframeElement.width = iframeWidth;
	iframeElement.height = iframeHeight;
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

	// Then, we inject the stylesheets: the noticon custom font, Happychat, and the theme if any.
	// We want to tell Happychat when they are downloaded, and we do so by means of the onload method
	// of the stylesheets, which will resolve the Promise.all()
	const styleNoticon = document.createElement( 'link' );
	styleNoticon.setAttribute( 'rel', 'stylesheet' );
	styleNoticon.setAttribute( 'type', 'text/css' );
	styleNoticon.setAttribute( 'href', 'https://s1.wp.com/i/noticons/noticons.css' );
	const styleNoticonPromise = new Promise( resolve => ( styleNoticon.onload = () => resolve() ) );

	const styleHC = document.createElement( 'link' );
	styleHC.setAttribute( 'rel', 'stylesheet' );
	styleHC.setAttribute( 'type', 'text/css' );
	styleHC.setAttribute( 'href', config( 'css_url' ) );

	const styleHCPromise = new Promise( resolve => ( styleHC.onload = () => resolve() ) );

	const styleHCTheme = document.createElement( 'link' );
	styleHCTheme.setAttribute( 'rel', 'stylesheet' );
	styleHCTheme.setAttribute( 'type', 'text/css' );
	let styleHCThemePromise = Promise.resolve();

	if ( theme !== THEME_CALYPSO ) {
		// if we are not using the default theme load the requested one
		styleHCTheme.setAttribute( 'href', 'https://widgets.wp.com/happychat/' + theme + '.css' );
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

	// add class for fullscreen
	if ( includes( [ LAYOUT_MAX_PARENT_SIZE, LAYOUT_PANEL_MAX_PARENT_SIZE ], layout ) ) {
		iframeElement.contentDocument.body.classList.add( 'is-fullscreen' );
	}

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
export const renderHappychat = (
	targetNode,
	{
		userObject: {
			ID,
			email,
			username,
			display_name,
			avatar_URL,
			language,
			localeSlug,
		},
		groups = [ HAPPYCHAT_GROUP_WPCOM ],
		canChat = true,
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
	// TODO: fix this - currentUser object differs from calypso to oauth.
	store.dispatch( setLocale( language | localeSlug ) );
	store.dispatch( setFallbackTicketOptions( fallbackTicket ) );

	isAnyCanChatPropFalse( canChat, entryOptions )
		? store.dispatch( setEligibility( false ) )
		: store.dispatch( setEligibility( true ) );

	ReactDOM.render(
		<Provider store={ store }>
			<Happychat entry={ entry } entryOptions={ entryOptions } />
		</Provider>,
		targetNode
	);
};
/* eslint-enable camelcase */

export const createTargetNode = ( props ) => {
	return createIframe( props, dispatchAssetsFinishedDownloading );
};

export const renderError = ( targetNode, { error } ) =>
	ReactDOM.render( <MessageForm message={ 'Could not load form. ' + error } />, targetNode );

export const eventAPI = eventAPIFactory( store );
