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
import max from 'lodash/max';

/**
 * Internal dependencies
 */
// utils
import { hasTouch } from 'src/lib/touch-detect';
import { getOptions } from 'src/lib/get-options';
// UI components
import Happychat, { ENTRY_FORM } from 'src/form';
import { MessageForm } from 'src/ui/components/message-form';
// state: general, actions, selectors
import eventAPIFactory from 'src/state/event-api';
import reducer from 'src/state/reducer';
import { socketMiddleware } from 'src/state/middleware';
import { HAPPYCHAT_GROUP_WPCOM } from 'src/state/constants';
import { setAssetsLoaded, setFormDefaultValues } from 'src/state/ui/actions';
import { setCurrentUser, setGroups, setLocale, setEligibility } from 'src/state/user/actions';
import { setFallbackTicketOptions } from 'src/state/fallbackTicket/actions';
import config from 'src/config';

const events = eventAPIFactory();

const store = createStore(
	reducer,
	{},
	compose(
    applyMiddleware( socketMiddleware(), events.middleware ),
  devToolsEnhancer() )
);

export const eventAPI = events.api(store);

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

const getHeight = entryOptions => {
	const primaryHasAnySecondary = options =>
		Array.isArray( options ) && find( options, opt => opt.secondaryOptions );

	const isThereAnySecondaryOptions = options =>
		options &&
		( options.secondaryOptions || primaryHasAnySecondary( entryOptions.primaryOptions ) );

	const maxNumberOfDescriptions = options => {
		let maxLength = 0;
		let lengths;
		if ( options ) {
			lengths = options.map(
				option => ( Array.isArray( option.description ) ? option.description.length : 0 )
			);
			maxLength = max( lengths );
		}
		return maxLength;
	};

	// Calculate height based on the number of components the iframe may need to render.
	let iframeHeight = 415;
	iframeHeight = iframeHeight + ( entryOptions && entryOptions.primaryOptions ? 95 : 0 );
	iframeHeight = iframeHeight + ( isThereAnySecondaryOptions( entryOptions ) ? 95 : 0 );
	iframeHeight = iframeHeight + ( entryOptions && entryOptions.itemList ? 100 : 0 );
	iframeHeight = iframeHeight + ( entryOptions && entryOptions.openTextField ? 100 : 0 );
	iframeHeight = iframeHeight + ( entryOptions && entryOptions.openTextArea ? 150 : 0 );
	iframeHeight = iframeHeight + maxNumberOfDescriptions( entryOptions.primaryOptions ) * 20;
	iframeHeight = iframeHeight + maxNumberOfDescriptions( entryOptions.secondaryOptions ) * 20;
	iframeHeight = iframeHeight + maxNumberOfDescriptions( entryOptions.itemList ) * 20;

	// We need 480 as min height for the chat form,
	// so we adjust the height if the ticket form components haven't grown it further.
	iframeHeight = iframeHeight > 480 ? iframeHeight : 480;
	return iframeHeight;
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
 * @param  {Object} props.height Height to be given to the iframe.
 * @param  {Function} assetsLoadedHook Callback to be executed when all assets are done downloading.
 * @returns {HTMLNode} Target node where Happychat can hook into.
 */
const createIframe = ( { nodeId, theme, height, cssDir }, assetsLoadedHook = () => {} ) => {
	const iframeElement = document.createElement( 'iframe' );

	const cssURLPrefix = cssDir != null ? cssDir : config( 'css_url' );

	// style iframe element
	iframeElement.width = '100%';
	iframeElement.height = height + 'em';
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
	styleHC.setAttribute( 'href', cssURLPrefix + 'happychat.css' );
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

	return targetNode;
};

const isAnyCanChatPropFalse = ( canChat, { primaryOptions, secondaryOptions, itemList, defaultValues } ) => {
	const {
		primarySelected,
		secondarySelected,
		itemSelected,
	} = getOptions( { primaryOptions, secondaryOptions, itemList }, defaultValues );

	return false === canChat ||
		false === primarySelected.canChat ||
		false === secondarySelected.canChat ||
		false === itemSelected.canChat;
};

/* eslint-disable camelcase */
export const renderHappychat = (
	targetNode,
	{
		userObject: { ID, email, username, display_name, avatar_URL, language },
		groups = [ HAPPYCHAT_GROUP_WPCOM ],
		canChat = true,
		entry = ENTRY_FORM,
		entryOptions = {},
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

	isAnyCanChatPropFalse( canChat, entryOptions )
		? store.dispatch( setEligibility( false ) )
		: store.dispatch( setEligibility( true ) );

	ReactDOM.render(
		<Provider store={ store }>
			<Happychat entry={ entry } canChat={ canChat } entryOptions={ entryOptions } />
		</Provider>,
		targetNode
	);
};
/* eslint-enable camelcase */

export const createTargetNode = ( { nodeId, theme, groups, entryOptions, cssDir } ) => {
	return createIframe(
		{ nodeId, theme: getTheme( { theme, groups } ), height: getHeight( entryOptions ), cssDir },
		dispatchAssetsFinishedDownloading
	);
};

export const renderError = ( targetNode, { error } ) =>
	ReactDOM.render( <MessageForm message={ 'Could not load form. ' + error } />, targetNode );

