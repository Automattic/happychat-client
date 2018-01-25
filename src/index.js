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
import { hasTouch } from 'src/lib/touch-detect';

const store = createStore(
	reducer,
	{},
	compose( applyMiddleware( socketMiddleware() ), devToolsEnhancer() )
);

let targetNode;
const getTargetNode = nodeId => {
	if ( ! targetNode ) {
		targetNode = document.getElementById( nodeId );
		const iframeElement = document.createElement( 'iframe' );

		// style iframe element
		iframeElement.width = '100%';
		iframeElement.height = '500em';
		iframeElement.frameBorder = 0;
		iframeElement.scrolling = 'no';

		document.getElementById( nodeId ).appendChild( iframeElement );

		// and noticon custom font
		const styleNoticon = document.createElement( 'link' );
		styleNoticon.setAttribute( 'rel', 'stylesheet' );
		styleNoticon.setAttribute( 'type', 'text/css' );
		styleNoticon.setAttribute( 'href', 'https://s1.wp.com/i/noticons/noticons.css' );
		iframeElement.contentDocument.head.appendChild( styleNoticon );

		// add happychat styles
		const styleHC = document.createElement( 'link' );
		styleHC.setAttribute( 'rel', 'stylesheet' );
		styleHC.setAttribute( 'type', 'text/css' );
		styleHC.setAttribute(
			'href',
			'https://rawgit.com/Automattic/happychat-client/master/dist/happychat.full.css'
		);
		iframeElement.contentDocument.head.appendChild( styleHC );

		// some CSS styles depend on these top-level classes being present
		iframeElement.contentDocument.body.classList.add( hasTouch() ? 'touch' : 'notouch' );

		// React advises to use an element -not the body itself- as the target render,
		// that's why we create this wrapperElement inside the iframe.
		targetNode = document.createElement( 'div' );
		iframeElement.contentDocument.body.appendChild( targetNode );
	}
	return targetNode;
};

/* eslint-disable camelcase */
const renderTo = ( {
	nodeId,
	user,
	howCanWeHelpOptions = [],
	howDoYouFeelOptions = [],
	fallbackTicketPath,
} ) => {
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
		getTargetNode( nodeId )
	);
};
/* eslint-enable camelcase */

const renderMessage = ( nodeId, msg ) =>
	ReactDOM.render( <MessageForm message={ msg } />, getTargetNode( nodeId ) );

const renderHappychat = ( {
	nodeId,
	howCanWeHelpOptions,
	howDoYouFeelOptions,
	fallbackTicketPath,
} ) => user =>
	renderTo( { nodeId, user, howCanWeHelpOptions, howDoYouFeelOptions, fallbackTicketPath } );

const renderError = nodeId => error => renderMessage( nodeId, 'Could not load form. ' + error );

/* eslint-disable camelcase */
const getWPComUser = groups => accessToken =>
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
		.then( getWPComUser( groups ) )
		.then(
			renderHappychat( { nodeId, howCanWeHelpOptions, howDoYouFeelOptions, fallbackTicketPath } )
		)
		.catch( renderError( nodeId ) );
};
