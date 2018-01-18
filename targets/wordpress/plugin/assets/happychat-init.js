/** @format */

/* ONLY ES5 code here, this is not transpiled */
/* eslint-disable no-var */

// Teach no-undef ESLint rule not to fail for these variables,
// because they are declared for us in the global scope.
/* global window, jQuery, Happychat, happychatSettings */

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
	Happychat.open( {
		nodeId: 'happychat-form',
		groups: happychatSettings.groups,
		accessToken: happychatSettings.token,
		howCanWeHelpOptions: [
			{ value: 'before-buy', label: 'Before you buy' },
			{ value: 'account', label: 'Help with my account' },
			{ value: 'config', label: 'Help configuring' },
			{ value: 'order', label: 'Help with an order' },
			{ value: 'broken', label: 'Something is broken' },
		],
	} );

	var isHappychatAvailable = false;
	var hasOngoingConversation = false;

	var changeHappychatVisibility = function( availability, conversation ) {
		if ( conversation ) {
			showHappychat();
		} else {
			availability ? showHappychat() : showTicketForm();
		}
	};

	Happychat.on( 'availability', function( newStatus ) {
		isHappychatAvailable = newStatus;
		changeHappychatVisibility( isHappychatAvailable, hasOngoingConversation );
	} );

	Happychat.on( 'ongoingConversation', function( newStatus ) {
		hasOngoingConversation = newStatus;
		changeHappychatVisibility( isHappychatAvailable, hasOngoingConversation );
	} );
}
