'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @format
                                                                                                                                                                                                                                                                   * @jest-environment jsdom
                                                                                                                                                                                                                                                                   */

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('index', function () {
	describe('component rendering', function () {
		test('should render a list with the provided options', function () {
			var dropdown = mountDropdown();
			expect(dropdown.find('.select-dropdown__options li.select-dropdown__label').text()).toBe('Statuses');
			expect(dropdown.find('.select-dropdown__options li.select-dropdown__option').length).toBe(4);
		});

		test('should render a separator in place of any falsy option', function () {
			var dropdown = mountDropdown();
			expect(dropdown.find('.select-dropdown__options li.select-dropdown__separator').length).toBe(1);
		});

		test('should be initially closed', function () {
			var dropdown = shallowRenderDropdown();
			expect(dropdown.find('.select-dropdown').length).toBe(1);
			expect(dropdown.find('.select-dropdown.is-open').length).toBe(0);
		});

		test('should execute toggleDropdown when clicked', function () {
			var originalToggleDropdown = _index2.default.prototype.toggleDropdown;
			_index2.default.prototype.toggleDropdown = jest.fn();

			var dropdown = shallowRenderDropdown();
			dropdown.find('.select-dropdown__container').simulate('click');

			expect(_index2.default.prototype.toggleDropdown.mock.calls.length).toBe(1);
			_index2.default.prototype.toggleDropdown = originalToggleDropdown;
		});

		test('should be possible to control the dropdown via keyboard', function () {
			var originalNavigateItem = _index2.default.prototype.navigateItem;
			_index2.default.prototype.navigateItem = jest.fn();

			var dropdown = shallowRenderDropdown();
			dropdown.find('.select-dropdown__container').simulate('keydown');

			expect(_index2.default.prototype.navigateItem.mock.calls.length).toBe(1);
			_index2.default.prototype.navigateItem = originalNavigateItem;
		});
	});

	describe('getInitialSelectedItem', function () {
		test('should return the initially selected value (if any)', function () {
			var dropdown = shallowRenderDropdown({ initialSelected: 'drafts' });
			var initialSelectedValue = dropdown.instance().getInitialSelectedItem();
			expect(initialSelectedValue).toBe('drafts');
		});

		test("should return `undefined`, when there aren't options", function () {
			var dropdown = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, null));
			expect(dropdown.instance().getInitialSelectedItem()).toBeUndefined();
		});

		test("should return the first not-label option, when there isn't a preselected value", function () {
			var dropdown = shallowRenderDropdown();
			var initialSelectedValue = dropdown.instance().getInitialSelectedItem();
			expect(initialSelectedValue).toBe('published');
		});
	});

	describe('getSelectedText', function () {
		test('should return the initially selected text (if any)', function () {
			var dropdown = shallowRenderDropdown({ selectedText: 'Drafts' });
			var initialSelectedText = dropdown.instance().getSelectedText();
			expect(initialSelectedText).toBe('Drafts');
		});

		test('should return the `label` associated to the selected option', function () {
			var dropdown = shallowRenderDropdown();
			var initialSelectedText = dropdown.instance().getSelectedText();
			expect(initialSelectedText).toBe('Published');
		});

		test("should return the `label` associated to the initial selected option, when there isn't any selected option", function () {
			var originalGetInitialSelectedItem = _index2.default.prototype.getInitialSelectedItem;
			_index2.default.prototype.getInitialSelectedItem = jest.fn().mockReturnValue('scheduled');
			var dropdown = shallowRenderDropdown();
			var initialSelectedText = dropdown.instance().getSelectedText();
			expect(initialSelectedText).toBe('Scheduled');
			_index2.default.prototype.getInitialSelectedItem = originalGetInitialSelectedItem;
		});
	});

	describe('selectItem', function () {
		test('should run the `onSelect` hook, and then update the state', function () {
			var originalSetState = _react2.default.Component.prototype.setState;
			_react2.default.Component.prototype.setState = jest.fn();

			var dropdownOptions = getDropdownOptions();
			var onSelectSpy = jest.fn();
			var dropdown = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, { options: dropdownOptions, onSelect: onSelectSpy }));

			var newSelectedOption = dropdownOptions[2];
			dropdown.instance().selectItem(newSelectedOption);

			expect(onSelectSpy.mock.calls.length).toBe(1);
			expect(_react2.default.Component.prototype.setState).lastCalledWith({
				selected: newSelectedOption.value
			});
			_react2.default.Component.prototype.setState = originalSetState;
		});
	});

	describe('toggleDropdown', function () {
		test('should toggle the `isOpen` state property', function () {
			function runToggleDropdownTest(isCurrentlyOpen) {
				var fakeContext = {
					setState: jest.fn(),
					state: {
						isOpen: isCurrentlyOpen
					}
				};

				_index2.default.prototype.toggleDropdown.call(fakeContext);
				expect(fakeContext.setState.mock.calls.length).toBe(1);
				expect(fakeContext.setState).lastCalledWith({ isOpen: !isCurrentlyOpen });
			}

			runToggleDropdownTest(true);
			runToggleDropdownTest(false);
		});
	});

	describe('openDropdown', function () {
		test('should set the `isOpen` state property equal `true`', function () {
			var setStateSpy = jest.fn();
			var fakeContext = {
				setState: setStateSpy
			};

			_index2.default.prototype.openDropdown.call(fakeContext);

			expect(setStateSpy.mock.calls.length).toBe(1);
			expect(setStateSpy).lastCalledWith({ isOpen: true });
		});
	});

	describe('closeDropdown', function () {
		test("shouldn't do anything when the dropdown is already closed", function () {
			var setStateSpy = jest.fn();
			var fakeContext = {
				setState: setStateSpy,
				state: {
					isOpen: false
				}
			};

			_index2.default.prototype.closeDropdown.call(fakeContext);

			expect(setStateSpy.mock.calls.length).toBe(0);
		});

		test('should set the `isOpen` state property equal `false`', function () {
			var setStateSpy = jest.fn();
			var fakeContext = {
				focused: 1,
				setState: setStateSpy,
				state: {
					isOpen: true
				}
			};

			_index2.default.prototype.closeDropdown.call(fakeContext);

			expect(setStateSpy.mock.calls.length).toBe(1);
			expect(setStateSpy).lastCalledWith({ isOpen: false });

			expect(fakeContext.focused).toBeUndefined();
		});
	});

	describe('navigateItem', function () {
		test("permits to navigate through the dropdown's options by pressing the TAB key", function () {
			var tabKeyCode = 9;
			var fakeEvent = prepareFakeEvent(tabKeyCode);
			var fakeContext = prepareFakeContext();

			_index2.default.prototype.navigateItem.call(fakeContext, fakeEvent);

			expect(fakeContext.navigateItemByTabKey.mock.calls.length).toBe(1);
			expect(fakeContext.navigateItemByTabKey).lastCalledWith(fakeEvent);
		});

		test('permits to select an option by pressing ENTER, or SPACE', function () {
			function runNavigateItemTest(keyCode) {
				var fakeEvent = prepareFakeEvent(keyCode);
				var fakeContext = prepareFakeContext();

				_index2.default.prototype.navigateItem.call(fakeContext, fakeEvent);

				expect(fakeEvent.preventDefault.mock.calls.length).toBe(1);
				expect(fakeContext.activateItem.mock.calls.length).toBe(1);
			}

			var enterKeyCode = 13;
			var spaceKeyCode = 32;

			[enterKeyCode, spaceKeyCode].forEach(runNavigateItemTest);
		});

		test('permits to close the dropdown by pressing ESCAPE', function () {
			var escapeKeyCode = 27;
			var fakeEvent = prepareFakeEvent(escapeKeyCode);
			var fakeContext = prepareFakeContext();

			_index2.default.prototype.navigateItem.call(fakeContext, fakeEvent);

			expect(fakeEvent.preventDefault.mock.calls.length).toBe(1);

			var focusSpy = fakeContext.refs.dropdownContainer.focus,
			    closeDropdownSpy = fakeContext.closeDropdown;

			expect(closeDropdownSpy.mock.calls.length).toBe(1);
			expect(focusSpy.mock.calls.length).toBe(1);
		});

		test("permits to open the dropdown, and navigate through the dropdown's options by pressing the arrow UP/DOWN keys", function () {
			function runNavigateItemTest(_ref) {
				var keyCode = _ref.keyCode,
				    direction = _ref.direction;

				var fakeEvent = prepareFakeEvent(keyCode);
				var fakeContext = prepareFakeContext();

				_index2.default.prototype.navigateItem.call(fakeContext, fakeEvent);

				expect(fakeEvent.preventDefault.mock.calls.length).toBe(1);

				expect(fakeContext.focusSibling.mock.calls.length).toBe(1);
				expect(fakeContext.focusSibling).lastCalledWith(direction);

				expect(fakeContext.openDropdown.mock.calls.length).toBe(1);
			}

			var arrowUp = { keyCode: 38, direction: 'previous' };
			var arrowDown = { keyCode: 40, direction: 'next' };

			[arrowUp, arrowDown].forEach(runNavigateItemTest);
		});

		function prepareFakeContext() {
			return {
				refs: {
					dropdownContainer: {
						focus: jest.fn()
					}
				},
				activateItem: jest.fn(),
				closeDropdown: jest.fn(),
				focusSibling: jest.fn(),
				navigateItemByTabKey: jest.fn(),
				openDropdown: jest.fn()
			};
		}

		function prepareFakeEvent(keyCode) {
			return {
				keyCode: keyCode,
				preventDefault: jest.fn()
			};
		}
	});

	/**
  * Utilities
  */

	function mountDropdown() {
		var dropdownOptions = getDropdownOptions();
		return (0, _enzyme.mount)(_react2.default.createElement(_index2.default, { options: dropdownOptions }));
	}

	function shallowRenderDropdown(props) {
		var dropdownOptions = getDropdownOptions();
		return (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, _extends({ options: dropdownOptions }, props)));
	}

	function getDropdownOptions() {
		return [{ value: 'status-options', label: 'Statuses', isLabel: true }, { value: 'published', label: 'Published' }, { value: 'scheduled', label: 'Scheduled' }, { value: 'drafts', label: 'Drafts' }, null, { value: 'trashed', label: 'Trashed' }];
	}
});