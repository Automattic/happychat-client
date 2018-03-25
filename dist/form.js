'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ENTRY_CHAT = exports.ENTRY_FORM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** @format */

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


// actions


// selectors


// UI components
// TODO implement localize


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _actions = require('./state/connection/actions');

var _actions2 = require('./state/ui/actions');

var _actions3 = require('./state/user/actions');

var _constants = require('./state/constants');

var _getHappychatAuth = require('./lib/wpcom/get-happychat-auth');

var _getHappychatAuth2 = _interopRequireDefault(_getHappychatAuth);

var _canUserSendMessages = require('./state/selectors/can-user-send-messages');

var _canUserSendMessages2 = _interopRequireDefault(_canUserSendMessages);

var _getChatStatus = require('./state/selectors/get-chat-status');

var _getChatStatus2 = _interopRequireDefault(_getChatStatus);

var _getChatTimeline = require('./state/selectors/get-chat-timeline');

var _getChatTimeline2 = _interopRequireDefault(_getChatTimeline);

var _getConnectionStatus = require('./state/selectors/get-connection-status');

var _getConnectionStatus2 = _interopRequireDefault(_getConnectionStatus);

var _getFallbackticketHeaders = require('./state/selectors/get-fallbackticket-headers');

var _getFallbackticketHeaders2 = _interopRequireDefault(_getFallbackticketHeaders);

var _getFallbackticketPathCreate = require('./state/selectors/get-fallbackticket-path-create');

var _getFallbackticketPathCreate2 = _interopRequireDefault(_getFallbackticketPathCreate);

var _getFallbackticketPathShow = require('./state/selectors/get-fallbackticket-path-show');

var _getFallbackticketPathShow2 = _interopRequireDefault(_getFallbackticketPathShow);

var _getFallbackticketResponse = require('./state/selectors/get-fallbackticket-response');

var _getFallbackticketResponse2 = _interopRequireDefault(_getFallbackticketResponse);

var _getFallbackticketStatus = require('./state/selectors/get-fallbackticket-status');

var _getFallbackticketStatus2 = _interopRequireDefault(_getFallbackticketStatus);

var _getUser = require('./state/selectors/get-user');

var _getUser2 = _interopRequireDefault(_getUser);

var _getUserGroupExpanded = require('./state/selectors/get-user-group-expanded');

var _getUserGroupExpanded2 = _interopRequireDefault(_getUserGroupExpanded);

var _getUserEligibility = require('./state/selectors/get-user-eligibility');

var _getUserEligibility2 = _interopRequireDefault(_getUserEligibility);

var _getUiCurrentmessage = require('./state/selectors/get-ui-currentmessage');

var _getUiCurrentmessage2 = _interopRequireDefault(_getUiCurrentmessage);

var _isConnectionUninitialized = require('./state/selectors/is-connection-uninitialized');

var _isConnectionUninitialized2 = _interopRequireDefault(_isConnectionUninitialized);

var _isServerReachable = require('./state/selectors/is-server-reachable');

var _isServerReachable2 = _interopRequireDefault(_isServerReachable);

var _isChatformOpen = require('./state/selectors/is-chatform-open');

var _isChatformOpen2 = _interopRequireDefault(_isChatformOpen);

var _isAvailable = require('./state/selectors/is-available');

var _isAvailable2 = _interopRequireDefault(_isAvailable);

var _isUiReady = require('./state/selectors/is-ui-ready');

var _isUiReady2 = _interopRequireDefault(_isUiReady);

var _localize = require('./ui/components/localize');

var _connection = require('./ui/components/connection');

var _happychatForm = require('./ui/components/happychat-form');

var _contactForm = require('./ui/components/contact-form');

var _messageForm = require('./ui/components/message-form');

var _card = require('./ui/components/card');

var _card2 = _interopRequireDefault(_card);

var _compact = require('./ui/components/card/compact');

var _compact2 = _interopRequireDefault(_compact);

