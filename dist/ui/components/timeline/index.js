'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Timeline = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @format */

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _emojify = require('../emojify');

var _emojify2 = _interopRequireDefault(_emojify);

var _scrollbleed = require('../scrollbleed');

var _scrollbleed2 = _interopRequireDefault(_scrollbleed);

var _functional = require('./functional');

var _autoscroll = require('./autoscroll');

var _autoscroll2 = _interopRequireDefault(_autoscroll);

var _url = require('./url');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var debug = (0, _debug2.default)('happychat-client:ui:timeline');

var linksNotEmpty = function linksNotEmpty(_ref) {
	var links = _ref.links;
	return !(0, _isEmpty2.default)(links);
};

var messageParagraph = function messageParagraph(_ref2) {
	var message = _ref2.message,
	    key = _ref2.key,
	    twemojiUrl = _ref2.twemojiUrl;
	return _react2.default.createElement(
		'p',
		{ key: key },
		_react2.default.createElement(
			_emojify2.default,
			{ twemojiUrl: twemojiUrl },
			message
		)
	);
};

/*
 * Given a message and array of links contained within that message, returns the message
 * with clickable links inside of it.
 */
var messageWithLinks = function messageWithLinks(_ref3) {
	var message = _ref3.message,
	    key = _ref3.key,
	    links = _ref3.links,
	    isExternalUrl = _ref3.isExternalUrl;

	var children = links.reduce(function (_ref4, _ref5) {
		var parts = _ref4.parts,
		    last = _ref4.last;

		var _ref6 = _slicedToArray(_ref5, 3),
		    url = _ref6[0],
		    startIndex = _ref6[1],
		    length = _ref6[2];

		var text = url;
		var href = url;
		var rel = null;
		var target = null;

		href = (0, _url.addSchemeIfMissing)(href, 'http');
		if (isExternalUrl(href)) {
			rel = 'noopener noreferrer';
			target = '_blank';
		} else if (typeof window !== 'undefined') {
			// Force internal URLs to the current scheme to avoid a page reload
			var scheme = window.location.protocol.replace(/:+$/, '');
			href = (0, _url.setUrlScheme)(href, scheme);
		}

		if (last < startIndex) {
			parts = parts.concat(_react2.default.createElement(
				'span',
				{ key: parts.length },
				message.slice(last, startIndex)
			));
		}

		parts = parts.concat(_react2.default.createElement(
			'a',
			{ key: parts.length, href: href, rel: rel, target: target },
			text
		));

		return { parts: parts, last: startIndex + length };
	}, { parts: [], last: 0 });

	if (children.last < message.length) {
		children.parts = children.parts.concat(_react2.default.createElement(
			'span',
			{ key: 'last' },
			message.slice(children.last)
		));
	}

	return _react2.default.createElement(
		'p',
		{ key: key },
		children.parts
	);
};

/*
 * If a message event has a message with links in it, return a component with clickable links.
 * Otherwise just return a single paragraph with the text.
 */
var messageText = (0, _functional.when)(linksNotEmpty, messageWithLinks, messageParagraph);

/*
 * Group messages based on user so when any user sends multiple messages they will be grouped
 * within the same message bubble until it reaches a message from a different user.
 */
var renderGroupedMessages = function renderGroupedMessages(_ref7, index) {
	var item = _ref7.item,
	    isCurrentUser = _ref7.isCurrentUser,
	    twemojiUrl = _ref7.twemojiUrl,
	    isExternalUrl = _ref7.isExternalUrl;

	var _item = _toArray(item),
	    event = _item[0],
	    rest = _item.slice(1);

	return _react2.default.createElement(
		'div',
		{
			className: (0, _classnames2.default)('happychat__timeline-message', {
				'is-user-message': isCurrentUser
			}),
			key: event.id || index
		},
		_react2.default.createElement(
			'div',
			{ className: 'happychat__message-text' },
			messageText({
				message: event.message,
				name: event.name,
				key: event.id,
				links: event.links,
				twemojiUrl: twemojiUrl,
				isExternalUrl: isExternalUrl
			}),
			rest.map(function (_ref8) {
				var message = _ref8.message,
				    key = _ref8.id,
				    links = _ref8.links;
				return messageText({ message: message, key: key, links: links, twemojiUrl: twemojiUrl, isExternalUrl: isExternalUrl });
			})
		)
	);
};

var itemTypeIs = function itemTypeIs(type) {
	return function (_ref9) {
		var _ref9$item = _slicedToArray(_ref9.item, 1),
		    firstItem = _ref9$item[0];

		return firstItem.type === type;
	};
};

