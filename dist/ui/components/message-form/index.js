'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MessageForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formLabel = require('../form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _compact = require('../card/compact');

var _compact2 = _interopRequireDefault(_compact);

var _card = require('../card');

var _card2 = _interopRequireDefault(_card);

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


var MessageForm = exports.MessageForm = function (_React$Component) {
	_inherits(MessageForm, _React$Component);

	function MessageForm() {
		_classCallCheck(this, MessageForm);

		return _possibleConstructorReturn(this, (MessageForm.__proto__ || Object.getPrototypeOf(MessageForm)).apply(this, arguments));
	}

	_createClass(MessageForm, [{
		key: 'render',
		value: function render() {
			var message = this.props.message;

			return _react2.default.createElement(
				'div',
				{ className: 'message-form' },
				_react2.default.createElement(
					_compact2.default,
					null,
					_react2.default.createElement(
						'p',
						{ className: 'message-form__header-title' },
						'Contact Us'
					)
				),
				_react2.default.createElement(
					_card2.default,
					null,
					_react2.default.createElement(
						_formLabel2.default,
						null,
						message
					)
				)
			);
		}
	}]);

	return MessageForm;
}(_react2.default.Component);

MessageForm.propTypes = {
	message: _propTypes2.default.string
};

MessageForm.defaultProps = {
	message: 'We are having problems to offer support at the moment. Please, bear with us.'
};