/** @format */

/**
 * External dependencies
 */
import { Title } from 'components/happychat/title';
import { connect } from 'react-redux';

/**
 * Calypso dependencies
 */
// TODO: implement localize
import { mockLocalize } from 'src/ui/components/localize';

export default connect(
	{},
	{
		onCloseChat: () => {},
		onMinimizeChat: () => {},
		onMinimizedChat: () => {},
	}
)( mockLocalize( Title ) );
