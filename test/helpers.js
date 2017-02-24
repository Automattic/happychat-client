const debug = require( 'debug' )( 'happychat:test' );

process.on( 'unhandledRejection', ( promise, reason ) => {
	debug( 'unhandled rejection', reason );
} );
