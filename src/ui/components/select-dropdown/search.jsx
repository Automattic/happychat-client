/** @format */

/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Search extends PureComponent {
	constructor( props ) {
		super( props );

		// bind class methods to this instance
		this.focus = this.focus.bind( this );
		this.getCurrentSearchValue = this.getCurrentSearchValue.bind( this );
		this.onChange = this.onChange.bind( this );

		this.state = {
			keyword: '',
		};
	}

	componentDidMount() {
		this.focus();
	}

	focus() {
		this.searchInputElement && this.searchInputElement.focus();
	}

	getCurrentSearchValue() {
		return this.searchInputElement && this.searchInputElement.value;
	}

	onChange() {
		const currentSearchValue = this.getCurrentSearchValue();
		this.setState( { keyword: currentSearchValue } );
		this.props.onSearch( currentSearchValue );
	}

	render() {
		const { placeholder } = this.props;
		return (
			/*
			 * React15 has a bug in IE11 for input.onChange, so we'll use onInput instead:
			 * https://github.com/facebook/react/issues/7027
			 */
			<input
				ref={ c => ( this.searchInputElement = c ) } // eslint-disable-line react/jsx-no-bind, max-len
				type="search"
				role="search"
				placeholder={ placeholder }
				onInput={ this.onChange }
			/>
		);
	}
}

Search.propTypes = {
	onSearch: PropTypes.func,
	placeholder: PropTypes.string,
};

Search.defaultProps = {
	onSearch: () => '',
	placeholder: '',
};

export default Search;
