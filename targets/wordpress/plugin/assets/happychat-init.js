/** @format */

/* ONLY ES5 code here, this is not transpiled */

/* eslint-disable no-var */

// Teach no-undef ESLint rule not to fail for these variables,
// because they are declared for us in the global scope.
/* global window, Happychat, happychatSettings */

window.Happychat &&
	Happychat.open( {
		nodeId: happychatSettings.nodeId,
		groups: happychatSettings.groups,
		accessToken: happychatSettings.token,
		howCanWeHelpOptions: happychatSettings.howCanWeHelpOptions,
		fallbackTicketPath: happychatSettings.fallbackTicketPath,
	} );
