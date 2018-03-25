'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state) {
  return (0, _getConnectionStatus2.default)(state) === _constants.HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED;
};

var _constants = require('../constants');

var _getConnectionStatus = require('./get-connection-status');

var _getConnectionStatus2 = _interopRequireDefault(_getConnectionStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }