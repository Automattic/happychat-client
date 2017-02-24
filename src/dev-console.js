import * as actions from './enhancer/actions';

export default ( createStore ) => ( ... args ) => {
	const store = createStore( ... args );
	if ( window ) {
		window.getState = store.getState;
		window.dispatch = store.dispatch;
		window.subscribe = store.subscribe;
		window.actions = actions;
	}
	return store;
};
