'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _reducer = require('./chat/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = require('./connection/reducer');

var _reducer4 = _interopRequireDefault(_reducer3);

var _reducer5 = require('./fallbackTicket/reducer');

var _reducer6 = _interopRequireDefault(_reducer5);

var _reducer7 = require('./ui/reducer');

var _reducer8 = _interopRequireDefault(_reducer7);

var _reducer9 = require('./user/reducer');

var _reducer10 = _interopRequireDefault(_reducer9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */
exports.default = (0, _redux.combineReducers)({
	chat: _reducer2.default,
	connection: _reducer4.default,
	fallbackTicket: _reducer6.default,
	ui: _reducer8.default,
	user: _reducer10.default
});

/**
 * Internal dependencies
 */