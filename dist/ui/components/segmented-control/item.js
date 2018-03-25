'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

/**
 * External dependencies
 */

/**
 * SegmentedControlItem
 */
var SegmentedControlItem = function (_React$Component) {
	_inherits(SegmentedControlItem, _React$Component);

	function SegmentedControlItem() {
		_classCallCheck(this, SegmentedControlItem);

		return _possibleConstructorReturn(this, (SegmentedControlItem.__proto__ || Object.getPrototypeOf(SegmentedControlItem)).apply(this, arguments));
	}

	_createClass(SegmentedControlItem, [{
		key: 'render',
		value: function render() {
			var itemClassName = (0, _classnames2.default)({
				'segmented-control__item': true,
				'is-selected': this.props.selected
			});

			var linkClassName = (0, _classnames2.default)('segmented-control__link', _defineProperty({}, 'item-index-' + this.props.index, this.props.index != null));

			return _react2.default.createElement(
				'li',
				{ className: itemClassName },
				_react2.default.createElement(
					'a',
					{
						href: this.props.path,
						className: linkClassName,
						ref: 'itemLink',
						onClick: this.props.onClick,
						title: this.props.title,
						'data-e2e-value': this.props.value,
						role: 'radio',
						tabIndex: 0,
						'aria-selected': this.props.selected
					},
					_react2.default.createElement(
						'span',
						{ className: 'segmented-control__text' },
						this.props.children
					)
				)
			);
		}
	}]);

	return SegmentedControlItem;
}(_react2.default.Component);

SegmentedControlItem.propTypes = {
	children: _propTypes2.default.node.isRequired,
	path: _propTypes2.default.string,
	selected: _propTypes2.default.bool,
	title: _propTypes2.default.string,
	value: _propTypes2.default.string,
	onClick: _propTypes2.default.func
};
SegmentedControlItem.defaultProps = {
	selected: false
};
exports.default = SegmentedControlItem;