/** @format */

/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Search extends PureComponent {
	constructor( props ) {
		super( props );
		this.focus = this.focus.bind( this );
	}

	componentDidMount() {
		this.focus();
	}

	focus() {
		this.searchInputElement && this.searchInputElement.focus();
	}

	render() {
		const { placeholder } = this.props;
		return (
			<input
				ref={ c => ( this.searchInputElement = c ) } // eslint-disable-line react/jsx-no-bind, max-len
				type="search"
				role="search"
				placeholder={ placeholder }
			/>
		);
	}
}

Search.propTypes = {
	placeholder: PropTypes.string,
};

Search.defaultProps = {
	placeholder: '',
};

export default Search;
