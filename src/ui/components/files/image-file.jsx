/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import getAuthenticationToken from 'src/state/selectors/get-authentication-token';
import { recordEvent } from 'src/lib/tracks';

// TODO: Hover prompt "open in new tab"
class ImageFile extends React.Component {
	state = {
		imgSrc: null
	};

	static defaultProps = {
		maxWidth: 200,
		maxHeight: 100,
	};

	loadImage = () => {
		fetch( this.props.file.url, { headers: { 'Authorization': `Bearer ${ this.props.token }` } } )
			.then(response => response.blob())
			.then(imageBlob => {
				this.setState( { imgSrc: URL.createObjectURL(imageBlob) } );
			});
	};

	handleClick = () => {
		recordEvent( 'happychatclient_file_opened', {
			file_type: 'image',
			file_id: this.props.file.id,
			session_id: this.props.file.session_id,
		} );
	};

	componentDidMount() {
		this.loadImage();
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.file.url !== this.props.file.url ) {
			this.loadImage();
		}
	}

	render() {
		const { maxHeight, maxWidth } = this.props;
		const { imgSrc } = this.state;

		return (
			<a className="image-file" href={imgSrc} target="_blank" rel="noopener noreferrer" onClick={this.handleClick}>
				{imgSrc ?
					<img className="image-file__thumbnail" src={imgSrc} style={ { maxWidth, maxHeight } } />
					:
					<span className="image-file__placeholder" style={ { width: maxHeight, height: maxHeight } }></span>
				}
			</a>
		);
	}
}

export default connect(
	state => ({ token: getAuthenticationToken(state) }),
)(ImageFile);
