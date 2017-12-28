/** @format */

/**
 * Internal dependencies
 */
import { renderTo } from 'src/ui/form';

window.Happychat = {
	open: nodeId => {
		renderTo( nodeId );
	},
};
