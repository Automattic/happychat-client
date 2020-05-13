/** @format */

/**
 * External dependencies
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { debounce, isEmpty } from 'lodash';
import wpcomRequest from 'wpcom-xhr-request';

const areSameSuggestions = ( oldSuggestions, newSuggestions ) => {
	const oldIDs = oldSuggestions.map( suggestion => suggestion.id ).sort();
	const newIDs = newSuggestions.map( suggestion => suggestion.id ).sort();
	return oldIDs.toString() === newIDs.toString();
};

/**
 * Internal dependencies
 */
import Card from 'src/ui/components/card';
import FormLabel from 'src/ui/components/form-label';
import { recordEvent } from 'src/lib/tracks';

export default class Sibyl extends React.Component {
	state = {
		suggestions: [],
		suggestionClicked: false,
	};

	fetchSuggestions = debounce(() => {
		const { site, subject, message } = this.props;
		const query = `${subject} ${message}`.trim();

		if ( ! query ) {
			this.setState( { suggestions: [] } );
			return;
		}

		wpcomRequest({
			apiVersion: '1.1',
			path: '/help/qanda',
			query: {
				site,
				query,
			},
		}, ( error, body, headers ) => {
			const suggestions = Array.isArray( body ) ? body : [];
			this.setState( {
				suggestions,
				suggestionClicked: this.state.suggestionClicked && areSameSuggestions( this.state.suggestions, suggestions )
			} );
		} );
	}, 400)

	handleSuggestionClick = suggestion => {
		this.setState({ suggestionClicked: true });
		recordEvent( 'happychatclient_sibyl_question_click', {
			question_id: suggestion.id,
			site: this.props.site
		} );
	}

	handleFormSubmit = () => {
		const { site } = this.props;

		if ( this.state.suggestionClicked ) {
			recordEvent( 'happychatclient_sibyl_support_after_question_click', { site } );
		}

		if ( ! isEmpty( this.state.suggestions ) ) {
			recordEvent( 'happychatclient_sibyl_support_with_questions_showing', { site } );
		}
	}

	componentDidMount() {
		this.props.addFormSubmitListener( this.handleFormSubmit );
		this.fetchSuggestions();
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( prevProps.subject !== this.props.subject || prevProps.message !== this.props.message ) {
			this.fetchSuggestions();
		}
	}

	render() {
		if ( isEmpty( this.state.suggestions ) ) {
			return null;
		}

		return (
			<div className="sibyl">
				<Card  className="sibyl--heading-card" compact={true}>
					Do any of these Frequently Asked Questions help?
				</Card>
				{ this.state.suggestions.map( ( suggestion ) => {
					const { id, link, title } = suggestion;
					return <Card
						key={id}
						className="sibyl--suggestion-card"
						compact={true}
						href={link}
						target="_blank"
						onClick={() => this.handleSuggestionClick( suggestion )}
						children={title}
					/>;
				} ) }
			</div>
		);
	}
}

// TODO Proptypes?

