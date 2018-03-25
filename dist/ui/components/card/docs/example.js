'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('components/card');

var _card2 = _interopRequireDefault(_card);

var _compact = require('components/card/compact');

var _compact2 = _interopRequireDefault(_compact);

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


var Cards = function (_React$Component) {
	_inherits(Cards, _React$Component);

	function Cards() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Cards);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cards.__proto__ || Object.getPrototypeOf(Cards)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			compactCards: false
		}, _this.renderCards = function () {
			if (!_this.state.compactCards) {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_card2.default,
						null,
						'I am a Card.'
					),
					_react2.default.createElement(
						_card2.default,
						null,
						'I am another Card.'
					),
					_react2.default.createElement(
						_card2.default,
						{ className: 'awesome sauce' },
						'I am a third Card with custom classes!'
					),
					_react2.default.createElement(
						_card2.default,
						{ href: '#cards' },
						'I am a linkable Card'
					),
					_react2.default.createElement(
						_card2.default,
						{ href: '#cards', target: '_blank', rel: 'noopener noreferrer' },
						'I am a externally linked Card'
					),
					_react2.default.createElement(
						_card2.default,
						{ highlight: 'info' },
						'I am a Card, highlighted as info'
					),
					_react2.default.createElement(
						_card2.default,
						{ highlight: 'success' },
						'I am a Card, highlighted as success'
					),
					_react2.default.createElement(
						_card2.default,
						{ highlight: 'error' },
						'I am a Card, highlighted as error'
					),
					_react2.default.createElement(
						_card2.default,
						{ highlight: 'warning' },
						'I am a Card, highlighted as warning'
					)
				);
			} else {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_compact2.default,
						null,
						'I am a CompactCard.'
					),
					_react2.default.createElement(
						_compact2.default,
						null,
						'I am another CompactCard.'
					),
					_react2.default.createElement(
						_compact2.default,
						{ className: 'awesome sauce' },
						'I am a third CompactCard with custom classes!'
					),
					_react2.default.createElement(
						_compact2.default,
						{ href: '#cards' },
						'I am a linkable CompactCard'
					),
					_react2.default.createElement(
						_compact2.default,
						{ href: '#cards', target: '_blank', rel: 'noopener noreferrer' },
						'I am a externally linked CompactCard'
					),
					_react2.default.createElement(
						_compact2.default,
						{ highlight: 'info' },
						'I am a CompactCard, highlighted as info'
					),
					_react2.default.createElement(
						_compact2.default,
						{ highlight: 'success' },
						'I am a CompactCard, highlighted as success'
					),
					_react2.default.createElement(
						_compact2.default,
						{ highlight: 'error' },
						'I am a CompactCard, highlighted as error'
					),
					_react2.default.createElement(
						_compact2.default,
						{ highlight: 'warning' },
						'I am a CompactCard, highlighted as warning'
					)
				);
			}
		}, _this.toggleCards = function () {
			_this.setState({ compactCards: !_this.state.compactCards });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Cards, [{
		key: 'render',
		value: function render() {
			var toggleCardsText = this.state.compactCards ? 'Normal Cards' : 'Compact Cards';

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'a',
					{ className: 'docs__design-toggle button', onClick: this.toggleCards },
					toggleCardsText
				),
				this.renderCards()
			);
		}
	}]);

	return Cards;
}(_react2.default.Component);

Cards.displayName = 'Cards';
exports.default = Cards;