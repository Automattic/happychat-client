'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @format */
/* eslint-disable no-console */

/*
 * Wraps console.warn to only emit in development and test environments.
 *
 * Many utility libraries in Calypso utilize this to warn about misuse of functions,
 * For example: stats warns when any tracks events aren't properly formatted (@see lib/analytics)
 */

var warn = void 0;
if (process.env.NODE_ENV === 'production' || 'function' !== typeof console.warn) {
  warn = function warn() {};
} else {
  warn = function warn() {
    var _console;

    return (_console = console).warn.apply(_console, arguments);
  };
}

exports.default = warn;