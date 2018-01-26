/** @format */

/* ONLY ES5 code here, this is not transpiled */

/* eslint-disable no-var */

// Teach no-undef ESLint rule not to fail for these variables,
// because they are declared for us in the global scope.
/* global location, jQuery */

( function() {
	var host =
		location.protocol + '//' + location.hostname + ( location.port ? ':' + location.port : '' );
	jQuery( '#happychat_fallback_ticket_path' )
		.keyup( function() {
			var path = jQuery( this ).val();
			path = path.startsWith( '/' ) ? path : '/' + path;
			jQuery( '#happychat_fallback_ticket_path_desc' ).text( host + path );
		} )
		.keyup();
} )();
