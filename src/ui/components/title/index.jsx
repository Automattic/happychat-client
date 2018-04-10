/** @format */

/**
 * External dependencies
 */
import React from 'react';
import GridiconCross from 'gridicons/dist/cross';

/*
 * React component for rendering title bar
 */
export const Title = ( { onCloseChat } ) => (
	<div className="title__wrapper">
		<div className="title__active-toolbar">
			<h4>{ 'Support Chat' }</h4>
			<div onClick={ onCloseChat }>
				<GridiconCross />
			</div>
		</div>
	</div>
);
