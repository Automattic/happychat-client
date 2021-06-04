/** @format */

let enabled = ( typeof document !== 'undefined' && typeof window !== 'undefined' );

// Asynchronously load the Tracks script if this module is used
if ( enabled ) {
	const script = document.createElement( 'script' );
	script.src = '//stats.wp.com/w.js';
	document.head.appendChild( script );
	window._tkq = window._tkq || [];
}

export const recordEvent = ( name, properties = {} ) => {
	if ( ! enabled ) {
		return;
	}
	const propertiesWithDefaults = {
		...properties,
		happychatclient_version: require('/package.json').version,
	};
	window._tkq.push( [ 'recordEvent', name, propertiesWithDefaults ] );
};