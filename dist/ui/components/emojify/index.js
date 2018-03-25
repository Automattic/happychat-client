'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _twemoji = require('twemoji');

var _twemoji2 = _interopRequireDefault(_twemoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

/**
 * External dependencies
 */


var Emojify = function (_PureComponent) {
	_inherits(Emojify, _PureComponent);

	function Emojify(props) {
		_classCallCheck(this, Emojify);

		var _this = _possibleConstructorReturn(this, (Emojify.__proto__ || Object.getPrototypeOf(Emojify)).call(this, props));

		_this.parseEmoji = function () {
			var _this$props = _this.props,
			    imgClassName = _this$props.imgClassName,
			    twemojiUrl = _this$props.twemojiUrl;


			_twemoji2.default.parse(_this.emojified, {
				base: twemojiUrl,
				size: '72x72',
				className: imgClassName,
				callback: function callback(icon, options) {
					var ignored = ['a9', 'ae', '2122', '2194', '2660', '2663', '2665', '2666'];

					if (-1 !== ignored.indexOf(icon)) {
						return false;
					}

					return ''.concat(options.base, options.size, '/', icon, options.ext);
				}
			});
		};

		_this.setRef = _this.setRef.bind(_this);
		return _this;
	}

	_createClass(Emojify, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.parseEmoji();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.parseEmoji();
		}
	}, {
		key: 'setRef',
		value: function setRef(component) {
			this.emojified = component;
		}
	}, {
		key: 'render',
		value: function render() {
			// We want other props to content everything but children, className, imgClassName, and twemojiUrl.
			// We can't delete imgClassName and twemojiUrl despite they not being used here.
			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    imgClassName = _props.imgClassName,
			    twemojiUrl = _props.twemojiUrl,
			    other = _objectWithoutProperties(_props, ['children', 'className', 'imgClassName', 'twemojiUrl']); // eslint-disable-line no-unused-vars

			var classes = (0, _classnames2.default)(className, 'emojify');

			return _react2.default.createElement(
				'div',
				_extends({ className: classes, ref: this.setRef }, other),
				children
			);
		}
	}]);

	return Emojify;
}(_react.PureComponent);

Emojify.propTypes = {
	imgClassName: _propTypes2.default.string,
	twemojiUrl: _propTypes2.default.string
};
Emojify.defaultProps = {
	imgClassName: 'emojify__emoji'
};
exports.default = Emojify;