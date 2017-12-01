/** @format */

/* ONLY ES5 code here, this is not transpiled */
/* eslint-disable no-var */

/* globals: document, Happychat, happychatSettings */

if ( window.Happychat ) {
	var zendesk = '.post.wrap .entry .woocommerce-error, .post.wrap .entry .create-ticket';
	var happychat = '#happychat-form';

	var showHappychat = function() {
		jQuery( zendesk ).css( 'display', 'none' );
		jQuery( happychat ).css( 'display', 'block' );
	};

	var showTicketForm = function() {
		jQuery( zendesk ).css( 'display', 'block' );
		jQuery( happychat ).css( 'display', 'none' );
	};

	// Render Happychat to the HTML node provided, but hide it by default
	jQuery( 'div.post.wrap .entry' ).append( '<div id="happychat-form"></div>' );
	jQuery( happychat ).css( 'display', 'none' );
	Happychat.open( 'happychat-form', happychatSettings.groups, happychatSettings.token );

	Happychat.on( 'availability', function( isAvailable ) {
		console.log( 'isAvailable: ', isAvailable );
		if ( ! happychatSettings.hasOngoingConversation ) {
			isAvailable ? showHappychat() : showTicketForm();
		}
	} );

	Happychat.on( 'ongoingConversation', function( hasOngoingConversation ) {
		happychatSettings.ongoingConversation = hasOngoingConversation;
	} );
}