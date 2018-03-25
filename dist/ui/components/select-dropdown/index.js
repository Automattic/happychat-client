'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _result = require('lodash/result');

var _result2 = _interopRequireDefault(_result);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _count = require('../count');

var _count2 = _interopRequireDefault(_count);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _separator = require('./separator');

var _separator2 = _interopRequireDefault(_separator);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

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
 * SelectDropdown
 */
var SelectDropdown = function (_Component) {
	_inherits(SelectDropdown, _Component);

	function SelectDropdown(props) {
		_classCallCheck(this, SelectDropdown);

		// bounds
		var _this = _possibleConstructorReturn(this, (SelectDropdown.__proto__ || Object.getPrototypeOf(SelectDropdown)).call(this, props));

		_this.navigateItem = _this.navigateItem.bind(_this);
		_this.toggleDropdown = _this.toggleDropdown.bind(_this);
		_this.handleOutsideClick = _this.handleOutsideClick.bind(_this);

		// state
		var initialState = { isOpen: false };

		if (props.options.length) {
			initialState.selected = _this.getInitialSelectedItem(props);
		}

		_this.state = initialState;
		return _this;
	}

	_createClass(SelectDropdown, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setState({
				instanceId: ++SelectDropdown.instances
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.state.isOpen) {
				this.closeDropdown();
			}

			if (typeof this.state.selected !== 'undefined' && this.props.initialSelected !== nextProps.initialSelected) {
				this.setState({ selected: nextProps.initialSelected });
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('click', this.handleOutsideClick);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (this.state.isOpen) {
				window.addEventListener('click', this.handleOutsideClick);
			} else {
				window.removeEventListener('click', this.handleOutsideClick);
			}

			if (this.state.isOpen !== prevState.isOpen) {
				this.props.onToggle({
					target: this,
					open: this.state.isOpen
				});
			}
		}
	}, {
		key: 'getInitialSelectedItem',
		value: function getInitialSelectedItem(props) {
			props = props || this.props;

			if (props.initialSelected) {
				return props.initialSelected;
			}

			if (!props.options.length) {
				return;
			}

			var selectedItem = (0, _find2.default)(props.options, function (value) {
				return !value.isLabel;
			});
			return selectedItem && selectedItem.value;
		}
	}, {
		key: 'getSelectedText',
		value: function getSelectedText() {
			var _props = this.props,
			    options = _props.options,
			    selectedText = _props.selectedText;
			var selected = this.state.selected;


			if (selectedText) {
				return selectedText;
			}

			// return currently selected text
			var selectedValue = selected || this.getInitialSelectedItem(this.props);
			return (0, _result2.default)((0, _find2.default)(options, { value: selectedValue }), 'label');
		}
	}, {
		key: 'getSelectedIcon',
		value: function getSelectedIcon() {
			var _props2 = this.props,
			    options = _props2.options,
			    selectedIcon = _props2.selectedIcon;
			var selected = this.state.selected;


			if (selectedIcon) {
				return selectedIcon;
			}

			// return currently selected icon
			var selectedValue = selected || this.getInitialSelectedItem(this.props);
			return (0, _result2.default)((0, _find2.default)(options, { value: selectedValue }), 'icon');
		}
	}, {
		key: 'dropdownOptions',
		value: function dropdownOptions() {
			var refIndex = 0;
			var self = this;

			if (this.props.children) {
				// add keys and refs to children
				return _react2.default.Children.map(this.props.children, function (child, index) {
					if (!child) {
						return null;
					}

					var newChild = _react2.default.cloneElement(child, {
						ref: child.type === _item2.default ? 'item-' + refIndex : null,
						key: 'item-' + index,
						isDropdownOpen: this.state.isOpen,
						onClick: function onClick(event) {
							self.refs.dropdownContainer.focus();
							if (typeof child.props.onClick === 'function') {
								child.props.onClick(event);
							}
						}
					});

					if (child.type === _item2.default) {
						refIndex++;
					}

					return newChild;
				}, this);
			}

			return this.props.options.map(function (item, index) {
				if (!item) {
					return _react2.default.createElement(_separator2.default, { key: 'dropdown-separator-' + this.state.instanceId + '-' + index });
				}

				if (item.isLabel) {
					return _react2.default.createElement(
						_label2.default,
						{ key: 'dropdown-label-' + this.state.instanceId + '-' + index },
						item.label
					);
				}

				var dropdownItem = _react2.default.createElement(
					_item2.default,
					{
						key: 'dropdown-item-' + this.state.instanceId + '-' + item.value,
						ref: 'item-' + refIndex,
						isDropdownOpen: this.state.isOpen,
						selected: this.state.selected === item.value,
						onClick: this.onSelectItem(item),
						path: item.path,
						icon: item.icon
					},
					item.label
				);

				refIndex++;

				return dropdownItem;
			}, this);
		}
	}, {
		key: 'render',
		value: function render() {
			var dropdownClassName = (0, _classnames2.default)(this.props.className, {
				'select-dropdown': true,
				'is-compact': this.props.compact,
				'is-open': this.state.isOpen,
				'has-count': 'number' === typeof this.props.selectedCount
			});

			var selectedText = this.getSelectedText();
			var selectedIcon = this.getSelectedIcon();

			return _react2.default.createElement(
				'div',
				{ style: this.props.style, className: dropdownClassName },
				_react2.default.createElement(
					'div',
					{
						ref: 'dropdownContainer',
						className: 'select-dropdown__container',
						onKeyDown: this.navigateItem,
						tabIndex: this.props.tabIndex || 0,
						'aria-haspopup': 'true',
						'aria-owns': 'select-submenu-' + this.state.instanceId,
						'aria-controls': 'select-submenu-' + this.state.instanceId,
						'aria-expanded': this.state.isOpen,
						'data-tip-target': this.props.tipTarget,
						onClick: this.toggleDropdown
					},
					_react2.default.createElement(
						'div',
						{
							id: 'select-dropdown-' + this.state.instanceId,
							className: 'select-dropdown__header'
						},
						_react2.default.createElement(
							'span',
							{ className: 'select-dropdown__header-text' },
							selectedIcon ? selectedIcon : null,
							selectedText
						),
						'number' === typeof this.props.selectedCount && _react2.default.createElement(_count2.default, { count: this.props.selectedCount })
					),
					_react2.default.createElement(
						'ul',
						{
							id: 'select-submenu-' + this.state.instanceId,
							className: 'select-dropdown__options',
							role: 'menu',
							'aria-labelledby': 'select-dropdown-' + this.state.instanceId,
							'aria-expanded': this.state.isOpen
						},
						this.dropdownOptions()
					)
				)
			);
		}
	}, {
		key: 'toggleDropdown',
		value: function toggleDropdown() {
			this.setState({
				isOpen: !this.state.isOpen
			});
		}
	}, {
		key: 'openDropdown',
		value: function openDropdown() {
			this.setState({
				isOpen: true
			});
		}
	}, {
		key: 'closeDropdown',
		value: function closeDropdown() {
			if (this.state.isOpen) {
				delete this.focused;
				this.setState({
					isOpen: false
				});
			}
		}
	}, {
		key: 'onSelectItem',
		value: function onSelectItem(option) {
			return this.selectItem.bind(this, option);
		}
	}, {
		key: 'selectItem',
		value: function selectItem(option) {
			if (!option) {
				return;
			}

			if (this.props.onSelect) {
				this.props.onSelect(option);
			}

			this.setState({
				selected: option.value
			});

			this.refs.dropdownContainer.focus();
		}
	}, {
		key: 'navigateItem',
		value: function navigateItem(event) {
			switch (event.keyCode) {
				case 9:
					//tab
					this.navigateItemByTabKey(event);
					break;
				case 32: // space
				case 13:
					// enter
					event.preventDefault();
					this.activateItem();
					break;
				case 38:
					// up arrow
					event.preventDefault();
					this.focusSibling('previous');
					this.openDropdown();
					break;
				case 40:
					// down arrow
					event.preventDefault();
					this.focusSibling('next');
					this.openDropdown();
					break;
				case 27:
					// escape
					event.preventDefault();
					this.closeDropdown();
					this.refs.dropdownContainer.focus();
					break;
			}
		}
	}, {
		key: 'navigateItemByTabKey',
		value: function navigateItemByTabKey(event) {
			if (!this.state.isOpen) {
				return;
			}

			event.preventDefault();

			var direction = event.shiftKey ? 'previous' : 'next';
			this.focusSibling(direction);
		}
	}, {
		key: 'activateItem',
		value: function activateItem() {
			if (!this.state.isOpen) {
				return this.openDropdown();
			}
			document.activeElement.click();
		}
	}, {
		key: 'focusSibling',
		value: function focusSibling(direction) {
			// the initial up-arrow/down-arrow should only open the menu
			if (!this.state.isOpen) {
				return;
			}

			var items = void 0,
			    focusedIndex = void 0;

			if (this.props.options.length) {
				items = (0, _map2.default)((0, _filter2.default)(this.props.options, function (item) {
					return item && !item.isLabel;
				}), 'value');

				focusedIndex = typeof this.focused === 'number' ? this.focused : items.indexOf(this.state.selected);
			} else {
				items = (0, _filter2.default)(this.props.children, function (item) {
					return item.type === _item2.default;
				});

				focusedIndex = typeof this.focused === 'number' ? this.focused : (0, _findIndex2.default)(items, function (item) {
					return item.props.selected;
				});
			}

			var increment = direction === 'previous' ? -1 : 1;
			var newIndex = focusedIndex + increment;

			if (newIndex >= items.length || newIndex < 0) {
				return;
			}

			_reactDom2.default.findDOMNode(this.refs['item-' + newIndex].refs.itemLink).focus();
			this.focused = newIndex;
		}
	}, {
		key: 'handleOutsideClick',
		value: function handleOutsideClick(event) {
			if (!_reactDom2.default.findDOMNode(this.refs.dropdownContainer).contains(event.target)) {
				this.closeDropdown();
			}
		}
	}]);

	return SelectDropdown;
}(_react.Component);

SelectDropdown.propTypes = {
	selectedText: _propTypes2.default.string,
	selectedIcon: _propTypes2.default.element,
	selectedCount: _propTypes2.default.number,
	initialSelected: _propTypes2.default.string,
	className: _propTypes2.default.string,
	style: _propTypes2.default.object,
	onSelect: _propTypes2.default.func,
	onToggle: _propTypes2.default.func,
	focusSibling: _propTypes2.default.func,
	tabIndex: _propTypes2.default.number,
	options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		value: _propTypes2.default.string.isRequired,
		label: _propTypes2.default.string.isRequired,
		path: _propTypes2.default.string,
		icon: _propTypes2.default.element
	}))
};
SelectDropdown.defaultProps = {
	options: [],
	onSelect: function onSelect() {},
	onToggle: function onToggle() {},
	style: {}
};
SelectDropdown.instances = 0;
exports.default = SelectDropdown;