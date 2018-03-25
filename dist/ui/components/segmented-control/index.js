'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

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
 * Internal variables
 */
var _instance = 1;

/**
 * SegmentedControl
 */

var SegmentedControl = function (_React$Component) {
	_inherits(SegmentedControl, _React$Component);

	function SegmentedControl(props) {
		_classCallCheck(this, SegmentedControl);

		var _this = _possibleConstructorReturn(this, (SegmentedControl.__proto__ || Object.getPrototypeOf(SegmentedControl)).call(this, props));

		_this.getSegmentedItems = function () {
			var refIndex = 0;
			if (_this.props.children) {
				// add keys and refs to children
				return _react2.default.Children.map(_this.props.children, function (child, index) {
					var newChild = _react2.default.cloneElement(child, {
						ref: child.type === _item2.default ? 'item-' + refIndex : null,
						key: 'item-' + index,
						onClick: function (event) {
							this.setKeyboardNavigation(false);

							if (typeof child.props.onClick === 'function') {
								child.props.onClick(event);
							}
						}.bind(this)
					});

					if (child.type === _item2.default) {
						refIndex++;
					}

					return newChild;
				}, _this);
			}

			return _this.props.options.map(function (item, index) {
				return _react2.default.createElement(
					_item2.default,
					{
						key: 'segmented-control-' + this.id + '-' + item.value,
						ref: 'item-' + index,
						selected: this.state.selected === item.value,
						onClick: this.selectItem.bind(this, item),
						path: item.path,
						index: index,
						value: item.value
					},
					item.label
				);
			}, _this);
		};

		_this.selectItem = function (option) {
			if (!option) {
				return;
			}

			if (_this.props.onSelect) {
				_this.props.onSelect(option);
			}

			_this.setState({
				selected: option.value,
				keyboardNavigation: false
			});
		};

		_this.setKeyboardNavigation = function (value) {
			_this.setState({
				keyboardNavigation: value
			});
		};

		_this.navigateItem = function (event) {
			switch (event.keyCode) {
				case 9:
					// tab
					_this.navigateItemByTabKey(event);
					break;
				case 32: // space
				case 13:
					// enter
					event.preventDefault();
					document.activeElement.click();
					break;
				case 37:
					// left arrow
					event.preventDefault();
					_this.focusSibling('previous');
					break;
				case 39:
					// right arrow
					event.preventDefault();
					_this.focusSibling('next');
					break;
			}
		};

		_this.navigateItemByTabKey = function (event) {
			var direction = event.shiftKey ? 'previous' : 'next',
			    newIndex = _this.focusSibling(direction);

			// allow tabbing out of control
			if (newIndex !== false) {
				event.preventDefault();
			}
		};

		_this.focusSibling = function (direction) {
			var increment, items, newIndex;

			if (_this.props.options) {
				items = (0, _filter2.default)((0, _map2.default)(_this.props.options, 'value'), Boolean);
			} else {
				items = (0, _filter2.default)(_this.props.children, function (item) {
					return item.type === _item2.default;
				});
			}

			if (typeof _this.focused !== 'number') {
				_this.focused = _this.getCurrentFocusedIndex();
			}

			increment = direction === 'previous' ? -1 : 1;
			newIndex = _this.focused + increment;
			if (newIndex >= items.length || newIndex < 0) {
				return false;
			}

			_reactDom2.default.findDOMNode(_this.refs['item-' + newIndex].refs.itemLink).focus();
			_this.focused = newIndex;

			return newIndex;
		};

		_this.getCurrentFocusedIndex = function () {
			// item is the <li> element containing the focused link
			var activeItem = document.activeElement.parentNode,
			    siblings = Array.prototype.slice(activeItem.parentNode.children),
			    index = siblings.indexOf(activeItem);

			return index > -1 ? index : 0;
		};

		var initialSelected;

		if (props.options) {
			initialSelected = props.initialSelected || props.options[0].value;
		}

		_this.state = {
			selected: initialSelected,
			keyboardNavigation: false
		};
		return _this;
	}

	_createClass(SegmentedControl, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.id = _instance;
			_instance++;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('keydown', this.navigateItem);
		}
	}, {
		key: 'render',
		value: function render() {
			var segmentedClasses = {
				'segmented-control': true,
				'keyboard-navigation': this.state.keyboardNavigation,
				'is-compact': this.props.compact,
				'is-primary': this.props.primary
			};

			if (this.props.className) {
				this.props.className.split(' ').forEach(function (className) {
					segmentedClasses[className] = true;
				});
			}

			return _react2.default.createElement(
				'ul',
				{
					className: (0, _classnames2.default)(segmentedClasses),
					style: this.props.style,
					role: 'radiogroup',
					onKeyDown: this.navigateItem,
					onKeyUp: this.setKeyboardNavigation.bind(this, true)
				},
				this.getSegmentedItems()
			);
		}

		/**
   * Allows for keyboard navigation
   * @param  {String} direction - `next` or `previous`
   * @return {Number|Boolean} - returns false if the newIndex is out of bounds
   */

	}]);

	return SegmentedControl;
}(_react2.default.Component);

SegmentedControl.propTypes = {
	initialSelected: _propTypes2.default.string,
	compact: _propTypes2.default.bool,
	className: _propTypes2.default.string,
	style: _propTypes2.default.object,
	onSelect: _propTypes2.default.func,
	options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		value: _propTypes2.default.string.isRequired,
		label: _propTypes2.default.string.isRequired,
		path: _propTypes2.default.string
	}))
};
SegmentedControl.defaultProps = {
	compact: false
};
exports.default = SegmentedControl;