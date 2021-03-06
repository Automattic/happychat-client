/** @format */

/**
 * External dependencies
 */

import classNames from 'classnames';
import omit from 'lodash/omit';
import React, { Children } from 'react';

/**
 * Internal dependencies
 */
import Button from 'src/ui/components/button';

class FormButton extends React.Component {
	static defaultProps = {
		isSubmitting: false,
		isPrimary: true,
		type: 'submit',
	};

	getDefaultButtonAction = () => {
		return this.props.isSubmitting
			? this.props.translate( 'Saving…' )
			: this.props.translate( 'Save Settings' );
	};

	render() {
		const { children, className, isPrimary, ...props } = this.props,
			buttonClasses = classNames( className, 'form-button' );

		return (
			<Button
				{ ...omit( props, [ 'isSubmitting', 'moment', 'numberFormat', 'translate' ] ) }
				primary={ isPrimary }
				className={ buttonClasses }
			>
				{ Children.count( children ) ? children : this.getDefaultButtonAction() }
			</Button>
		);
	}
}

export default FormButton;
