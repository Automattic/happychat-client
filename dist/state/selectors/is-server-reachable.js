'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state) {
  return (0, _get2.default)(state, 'connection.error') !== _constants.HAPPYCHAT_CONNECTION_ERROR_PING_TIMEOUT;
};

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }