/** @format */
/* global document, Happychat, happychatSettings */
happychatSettings.group = happychatSettings.group || 'woo';

// append node for happychat to render
jQuery( 'div.post.wrap .entry' ).append( '<div id="happychat-form"></div>' );

// hide zendesk form
jQuery( '.post.wrap .entry .woocommerce-error, .post.wrap .entry .create-ticket' ).css(
	'display',
	'none'
);

// start happychat
Happychat.open( 'happychat-form', happychatSettings.group, happychatSettings.token );