var _formLabel = require('./ui/components/form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _spinnerLine = require('./ui/components/spinner-line');

var _spinnerLine2 = _interopRequireDefault(_spinnerLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ENTRY_FORM = 'form';
var ENTRY_CHAT = 'chat';

var ChatComponent = function () {
	function ChatComponent(props) {
		_classCallCheck(this, ChatComponent);

		this.props = props;
	}

	_createClass(ChatComponent, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    chatStatus = _props.chatStatus,
			    connectionStatus = _props.connectionStatus,
			    currentUserEmail = _props.currentUserEmail,
			    currentUserGroup = _props.currentUserGroup,
			    disabled = _props.disabled,
			    isCurrentUser = _props.isCurrentUser,
			    isExternalUrl = _props.isExternalUrl,
			    isServerReachable = _props.isServerReachable,
			    message = _props.message,
			    onSendMessage = _props.onSendMessage,
			    onSendNotTyping = _props.onSendNotTyping,
			    onSendTyping = _props.onSendTyping,
			    onSetCurrentMessage = _props.onSetCurrentMessage,
			    setBlurred = _props.setBlurred,
			    setFocused = _props.setFocused,
			    timeline = _props.timeline,
			    translate = _props.translate,
			    twemojiUrl = _props.twemojiUrl;


			return _react2.default.createElement(_happychatForm.HappychatForm, {
				chatStatus: chatStatus,
				connectionStatus: connectionStatus,
				currentUserEmail: currentUserEmail,
				currentUserGroup: currentUserGroup,
				disabled: disabled,
				isCurrentUser: isCurrentUser,
				isExternalUrl: isExternalUrl,
				isServerReachable: isServerReachable,
				message: message,
				onSendMessage: onSendMessage,
				onSendNotTyping: onSendNotTyping,
				onSendTyping: onSendTyping,
				onSetCurrentMessage: onSetCurrentMessage,
				setBlurred: setBlurred,
				setFocused: setFocused,
				timeline: timeline,
				translate: translate,
				twemojiUrl: twemojiUrl
			});
		}
	}]);

	return ChatComponent;
}();

