'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state) {
  return (0, _isConnectionConnected2.default)(state) && (0, _get2.default)(state, 'connection.isAvailable');
};

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _isConnectionConnected = require('./is-connection-connected');

var _isConnectionConnected2 = _interopRequireDefault(_isConnectionConnected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }