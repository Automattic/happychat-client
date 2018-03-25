'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Mixin that will scroll to the bottom of a scrollable container whenever it's rendered.
 * When the scrollable element is scrolled manually by the user autoscroll is disabled until the
 * user scrolls back to the bottom of the content.
 *
 * To use declare the mixin and then call the `setupAutoscroll( node )` method on your component
 * where `node` is an html element with scrolling enabled.
 *
 * After every update the content will be scrolled to the bottom of the content.
 *
 * @format
 */

exports.default = {
	componentWillMount: function componentWillMount() {
		this._autoscroll_enabled = true;
		window.addEventListener('resize', this.scrollToBottom);
	},
	componentDidMount: function componentDidMount() {
		this.scrollToBottom();
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('resize', this.scrollToBottom);
		this._autoscroll_stop_listening();
	},
	componentDidUpdate: function componentDidUpdate() {
		this.scrollToBottom();
	},
	setupAutoscroll: function setupAutoscroll(node) {
		this._autoscroll_stop_listening();
		this._autoscroll_node = node;

		if (!this._autoscroll_node) {
			return;
		}

		this._autoscroll_node.addEventListener('scroll', this._autoscroll_detectScroll);
	},
	_autoscroll_stop_listening: function _autoscroll_stop_listening() {
		if (!this._autoscroll_node) {
			return;
		}
		this._autoscroll_node.removeEventListener('scroll', this._autoscroll_detectScroll);
	},
	scrollToBottom: function scrollToBottom() {
		if (!this._autoscroll_enabled) {
			return;
		}
		if (!this._autoscroll_node) {
			return;
		}
		var _autoscroll_node = this._autoscroll_node,
		    scrollHeight = _autoscroll_node.scrollHeight,
		    offsetHeight = _autoscroll_node.offsetHeight;

		this._autoscroll_node.scrollTop = Math.max(0, scrollHeight - offsetHeight);
	},
	_autoscroll_detectScroll: function _autoscroll_detectScroll() {
		if (!this._autoscroll_node) {
			return;
		}

		var _autoscroll_node2 = this._autoscroll_node,
		    scrollTop = _autoscroll_node2.scrollTop,
		    offsetHeight = _autoscroll_node2.offsetHeight,
		    scrollHeight = _autoscroll_node2.scrollHeight;

		var enable = scrollTop + offsetHeight >= scrollHeight;
		if (this._autoscroll_enabled !== enable) {
			this._autoscroll_enabled = enable;
		}
	}
};