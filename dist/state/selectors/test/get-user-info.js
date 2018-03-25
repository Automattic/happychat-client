'use strict';

var _getUserInfo = require('../get-user-info');

var _getUserInfo2 = _interopRequireDefault(_getUserInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('HAPPYCHAT_IO_SEND_MESSAGE_USERINFO action', function () {
	var state = {
		user: {
			geoLocation: {
				city: 'Timisoara'
			}
		}
	};

	var previousWindow = global.window;
	var previousScreen = global.screen;
	var previousNavigator = global.navigator;

	beforeAll(function () {
		global.window = {
			innerWidth: 'windowInnerWidth',
			innerHeight: 'windowInnerHeight'
		};
		global.screen = {
			width: 'screenWidth',
			height: 'screenHeight'
		};
		global.navigator = {
			userAgent: 'navigatorUserAgent'
		};
	});

	afterAll(function () {
		global.window = previousWindow;
		global.screen = previousScreen;
		global.navigator = previousNavigator;
	});

	test('should send relevant browser information to the connection', function () {
		var expectedInfo = {
			howCanWeHelp: 'howCanWeHelp',
			howYouFeel: 'howYouFeel',
			siteId: 'siteId',
			siteUrl: 'siteUrl',
			localDateTime: new Intl.DateTimeFormat('en-us', {
				hour12: true,
				hour: '2-digit',
				minute: '2-digit',
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			}).format(new Date()),
			screenSize: {
				width: 'screenWidth',
				height: 'screenHeight'
			},
			browserSize: {
				width: 'windowInnerWidth',
				height: 'windowInnerHeight'
			},
			userAgent: 'navigatorUserAgent',
			geoLocation: state.user.geoLocation
		};

		var userInfo = (0, _getUserInfo2.default)(state)({
			site: {
				ID: 'siteId',
				URL: 'siteUrl'
			},
			howCanWeHelp: 'howCanWeHelp',
			howYouFeel: 'howYouFeel'
		});

		expect(userInfo).toMatchObject(expectedInfo);
	});
}); /** @format */

/**
 * Internal dependencies
 */