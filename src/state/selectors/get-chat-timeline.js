/** @format */

/**
 * Gets timeline chat events from the happychat state
 *
 * @param {Object} state - Global redux state
 * @return [{Object}] events - an array of timeline chat events
 */
export default state => state.chat.timeline;
