/** @format */

/**
 * External dependencies
 */
import React from 'react';
import GridiconCamera from 'gridicons/dist/camera';
import GridiconCart from 'gridicons/dist/cart';
import GridiconCross from 'gridicons/dist/cross';
import GridiconGlobe from 'gridicons/dist/globe';
import GridiconHeart from 'gridicons/dist/heart';
import GridiconLinkBreak from 'gridicons/dist/link-break';
import GridiconPencil from 'gridicons/dist/pencil';
import GridiconPlugins from 'gridicons/dist/plugins';
import GridiconTime from 'gridicons/dist/time';
import GridiconTrash from 'gridicons/dist/trash';
import GridiconUserCircle from 'gridicons/dist/user-circle';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import config from 'config';
import DocsExample from 'devdocs/docs-example';

class Buttons extends React.PureComponent {
	static displayName = 'Buttons';

	state = {
		compactButtons: false,
	};

	render() {
		var toggleText = this.state.compactButtons ? 'Normal Buttons' : 'Compact Buttons';
		return config.isEnabled( 'devdocs/components-usage-stats' )
			? this.renderDocsExampleWithUsageStats( toggleText )
			: this.renderDocsExample( toggleText );
	}

	renderDocsExample = toggleText => {
		return (
			<div>
				<a className="docs__design-toggle button" onClick={ this.toggleButtons }>
					{ toggleText }
				</a>
				{ this.renderButtons( toggleText ) }
			</div>
		);
	};

	renderDocsExampleWithUsageStats = toggleText => {
		return (
			<DocsExample
				componentUsageStats={ this.props.componentUsageStats }
				toggleHandler={ this.toggleButtons }
				toggleText={ toggleText }
			>
				{ this.renderButtons() }
			</DocsExample>
		);
	};

	renderButtons = () => {
		if ( ! this.state.compactButtons ) {
			return (
				<Card>
					<div className="docs__design-button-row">
						<Button>Button</Button>
						<Button>
							<GridiconHeart /> Icon button
						</Button>
						<Button>
							<GridiconPlugins />
						</Button>
						<Button disabled>Disabled button</Button>
					</div>
					<div className="docs__design-button-row">
						<Button scary>Scary button</Button>
						<Button scary>
							<GridiconGlobe /> Scary icon button
						</Button>
						<Button scary>
							<GridiconPencil />
						</Button>
						<Button scary disabled>
							Scary disabled button
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button primary>Primary button</Button>
						<Button primary>
							<GridiconCamera /> Primary icon button
						</Button>
						<Button primary>
							<GridiconTime />
						</Button>
						<Button primary disabled>
							Primary disabled button
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button primary scary>
							Primary scary button
						</Button>
						<Button primary scary>
							<GridiconUserCircle /> Primary scary icon button
						</Button>
						<Button primary scary>
							<GridiconCart />
						</Button>
						<Button primary scary disabled>
							Primary scary disabled button
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button borderless>
							<GridiconCross /> Remove
						</Button>
						<Button borderless>
							<GridiconTrash /> Trash
						</Button>
						<Button borderless>
							<GridiconLinkBreak /> Disconnect
						</Button>
						<Button borderless>
							<GridiconTrash />
						</Button>
						<Button borderless disabled>
							<GridiconCross /> Remove
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button borderless scary>
							<GridiconCross /> Remove
						</Button>
						<Button borderless scary>
							<GridiconTrash /> Trash
						</Button>
						<Button borderless scary>
							<GridiconLinkBreak /> Disconnect
						</Button>
						<Button borderless scary>
							<GridiconTrash />
						</Button>
						<Button borderless scary disabled>
							<GridiconCross /> Remove
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button busy>Busy button</Button>
						<Button primary busy>
							<GridiconCamera /> Primary icon button
						</Button>
						<Button primary busy>
							<GridiconTime />
						</Button>
						<Button primary busy>
							Primary busy button
						</Button>
					</div>
				</Card>
			);
		} else {
			return (
				<Card>
					<div className="docs__design-button-row">
						<Button compact>Compact button</Button>
						<Button compact>
							<GridiconHeart /> Compact icon button
						</Button>
						<Button compact>
							<GridiconPlugins />
						</Button>
						<Button compact disabled>
							Compact disabled button
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button compact scary>
							Compact scary button
						</Button>
						<Button compact scary>
							<GridiconGlobe /> Compact scary icon button
						</Button>
						<Button compact scary>
							<GridiconPencil />
						</Button>
						<Button compact scary disabled>
							Compact scary disabled button
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button compact primary>
							Compact primary button
						</Button>
						<Button compact primary>
							<GridiconCamera /> Compact primary icon button
						</Button>
						<Button compact primary>
							<GridiconTime />
						</Button>
						<Button compact primary disabled>
							Compact primary disabled button
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button compact primary scary>
							Compact primary scary button
						</Button>
						<Button compact primary scary>
							<GridiconUserCircle /> Compact primary scary icon button
						</Button>
						<Button compact primary scary>
							<GridiconCart />
						</Button>
						<Button compact primary scary disabled>
							Compact primary scary disabled button
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button compact borderless>
							<GridiconCross /> Remove
						</Button>
						<Button compact borderless>
							<GridiconTrash /> Trash
						</Button>
						<Button compact borderless>
							<GridiconLinkBreak /> Disconnect
						</Button>
						<Button compact borderless>
							<GridiconTrash />
						</Button>
						<Button compact borderless disabled>
							<GridiconCross /> Remove
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button compact borderless scary>
							<GridiconCross /> Remove
						</Button>
						<Button compact borderless scary>
							<GridiconTrash /> Trash
						</Button>
						<Button compact borderless scary>
							<GridiconLinkBreak /> Disconnect
						</Button>
						<Button compact borderless scary>
							<GridiconTrash />
						</Button>
						<Button compact borderless scary disabled>
							<GridiconCross /> Remove
						</Button>
					</div>
					<div className="docs__design-button-row">
						<Button compact busy>
							Busy button
						</Button>
						<Button compact primary busy>
							<GridiconCamera /> Primary icon button
						</Button>
						<Button compact primary busy>
							<GridiconTime />
						</Button>
						<Button compact primary busy>
							Primary busy button
						</Button>
					</div>
				</Card>
			);
		}
	};

	toggleButtons = () => {
		this.setState( { compactButtons: ! this.state.compactButtons } );
	};
}

export default Buttons;
