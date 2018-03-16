/** @format */

/**
 * External dependencies
 */
import React from 'react';
import GridiconCross from 'gridicons/dist/cross';

/*
 * React component for rendering title bar
 */
export const Title = ( { onCloseChat, translate } ) => (
	<div className="happychat__title">
		<div className="happychat__active-toolbar">
			<h4>{ translate( 'Support Chat' ) }</h4>
			<div onClick={ onCloseChat }>
				<GridiconCross />
			</div>
		</div>
	</div>
);
