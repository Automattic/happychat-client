/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import { renderTo } from 'src/api-wrapper';

const debug = debugFactory( 'happychat-embedded:api' );

debug( 'window.happychat' );
window.Happychat = {
	open: ( nodeId, token ) => renderTo( nodeId, token ),
	sendTimelineEvent: () => {} // TODO
};
