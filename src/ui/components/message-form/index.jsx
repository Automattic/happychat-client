/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import GridiconArrowLeft from 'gridicons/dist/arrow-left';

/**
 * Internal dependencies
 */
import FormLabel from 'src/ui/components/form-label';
import CompactCard from 'src/ui/components/card/compact';
import Card from 'src/ui/components/card';
import Button from 'src/ui/components/button';

export class MessageForm extends React.Component {
	render() {
		const { message, onBack } = this.props;
		const createMarkup = contents => ( { __html: contents } );
		return (
			<div className="message-form">
				<CompactCard>
					<p className="message-form__header-title">
						<Button compact borderless onClick={ onBack }>
							<GridiconArrowLeft size={ 18 } />
							Back
						</Button>
						<span>Contact us</span>
					</p>
				</CompactCard>
				<Card>
					<FormLabel dangerouslySetInnerHTML={ createMarkup( message ) } />
				</Card>
			</div>
		);
	}
}

MessageForm.propTypes = {
	message: PropTypes.string,
	onBack: PropTypes.func,
};
