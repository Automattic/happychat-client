/** @format */

/**
 * Internal dependencies
 */
import { HAPPYCHAT_FALLBACK_TICKET_OPTIONS } from 'src/state/action-types';

/**
 * Returns an action object for configuring the fallbackTicket feature.
 *
 * @param { Object } options Object containing the data to be configured.
 * @return { Object } Action object
 */
export const setFallbackTicketOptions = options => ( {
	type: HAPPYCHAT_FALLBACK_TICKET_OPTIONS,
	options,
} );
