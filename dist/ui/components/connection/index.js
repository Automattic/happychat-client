'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HappychatConnection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

/**
 * External dependencies
 */


var HappychatConnection = exports.HappychatConnection = function (_Component) {
	_inherits(HappychatConnection, _Component);

	function HappychatConnection() {
		_classCallCheck(this, HappychatConnection);

		return _possibleConstructorReturn(this, (HappychatConnection.__proto__ || Object.getPrototypeOf(HappychatConnection)).apply(this, arguments));
	}

	_createClass(HappychatConnection, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.isHappychatEnabled && this.props.isConnectionUninitialized) {
				this.props.onInitConnection(this.props.getAuth(this.props.accessToken));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return HappychatConnection;
}(_react.Component);

HappychatConnection.propTypes = {
	accessToken: _propTypes2.default.string,
	getAuth: _propTypes2.default.func,
	isConnectionUninitialized: _propTypes2.default.bool,
	isHappychatEnabled: _propTypes2.default.bool,
	onInitConnection: _propTypes2.default.func
};