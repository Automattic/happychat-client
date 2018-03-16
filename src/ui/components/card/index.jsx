/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import assign from 'lodash/assign';
import omit from 'lodash/omit';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import GridiconExternal from 'gridicons/dist/external';
import GridiconChevronRight from 'gridicons/dist/chevron-right';

class Card extends Component {
	static propTypes = {
		className: PropTypes.string,
		href: PropTypes.string,
		tagName: PropTypes.string,
		target: PropTypes.string,
		compact: PropTypes.bool,
		highlight: PropTypes.oneOf( [ false, 'error', 'info', 'success', 'warning' ] ),
	};

	static defaultProps = {
		tagName: 'div',
		highlight: false,
	};

	render() {
		const { children, compact, highlight, href, onClick, tagName, target } = this.props;

		const highlightClass = highlight ? 'is-' + highlight : false;

		const className = classnames(
			'card',
			this.props.className,
			{
				'is-card-link': !! href,
				'is-clickable': !! onClick,
				'is-compact': compact,
				'is-highlight': highlightClass,
			},
			highlightClass
		);

		const omitProps = [ 'compact', 'highlight', 'tagName' ];

		let linkIndicator;
		if ( href ) {
			if ( target ) {
				linkIndicator = <GridiconExternal className="card__link-indicator" />;
			} else {
				linkIndicator = <GridiconChevronRight className="card__link-indicator" />;
			}
		} else {
			omitProps.push( 'href', 'target' );
		}

		return React.createElement(
			href ? 'a' : tagName,
			assign( omit( this.props, omitProps ), { className } ),
			linkIndicator,
			children
		);
	}
}

export default Card;
