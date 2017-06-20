/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_UI_BLUR,
	HAPPYCHAT_UI_FOCUS,
	HAPPYCHAT_UI_MINIMIZING,
	HAPPYCHAT_UI_OPEN
} from 'src/state/action-types';

const setChatOpen = isOpen => ( { type: HAPPYCHAT_UI_OPEN, isOpen } );
const setChatMinimizing = isMinimizing => ( { type: HAPPYCHAT_UI_MINIMIZING, isMinimizing } );

/**
 * Set the Happychat sidebar dock to display
 * @returns {Object} Action
 */
export const openChat = () => setChatOpen( true );

/**
 * Set the Happychat sidebar dock to hide
 * @returns {Object} Action
 */
export const closeChat = () => setChatOpen( false );

/**
 * Set the Happychat sidebar dock to start minimizing
 * @returns {Object} Action
 */
export const minimizeChat = () => setChatMinimizing( true );

/**
 * Set the Happychat sidebar dock to finish minimizing
 * @returns {Object} Action
 */
export const minimizedChat = () => setChatMinimizing( false );

/**
 * Set the Happychat focus status to blurred
 * @returns {Object} Action
 */
export const blur = () => ( {
	type: HAPPYCHAT_UI_BLUR
} );

/**
 * Set the Happychat focus status to focused
 * @returns {Object} Action
 */
export const focus = () => ( {
	type: HAPPYCHAT_UI_FOCUS
} );
