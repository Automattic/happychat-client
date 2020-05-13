/** @format */

/**
 * External dependencies
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { debounce, isEmpty } from 'lodash';
import wpcomRequest from 'wpcom-xhr-request';


/**
 * Internal dependencies
 */
import Card from 'src/ui/components/card';
import FormLabel from 'src/ui/components/form-label';

export default class Sibyl extends React.Component {
	state = {
		suggestions: [],
	};

	fetchSuggestions = debounce(() => {
		const query = `${this.props.subject} ${this.props.message}`.trim();

		if ( ! query ) {
			this.setState( { suggestions: [] } );
			return;
		}

		wpcomRequest({
			apiVersion: '1.1',
			path: '/help/qanda',
			query: {
				site: 'en.support.wordpress.com',
				query,
			},
		}, ( error, body, headers ) => {
			this.setState( { suggestions: Array.isArray( body ) ? body : [] } );
		} );
	}, 400)

	componentDidMount() {
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
				{ this.state.suggestions.map( ( { id, link, title } ) => (
					<Card
						key={id}
						className="sibyl--suggestion-card"
						compact={true}
						href={link}
						target="_blank"
					>
						{title}
					</Card>
				) ) }
			</div>
		);
	}
}