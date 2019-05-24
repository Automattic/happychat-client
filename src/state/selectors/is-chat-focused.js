/**
 * Internal dependencies
 */
import getUILostFocusAt from 'src/state/selectors/get-ui-lostfocusat';

export default state => getUILostFocusAt( state ) == null;
