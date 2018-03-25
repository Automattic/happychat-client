'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Notices = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _constants = require('../../../state/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


/*
 * Renders any notices about the chat session to the user
 */
var Notices = exports.Notices = function (_Component) {
	_inherits(Notices, _Component);

	function Notices() {
		_classCallCheck(this, Notices);

		return _possibleConstructorReturn(this, (Notices.__proto__ || Object.getPrototypeOf(Notices)).apply(this, arguments));
	}

	_createClass(Notices, [{
		key: 'statusNotice',
		value: function statusNotice() {
			var _noticeText;

			var _props = this.props,
			    isServerReachable = _props.isServerReachable,
			    connectionStatus = _props.connectionStatus,
			    chatStatus = _props.chatStatus,
			    translate = _props.translate;


			if (!isServerReachable) {
				return translate("We're having trouble connecting to chat. Please check your internet connection while we try to reconnect…");
			}

			switch (connectionStatus) {
				case _constants.HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED:
					return translate('Waiting to connect you with a Happiness Engineer…');
				case _constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTING:
					return translate('Connecting you with a Happiness Engineer…');
				case _constants.HAPPYCHAT_CONNECTION_STATUS_RECONNECTING:
				case _constants.HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED:
					return translate("We're having trouble connecting to chat. Please bear with us while we try to reconnect…");
				case _constants.HAPPYCHAT_CONNECTION_STATUS_UNAUTHORIZED:
					return translate('Chat is not available at the moment. For help, please contact us in {{link}}Support{{/link}}', {
						components: {
							link: _react2.default.createElement('a', { href: 'https://wordpress.com/help/contact' })
						}
					});
			}

			var noticeText = (_noticeText = {}, _defineProperty(_noticeText, _constants.HAPPYCHAT_CHAT_STATUS_ABANDONED, translate("We're having some connection trouble on our end, please bear with us.")), _defineProperty(_noticeText, _constants.HAPPYCHAT_CHAT_STATUS_ASSIGNING, translate('Connecting you with a Happiness Engineer…')), _defineProperty(_noticeText, _constants.HAPPYCHAT_CHAT_STATUS_PENDING, translate("Sorry, we couldn't connect you with a Happiness Engineer. Please check back later.")), _defineProperty(_noticeText, _constants.HAPPYCHAT_CHAT_STATUS_MISSED, translate('Sorry, we missed you! All our Happiness Engineers are currently busy. Please check back later.')), _noticeText);

			return (0, _get2.default)(noticeText, chatStatus, null);
		}
	}, {
		key: 'render',
		value: function render() {
			var noticeText = this.statusNotice();

			if (noticeText == null) {
				return null;
			}

			return _react2.default.createElement(
				'div',
				{ className: 'happychat__notice' },
				noticeText
			);
		}
	}]);

	return Notices;
}(_react.Component);

Notices.propTypes = {
	chatStatus: _propTypes2.default.string,
	connectionStatus: _propTypes2.default.string,
	isServerReachable: _propTypes2.default.bool,
	translate: _propTypes2.default.func
};