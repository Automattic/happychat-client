/**
 * External dependencies
 */
import { get } from 'lodash';

export const isHappychatMinimizing = state => get( state, 'ui.isMinimizing', false );
export const isHappychatOpen = state => get( state, 'ui.open', false );
export const getLostFocusTimestamp = state => get( state, 'ui.lostFocusAt', null );
