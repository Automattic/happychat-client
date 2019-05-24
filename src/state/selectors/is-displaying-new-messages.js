/**
 * External dependencies
 */
import { get } from 'lodash';

export default state => get( state, [ 'ui', 'isDisplayingNewMessages' ], false );
