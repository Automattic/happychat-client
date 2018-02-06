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
import getUser from 'src/lib/wpcom/get-wpcom-user';
import Happychat from 'src/form';
import { MessageForm } from 'src/ui/components/message-form';
import reducer from 'src/state/reducer';
import { socketMiddleware } from 'src/state/middleware';
import { setCurrentUser, setGroups, setLocale } from 'src/state/user/actions';
import { setAssetsLoaded } from 'src/state/ui/actions';
import { hasTouch } from 'src/lib/touch-detect';

const store = createStore(
	reducer,
	{},
	compose( applyMiddleware( socketMiddleware() ), devToolsEnhancer() )
);

const dispatchAssetsFinishedDownloading = () => store.dispatch( setAssetsLoaded() );

const createIframe = ( renderMethod, props, assetsLoadedHook = () => {} ) => {
	const { nodeId } = props;
	const iframeElement = document.createElement( 'iframe' );

	// style iframe element
	iframeElement.width = '100%';
	iframeElement.height = '500em';
	iframeElement.frameBorder = 0;
	iframeElement.scrolling = 'no';

	document.getElementById( nodeId ).appendChild( iframeElement );

	// We are going to inject two stylesheets: the noticon custom font and Happychat.
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
	styleHC.setAttribute(
		'href',
		'https://rawgit.com/Automattic/happychat-client/master/dist/happychat.css'
	);
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
	{ user, howCanWeHelpOptions = [], howDoYouFeelOptions = [], fallbackTicketPath }
) => {
	const { ID, email, username, display_name, avatar_URL, language, groups, accessToken } = user;
	store.dispatch( setCurrentUser( { ID, email, username, display_name, avatar_URL } ) );
	store.dispatch( setLocale( language ) );
	store.dispatch( setGroups( groups ) );

	ReactDOM.render(
		<Provider store={ store }>
			<Happychat
				accessToken={ accessToken }
				howCanWeHelpOptions={ howCanWeHelpOptions }
				howDoYouFeelOptions={ howDoYouFeelOptions }
				fallbackTicketPath={ fallbackTicketPath }
			/>
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
 * If howCanWeHelpOptions option is present will render the Support form,
 * Happychat will be rendered otherwise.
 *
 * @param  {String} nodeId Mandatory. HTML Node id where Happychat will be rendered.
 * @param  {Array} groups Mandatory. Happychat groups this user belongs to.
 * @param  {String|Promise} accessToken Mandatory. A valid WP.com access token,
 *  					or a Promise that returns one.
 * @param  {Array} howCanWeHelpOptions Optional. If present will render the support form.
 * @param  {Array} howDoYouFeelOptions Optional.
 */
export const initHappychat = ( {
	nodeId,
	groups,
	accessToken,
	howCanWeHelpOptions,
	howDoYouFeelOptions,
	fallbackTicketPath,
} ) => {
	let getAccessToken = accessToken;
	if ( typeof accessToken === 'string' ) {
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
					howCanWeHelpOptions,
					howDoYouFeelOptions,
					fallbackTicketPath,
				},
				dispatchAssetsFinishedDownloading
			)
		)
		.catch( error => createIframe( renderError, { nodeId, error } ) );
};
