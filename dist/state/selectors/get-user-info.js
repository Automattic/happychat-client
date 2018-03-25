'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** @format */

/**
 * Internal dependencies
 */


var _getUserGeolocation = require('./get-user-geolocation');

var _getUserGeolocation2 = _interopRequireDefault(_getUserGeolocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state) {
	return function (_ref) {
		var site = _ref.site,
		    _ref$howCanWeHelp = _ref.howCanWeHelp,
		    howCanWeHelp = _ref$howCanWeHelp === undefined ? 'gettingStarted' : _ref$howCanWeHelp,
		    _ref$howYouFeel = _ref.howYouFeel,
		    howYouFeel = _ref$howYouFeel === undefined ? 'unspecified' : _ref$howYouFeel;

		var info = {
			howCanWeHelp: howCanWeHelp,
			howYouFeel: howYouFeel,
			siteId: site.ID,
			siteUrl: site.URL,
			localDateTime: new Intl.DateTimeFormat('en-us', {
				hour12: true,
				hour: '2-digit',
				minute: '2-digit',
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			}).format(new Date())
		};

		// add screen size
		if ('object' === (typeof screen === 'undefined' ? 'undefined' : _typeof(screen))) {
			info.screenSize = {
				width: screen.width,
				height: screen.height
			};
		}

		// add browser size
		if ('object' === (typeof window === 'undefined' ? 'undefined' : _typeof(window))) {
			info.browserSize = {
				width: window.innerWidth,
				height: window.innerHeight
			};
		}

		// add user agent
		if ('object' === (typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator))) {
			info.userAgent = navigator.userAgent;
		}

		var geoLocation = (0, _getUserGeolocation2.default)(state);
		if (geoLocation) {
			info.geoLocation = geoLocation;
		}

		return info;
	};
};