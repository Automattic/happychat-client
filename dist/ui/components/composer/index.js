'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Composer = undefined;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _scrollbleed = require('../scrollbleed');

var _scrollbleed2 = _interopRequireDefault(_scrollbleed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */
var sendThrottledTyping = (0, _throttle2.default)(function (onSendTyping, msg) {
	onSendTyping(msg);
}, 1000, { leading: true, trailing: false });

/*
 * Renders a textarea to be used to comopose a message for the chat.
 */


/**
 * Internal dependencies
 */
var Composer = exports.Composer = (0, _createReactClass2.default)({
	displayName: 'Composer',
	mixins: [_scrollbleed2.default],

	propTypes: {
		disabled: _propTypes2.default.bool,
		message: _propTypes2.default.string,
		onFocus: _propTypes2.default.func,
		onSendMessage: _propTypes2.default.func,
		onSendTyping: _propTypes2.default.func,
		onSendNotTyping: _propTypes2.default.func,
		onSetCurrentMessage: _propTypes2.default.func,
		translate: _propTypes2.default.func // localize HOC
	},

	onChange: function onChange(event) {
		var _props = this.props,
		    onSendTyping = _props.onSendTyping,
		    onSendNotTyping = _props.onSendNotTyping,
		    onSetCurrentMessage = _props.onSetCurrentMessage;


		var msg = (0, _get2.default)(event, 'target.value');
		onSetCurrentMessage(msg);
		(0, _isEmpty2.default)(msg) ? onSendNotTyping() : sendThrottledTyping(onSendTyping, msg);
	},
	onKeyDown: function onKeyDown(event) {
		var RETURN_KEYCODE = 13;
		if ((0, _get2.default)(event, 'which') === RETURN_KEYCODE) {
			event.preventDefault();
			this.sendMessage();
		}
	},
	sendMessage: function sendMessage() {
		var _props2 = this.props,
		    message = _props2.message,
		    onSendMessage = _props2.onSendMessage,
		    onSendNotTyping = _props2.onSendNotTyping;

		if (!(0, _isEmpty2.default)(message)) {
			onSendMessage(message);
			onSendNotTyping();
		}
	},
	render: function render() {
		var _props3 = this.props,
		    disabled = _props3.disabled,
		    message = _props3.message,
		    onFocus = _props3.onFocus,
		    translate = _props3.translate;

		var composerClasses = (0, _classnames2.default)('happychat__composer', {
			'is-disabled': disabled
		});
		return _react2.default.createElement(
			'div',
			{
				className: composerClasses,
				onMouseEnter: this.scrollbleedLock,
				onMouseLeave: this.scrollbleedUnlock
			},
			_react2.default.createElement(
				'div',
				{ className: 'happychat__message' },
				_react2.default.createElement('textarea', {
					'aria-label': 'Enter your support request',
					ref: this.setScrollbleedTarget,
					onFocus: onFocus,
					type: 'text',
					placeholder: translate('Type a message …'),
					onChange: this.onChange,
					onKeyDown: this.onKeyDown,
					disabled: disabled,
					value: message
				})
			),
			_react2.default.createElement(
				'button',
				{ className: 'happychat__submit', disabled: disabled, onClick: this.sendMessage },
				_react2.default.createElement(
					'svg',
					{ viewBox: '0 0 24 24', width: '24', height: '24' },
					_react2.default.createElement('path', { d: 'M2 21l21-9L2 3v7l15 2-15 2z' })
				)
			)
		);
	}
});