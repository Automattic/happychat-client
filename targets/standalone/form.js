/** @format */

/**
 * Internal dependencies
 */
import { renderTo } from 'src/ui/form';

window.Happychat = {
	open: ( nodeId, { options, submitForm } ) => {
		renderTo( nodeId, { options, submitForm } );
	},
};
