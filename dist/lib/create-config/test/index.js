'use strict';

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('index', function () {
	describe('config without data', function () {
		var config = (0, _2.default)({});

		test('has to return false when the feature flags are not specified', function () {
			var result = config.isEnabled('flagA');

			expect(result).toBeFalsy();
		});
	});

	describe('config with data', function () {
		var config = (0, _2.default)({
			keyA: 'value',
			features: {
				flagA: false,
				flagB: false,
				flagC: true
			}
		});

		test('has to return value of the provided key', function () {
			var result = config('keyA');

			expect(result).toBe('value');
		});

		test('has to return false when the provided feature flag is disabled', function () {
			var result = config.isEnabled('flagA');

			expect(result).toBeFalsy();
		});

		test('has to return false when the provided feature flag is enabled', function () {
			var result = config.isEnabled('flagC');

			expect(result).toBeTruthy();
		});

		describe('error cases', function () {
			var NODE_ENV = process.env.NODE_ENV;
			var fakeKey = 'where did all the errors go?';

			afterEach(function () {
				return process.env.NODE_ENV = NODE_ENV;
			});

			test('should throw an error when given key doesn\'t exist (NODE_ENV == development)', function () {
				process.env.NODE_ENV = 'development';

				expect(function () {
					return config(fakeKey);
				}).toThrow(ReferenceError);
			});

			test('should not throw an error when given key doesn\'t exist (NODE_ENV != development)', function () {
				var envs = ['client', 'desktop', 'horizon', 'production', 'stage', 'test', 'wpcalypso'];

				envs.forEach(function (env) {
					process.env.NODE_ENV = env;

					expect(process.env.NODE_ENV).toBe(env);
					expect(function () {
						return config(fakeKey);
					}).not.toThrow(Error);
				});
			});
		});
	});
}); /** @format */

/**
 * Internal dependencies
 */