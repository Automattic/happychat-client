/** @format */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Gridicon from 'src/ui/components/gridicons/gridicon';

export default class GridiconExternal extends React.PureComponent {
	render() {
		const { className } = this.props;
		return <Gridicon className={ className } icon={ 'external' } />;
	}
}