/*
 * Renders a chat bubble with multiple messages grouped by user.
 */
var renderGroupedTimelineItem = (0, _functional.first)((0, _functional.when)(itemTypeIs('message'), renderGroupedMessages), function (_ref10) {
	var _ref10$item = _slicedToArray(_ref10.item, 1),
	    firstItem = _ref10$item[0];

	return debug('no handler for message type', firstItem.type, firstItem);
});

var groupMessages = function groupMessages(messages) {
	var grouped = messages.reduce(function (_ref11, message) {
		var user_id = _ref11.user_id,
		    type = _ref11.type,
		    group = _ref11.group,
		    groups = _ref11.groups,
		    source = _ref11.source;

		var message_user_id = message.user_id;
		var message_type = message.type;
		var message_source = message.source;
		debug('compare source', message_source, message.source);

		debug('user_id ', user_id);
		debug('type ', type);
		debug('group ', group);
		debug('groups ', groups);
		debug('source ', source);
		debug('message ', message);
		if (user_id !== message_user_id || message_type !== type || message_source !== source) {
			return {
				user_id: message_user_id,
				type: message_type,
				source: message_source,
				group: [message],
				groups: group ? groups.concat([group]) : groups
			};
		}

		// it's the same user so group it together
		return { user_id: user_id, group: group.concat([message]), groups: groups, type: type, source: source };
	}, { groups: [] });

	return grouped.groups.concat([grouped.group]);
};

var renderWelcomeMessage = function renderWelcomeMessage(_ref12) {
	var currentUserEmail = _ref12.currentUserEmail,
	    currentUserGroup = _ref12.currentUserGroup,
	    translate = _ref12.translate;
	return _react2.default.createElement(
		'div',
		{ className: 'happychat__welcome' },
		_react2.default.createElement(
			'p',
			null,
			translate('Welcome to ' + currentUserGroup + ' support chat! We\'ll send a transcript to ' + currentUserEmail + ' at the end of the chat.')
		)
	);
};

var timelineHasContent = function timelineHasContent(_ref13) {
	var timeline = _ref13.timeline;
	return (0, _isArray2.default)(timeline) && !(0, _isEmpty2.default)(timeline);
};

var renderTimeline = function renderTimeline(_ref14) {
	var timeline = _ref14.timeline,
	    isCurrentUser = _ref14.isCurrentUser,
	    isExternalUrl = _ref14.isExternalUrl,
	    onScrollContainer = _ref14.onScrollContainer,
	    scrollbleedLock = _ref14.scrollbleedLock,
	    scrollbleedUnlock = _ref14.scrollbleedUnlock,
	    twemojiUrl = _ref14.twemojiUrl;
	return _react2.default.createElement(
		'div',
		{
			className: 'happychat__conversation',
			ref: onScrollContainer,
			onMouseEnter: scrollbleedLock,
			onMouseLeave: scrollbleedUnlock
		},
		groupMessages(timeline).map(function (item) {
			return renderGroupedTimelineItem({
				item: item,
				isCurrentUser: isCurrentUser(item[0]),
				isExternalUrl: isExternalUrl,
				twemojiUrl: twemojiUrl
			});
		})
	);
};

var chatTimeline = (0, _functional.when)(timelineHasContent, renderTimeline, renderWelcomeMessage);

var Timeline = exports.Timeline = (0, _createReactClass2.default)({
	displayName: 'Timeline',
	mixins: [_autoscroll2.default, _scrollbleed2.default],

	propTypes: {
		currentUserEmail: _propTypes2.default.string,
		currentUserGroup: _propTypes2.default.string,
		isCurrentUser: _propTypes2.default.func,
		isExternalUrl: _propTypes2.default.func,
		onScrollContainer: _propTypes2.default.func,
		timeline: _propTypes2.default.array,
		translate: _propTypes2.default.func,
		twemojiUrl: _propTypes2.default.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			onScrollContainer: function onScrollContainer() {},
			isExternalUrl: function isExternalUrl() {
				return true;
			}
		};
	},
	render: function render() {
		var onScrollContainer = this.props.onScrollContainer;

		return chatTimeline((0, _assign2.default)({}, this.props, {
			onScrollContainer: (0, _functional.forEach)(this.setupAutoscroll, onScrollContainer, this.setScrollbleedTarget),
			scrollbleedLock: this.scrollbleedLock,
			scrollbleedUnlock: this.scrollbleedUnlock
		}));
	}
});