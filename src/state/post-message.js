/** @format */

const postMessage = message => {
	window.postMessage( message, window.location.origin );
};

export default postMessage;
