/**
 * External Dependencies
 */
import { createStore, applyMiddleware } from 'redux';

/**
 * Internal Dependencies
 */
import reducer from 'src/state/reducer';
import { socketMiddleware } from 'src/state/middleware';
import WPComOauth from '../src/lib/auth/strategies/wpcom/oauth';
import { setCurrentUser } from '../src/state/user/actions';
import { initConnection } from '../src/state/connection/actions';

const createHappychatStore = () => {
	return createStore(
		reducer,
		{},
		applyMiddleware( socketMiddleware() )
	);
};

export default authorize = ( token ) => {
	const api = createHappychatStore();
	const start = async () => {
		const auth = new WPComOauth( {
			type: 'wpcom-oauth-by-token',
			options: { token }
		} );
		auth.login();
		await auth.getUser();

		api.dispatch( setCurrentUser( await auth.getUser() ) );
		api.dispatch( initConnection( auth.authorizeChat( api.getState() )() ) ) ;
	}
	start();
	return api;
};
