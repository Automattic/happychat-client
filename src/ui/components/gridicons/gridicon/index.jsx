/**
 * @format
 * @ssr-ready *
 */

/* !!!
IF YOU ARE EDITING gridicon/index.jsx
THEN YOU ARE EDITING A FILE THAT GETS OUTPUT FROM THE GRIDICONS REPO!
DO NOT EDIT THAT FILE! EDIT index-header.jsx and index-footer.jsx instead
OR if you're looking to change now SVGs get output, you'll need to edit strings in the Gruntfile :)
!!! */

/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Gridicon extends PureComponent {
	static defaultProps = {
		size: 24,
	};

	static propTypes = {
		icon: PropTypes.string.isRequired,
		size: PropTypes.number,
		onClick: PropTypes.func,
		className: PropTypes.string,
	};

	needsOffset( icon, size ) {
		const iconNeedsOffset = [
			'gridicons-add-outline',
			'gridicons-add',
			'gridicons-align-image-center',
			'gridicons-align-image-left',
			'gridicons-align-image-none',
			'gridicons-align-image-right',
			'gridicons-attachment',
			'gridicons-bold',
			'gridicons-bookmark-outline',
			'gridicons-bookmark',
			'gridicons-calendar',
			'gridicons-cart',
			'gridicons-create',
			'gridicons-custom-post-type',
			'gridicons-external',
			'gridicons-folder',
			'gridicons-heading',
			'gridicons-help-outline',
			'gridicons-help',
			'gridicons-history',
			'gridicons-info-outline',
			'gridicons-info',
			'gridicons-italic',
			'gridicons-layout-blocks',
			'gridicons-link-break',
			'gridicons-link',
			'gridicons-list-checkmark',
			'gridicons-list-ordered',
			'gridicons-list-unordered',
			'gridicons-menus',
			'gridicons-minus',
			'gridicons-my-sites',
			'gridicons-notice-outline',
			'gridicons-notice',
			'gridicons-plus-small',
			'gridicons-plus',
			'gridicons-popout',
			'gridicons-posts',
			'gridicons-scheduled',
			'gridicons-share-ios',
			'gridicons-star-outline',
			'gridicons-star',
			'gridicons-stats',
			'gridicons-status',
			'gridicons-thumbs-up',
			'gridicons-textcolor',
			'gridicons-time',
			'gridicons-trophy',
			'gridicons-user-circle',
			'gridicons-reader-follow',
			'gridicons-reader-following',
		];

		if ( iconNeedsOffset.indexOf( icon ) >= 0 ) {
			return size % 18 === 0;
		}
		return false;
	}

	needsOffsetX( icon, size ) {
		const iconNeedsOffsetX = [
			'gridicons-arrow-down',
			'gridicons-arrow-up',
			'gridicons-comment',
			'gridicons-clear-formatting',
			'gridicons-flag',
			'gridicons-menu',
			'gridicons-reader',
			'gridicons-strikethrough',
		];

		if ( iconNeedsOffsetX.indexOf( icon ) >= 0 ) {
			return size % 18 === 0;
		}
		return false;
	}

	needsOffsetY( icon, size ) {
		const iconNeedsOffsetY = [
			'gridicons-align-center',
			'gridicons-align-justify',
			'gridicons-align-left',
			'gridicons-align-right',
			'gridicons-arrow-left',
			'gridicons-arrow-right',
			'gridicons-house',
			'gridicons-indent-left',
			'gridicons-indent-right',
			'gridicons-minus-small',
			'gridicons-print',
			'gridicons-sign-out',
			'gridicons-stats-alt',
			'gridicons-trash',
			'gridicons-underline',
			'gridicons-video-camera',
		];

		if ( iconNeedsOffsetY.indexOf( icon ) >= 0 ) {
			return size % 18 === 0;
		}
		return false;
	}

	render() {
		const { size, onClick, icon: iconProp, className, ...otherProps } = this.props;
		const icon = 'gridicons-' + iconProp;
		const needsOffset = this.needsOffset( icon, size );
		const needsOffsetX = this.needsOffsetX( icon, size );
		const needsOffsetY = this.needsOffsetY( icon, size );

		let svg;

		const iconClass = [
			'gridicon',
			icon,
			className,
			needsOffset ? 'needs-offset' : false,
			needsOffsetX ? 'needs-offset-x' : false,
			needsOffsetY ? 'needs-offset-y' : false,
		]
			.filter( Boolean )
			.join( ' ' );

		switch ( icon ) {
			default:
				svg = <svg height={ size } width={ size } { ...otherProps } />;
				break;
			case 'gridicons-chevron-right':
				svg = (
					<svg
						className={ iconClass }
						height={ size }
						width={ size }
						onClick={ onClick }
						{ ...otherProps }
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<g>
							<path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586" />
						</g>
					</svg>
				);
				break;
			case 'gridicons-cross':
				svg = (
					<svg
						className={ iconClass }
						height={ size }
						width={ size }
						onClick={ onClick }
						{ ...otherProps }
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<g>
							<path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z" />
						</g>
					</svg>
				);
				break;
			case 'gridicons-external':
				svg = (
					<svg
						className={ iconClass }
						height={ size }
						width={ size }
						onClick={ onClick }
						{ ...otherProps }
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<g>
							<path d="M19 13v6c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V7c0-1.105.895-2 2-2h6v2H5v12h12v-6h2zM13 3v2h4.586l-7.793 7.793 1.414 1.414L19 6.414V11h2V3h-8z" />
						</g>
					</svg>
				);
				break;
		}

		return svg;
	}
}
