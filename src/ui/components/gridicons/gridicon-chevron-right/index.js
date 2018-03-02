/** @format */

/**
 * External dependencies
 */
import React from 'react';
import Gridicons from 'gridicons';

export default class GridiconChevronRight extends React.PureComponent {
	render() {
		const { className } = this.props;
		return <Gridicons className={ className } icon={ 'chevron-right' } />;
	}
}
