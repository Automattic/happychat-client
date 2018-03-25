'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HappychatForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _composer = require('../composer');

var _notices = require('../notices');

var _timeline = require('../timeline');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


/**
 * React component for rendering a happychat client
 */
var HappychatForm = exports.HappychatForm = function (_Component) {
	_inherits(HappychatForm, _Component);

	function HappychatForm(props) {
		_classCallCheck(this, HappychatForm);

		var _this = _possibleConstructorReturn(this, (HappychatForm.__proto__ || Object.getPrototypeOf(HappychatForm)).call(this, props));

		_this.onUnload = _this.onUnload.bind(_this);
		return _this;
	}

	_createClass(HappychatForm, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.setFocused();
			window.addEventListener('beforeunload', this.onUnload);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.props.setBlurred();
			window.removeEventListener('beforeunload', this.onUnload);
		}
	}, {
		key: 'onUnload',
		value: function onUnload(e) {
			e.returnValue = 'The chat session will end if the page is reloaded';
			return e.returnValue;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    chatStatus = _props.chatStatus,
			    connectionStatus = _props.connectionStatus,
			    currentUserEmail = _props.currentUserEmail,
			    currentUserGroup = _props.currentUserGroup,
			    disabled = _props.disabled,
			    isCurrentUser = _props.isCurrentUser,
			    isExternalUrl = _props.isExternalUrl,
			    isServerReachable = _props.isServerReachable,
			    message = _props.message,
			    onSendMessage = _props.onSendMessage,
			    onSendNotTyping = _props.onSendNotTyping,
			    onSendTyping = _props.onSendTyping,
			    onSetCurrentMessage = _props.onSetCurrentMessage,
			    timeline = _props.timeline,
			    translate = _props.translate,
			    twemojiUrl = _props.twemojiUrl;


			return _react2.default.createElement(
				'div',
				{ className: 'happychat__page', 'aria-live': 'polite', 'aria-relevant': 'additions' },
				_react2.default.createElement(_timeline.Timeline, {
					currentUserEmail: currentUserEmail,
					currentUserGroup: currentUserGroup,
					isCurrentUser: isCurrentUser,
					isExternalUrl: isExternalUrl,
					timeline: timeline,
					translate: translate,
					twemojiUrl: twemojiUrl
				}),
				_react2.default.createElement(_notices.Notices, {
					chatStatus: chatStatus,
					connectionStatus: connectionStatus,
					isServerReachable: isServerReachable,
					translate: translate
				}),
				_react2.default.createElement(_composer.Composer, {
					disabled: disabled,
					message: message,
					onSendMessage: onSendMessage,
					onSendNotTyping: onSendNotTyping,
					onSendTyping: onSendTyping,
					onSetCurrentMessage: onSetCurrentMessage,
					translate: translate
				})
			);
		}
	}]);

	return HappychatForm;
}(_react.Component);

HappychatForm.propTypes = {
	chatStatus: _propTypes2.default.string,
	connectionStatus: _propTypes2.default.string,
	currentUserEmail: _propTypes2.default.string,
	currentUserGroup: _propTypes2.default.string,
	disabled: _propTypes2.default.bool,
	isCurrentUser: _propTypes2.default.func,
	isExternalUrl: _propTypes2.default.func,
	isServerReachable: _propTypes2.default.bool,
	message: _propTypes2.default.string,
	onSendMessage: _propTypes2.default.func,
	onSendNotTyping: _propTypes2.default.func,
	onSendTyping: _propTypes2.default.func,
	onSetCurrentMessage: _propTypes2.default.func,
	setBlurred: _propTypes2.default.func,
	setFocused: _propTypes2.default.func,
	timeline: _propTypes2.default.array,
	translate: _propTypes2.default.func,
	twemojiUrl: _propTypes2.default.string
};