var ChatFormComponent = function () {
	function ChatFormComponent(props) {
		_classCallCheck(this, ChatFormComponent);

		this.props = props;
		this.canSubmitForm = this.canSubmitForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.onEvent = this.onEvent.bind(this);
		this.render = this.render.bind(this);
	}

	_createClass(ChatFormComponent, [{
		key: 'canSubmitForm',
		value: function canSubmitForm() {
			var _props2 = this.props,
			    isUserEligibleForChat = _props2.isUserEligibleForChat,
			    isChatAvailable = _props2.isChatAvailable;

			return isUserEligibleForChat && isChatAvailable;
		}
	}, {
		key: 'submitForm',
		value: function submitForm(formState) {
			this.props.onOpenChat();
			this.props.onSendMessage(formState.message);
		}
	}, {
		key: 'onEvent',
		value: function onEvent(formState) {
			if (false === this.props.canChat || false === formState.primarySelected.canChat || false === formState.secondarySelected.canChat || false === formState.itemSelected.canChat) {
				this.props.onSetEligibility(false);
			} else {
				this.props.onSetEligibility(true);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props$entryOptions = this.props.entryOptions,
			    formTitle = _props$entryOptions.formTitle,
			    primaryOptions = _props$entryOptions.primaryOptions,
			    primaryOptionsTitle = _props$entryOptions.primaryOptionsTitle,
			    secondaryOptions = _props$entryOptions.secondaryOptions,
			    secondaryOptionsTitle = _props$entryOptions.secondaryOptionsTitle,
			    itemList = _props$entryOptions.itemList,
			    itemListTitle = _props$entryOptions.itemListTitle;

			return _react2.default.createElement(_contactForm.ContactForm, {
				canSubmitForm: this.canSubmitForm,
				formTitle: formTitle,
				primaryOptions: primaryOptions,
				primaryOptionsTitle: primaryOptionsTitle,
				secondaryOptions: secondaryOptions,
				secondaryOptionsTitle: secondaryOptionsTitle,
				itemList: itemList,
				itemListTitle: itemListTitle,
				showSubject: false,
				submitForm: this.submitForm,
				submitFormText: 'Chat with us',
				onEvent: this.onEvent
			});
		}
	}]);

	return ChatFormComponent;
}();

var TicketFormComponent = function () {
	function TicketFormComponent(props) {
		_classCallCheck(this, TicketFormComponent);

		this.props = props;
		this.canSubmitForm = this.canSubmitForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.onEvent = this.onEvent.bind(this);
		this.render = this.render.bind(this);
	}

	_createClass(TicketFormComponent, [{
		key: 'canSubmitForm',
		value: function canSubmitForm() {
			return this.props.fallbackTicketPathToCreate;
		}
	}, {
		key: 'submitForm',
		value: function submitForm(formState) {
			var _props3 = this.props,
			    fallbackTicketPathToCreate = _props3.fallbackTicketPathToCreate,
			    fallbackTicketHeaders = _props3.fallbackTicketHeaders;

			this.props.onRequestFallbackTicket({
				path: fallbackTicketPathToCreate,
				headers: fallbackTicketHeaders,
				payload: formState
			});
		}
	}, {
		key: 'onEvent',
		value: function onEvent(formState) {
			if (false === this.props.canChat || false === formState.primarySelected.canChat || false === formState.secondarySelected.canChat || false === formState.itemSelected.canChat) {
				this.props.onSetEligibility(false);
			} else {
				this.props.onSetEligibility(true);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props4 = this.props,
			    fallbackTicketResponse = _props4.fallbackTicketResponse,
			    fallbackTicketStatus = _props4.fallbackTicketStatus,
			    fallbackTicketPathToShow = _props4.fallbackTicketPathToShow,
			    _props4$entryOptions = _props4.entryOptions,
			    formTitle = _props4$entryOptions.formTitle,
			    primaryOptions = _props4$entryOptions.primaryOptions,
			    primaryOptionsTitle = _props4$entryOptions.primaryOptionsTitle,
			    secondaryOptions = _props4$entryOptions.secondaryOptions,
			    secondaryOptionsTitle = _props4$entryOptions.secondaryOptionsTitle,
			    itemList = _props4$entryOptions.itemList,
			    itemListTitle = _props4$entryOptions.itemListTitle;


			var form = void 0;
			switch (fallbackTicketStatus) {
				case _constants.HAPPYCHAT_FALLBACK_TICKET_SENDING:
					form = _react2.default.createElement(_messageForm.MessageForm, { message: 'Sending ticket...' });
					break;
				case _constants.HAPPYCHAT_FALLBACK_TICKET_FAILURE:
					form = _react2.default.createElement(_messageForm.MessageForm, { message: 'Sorry, ticket could not be created - something went wrong.' });
					break;
				case _constants.HAPPYCHAT_FALLBACK_TICKET_SUCCESS:
					var hideLink = false;
					if (!fallbackTicketPathToShow || !fallbackTicketResponse) {
						hideLink = true;
					}
					form = _react2.default.createElement(
						'div',
						{ className: 'message-form' },
						_react2.default.createElement(
							_compact2.default,
							null,
							_react2.default.createElement(
								'p',
								{ className: 'message-form__header-title' },
								'Contact Us'
							)
						),
						_react2.default.createElement(
							_card2.default,
							null,
							hideLink ? _react2.default.createElement(
								_formLabel2.default,
								null,
								'Thanks! Ticket has been successfully created.'
							) : _react2.default.createElement(
								_formLabel2.default,
								null,
								'Thanks! Ticket',
								' ',
								_react2.default.createElement(
									'a',
									{
										href: fallbackTicketPathToShow.replace('<ticket-id>', fallbackTicketResponse),
										target: '_blank'
									},
									fallbackTicketResponse
								),
								' ',
								'has been successfully created.'
							)
						)
					);
					break;
				case _constants.HAPPYCHAT_FALLBACK_TICKET_TIMEOUT:
					form = _react2.default.createElement(_messageForm.MessageForm, { message: 'Sorry, ticket could not be created - API timed out.' });
					break;
				case _constants.HAPPYCHAT_FALLBACK_TICKET_NEW:
				default:
					form = _react2.default.createElement(_contactForm.ContactForm, {
						canSubmitForm: this.canSubmitForm,
						formTitle: formTitle,
						primaryOptions: primaryOptions,
						primaryOptionsTitle: primaryOptionsTitle,
						secondaryOptions: secondaryOptions,
						secondaryOptionsTitle: secondaryOptionsTitle,
						itemList: itemList,
						itemListTitle: itemListTitle,
						showSubject: true,
						submitForm: this.submitForm,
						submitFormText: 'Send a ticket',
						onEvent: this.onEvent
					});
			}
			return form;
		}
	}]);

	return TicketFormComponent;
}();

var FormComponent = function () {
	function FormComponent(props) {
		_classCallCheck(this, FormComponent);

		this.props = props;
	}

	_createClass(FormComponent, [{
		key: 'getSupportVariation',
		value: function getSupportVariation() {
			var _props5 = this.props,
			    fallbackTicketPathToCreate = _props5.fallbackTicketPathToCreate,
			    isUserEligibleForChat = _props5.isUserEligibleForChat,
			    isChatAvailable = _props5.isChatAvailable;

			if (!fallbackTicketPathToCreate || isUserEligibleForChat && isChatAvailable) {
				return new ChatFormComponent(this.props);
			}
			return new TicketFormComponent(this.props);
		}
	}, {
		key: 'render',
		value: function render() {
			return this.getSupportVariation().render();
		}
	}]);

	return FormComponent;
}();

var LoadingComponent = function () {
	function LoadingComponent() {
		_classCallCheck(this, LoadingComponent);
	}

	_createClass(LoadingComponent, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_spinnerLine2.default, null);
		}
	}]);

	return LoadingComponent;
}();

