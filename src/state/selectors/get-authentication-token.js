/** @format */

/**
 * External dependencies
 */
import get from 'lodash/get';

/**
 * Returns true if the user should be able to send messages to operators based on
 * chat status. For example new chats and ongoing chats should be able to send messages,
 * but blocked or pending chats should not.
 *
 * @param {Object} state - global redux state
 * @return {Boolean} Whether the user is able to send messages
 */
export default state => get( state, 'authentication.options.token' );
