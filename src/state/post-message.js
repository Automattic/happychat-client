/** @format */

const postMessage = message => {
	console.log( 'postMessage', message );

	window.postMessage( message, window.location.origin );
};

export default postMessage;
