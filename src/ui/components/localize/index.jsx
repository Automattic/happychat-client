/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import debugFactory from 'debug';
const debug = debugFactory( 'happychat-embedded:localize' );

export default ComposedComponent =>
	class extends Component {
		mockTranslate( msg ) {
			debug( 'mockTranslate ', msg );
			return msg;
		}

		render() {
			return <ComposedComponent { ...this.props } translate={ this.mockTranslate } />;
		}
	};
