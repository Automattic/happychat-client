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

	var parseOptions = function( options ) {
		var newOptions = Object.assign( {}, options );

		if ( options.canChat ) {
			newOptions.canChat = toBoolean( options.canChat );
		}

		if ( Array.isArray( options.primaryOptions ) ) {
			// Note that every primary option may define either a canChat property,
			// or a secondaryOptions array
			// (for which every secondary option may define a canChat property as well).
			var newPrimaryOptions = [];
			options.primaryOptions.forEach( function( option ) {
				newPrimaryOptions.push( Object.assign( parseOptions( option ) ) );
			} );
			newOptions.primaryOptions = newPrimaryOptions;
		}

		if ( Array.isArray( options.secondaryOptions ) ) {
			var newSecondaryOptions = [];
			options.secondaryOptions.forEach( function( option ) {
				newSecondaryOptions.push( Object.assign( parseOptions( option ) ) );
			} );
			newOptions.secondaryOptions = newSecondaryOptions;
		}

		return newOptions;
	};

	window.Happychat &&
		Happychat.open( {
			nodeId: happychatSettings.nodeId,
			accessToken: happychatSettings.accessToken,
			groups: happychatSettings.groups,
			canChat: toBoolean( happychatSettings.canChat ),
			entry: happychatSettings.entry,
			entryOptions: parseOptions( happychatSettings.entryOptions ),
		} );
} )();
