/** @format */

// Asynchronously load the Tracks script if this module is used
const script = document.createElement( 'script' );
script.src = '//stats.wp.com/w.js';
document.head.appendChild( script );
window._tkq = window._tkq || [];

export const recordEvent = ( name, properties = {} ) => {
	window._tkq.push( [ 'recordEvent', name, properties ] );
};