var Form = function (_React$Component) {
	_inherits(Form, _React$Component);

	function Form(props) {
		_classCallCheck(this, Form);

		var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

		_this.getSupportComponent = _this.getSupportComponent.bind(_this);
		return _this;
	}

	_createClass(Form, [{
		key: 'getSupportComponent',
		value: function getSupportComponent() {
			var _props6 = this.props,
			    entry = _props6.entry,
			    isChatOpen = _props6.isChatOpen,
			    isFormUIReady = _props6.isFormUIReady;

			if (ENTRY_FORM === entry) {
				if (isChatOpen) {
					return new ChatComponent(this.props);
				} else if (!isFormUIReady) {
					return new LoadingComponent();
				}
				return new FormComponent(this.props);
			}
			// ENTRY_CHAT: show chat as the entry point for Happychat.
			return new ChatComponent(this.props);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props7 = this.props,
			    accessToken = _props7.accessToken,
			    getAuth = _props7.getAuth,
			    isConnectionUninitialized = _props7.isConnectionUninitialized,
			    isHappychatEnabled = _props7.isHappychatEnabled,
			    onInitConnection = _props7.onInitConnection;


			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_connection.HappychatConnection, {
					accessToken: accessToken,
					getAuth: getAuth,
					isConnectionUninitialized: isConnectionUninitialized,
					isHappychatEnabled: isHappychatEnabled,
					onInitConnection: onInitConnection
				}),
				this.getSupportComponent().render()
			);
		}
	}]);

	return Form;
}(_react2.default.Component);

Form.propTypes = {
	accessToken: _propTypes2.default.string.isRequired,
	canChat: _propTypes2.default.bool,
	entry: _propTypes2.default.string,
	entryOptions: _propTypes2.default.object
};

// Whether URL should open a new tab or not.
// Legacy code from Calypso, where it wouldn't open a new window
// if the URL was from WordPress.com.
var isExternalUrl = function isExternalUrl() {
	return true;
};

var isCurrentUser = function isCurrentUser(_ref) {
	var source = _ref.source;

	return source === 'customer';
};

var mapState = function mapState(state) {
	var currentUser = (0, _getUser2.default)(state);
	return {
		isUserEligibleForChat: (0, _getUserEligibility2.default)(state),
		chatStatus: (0, _getChatStatus2.default)(state),
		connectionStatus: (0, _getConnectionStatus2.default)(state),
		currentUserEmail: currentUser.email,
		currentUserGroup: (0, _getUserGroupExpanded2.default)(state),
		disabled: !(0, _canUserSendMessages2.default)(state),
		fallbackTicketHeaders: (0, _getFallbackticketHeaders2.default)(state),
		fallbackTicketPathToCreate: (0, _getFallbackticketPathCreate2.default)(state),
		fallbackTicketPathToShow: (0, _getFallbackticketPathShow2.default)(state),
		fallbackTicketResponse: (0, _getFallbackticketResponse2.default)(state),
		fallbackTicketStatus: (0, _getFallbackticketStatus2.default)(state),
		getAuth: (0, _getHappychatAuth2.default)(state),
		isChatOpen: (0, _isChatformOpen2.default)(state),
		isChatAvailable: (0, _isAvailable2.default)(state),
		isConnectionUninitialized: (0, _isConnectionUninitialized2.default)(state),
		isCurrentUser: isCurrentUser,
		isExternalUrl: isExternalUrl,
		isHappychatEnabled: _config2.default.isEnabled('happychat'),
		isServerReachable: (0, _isServerReachable2.default)(state),
		isFormUIReady: (0, _isUiReady2.default)(state),
		message: (0, _getUiCurrentmessage2.default)(state),
		timeline: (0, _getChatTimeline2.default)(state),
		twemojiUrl: (0, _config2.default)('twemoji_cdn_url')
	};
};

var mapDispatch = {
	onInitConnection: _actions.initConnection,
	onOpenChat: _actions2.openChat,
	onRequestFallbackTicket: _actions.requestFallbackTicket,
	onSendMessage: _actions.sendMessage,
	onSendNotTyping: _actions.sendNotTyping,
	onSendTyping: _actions.sendTyping,
	onSetCurrentMessage: _actions2.setCurrentMessage,
	onSetEligibility: _actions3.setEligibility,
	setBlurred: _actions2.blur,
	setFocused: _actions2.focus
};

exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)((0, _localize.mockLocalize)(Form));
exports.ENTRY_FORM = ENTRY_FORM;
exports.ENTRY_CHAT = ENTRY_CHAT;