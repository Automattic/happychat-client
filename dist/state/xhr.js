'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @format */

/**
 *
 * Given a Redux action and a timeout, dispatch a request.
 *
 * The request can have three states, and will dispatch an action accordingly:
 *
 * - request was succesful: would dispatch the action.callback with true as argument
 * - request was unsucessful: would dispatch the action.callback with false as argument
 * - request timeout: would dispatch action.callbackTimeout
 *
 * @param  { Function } dispatch Redux dispatch function
 * @param  { Object } action A Redux action with props
 *                  	{
 *                  		path: URL path used to send the request,
 *                  		payload: contents to be sent,
 *                  		callback: a Redux action creator,
 *                  		callbackTimeout: a Redux action creator,
 *                  	}
 * @param  { Number } timeout How long (in milliseconds) has the server to respond
 * @return { Promise } Fulfilled (returns the response)
 *                     or rejected (returns an error message)
 */
var makeRequest = function makeRequest(dispatch, action, timeout) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', action.path, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  for (var header in action.headers) {
    xhr.setRequestHeader(header, action.headers[header]);
  }

  xhr.timeout = timeout;
  xhr.ontimeout = function () {
    return dispatch(action.callbackTimeout());
  };

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      dispatch(action.callback({ status: xhr.status, responseText: xhr.responseText }));
    }
  };

  xhr.send(JSON.stringify(action.payload));
};

exports.default = makeRequest;