/** @format */

/* ONLY ES5 code here, this is not transpiled */

/* eslint-disable no-var */

// Teach no-undef ESLint rule not to fail for these variables,
// because they are declared for us in the global scope.
/* global window, Happychat, happychatSettings */

( function() {
	var toBoolean = function( canChat ) {
		return 'false' === canChat ? false : true;
	};

	var cloneObject = function( oldObject ) {
		return JSON.parse( JSON.stringify( oldObject ) );
	};

	var parseOptions = function( options ) {
		var newOptions = cloneObject( options );

		if ( options.canChat ) {
			newOptions.canChat = toBoolean( options.canChat );
		}

		if ( Array.isArray( options.primaryOptions ) ) {
			var newPrimaryOptions = [];
			options.primaryOptions.forEach( function( option ) {
				newPrimaryOptions.push( parseOptions( option ) );
			} );
			newOptions.primaryOptions = newPrimaryOptions;
		}

		if ( Array.isArray( options.secondaryOptions ) ) {
			var newSecondaryOptions = [];
			options.secondaryOptions.forEach( function( option ) {
				newSecondaryOptions.push( parseOptions( option ) );
			} );
			newOptions.secondaryOptions = newSecondaryOptions;
		}

		if ( Array.isArray( options.itemList ) ) {
			var newItemList = [];
			options.itemList.forEach( function( option ) {
				newItemList.push( parseOptions( option ) );
			} );
			newOptions.itemList = newItemList;
		}

		// Adapt WordPress REST API wp_send_json_success response
		// to the response format expected by Happychat.
		if ( options.fallbackTicket ) {
			newOptions.fallbackTicket.parseResponse = function( responseText ) {
				return JSON.parse( responseText ).data;
			};
		}

		return newOptions;
	};

	window.Happychat &&
		Happychat.open( {
			nodeId: happychatSettings.nodeId,
			authentication: {
				type: 'wpcom-oauth-by-token',
				options: {
					token: happychatSettings.accessToken,
					happychatUrl: happychatSettings.happychatUrl,
				},
			},
			groups: happychatSettings.groups,
			canChat: toBoolean( happychatSettings.canChat ),
			entry: happychatSettings.entry,
			entryOptions: parseOptions( happychatSettings.entryOptions ),
			forceTicketForm: happychatSettings.forceTicketForm,
			plugins: happychatSettings.plugins,
			theme: happychatSettings.theme,
		} );
} )();
