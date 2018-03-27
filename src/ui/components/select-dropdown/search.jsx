/** @format */

/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Search extends PureComponent {
	render() {
		const { placeholder } = this.props;
		return <input type="search" role="search" placeholder={ placeholder } />;
	}
}

Search.propTypes = {
	placeholder: PropTypes.string,
};

Search.defaultProps = {
	placeholder: '',
};

export default Search;
