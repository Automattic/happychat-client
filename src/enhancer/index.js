/**
 * Internal dependencies
 */
import createMiddleware from './middleware';

const debug = require( 'debug' )( 'happychat:enhancer' );

export default createConnection => createStore => ( reducer, preloadedState, enhancer ) => {
	debug( 'middleware initialized' );
	const store = createStore( reducer, preloadedState, enhancer );
	const { getState, dispatch } = store;
	const middleware = createMiddleware( { getState, dispatch }, createConnection );
	return {
		... store,
		dispatch: action => middleware( dispatch )( action )
	};
};
