/** @format */

/**
*
* Given a Redux action and a timeout, dispatch a request.
*
* The request can have three states, and will dispatch an action accordingly:
*
* - request was succesful: would dispatch the action.callback with true as argument
* - request was unsucessful: would dispatch the action.callback with false as argument
* - request timeout: would dispatch action.callbackTimeout
*
* @param  { Function } dispatch Redux dispatch function
* @param  { Object } action A Redux action with props
*                  	{
*                  		path: URL path used to send the request,
*                  		payload: contents to be sent,
*                  		callback: a Redux action creator,
*                  		callbackTimeout: a Redux action creator,
*                  	}
* @param  { Number } timeout How long (in milliseconds) has the server to respond
* @return { Promise } Fulfilled (returns the response)
*                     or rejected (returns an error message)
*/
const makeRequest = ( dispatch, action, timeout ) => {
	const promiseRace = Promise.race( [
		new Promise( ( resolve, reject ) => {
			const xhr = new XMLHttpRequest();
			xhr.open( 'POST', action.path, true );
			xhr.setRequestHeader( 'Content-type', 'application/json; charset=UTF-8' );
			xhr.onreadystatechange = () => {
				if ( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ) {
					return resolve();
				} else if ( xhr.readyState === XMLHttpRequest.DONE ) {
					return reject( new Error( xhr.status ) );
				}
			};
			xhr.send( JSON.stringify( action.payload ) );
		} ),
		new Promise( ( resolve, reject ) => {
			setTimeout( () => {
				return reject( new Error( 'timeout' ) );
			}, timeout );
		} ),
	] );

	promiseRace.then(
		() => dispatch( action.callback( true ) ),
		e =>
			e.message === 'timeout'
				? dispatch( action.callbackTimeout() )
				: dispatch( action.callback( false ) )
	);

	return promiseRace;
};

export default makeRequest;
