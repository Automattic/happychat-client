/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omit } from 'lodash';

const createMarkup = contents => ( {
	__html: contents,
} );

class FormDescription extends React.Component {
	render() {
		const { messages } = this.props;
		const classes = classNames( this.props.className, 'form-description' );

		return (
			<div>
				{ messages.map( message => (
					<p
						{ ...omit( this.props, 'className', 'message' ) }
						className={ classes }
						dangerouslySetInnerHTML={ createMarkup( message ) }
					/>
				) ) }
			</div>
		);
	}
}

FormDescription.propTypes = {
	className: PropTypes.string,
	messages: PropTypes.array,
};

export default FormDescription;
