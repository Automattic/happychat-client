'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ContactForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compact = require('../card/compact');

var _compact2 = _interopRequireDefault(_compact);

var _card = require('../card');

var _card2 = _interopRequireDefault(_card);

var _formTextarea = require('../form-textarea');

var _formTextarea2 = _interopRequireDefault(_formTextarea);

var _formTextInput = require('../form-text-input');

var _formTextInput2 = _interopRequireDefault(_formTextInput);

var _formLabel = require('../form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _formButton = require('../form-button');

var _formButton2 = _interopRequireDefault(_formButton);

var _formSelection = require('../form-selection');

var _formSelection2 = _interopRequireDefault(_formSelection);

var _selectDropdown = require('../select-dropdown');

var _selectDropdown2 = _interopRequireDefault(_selectDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


var getSelectedOption = function getSelectedOption(options) {
	return Array.isArray(options) && options.length > 0 ? options[0] : {};
};

var filterByTargetValue = function filterByTargetValue(options, targetValue, filterKey) {
	var allOptions = Array.isArray(options) ? options : [];
	return allOptions.filter(function (option) {
		return !option[filterKey] || Array.isArray(option[filterKey]) && option[filterKey].some(function (value) {
			return targetValue === value;
		});
	});
};

var ContactForm = exports.ContactForm = function (_React$Component) {
	_inherits(ContactForm, _React$Component);

	function ContactForm(props) {
		_classCallCheck(this, ContactForm);

		var _this = _possibleConstructorReturn(this, (ContactForm.__proto__ || Object.getPrototypeOf(ContactForm)).call(this, props));

		var _this$props = _this.props,
		    primaryOptions = _this$props.primaryOptions,
		    primaryOptionsTitle = _this$props.primaryOptionsTitle,
		    secondaryOptions = _this$props.secondaryOptions,
		    secondaryOptionsTitle = _this$props.secondaryOptionsTitle,
		    itemList = _this$props.itemList,
		    itemListTitle = _this$props.itemListTitle;

		var primarySelected = getSelectedOption(primaryOptions);
		var newSecondaryOptions = filterByTargetValue(secondaryOptions, primarySelected.value, 'primary');
		var newSecondarySelected = getSelectedOption(newSecondaryOptions);
		var newItemList = filterByTargetValue(filterByTargetValue(itemList, primarySelected.value, 'primary'), newSecondarySelected.value, 'secondary');
		var newItemSelected = getSelectedOption(newItemList);
		_this.state = {
			subject: '',
			message: '',
			primaryOptionsTitle: primaryOptionsTitle,
			primaryOptions: primaryOptions,
			primarySelected: primarySelected,
			secondaryOptionsTitle: secondaryOptionsTitle,
			secondaryOptions: newSecondaryOptions,
			secondarySelected: newSecondarySelected,
			itemListTitle: itemListTitle,
			itemList: newItemList,
			itemSelected: newItemSelected
		};
		_this.handleChange = _this.handleChange.bind(_this);
		_this.handleItemSelected = _this.handleItemSelected.bind(_this);
		_this.handleOptionChange = _this.handleOptionChange.bind(_this);
		_this.prepareSubmitForm = _this.prepareSubmitForm.bind(_this);
		return _this;
	}

	_createClass(ContactForm, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.primarySelected.canChat !== this.state.primarySelected.canChat || prevState.secondarySelected.canChat !== this.state.secondarySelected.canChat || prevState.itemSelected.canChat !== this.state.itemSelected.canChat) {
				var _state = this.state,
				    primarySelected = _state.primarySelected,
				    secondarySelected = _state.secondarySelected,
				    itemSelected = _state.itemSelected,
				    subject = _state.subject,
				    message = _state.message;

				this.props.onEvent({
					primarySelected: primarySelected,
					secondarySelected: secondarySelected,
					itemSelected: itemSelected,
					subject: subject,
					message: message
				});
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			var _e$currentTarget = e.currentTarget,
			    name = _e$currentTarget.name,
			    value = _e$currentTarget.value;

			this.setState(_defineProperty({}, name, value));
		}
	}, {
		key: 'handleItemSelected',
		value: function handleItemSelected(option) {
			this.setState({ itemSelected: option });
		}
	}, {
		key: 'handleOptionChange',
		value: function handleOptionChange(e) {
			if (e.name === 'primarySelected') {
				var _props = this.props,
				    secondaryOptions = _props.secondaryOptions,
				    itemList = _props.itemList;

				var newPrimarySelected = e.option;
				var newSecondaryOptions = filterByTargetValue(secondaryOptions, newPrimarySelected.value, 'primary');
				var newSecondarySelected = getSelectedOption(newSecondaryOptions);
				var newItemList = filterByTargetValue(filterByTargetValue(itemList, newPrimarySelected.value, 'primary'), newSecondarySelected.value, 'secondary');
				var newItemSelected = getSelectedOption(newItemList);
				this.setState({
					primarySelected: newPrimarySelected,
					secondaryOptions: newSecondaryOptions,
					secondarySelected: newSecondarySelected,
					itemList: newItemList,
					itemSelected: newItemSelected
				});
			} else if (e.name === 'secondarySelected') {
				var _itemList = this.props.itemList;
				var primarySelected = this.state.primarySelected;

				var _newSecondarySelected = e.option;
				var _newItemList = filterByTargetValue(filterByTargetValue(_itemList, primarySelected.value, 'primary'), _newSecondarySelected.value, 'secondary');
				var _newItemSelected = getSelectedOption(_newItemList);
				this.setState({
					secondarySelected: _newSecondarySelected,
					itemList: _newItemList,
					itemSelected: _newItemSelected
				});
			}
		}
	}, {
		key: 'prepareCanSubmitForm',
		value: function prepareCanSubmitForm() {
			var canSubmit = '' !== this.state.message;
			if (this.props.showSubject) {
				canSubmit = canSubmit && '' !== this.state.subject;
			}
			return canSubmit && this.props.canSubmitForm();
		}
	}, {
		key: 'prepareSubmitForm',
		value: function prepareSubmitForm() {
			this.props.submitForm(this.state);
		}
	}, {
		key: 'maybePrimaryOptions',
		value: function maybePrimaryOptions() {
			var _state2 = this.state,
			    primaryOptions = _state2.primaryOptions,
			    primaryOptionsTitle = _state2.primaryOptionsTitle;

			return Array.isArray(primaryOptions) && primaryOptions.length > 0 ? _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_formLabel2.default,
					null,
					primaryOptionsTitle
				),
				_react2.default.createElement(_formSelection2.default, {
					name: 'primarySelected',
					options: primaryOptions,
					onClick: this.handleOptionChange
				})
			) : '';
		}
	}, {
		key: 'maybeSecondaryOptions',
		value: function maybeSecondaryOptions() {
			var _state3 = this.state,
			    secondaryOptions = _state3.secondaryOptions,
			    secondaryOptionsTitle = _state3.secondaryOptionsTitle,
			    secondarySelected = _state3.secondarySelected;

			return Array.isArray(secondaryOptions) && secondaryOptions.length > 0 ? _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_formLabel2.default,
					null,
					secondaryOptionsTitle
				),
				_react2.default.createElement(_formSelection2.default, {
					name: 'secondarySelected',
					optionSelected: secondarySelected.value,
					options: secondaryOptions,
					onClick: this.handleOptionChange
				})
			) : '';
		}
	}, {
		key: 'maybeItemList',
		value: function maybeItemList() {
			var _state4 = this.state,
			    itemList = _state4.itemList,
			    itemListTitle = _state4.itemListTitle,
			    itemSelected = _state4.itemSelected;

			return Array.isArray(itemList) && itemList.length > 0 ? _react2.default.createElement(
				'div',
				{ className: 'contact-form__item-list' },
				_react2.default.createElement(
					_formLabel2.default,
					null,
					itemListTitle
				),
				_react2.default.createElement(_selectDropdown2.default, {
					initialSelected: itemSelected.value,
					options: itemList,
					onSelect: this.handleItemSelected
				})
			) : '';
		}
	}, {
		key: 'maybeSubject',
		value: function maybeSubject() {
			var showSubject = this.props.showSubject;

			return showSubject ? _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_formLabel2.default,
					null,
					'Subject'
				),
				_react2.default.createElement(_formTextInput2.default, { name: 'subject', value: this.state.subject, onChange: this.handleChange })
			) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    formTitle = _props2.formTitle,
			    submitFormText = _props2.submitFormText;


			return _react2.default.createElement(
				'div',
				{ className: 'contact-form' },
				_react2.default.createElement(
					_compact2.default,
					null,
					_react2.default.createElement(
						'p',
						{ className: 'contact-form__header-title' },
						formTitle
					)
				),
				_react2.default.createElement(
					_card2.default,
					null,
					this.maybePrimaryOptions(),
					this.maybeSecondaryOptions(),
					this.maybeItemList(),
					this.maybeSubject(),
					_react2.default.createElement(
						_formLabel2.default,
						null,
						'What are you trying to do?'
					),
					_react2.default.createElement(_formTextarea2.default, {
						placeholder: 'Please be descriptive',
						name: 'message',
						value: this.state.message,
						onChange: this.handleChange
					}),
					_react2.default.createElement(
						_formButton2.default,
						{
							disabled: !this.prepareCanSubmitForm(),
							type: 'button',
							onClick: this.prepareSubmitForm
						},
						submitFormText
					)
				)
			);
		}
	}]);

	return ContactForm;
}(_react2.default.Component);

ContactForm.propTypes = {
	canSubmitForm: _propTypes2.default.func.isRequired,
	formTitle: _propTypes2.default.string,
	primaryOptions: _propTypes2.default.array,
	primaryOptionsTitle: _propTypes2.default.string,
	secondaryOptions: _propTypes2.default.array,
	secondaryOptionsTitle: _propTypes2.default.string,
	itemListTitle: _propTypes2.default.string,
	itemList: _propTypes2.default.array,
	showSubject: _propTypes2.default.bool,
	submitForm: _propTypes2.default.func.isRequired,
	submitFormText: _propTypes2.default.string,
	onEvent: _propTypes2.default.func
};

ContactForm.defaultProps = {
	canSubmitForm: function canSubmitForm() {
		return true;
	},
	formTitle: 'Contact us',
	primaryOptions: [],
	primaryOptionsTitle: 'How can we help?',
	secondaryOptions: [],
	secondaryOptionsTitle: 'Any more info you want to share?',
	itemListTitle: 'Which product do you need help with?',
	itemList: [],
	showSubject: false,
	submitForm: function submitForm() {},
	submitFormText: 'Send',
	onEvent: function onEvent() {}
};