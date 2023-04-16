/** @format */

const postMessage = ( type, data = {} ) => {
	console.log( 'postMessage' );
	console.log( { type, data } );

	//window.parent.postMessage( { type, data }, origin );
};

export default postMessage;
