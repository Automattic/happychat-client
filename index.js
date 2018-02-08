/** @format */

/**
 * Internal dependencies
 */
import { initHappychat } from 'src';

window.Happychat = {
	open: ( {
		nodeId,
		groups,
		accessToken,
		entry,
		howCanWeHelpOptions,
		howDoYouFeelOptions,
		fallbackTicketPath,
	} ) => {
		initHappychat( {
			nodeId,
			groups,
			accessToken,
			entry,
			howCanWeHelpOptions,
			howDoYouFeelOptions,
			fallbackTicketPath,
		} );
	},
};
