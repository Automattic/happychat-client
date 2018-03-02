/** @format */

/**
 * External dependencies
 */
import React from 'react';
import Gridicons from 'gridicons';

export default class GridiconExternal extends React.PureComponent {
	render() {
		const { className } = this.props;
		return <Gridicons className={ className } icon={ 'external' } />;
	}
}
