'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.eventAPI = exports.initHappychat = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reduxDevtoolsExtension = require('redux-devtools-extension');

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _touchDetect = require('./lib/touch-detect');

var _getWpcomUser = require('./lib/wpcom/get-wpcom-user');

var _getWpcomUser2 = _interopRequireDefault(_getWpcomUser);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _messageForm = require('./ui/components/message-form');

var _eventApi = require('./state/event-api');

var _eventApi2 = _interopRequireDefault(_eventApi);

var _reducer = require('./state/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _middleware = require('./state/middleware');

var _constants = require('./state/constants');

var _actions = require('./state/ui/actions');

var _actions2 = require('./state/user/actions');

var _actions3 = require('./state/fallbackTicket/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducer2.default, {}, (0, _redux.compose)((0, _redux.applyMiddleware)((0, _middleware.socketMiddleware)()), (0, _reduxDevtoolsExtension.devToolsEnhancer)()));
// state: general, actions, selectors

// UI components


/**
 * Internal dependencies
 */
// utils
/** @format */

/**
 * External dependencies
 */


var dispatchAssetsFinishedDownloading = function dispatchAssetsFinishedDownloading() {
	return store.dispatch((0, _actions.setAssetsLoaded)());
};

/**
 * Creates an iframe in the node provided by the nodeId prop.
 *
 * We want this iframe to be non-blocking respect of the main window onload event,
 * but also we want to notify happychat when all assets are done downloading.
 *
 * @param  {Object} props Properties used by the renderMethod.
 * @param  {Function} assetsLoadedHook Callback to be executed when all assets are done downloading.
 * @returns {HTMLNode} Target node where Happychat can hook into.
 */
var createIframe = function createIframe(props) {
	var assetsLoadedHook = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	var nodeId = props.nodeId,
	    entryOptions = props.entryOptions;

	var iframeElement = document.createElement('iframe');

	var primaryHasAnySecondary = function primaryHasAnySecondary(options) {
		return Array.isArray(options) && (0, _find2.default)(options, function (opt) {
			return opt.secondaryOptions;
		});
	};

	var isThereAnySecondaryOptions = function isThereAnySecondaryOptions(options) {
		return options && (options.secondaryOptions || primaryHasAnySecondary(entryOptions.primaryOptions));
	};

	// Calculate height based on the number of components
	// the iframe may need to render.
	var iframeHeight = 380;
	iframeHeight = iframeHeight + (entryOptions && entryOptions.primaryOptions ? 110 : 0);
	iframeHeight = iframeHeight + (isThereAnySecondaryOptions(entryOptions) ? 110 : 0);
	iframeHeight = iframeHeight + (entryOptions && entryOptions.itemList ? 70 : 0);

	// style iframe element
	iframeElement.width = '100%';
	iframeElement.height = iframeHeight + 'em';
	iframeElement.frameBorder = 0;
	iframeElement.scrolling = 'no';

	document.getElementById(nodeId).appendChild(iframeElement);

	// Force FF (and maybe other browsers?) to write the changes to this iframe;
	// otherwise, the changes wont' be applied.
	iframeElement.contentDocument.open();
	iframeElement.contentDocument.write();
	iframeElement.contentDocument.close();

	// We want to show a loading indicator while the rest of assets
	// are downloading. This CSS pertains to the loading indicator
	// and needs to be available since the very beginning.
	var styleLoading = document.createElement('style');
	styleLoading.setAttribute('type', 'text/css');
	styleLoading.appendChild(document.createTextNode('\n\t\t\t@-webkit-keyframes spinner-line__animation {\n\t\t\t  0% {\n\t\t\t    background-position: 0 0;\n\t\t\t  }\n\t\t\t  100% {\n\t\t\t    background-position: 600px 0;\n\t\t\t  }\n\t\t\t}\n\t\t\t@keyframes spinner-line__animation {\n\t\t\t  0% {\n\t\t\t    background-position: 0 0;\n\t\t\t  }\n\t\t\t  100% {\n\t\t\t    background-position: 600px 0;\n\t\t\t  }\n\t\t\t}\n\n\t\t\thr.spinner-line {\n\t\t\t  border: none;\n\t\t\t  height: 3px;\n\t\t\t  margin: 24px 0;\n\t\t\t  background-image: linear-gradient(to right, #a8bece 0%, #c8d7e1 50%, #a8bece 100%);\n\t\t\t  background-size: 300px 100%;\n\t\t\t  -webkit-animation: spinner-line__animation 1.2s infinite linear;\n\t\t\t          animation: spinner-line__animation 1.2s infinite linear;\n\t\t\t}\n\t\t'));
	iframeElement.contentDocument.head.appendChild(styleLoading);

	// Then, we inject two stylesheets: the noticon custom font and Happychat.
	// We want to tell Happychat when they are downloaded, and we do so by Promise.all()
	var styleNoticon = document.createElement('link');
	var styleNoticonPromise = new Promise(function (resolve) {
		styleNoticon.onload = function () {
			return resolve();
		};
	});
	var styleHC = document.createElement('link');
	var styleHCPromise = new Promise(function (resolve) {
		styleHC.onload = function () {
			return resolve();
		};
	});
	Promise.all([styleNoticonPromise, styleHCPromise]).then(function () {
		return assetsLoadedHook();
	});

	// config noticon styles: append it to the iframe's head will trigger the network request
	styleNoticon.setAttribute('rel', 'stylesheet');
	styleNoticon.setAttribute('type', 'text/css');
	styleNoticon.setAttribute('href', 'https://s1.wp.com/i/noticons/noticons.css');
	iframeElement.contentDocument.head.appendChild(styleNoticon);

	// config noticon styles: append it to the iframe's head will trigger the network request
	styleHC.setAttribute('rel', 'stylesheet');
	styleHC.setAttribute('type', 'text/css');
	styleHC.setAttribute('href', 'https://widgets.wp.com/happychat/happychat.css');
	iframeElement.contentDocument.head.appendChild(styleHC);

	// some CSS styles depend on these top-level classes being present
	iframeElement.contentDocument.body.classList.add((0, _touchDetect.hasTouch)() ? 'touch' : 'notouch');

	// React advises to use an element -not the body itself- as the target render,
	// that's why we create this wrapperElement inside the iframe.
	var targetNode = document.createElement('div');
	var spinnerLine = document.createElement('hr');
	spinnerLine.className = 'spinner-line';
	targetNode.appendChild(spinnerLine);
	iframeElement.contentDocument.body.appendChild(targetNode);

	return targetNode;
};

var isAnyCanChatPropFalse = function isAnyCanChatPropFalse(canChat, entryOptions) {
	return false === canChat || Array.isArray(entryOptions.primaryOptions) && entryOptions.primaryOptions.length > 0 && false === entryOptions.primaryOptions[0].canChat || Array.isArray(entryOptions.secondaryOptions) && entryOptions.secondaryOptions.length > 0 && false === entryOptions.secondaryOptions[0].canChat || Array.isArray(entryOptions.itemList) && entryOptions.itemList.length > 0 && false === entryOptions.itemList[0].canChat;
};

/* eslint-disable camelcase */
var renderHappychat = function renderHappychat(targetNode, _ref) {
	var _ref$user = _ref.user,
	    ID = _ref$user.ID,
	    email = _ref$user.email,
	    username = _ref$user.username,
	    display_name = _ref$user.display_name,
	    avatar_URL = _ref$user.avatar_URL,
	    language = _ref$user.language,
	    _ref$user$groups = _ref$user.groups,
	    groups = _ref$user$groups === undefined ? [_constants.HAPPYCHAT_GROUP_WPCOM] : _ref$user$groups,
	    accessToken = _ref$user.accessToken,
	    _ref$user$canChat = _ref$user.canChat,
	    canChat = _ref$user$canChat === undefined ? true : _ref$user$canChat,
	    _ref$entry = _ref.entry,
	    entry = _ref$entry === undefined ? _form.ENTRY_FORM : _ref$entry,
	    _ref$entryOptions = _ref.entryOptions,
	    entryOptions = _ref$entryOptions === undefined ? {} : _ref$entryOptions;
	var fallbackTicket = entryOptions.fallbackTicket;

	store.dispatch((0, _actions2.setCurrentUser)({
		ID: ID,
		email: email,
		username: username,
		display_name: display_name,
		avatar_URL: avatar_URL
	}));
	store.dispatch((0, _actions2.setGroups)(groups));
	store.dispatch((0, _actions2.setLocale)(language));
	store.dispatch((0, _actions3.setFallbackTicketOptions)(fallbackTicket));

	isAnyCanChatPropFalse(canChat, entryOptions) ? store.dispatch((0, _actions2.setEligibility)(false)) : store.dispatch((0, _actions2.setEligibility)(true));

	_reactDom2.default.render(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(_form2.default, { accessToken: accessToken, entry: entry, entryOptions: entryOptions })
	), targetNode);
};
/* eslint-enable camelcase */

var renderError = function renderError(targetNode, _ref2) {
	var error = _ref2.error;
	return _reactDom2.default.render(_react2.default.createElement(_messageForm.MessageForm, { message: 'Could not load form. ' + error }), targetNode);
};

/* eslint-disable camelcase */
var getWPComUser = function getWPComUser(accessToken, groups, canChat) {
	return (0, _getWpcomUser2.default)(accessToken).then(function (_ref3) {
		var ID = _ref3.ID,
		    email = _ref3.email,
		    username = _ref3.username,
		    display_name = _ref3.display_name,
		    avatar_URL = _ref3.avatar_URL,
		    language = _ref3.language;
		return {
			ID: ID,
			email: email,
			username: username,
			display_name: display_name,
			avatar_URL: avatar_URL,
			language: language,
			accessToken: accessToken,
			groups: groups,
			canChat: canChat
		};
	});
};
/* eslint-enable camelcase */

/**
 * Renders a Happychat or Support form in the HTML Element provided by the nodeId.
 *
 * @param {String} nodeId Mandatory. HTML Node id where Happychat will be rendered.
 * @param {Array} groups Mandatory. Happychat groups this user belongs to.
 * @param {String|Promise} accessToken Mandatory. A valid WP.com access token,
 * 				       or a Promise that returns one.
 * @param {String} entry Optional. Valid values are ENTRY_FORM, ENTRY_CHAT.
 * 			 ENTRY_FORM is the default and will render the contact form.
 * 			 ENTRY_CHAT will render the chat form.
 * @param {Object} entryOptions Optional. Contains options to configure the selected entry.
 * @param {Boolean} canChat Optional. Whether the user can be offered chat. True by default.
 */
var initHappychat = exports.initHappychat = function initHappychat(_ref4) {
	var nodeId = _ref4.nodeId,
	    groups = _ref4.groups,
	    accessToken = _ref4.accessToken,
	    entry = _ref4.entry,
	    entryOptions = _ref4.entryOptions,
	    canChat = _ref4.canChat;

	var getAccessToken = accessToken;
	if ('string' === typeof accessToken) {
		getAccessToken = function getAccessToken() {
			return Promise.resolve(accessToken);
		};
	}

	var targetNode = createIframe({ nodeId: nodeId, entryOptions: entryOptions }, dispatchAssetsFinishedDownloading);
	getAccessToken().then(function (token) {
		return getWPComUser(token, groups, canChat);
	}).then(function (user) {
		return renderHappychat(targetNode, {
			user: user,
			entry: entry,
			entryOptions: entryOptions
		});
	}).catch(function (error) {
		return renderError(targetNode, { error: error });
	});
};

var eventAPI = exports.eventAPI = (0, _eventApi2.default)(store);