/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import debugFactory from 'debug';
const debug = debugFactory( 'happychat-client:ui:localize' );

export const mockLocalize = ComposedComponent =>
	class extends Component {
		translate( msg ) {
			debug( 'mockTranslate ', msg );
			return msg;
		}

		render() {
			return <ComposedComponent { ...this.props } translate={ this.translate } />;
		}
	};
