/** @format */

/**
 * Internal dependencies
 */
import { initHappychat } from 'src';

window.Happychat = {
	open: ( { nodeId, groups, accessToken } ) => {
		initHappychat( { nodeId, groups, accessToken } );
	},
};
