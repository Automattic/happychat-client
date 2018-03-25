'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** @format */

/**
 * External dependencies
 */


exports.default = createSelector;

var _memoize = require('lodash/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _shallowEqual = require('react-pure-render/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constants
 */

/**
 * Defines acceptable argument types for a memoized selector when using the
 * default cache key generating function.
 *
 * @type {Array}
 */
var VALID_ARG_TYPES = ['number', 'boolean', 'string'];

/**
 * Default behavior for determining whether current state differs from previous
 * state, which is the basis upon which memoize cache is cleared. Should return
 * a value or array of values to be shallowly compared for strict equality.
 *
 * @type   {Function}
 * @param  {Object}    state Current state object
 * @return {(Array|*)}       Value(s) to be shallow compared
 */
var DEFAULT_GET_DEPENDANTS = function DEFAULT_GET_DEPENDANTS(state) {
	return state;
};

/**
 * At runtime, assigns a function which returns a cache key for the memoized
 * selector function, given a state object and a variable set of arguments. In
 * development mode, this warns when the memoized selector is passed a complex
 * object argument, as these cannot be depended upon as reliable cache keys.
 *
 * @type {Function} Function returning cache key for memoized selector
 */
var DEFAULT_GET_CACHE_KEY = function () {
	var warn = void 0,
	    includes = void 0;
	if ('production' !== process.env.NODE_ENV) {
		// Webpack can optimize bundles if it can detect that a block will
		// never be reached. Since `NODE_ENV` is defined using DefinePlugin,
		// these debugging modules will be excluded from the production build.
		warn = require('../warn').default;
		includes = require('lodash/includes');
	} else {
		return function (state) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			return args.join();
		};
	}

	return function (state) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		var hasInvalidArg = args.some(function (arg) {
			return arg && !includes(VALID_ARG_TYPES, typeof arg === 'undefined' ? 'undefined' : _typeof(arg));
		});

		if (hasInvalidArg) {
			warn('Do not pass complex objects as arguments for a memoized selector');
		}

		return args.join();
	};
}();

/**
 * Given an array of getDependants functions, returns a single function which,
 * when called, returns an array of mapped results from those functions.
 *
 * @param  {Function[]} dependants Array of getDependants
 * @return {Function}              Function mapping getDependants results
 */
var makeSelectorFromArray = function makeSelectorFromArray(dependants) {
	return function (state) {
		for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			args[_key3 - 1] = arguments[_key3];
		}

		return dependants.map(function (dependant) {
			return dependant.apply(undefined, [state].concat(args));
		});
	};
};

/**
 * Returns a memoized state selector for use with the global application state.
 *
 * @param  {Function}            selector      Function calculating cached result
 * @param  {Function|Function[]} getDependants Function(s) describing dependent
 *                                             state, or an array of dependent
 *                                             state selectors
 * @param  {Function}            getCacheKey   Function generating cache key
 * @return {Function}                          Memoized selector
 */
function createSelector(selector) {
	var getDependants = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_GET_DEPENDANTS;
	var getCacheKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_GET_CACHE_KEY;

	var memoizedSelector = (0, _memoize2.default)(selector, getCacheKey);
	var lastDependants = void 0;

	if (Array.isArray(getDependants)) {
		getDependants = makeSelectorFromArray(getDependants);
	}

	return Object.assign(function (state) {
		for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			args[_key4 - 1] = arguments[_key4];
		}

		var currentDependants = getDependants.apply(undefined, [state].concat(args));
		if (!Array.isArray(currentDependants)) {
			currentDependants = [currentDependants];
		}

		if (lastDependants && !(0, _shallowEqual2.default)(currentDependants, lastDependants)) {
			memoizedSelector.cache.clear();
		}

		lastDependants = currentDependants;

		return memoizedSelector.apply(undefined, [state].concat(args));
	}, { memoizedSelector: memoizedSelector });
}