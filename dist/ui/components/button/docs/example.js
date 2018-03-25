'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _camera = require('gridicons/dist/camera');

var _camera2 = _interopRequireDefault(_camera);

var _cart = require('gridicons/dist/cart');

var _cart2 = _interopRequireDefault(_cart);

var _cross = require('gridicons/dist/cross');

var _cross2 = _interopRequireDefault(_cross);

var _globe = require('gridicons/dist/globe');

var _globe2 = _interopRequireDefault(_globe);

var _heart = require('gridicons/dist/heart');

var _heart2 = _interopRequireDefault(_heart);

var _linkBreak = require('gridicons/dist/link-break');

var _linkBreak2 = _interopRequireDefault(_linkBreak);

var _pencil = require('gridicons/dist/pencil');

var _pencil2 = _interopRequireDefault(_pencil);

var _plugins = require('gridicons/dist/plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _time = require('gridicons/dist/time');

var _time2 = _interopRequireDefault(_time);

var _trash = require('gridicons/dist/trash');

var _trash2 = _interopRequireDefault(_trash);

var _userCircle = require('gridicons/dist/user-circle');

var _userCircle2 = _interopRequireDefault(_userCircle);

var _button = require('components/button');

var _button2 = _interopRequireDefault(_button);

var _card = require('components/card');

var _card2 = _interopRequireDefault(_card);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _docsExample = require('devdocs/docs-example');

var _docsExample2 = _interopRequireDefault(_docsExample);

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


var Buttons = function (_React$PureComponent) {
	_inherits(Buttons, _React$PureComponent);

	function Buttons() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Buttons);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Buttons.__proto__ || Object.getPrototypeOf(Buttons)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			compactButtons: false
		}, _this.renderDocsExample = function (toggleText) {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'a',
					{ className: 'docs__design-toggle button', onClick: _this.toggleButtons },
					toggleText
				),
				_this.renderButtons(toggleText)
			);
		}, _this.renderDocsExampleWithUsageStats = function (toggleText) {
			return _react2.default.createElement(
				_docsExample2.default,
				{
					componentUsageStats: _this.props.componentUsageStats,
					toggleHandler: _this.toggleButtons,
					toggleText: toggleText
				},
				_this.renderButtons()
			);
		}, _this.renderButtons = function () {
			if (!_this.state.compactButtons) {
				return _react2.default.createElement(
					_card2.default,
					null,
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							null,
							'Button'
						),
						_react2.default.createElement(
							_button2.default,
							null,
							_react2.default.createElement(_heart2.default, null),
							' Icon button'
						),
						_react2.default.createElement(
							_button2.default,
							null,
							_react2.default.createElement(_plugins2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ disabled: true },
							'Disabled button'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ scary: true },
							'Scary button'
						),
						_react2.default.createElement(
							_button2.default,
							{ scary: true },
							_react2.default.createElement(_globe2.default, null),
							' Scary icon button'
						),
						_react2.default.createElement(
							_button2.default,
							{ scary: true },
							_react2.default.createElement(_pencil2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ scary: true, disabled: true },
							'Scary disabled button'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ primary: true },
							'Primary button'
						),
						_react2.default.createElement(
							_button2.default,
							{ primary: true },
							_react2.default.createElement(_camera2.default, null),
							' Primary icon button'
						),
						_react2.default.createElement(
							_button2.default,
							{ primary: true },
							_react2.default.createElement(_time2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ primary: true, disabled: true },
							'Primary disabled button'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ primary: true, scary: true },
							'Primary scary button'
						),
						_react2.default.createElement(
							_button2.default,
							{ primary: true, scary: true },
							_react2.default.createElement(_userCircle2.default, null),
							' Primary scary icon button'
						),
						_react2.default.createElement(
							_button2.default,
							{ primary: true, scary: true },
							_react2.default.createElement(_cart2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ primary: true, scary: true, disabled: true },
							'Primary scary disabled button'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ borderless: true },
							_react2.default.createElement(_cross2.default, null),
							' Remove'
						),
						_react2.default.createElement(
							_button2.default,
							{ borderless: true },
							_react2.default.createElement(_trash2.default, null),
							' Trash'
						),
						_react2.default.createElement(
							_button2.default,
							{ borderless: true },
							_react2.default.createElement(_linkBreak2.default, null),
							' Disconnect'
						),
						_react2.default.createElement(
							_button2.default,
							{ borderless: true },
							_react2.default.createElement(_trash2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ borderless: true, disabled: true },
							_react2.default.createElement(_cross2.default, null),
							' Remove'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ borderless: true, scary: true },
							_react2.default.createElement(_cross2.default, null),
							' Remove'
						),
						_react2.default.createElement(
							_button2.default,
							{ borderless: true, scary: true },
							_react2.default.createElement(_trash2.default, null),
							' Trash'
						),
						_react2.default.createElement(
							_button2.default,
							{ borderless: true, scary: true },
							_react2.default.createElement(_linkBreak2.default, null),
							' Disconnect'
						),
						_react2.default.createElement(
							_button2.default,
							{ borderless: true, scary: true },
							_react2.default.createElement(_trash2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ borderless: true, scary: true, disabled: true },
							_react2.default.createElement(_cross2.default, null),
							' Remove'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ busy: true },
							'Busy button'
						),
						_react2.default.createElement(
							_button2.default,
							{ primary: true, busy: true },
							_react2.default.createElement(_camera2.default, null),
							' Primary icon button'
						),
						_react2.default.createElement(
							_button2.default,
							{ primary: true, busy: true },
							_react2.default.createElement(_time2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ primary: true, busy: true },
							'Primary busy button'
						)
					)
				);
			} else {
				return _react2.default.createElement(
					_card2.default,
					null,
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ compact: true },
							'Compact button'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true },
							_react2.default.createElement(_heart2.default, null),
							' Compact icon button'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true },
							_react2.default.createElement(_plugins2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, disabled: true },
							'Compact disabled button'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ compact: true, scary: true },
							'Compact scary button'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, scary: true },
							_react2.default.createElement(_globe2.default, null),
							' Compact scary icon button'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, scary: true },
							_react2.default.createElement(_pencil2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, scary: true, disabled: true },
							'Compact scary disabled button'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true },
							'Compact primary button'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true },
							_react2.default.createElement(_camera2.default, null),
							' Compact primary icon button'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true },
							_react2.default.createElement(_time2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true, disabled: true },
							'Compact primary disabled button'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true, scary: true },
							'Compact primary scary button'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true, scary: true },
							_react2.default.createElement(_userCircle2.default, null),
							' Compact primary scary icon button'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true, scary: true },
							_react2.default.createElement(_cart2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true, scary: true, disabled: true },
							'Compact primary scary disabled button'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ compact: true, borderless: true },
							_react2.default.createElement(_cross2.default, null),
							' Remove'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, borderless: true },
							_react2.default.createElement(_trash2.default, null),
							' Trash'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, borderless: true },
							_react2.default.createElement(_linkBreak2.default, null),
							' Disconnect'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, borderless: true },
							_react2.default.createElement(_trash2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, borderless: true, disabled: true },
							_react2.default.createElement(_cross2.default, null),
							' Remove'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ compact: true, borderless: true, scary: true },
							_react2.default.createElement(_cross2.default, null),
							' Remove'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, borderless: true, scary: true },
							_react2.default.createElement(_trash2.default, null),
							' Trash'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, borderless: true, scary: true },
							_react2.default.createElement(_linkBreak2.default, null),
							' Disconnect'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, borderless: true, scary: true },
							_react2.default.createElement(_trash2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, borderless: true, scary: true, disabled: true },
							_react2.default.createElement(_cross2.default, null),
							' Remove'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'docs__design-button-row' },
						_react2.default.createElement(
							_button2.default,
							{ compact: true, busy: true },
							'Busy button'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true, busy: true },
							_react2.default.createElement(_camera2.default, null),
							' Primary icon button'
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true, busy: true },
							_react2.default.createElement(_time2.default, null)
						),
						_react2.default.createElement(
							_button2.default,
							{ compact: true, primary: true, busy: true },
							'Primary busy button'
						)
					)
				);
			}
		}, _this.toggleButtons = function () {
			_this.setState({ compactButtons: !_this.state.compactButtons });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Buttons, [{
		key: 'render',
		value: function render() {
			var toggleText = this.state.compactButtons ? 'Normal Buttons' : 'Compact Buttons';
			return _config2.default.isEnabled('devdocs/components-usage-stats') ? this.renderDocsExampleWithUsageStats(toggleText) : this.renderDocsExample(toggleText);
		}
	}]);

	return Buttons;
}(_react2.default.PureComponent);

Buttons.displayName = 'Buttons';
exports.default = Buttons;