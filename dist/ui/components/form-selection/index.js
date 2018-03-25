'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _segmentedControl = require('../segmented-control');

var _segmentedControl2 = _interopRequireDefault(_segmentedControl);

var _item = require('../segmented-control/item');

var _item2 = _interopRequireDefault(_item);

var _selectDropdown = require('../select-dropdown');

var _selectDropdown2 = _interopRequireDefault(_selectDropdown);

var _item3 = require('../select-dropdown/item');

var _item4 = _interopRequireDefault(_item3);

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


var areOptionsDistinct = function areOptionsDistinct(nextOpts, currentOpts) {
	if (nextOpts.length !== currentOpts.length) {
		return true;
	}
	for (var i = 0; i < nextOpts.length; i++) {
		if (nextOpts[i].value !== currentOpts[i].value || nextOpts[i].label !== currentOpts[i].label) {
			return true;
		}
	}
	return false;
};

var FormSelection = function (_React$Component) {
	_inherits(FormSelection, _React$Component);

	function FormSelection(props) {
		_classCallCheck(this, FormSelection);

		var _this = _possibleConstructorReturn(this, (FormSelection.__proto__ || Object.getPrototypeOf(FormSelection)).call(this, props));

		var _this$props = _this.props,
		    optionSelected = _this$props.optionSelected,
		    options = _this$props.options;

		_this.state = { selection: optionSelected || options[0].value };
		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	_createClass(FormSelection, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _props = this.props,
			    options = _props.options,
			    optionSelected = _props.optionSelected;

			if (optionSelected !== nextProps.optionSelected || areOptionsDistinct(nextProps.options, options)) {
				this.setState({
					selection: nextProps.optionSelected || nextProps.options[0].value
				});
			}
		}
	}, {
		key: 'handleClick',
		value: function handleClick(option) {
			var _this2 = this;

			return function () {
				_this2.setState({ selection: option.value });
				_this2.props.onClick({
					name: _this2.props.name,
					option: option
				});
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var options = this.props.options;


			var opts = options.map(function (option) {
				return {
					label: option.label,
					subtext: option.subtext ? _react2.default.createElement(
						'span',
						{ className: 'form-selection__subtext' },
						option.subtext
					) : null,
					props: {
						key: option.value,
						selected: option.value === _this3.state.selection,
						value: option.value,
						title: option.label,
						onClick: _this3.handleClick(option)
					}
				};
			});
			var selectedItem = (0, _find2.default)(opts, 'props.selected');

			return _react2.default.createElement(
				'div',
				{ className: 'form-selection' },
				_react2.default.createElement(
					_segmentedControl2.default,
					{ primary: true },
					opts.map(function (option) {
						return _react2.default.createElement(
							_item2.default,
							option.props,
							option.label,
							option.subtext
						);
					})
				),
				_react2.default.createElement(
					_selectDropdown2.default,
					{ selectedText: selectedItem ? selectedItem.label : 'Select an option' },
					opts.map(function (option) {
						return _react2.default.createElement(
							_item4.default,
							option.props,
							option.label
						);
					})
				)
			);
		}
	}]);

	return FormSelection;
}(_react2.default.Component);

FormSelection.propTypes = {
	options: _propTypes2.default.array.isRequired,
	optionSelected: _propTypes2.default.string,
	onClick: _propTypes2.default.func
};

FormSelection.defaultProps = {
	options: [],
	optionSelected: null,
	onClick: function onClick() {}
};

exports.default = FormSelection;