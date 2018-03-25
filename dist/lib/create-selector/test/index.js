'use strict';

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */
describe('index', function () {
	var selector = void 0,
	    getSitePosts = void 0;

	beforeEach(function () {
		selector = jest.fn().mockImplementation(function (state, siteId) {
			return (0, _filter2.default)(state.posts, { site_ID: siteId });
		});
		getSitePosts = (0, _2.default)(selector, function (state) {
			return state.posts;
		});
	});

	test('should expose its memoized function', function () {
		expect(getSitePosts.memoizedSelector).toBeInstanceOf(Function);
	});

	test('should create a function which returns the expected value when called', function () {
		var state = {
			posts: {
				'3d097cb7c5473c169bba0eb8e3c6cb64': {
					ID: 841,
					site_ID: 2916284,
					global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
					title: 'Hello World'
				}
			}
		};

		expect(getSitePosts(state, 2916284)).toMatchObject([{
			ID: 841,
			site_ID: 2916284,
			global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
			title: 'Hello World'
		}]);
	});

	test('should cache the result of a selector function', function () {
		var state = {
			posts: {
				'3d097cb7c5473c169bba0eb8e3c6cb64': {
					ID: 841,
					site_ID: 2916284,
					global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
					title: 'Hello World'
				}
			}
		};

		getSitePosts(state, 2916284);
		getSitePosts(state, 2916284);

		expect(selector).toHaveBeenCalledTimes(1);
	});

	test('should warn against complex arguments in development mode', function () {
		var state = { posts: {} };
		console.warn = jest.fn(); // eslint-disable-line no-console

		getSitePosts(state, 1);
		getSitePosts(state, '');
		getSitePosts(state, 'foo');
		getSitePosts(state, true);
		getSitePosts(state, null);
		getSitePosts(state, undefined);
		getSitePosts(state, {});
		getSitePosts(state, []);
		getSitePosts(state, 1, []);

		expect(console.warn).toHaveBeenCalledTimes(3);
	});

	test('should return the expected value of differing arguments', function () {
		var state = {
			posts: {
				'3d097cb7c5473c169bba0eb8e3c6cb64': {
					ID: 841,
					site_ID: 2916284,
					global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
					title: 'Hello World'
				},
				'6c831c187ffef321eb43a67761a525a3': {
					ID: 413,
					site_ID: 38303081,
					global_ID: '6c831c187ffef321eb43a67761a525a3',
					title: 'Ribs & Chicken'
				}
			}
		};

		getSitePosts(state, 2916284);
		var sitePosts = getSitePosts(state, 38303081);
		getSitePosts(state, 2916284);

		expect(sitePosts).toMatchObject([{
			ID: 413,
			site_ID: 38303081,
			global_ID: '6c831c187ffef321eb43a67761a525a3',
			title: 'Ribs & Chicken'
		}]);
		expect(selector).toHaveBeenCalledTimes(2);
	});

	test('should bust the cache when watched state changes', function () {
		var currentState = {
			posts: {
				'3d097cb7c5473c169bba0eb8e3c6cb64': {
					ID: 841,
					site_ID: 2916284,
					global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
					title: 'Hello World'
				}
			}
		};

		getSitePosts(currentState, 2916284);

		var nextState = {
			posts: {
				'3d097cb7c5473c169bba0eb8e3c6cb64': {
					ID: 841,
					site_ID: 2916284,
					global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
					title: 'Hello World'
				},
				'6c831c187ffef321eb43a67761a525a3': {
					ID: 413,
					site_ID: 38303081,
					global_ID: '6c831c187ffef321eb43a67761a525a3',
					title: 'Ribs & Chicken'
				}
			}
		};

		expect(getSitePosts(nextState, 2916284)).toMatchObject([{
			ID: 841,
			site_ID: 2916284,
			global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
			title: 'Hello World'
		}]);
		expect(selector).toHaveBeenCalledTimes(2);
	});

	test('should accept an array of dependent state values', function () {
		var getSitePostsWithArrayDependants = (0, _2.default)(selector, function (state) {
			return [state.posts];
		});
		var state = {
			posts: {
				'3d097cb7c5473c169bba0eb8e3c6cb64': {
					ID: 841,
					site_ID: 2916284,
					global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
					title: 'Hello World'
				}
			}
		};

		getSitePostsWithArrayDependants(state, 2916284);
		getSitePostsWithArrayDependants(state, 2916284);

		expect(selector).toHaveBeenCalledTimes(1);
	});

	test('should accept an array of dependent selectors', function () {
		var getPosts = function getPosts(state) {
			return state.posts;
		};
		var getSitePostsWithArrayDependants = (0, _2.default)(selector, [getPosts]);
		var state = {
			posts: {
				'3d097cb7c5473c169bba0eb8e3c6cb64': {
					ID: 841,
					site_ID: 2916284,
					global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
					title: 'Hello World'
				}
			}
		};

		var nextState = { posts: {} };

		getSitePostsWithArrayDependants(state, 2916284);
		getSitePostsWithArrayDependants(state, 2916284);
		getSitePostsWithArrayDependants(nextState, 2916284);
		getSitePostsWithArrayDependants(nextState, 2916284);

		expect(selector).toHaveBeenCalledTimes(2);
	});

	test('should default to watching entire state, returning cached result if no changes', function () {
		var getSitePostsWithDefaultGetDependants = (0, _2.default)(selector);
		var state = {
			posts: {
				'3d097cb7c5473c169bba0eb8e3c6cb64': {
					ID: 841,
					site_ID: 2916284,
					global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
					title: 'Hello World'
				}
			}
		};

		getSitePostsWithDefaultGetDependants(state, 2916284);
		getSitePostsWithDefaultGetDependants(state, 2916284);

		expect(selector).toHaveBeenCalledTimes(1);
	});

	test('should default to watching entire state, busting if state has changed', function () {
		var getSitePostsWithDefaultGetDependants = (0, _2.default)(selector);
		var currentState = {
			posts: {
				'3d097cb7c5473c169bba0eb8e3c6cb64': {
					ID: 841,
					site_ID: 2916284,
					global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
					title: 'Hello World'
				}
			}
		};

		getSitePostsWithDefaultGetDependants(currentState, 2916284);

		var nextState = {
			posts: {
				'3d097cb7c5473c169bba0eb8e3c6cb64': {
					ID: 841,
					site_ID: 2916284,
					global_ID: '3d097cb7c5473c169bba0eb8e3c6cb64',
					title: 'Hello World'
				},
				'6c831c187ffef321eb43a67761a525a3': {
					ID: 413,
					site_ID: 38303081,
					global_ID: '6c831c187ffef321eb43a67761a525a3',
					title: 'Ribs & Chicken'
				}
			}
		};

		getSitePostsWithDefaultGetDependants(nextState, 2916284);

		expect(selector).toHaveBeenCalledTimes(2);
	});

	test('should accept an optional custom cache key generating function', function () {
		var getSitePostsWithCustomGetCacheKey = (0, _2.default)(selector, function (state) {
			return state.posts;
		}, function (state, siteId) {
			return 'CUSTOM' + siteId;
		});

		getSitePostsWithCustomGetCacheKey({ posts: {} }, 2916284);

		expect(getSitePostsWithCustomGetCacheKey.memoizedSelector.cache.has('CUSTOM2916284')).toBeTruthy();
	});

	test('should call dependant state getter with arguments', function () {
		var getDeps = jest.fn();
		var memoizedSelector = (0, _2.default)(function () {
			return null;
		}, getDeps);
		var state = {};

		memoizedSelector(state, 1, 2, 3);

		expect(getDeps).toHaveBeenCalledWith(state, 1, 2, 3);
	});

	test('should handle an array of selectors instead of a dependant state getter', function () {
		var getPosts = jest.fn();
		var getQuuxs = jest.fn();
		var memoizedSelector = (0, _2.default)(function () {
			return null;
		}, [getPosts, getQuuxs]);
		var state = {};

		memoizedSelector(state, 1, 2, 3);
		expect(getPosts).toHaveBeenCalledWith(state, 1, 2, 3);
		expect(getQuuxs).toHaveBeenCalledWith(state, 1, 2, 3);
	});
});

/**
 * Internal dependencies
 */