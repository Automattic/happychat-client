'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alignImageLeft = require('gridicons/dist/align-image-left');

var _alignImageLeft2 = _interopRequireDefault(_alignImageLeft);

var _selectDropdown = require('components/select-dropdown');

var _selectDropdown2 = _interopRequireDefault(_selectDropdown);

var _item = require('components/select-dropdown/item');

var _item2 = _interopRequireDefault(_item);

var _label = require('components/select-dropdown/label');

var _label2 = _interopRequireDefault(_label);

var _separator = require('components/select-dropdown/separator');

var _separator2 = _interopRequireDefault(_separator);

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


var SelectDropdownExample = function (_React$PureComponent) {
	_inherits(SelectDropdownExample, _React$PureComponent);

	function SelectDropdownExample(props) {
		_classCallCheck(this, SelectDropdownExample);

		var _this = _possibleConstructorReturn(this, (SelectDropdownExample.__proto__ || Object.getPrototypeOf(SelectDropdownExample)).call(this, props));

		_this.toggleButtons = function () {
			_this.setState({ compactButtons: !_this.state.compactButtons });
		};

		_this.getSelectItemHandler = function (name, count, icon) {
			return function (event) {
				event.preventDefault();
				_this.selectItem(name, count, icon);
			};
		};

		_this.selectItem = function (childSelected, count, icon) {
			_this.setState({
				childSelected: childSelected,
				selectedCount: count,
				selectedIcon: icon
			});

			console.log('Select Dropdown Item (selected):', childSelected);
		};

		var initialState = {
			childSelected: 'Published',
			selectedCount: 10,
			compactButtons: false,
			selectedIcon: _react2.default.createElement(_alignImageLeft2.default, { size: 18 })
		};

		_this.state = initialState;
		return _this;
	}

	_createClass(SelectDropdownExample, [{
		key: 'render',
		value: function render() {
			var toggleButtonsText = this.state.compactButtons ? 'Normal Buttons' : 'Compact Buttons';

			return _react2.default.createElement(
				'div',
				{ className: 'docs__select-dropdown-container' },
				_react2.default.createElement(
					'a',
					{ className: 'docs__design-toggle button', onClick: this.toggleButtons },
					toggleButtonsText
				),
				_react2.default.createElement(
					'h3',
					null,
					'Items passed as options prop'
				),
				_react2.default.createElement(_selectDropdown2.default, {
					compact: this.state.compactButtons,
					options: this.props.options,
					onSelect: this.onDropdownSelect
				}),
				_react2.default.createElement(
					'h3',
					{ style: { marginTop: 20 } },
					'Items passed as children'
				),
				_react2.default.createElement(
					_selectDropdown2.default,
					{
						compact: this.state.compactButtons,
						onSelect: this.onDropdownSelect,
						selectedText: this.state.childSelected,
						selectedCount: this.state.selectedCount
					},
					_react2.default.createElement(
						_label2.default,
						null,
						_react2.default.createElement(
							'strong',
							null,
							'Statuses'
						)
					),
					_react2.default.createElement(
						_item2.default,
						{
							count: 10,
							selected: this.state.childSelected === 'Published',
							onClick: this.getSelectItemHandler('Published', 10)
						},
						'Published'
					),
					_react2.default.createElement(
						_item2.default,
						{
							count: 4,
							selected: this.state.childSelected === 'Scheduled',
							onClick: this.getSelectItemHandler('Scheduled', 4)
						},
						'Scheduled'
					),
					_react2.default.createElement(
						_item2.default,
						{
							count: 3343,
							selected: this.state.childSelected === 'Drafts',
							onClick: this.getSelectItemHandler('Drafts', 3343)
						},
						'Drafts'
					),
					_react2.default.createElement(_separator2.default, null),
					_react2.default.createElement(
						_item2.default,
						{
							count: 3,
							selected: this.state.childSelected === 'Trashed',
							onClick: this.getSelectItemHandler('Trashed', 3)
						},
						'Trashed'
					)
				),
				_react2.default.createElement(
					'h3',
					{ style: { marginTop: 20 } },
					'With Icons in Items Passed as Options'
				),
				_react2.default.createElement(_selectDropdown2.default, {
					compact: this.state.compactButtons,
					onSelect: this.onDropdownSelect,
					options: [{
						value: 'published',
						label: 'Published',
						icon: _react2.default.createElement(Gridicon, { icon: 'align-image-left', size: 18 })
					}, {
						value: 'scheduled',
						label: 'Scheduled',
						icon: _react2.default.createElement(Gridicon, { icon: 'calendar', size: 18 })
					}, { value: 'drafts', label: 'Drafts', icon: _react2.default.createElement(Gridicon, { icon: 'create', size: 18 }) }, { value: 'trashed', label: 'Trashed', icon: _react2.default.createElement(Gridicon, { icon: 'trash', size: 18 }) }]
				}),
				_react2.default.createElement(
					'h3',
					{ style: { marginTop: 20 } },
					'With Icons in Items Passed as Children'
				),
				_react2.default.createElement(
					_selectDropdown2.default,
					{
						compact: this.state.compactButtons,
						onSelect: this.onDropdownSelect,
						selectedText: this.state.childSelected,
						selectedIcon: this.state.selectedIcon
					},
					_react2.default.createElement(
						_label2.default,
						null,
						_react2.default.createElement(
							'strong',
							null,
							'Statuses'
						)
					),
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'Published',
							icon: _react2.default.createElement(Gridicon, { icon: 'align-image-left', size: 18 }),
							onClick: this.getSelectItemHandler('Published', 10, _react2.default.createElement(Gridicon, { icon: 'align-image-left', size: 18 }))
						},
						'Published'
					),
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'Scheduled',
							icon: _react2.default.createElement(Gridicon, { icon: 'calendar', size: 18 }),
							onClick: this.getSelectItemHandler('Scheduled', 4, _react2.default.createElement(Gridicon, { icon: 'calendar', size: 18 }))
						},
						'Scheduled'
					),
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'Drafts',
							icon: _react2.default.createElement(Gridicon, { icon: 'create', size: 18 }),
							onClick: this.getSelectItemHandler('Drafts', 3343, _react2.default.createElement(Gridicon, { icon: 'create', size: 18 }))
						},
						'Drafts'
					),
					_react2.default.createElement(_separator2.default, null),
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'Trashed',
							icon: _react2.default.createElement(Gridicon, { icon: 'trash', size: 18 }),
							onClick: this.getSelectItemHandler('Trashed', 3, _react2.default.createElement(Gridicon, { icon: 'trash', size: 18 }))
						},
						'Trashed'
					)
				),
				_react2.default.createElement(
					'h3',
					{ style: { marginTop: 20 } },
					'max-width: 220px;'
				),
				_react2.default.createElement(
					_selectDropdown2.default,
					{
						className: 'select-dropdown-example__fixed-width',
						compact: this.state.compactButtons,
						onSelect: this.onDropdownSelect,
						selectedText: 'Published publish publish publish',
						selectedCount: 10
					},
					_react2.default.createElement(
						_label2.default,
						null,
						_react2.default.createElement(
							'strong',
							null,
							'Statuses'
						)
					),
					_react2.default.createElement(
						_item2.default,
						{ count: 10, selected: true },
						'Published publish publish publish'
					),
					_react2.default.createElement(
						_item2.default,
						{ count: 4 },
						' Scheduled scheduled'
					),
					_react2.default.createElement(
						_item2.default,
						{ count: 3343 },
						'Drafts'
					),
					_react2.default.createElement(
						_item2.default,
						{ disabled: true },
						'Disabled Item'
					),
					_react2.default.createElement(_separator2.default, null),
					_react2.default.createElement(
						_item2.default,
						{ count: 3 },
						'Trashed'
					)
				)
			);
		}
	}, {
		key: 'onDropdownSelect',
		value: function onDropdownSelect(option) {
			console.log('Select Dropdown (selected):', option);
		}
	}]);

	return SelectDropdownExample;
}(_react2.default.PureComponent);

SelectDropdownExample.displayName = 'SelectDropdownExample';
SelectDropdownExample.defaultProps = {
	options: [{ value: 'status-options', label: 'Statuses', isLabel: true }, { value: 'published', label: 'Published', count: 12 }, { value: 'scheduled', label: 'Scheduled' }, { value: 'drafts', label: 'Drafts' }, null, { value: 'trashed', label: 'Trashed' }]
};
exports.default = SelectDropdownExample;