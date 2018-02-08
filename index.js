/** @format */

/**
 * Internal dependencies
 */
import { initHappychat } from 'src';

window.Happychat = {
	open: ( { nodeId, groups, accessToken, entry, entryOptions } ) => {
		initHappychat( {
			nodeId,
			groups,
			accessToken,
			entry,
			entryOptions,
		} );
	},
};
