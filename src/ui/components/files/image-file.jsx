/** @format */

/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import GridiconExternal from 'gridicons/dist/external';

/**
 * Internal dependencies
 */
import auth from 'src/lib/auth';
import { recordEvent } from 'src/lib/tracks';

class ImageFile extends React.Component {
	state = {
		imgSrc: null
	};

	static defaultProps = {
		maxWidth: 200,
		maxHeight: 100,
	};

	loadImage = () => {
		const { session_id: sessionId, id } = this.props.file;

		auth.getFile( sessionId, id )
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
					<Fragment>
						<img className="image-file__thumbnail" src={imgSrc} style={ { maxWidth, maxHeight } } />
						<span className="image-file__hover-prompt"><GridiconExternal size={16} /></span>
					</Fragment>
					:
					<span className="image-file__placeholder" style={ { width: maxHeight, height: maxHeight } }></span>
				}
			</a>
		);
	}
}

export default ImageFile;
