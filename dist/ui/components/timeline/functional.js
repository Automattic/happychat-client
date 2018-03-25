'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = exports.compose = exports.map = exports.forEach = exports.all = exports.any = exports.first = exports.when = exports.propEquals = exports.prop = exports.propExists = undefined;

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Returns a function that checks for props that have a truthy `propkey` (uses lodash/object/get
 * to check for key). Example:
 *
 * const nameExists = propExists( 'name' )
 * nameExists( { name: 'Gabrielle' } ) // => Gabrielle
 * nameExists( { name: true } ) // true
 * nameExists( {} ) // null
 * nameExists() // null
 */
/** @format */

/**
 * External dependencies
 */
var propExists = exports.propExists = function propExists(propKey) {
  return function (props) {
    return (0, _get2.default)(props, propKey);
  };
};
var prop = exports.prop = propExists;

/*
 * Returns a function that returns true if `propKey` of props is equal to `propValue` (uses ===).
 *
 * const userNameIsSam = propEquals( 'user.name', 'Sam' )
 * const userNameIsSam( { user: { name: 'Sam' } } ) // => true
 * const userNameIsSam( { user: { name: 'Frodo' } } ) // => false
 * const userNameIsSam() // => false
 */
var propEquals = exports.propEquals = function propEquals(propKey, propValue) {
  return function (props) {
    return (0, _get2.default)(props, propKey) === propValue;
  };
};

/*
 * Returns a function that calls condition and checks for truthiness and calls `ifTrue`, other wise calls
 * `ifFalse` which defaults to a function that returns `null`. Example:
 *
 * const logRealNumbers = when(
 *		( msg ) => /^[\d]+$/.test( msg ),
 *		console.log.bind( console, 'is a real number' ),
 *		console.log.bind( console, 'is not a real number' )
 * )
 *
 * logRealNumbers( 5.1 ) // => 5.1 'is not a real number'
 * logReslNumbers( 5 ) // => 5 'is a real number'
 */
var when = exports.when = function when(condition, ifTrue) {
  var ifFalse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return null;
  };
  return function () {
    return condition.apply(undefined, arguments) ? ifTrue.apply(undefined, arguments) : ifFalse.apply(undefined, arguments);
  };
};

/*
 * Returns the result of the first function to return a truthy value
 */

var first = exports.first = function first() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    var i = void 0,
        result = void 0;
    for (i = 0; i < fns.length; i++) {
      result = fns[i].apply(fns, arguments);
      if (result) {
        return result;
      }
    }
  };
};

/*
 * Returns a function that returns true if any of the provided `fns` return a truthy value. Example:
 *
 * const oddOrLessThan10 = any(
 *		( n ) => n % 2 === 1,
 *		( n ) => n < 10
 * )
 *
 * oddOrLessThan10( 15 ) // => true
 * oddOrLessThan10( 8 ) // => true
 * oddOrLessThan10( 12 ) // => false
 */
var any = exports.any = function any() {
  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (0, _find2.default)(fns, function (fn) {
      return fn.apply(undefined, args);
    });
  };
};

/*
 * Returns a function that returns true when all provided functions return a truthy value. Example:
 *
 * const lessThan10AndGreaterThan4AndEven = all(
 *		( n ) => n < 10,
 *		( n ) => n > 4,
 *		( n ) => n % 2 === 0
 * )
 * lessThan10AndGreaterThan2AndEven( 7 ) // => false
 * lessThan10AndGreaterThan2AndEven( 8 ) // => true
 * lessThan10AndGreaterThan2AndEven( 2 ) // => false
 */
var all = exports.all = function all() {
  for (var _len4 = arguments.length, fns = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    fns[_key4] = arguments[_key4];
  }

  return function () {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return !(0, _find2.default)(fns, function (fn) {
      return !fn.apply(undefined, args);
    });
  };
};

// Returns a function that calls each of fns
var forEach = exports.forEach = function forEach() {
  for (var _len6 = arguments.length, fns = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    fns[_key6] = arguments[_key6];
  }

  return function () {
    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    return (0, _forEach2.default)(fns, function (fn) {
      return fn.apply(undefined, args);
    });
  };
};

/*
 * Returns a function that iterates through each function and calls it and returns each value. Example:
 *
 *	const log = console.log.bind( console )
 *	const maths = each(
 *		( n ) => n * 2
 *		( n ) => n + 2
 *	)
 *
 *  maths( 3 )
 *  // => [ 6, 5 ]
 */
var map = exports.map = function map() {
  for (var _len8 = arguments.length, fns = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    fns[_key8] = arguments[_key8];
  }

  return function () {
    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    return (0, _map2.default)(fns, function (fn) {
      return fn.apply(undefined, args);
    });
  };
};

var compose = exports.compose = function compose() {
  for (var _len10 = arguments.length, fns = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    fns[_key10] = arguments[_key10];
  }

  return function () {
    var head = fns[0],
        rest = fns.slice(1);

    return rest.reduce(function (result, fn) {
      return fn(result);
    }, head.apply(undefined, arguments));
  };
};

/*
 * Returns a function that calls the provided method with the given args as arguments on
 * the first argument given to the returned function.
 *
 * Example:
 *
 *	document.querySelector( 'a' ).addEventListener( 'click', call( 'preventDefault', true ) );
 *
 * Is functionaly equivalent to:
 *
 *	document.querySelector( 'a' ).addEventListener( 'click', ( e ) => e.preventDefault( true ) );
 */
var call = exports.call = function call(method) {
  for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
    args[_key11 - 1] = arguments[_key11];
  }

  return function (obj) {
    return obj[method].apply(obj, args);
  };
};