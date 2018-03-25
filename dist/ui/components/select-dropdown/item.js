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

var _count = require('../count');

var _count2 = _interopRequireDefault(_count);

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


var SelectDropdownItem = function (_Component) {
	_inherits(SelectDropdownItem, _Component);

	function SelectDropdownItem() {
		_classCallCheck(this, SelectDropdownItem);

		return _possibleConstructorReturn(this, (SelectDropdownItem.__proto__ || Object.getPrototypeOf(SelectDropdownItem)).apply(this, arguments));
	}

	_createClass(SelectDropdownItem, [{
		key: 'render',
		value: function render() {
			var optionClassName = (0, _classnames2.default)(this.props.className, {
				'select-dropdown__item': true,
				'is-selected': this.props.selected,
				'is-disabled': this.props.disabled,
				'has-icon': !!this.props.icon
			});

			return _react2.default.createElement(
				'li',
				{ className: 'select-dropdown__option' },
				_react2.default.createElement(
					'a',
					{
						ref: 'itemLink',
						href: this.props.path,
						className: optionClassName,
						onClick: this.props.disabled ? null : this.props.onClick,
						'data-bold-text': this.props.value || this.props.children,
						role: 'menuitem',
						tabIndex: this.props.isDropdownOpen ? 0 : '',
						'aria-selected': this.props.selected,
						'data-e2e-title': this.props.e2eTitle
					},
					_react2.default.createElement(
						'span',
						{ className: 'select-dropdown__item-text' },
						this.props.icon ? this.props.icon : null,
						this.props.children
					),
					'number' === typeof this.props.count && _react2.default.createElement(
						'span',
						{ 'data-text': this.props.count, className: 'select-dropdown__item-count' },
						_react2.default.createElement(_count2.default, { count: this.props.count })
					)
				)
			);
		}
	}]);

	return SelectDropdownItem;
}(_react.Component);

SelectDropdownItem.propTypes = {
	children: _propTypes2.default.string.isRequired,
	path: _propTypes2.default.string,
	isDropdownOpen: _propTypes2.default.bool,
	selected: _propTypes2.default.bool,
	onClick: _propTypes2.default.func,
	count: _propTypes2.default.number,
	disabled: _propTypes2.default.bool,
	icon: _propTypes2.default.element
};
SelectDropdownItem.defaultProps = {
	isDropdownOpen: false,
	selected: false
};
exports.default = SelectDropdownItem;