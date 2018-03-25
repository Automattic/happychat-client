'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _segmentedControl = require('components/segmented-control');

var _segmentedControl2 = _interopRequireDefault(_segmentedControl);

var _item = require('components/segmented-control/item');

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
 * Segmented Control Demo
 */
var SegmentedControlDemo = function (_React$PureComponent) {
	_inherits(SegmentedControlDemo, _React$PureComponent);

	function SegmentedControlDemo() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, SegmentedControlDemo);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SegmentedControlDemo.__proto__ || Object.getPrototypeOf(SegmentedControlDemo)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			childSelected: 'all',
			compact: false
		}, _this.toggleCompact = function () {
			_this.setState({ compact: !_this.state.compact });
		}, _this.selectChildSegment = function (childSelected, event) {
			event.preventDefault();
			_this.setState({
				childSelected: childSelected
			});
			console.log('Segmented Control (selected):', childSelected);
		}, _this.selectSegment = function (option) {
			console.log('Segmented Control (selected):', option);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(SegmentedControlDemo, [{
		key: 'render',
		value: function render() {
			var controlDemoStyles = { maxWidth: 386 };

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'a',
					{ className: 'docs__design-toggle button', onClick: this.toggleCompact },
					this.state.compact ? 'Normal' : 'Compact'
				),
				_react2.default.createElement(
					'h3',
					null,
					'Items passed as options prop'
				),
				_react2.default.createElement(_segmentedControl2.default, {
					options: this.props.options,
					onSelect: this.selectSegment,
					style: controlDemoStyles,
					compact: this.state.compact
				}),
				_react2.default.createElement(
					'h3',
					{ style: { marginTop: 20 } },
					'Primary version'
				),
				_react2.default.createElement(
					_segmentedControl2.default,
					{
						selectedText: this.state.childSelected,
						style: controlDemoStyles,
						primary: true,
						compact: this.state.compact
					},
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'all',
							onClick: this.selectChildSegment.bind(this, 'all')
						},
						'All'
					),
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'unread',
							onClick: this.selectChildSegment.bind(this, 'unread')
						},
						'Unread'
					),
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'comments',
							onClick: this.selectChildSegment.bind(this, 'comments')
						},
						'Comments'
					),
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'follows',
							onClick: this.selectChildSegment.bind(this, 'follows')
						},
						'Follows'
					),
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'likes',
							onClick: this.selectChildSegment.bind(this, 'likes')
						},
						'Likes'
					)
				),
				_react2.default.createElement(
					'h3',
					{ style: { marginTop: 20 } },
					'Three items'
				),
				_react2.default.createElement(
					_segmentedControl2.default,
					{
						compact: this.state.compact,
						selectedText: this.state.childSelected,
						style: { maxWidth: 280 }
					},
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'all',
							onClick: this.selectChildSegment.bind(this, 'all')
						},
						'All'
					),
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'unread',
							onClick: this.selectChildSegment.bind(this, 'unread')
						},
						'Unread'
					),
					_react2.default.createElement(
						_item2.default,
						{
							selected: this.state.childSelected === 'comments',
							onClick: this.selectChildSegment.bind(this, 'comments')
						},
						'Comments'
					)
				)
			);
		}
	}]);

	return SegmentedControlDemo;
}(_react2.default.PureComponent);

SegmentedControlDemo.displayName = 'SegmentedControl';
SegmentedControlDemo.defaultProps = {
	options: [{ value: 'all', label: 'All' }, { value: 'unread', label: 'Unread' }, { value: 'comments', label: 'Comments' }, { value: 'follows', label: 'Follows' }, { value: 'likes', label: 'Likes' }]
};
exports.default = SegmentedControlDemo;