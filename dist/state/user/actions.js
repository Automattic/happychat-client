'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentUser = setCurrentUser;
exports.setGroups = setGroups;
exports.setLocale = setLocale;
exports.setEligibility = setEligibility;

var _actionTypes = require('../action-types');

/**
 * Returns an action object that sets the current user
 *
 * @param  { Object } currentUser Current user to be set
 * @return { Object } Action object
 */
function setCurrentUser(currentUser) {
  return {
    type: _actionTypes.HAPPYCHAT_USER_CURRENT_SET,
    currentUser: currentUser
  };
}

/**
 * Returns an action object that sets the user groups
 *
 * @param  { Array } groups Groups to be set
 * @return { Object } Action object
 */
/** @format */

/**
 * Internal dependencies
 */
function setGroups(groups) {
  return {
    type: _actionTypes.HAPPYCHAT_USER_GROUPS_SET,
    groups: groups
  };
}

/**
 * Returns an action object that sets the user locale
 *
 * @param  { String } locale Locale to be set
 * @return { Object } Action object
 */
function setLocale(locale) {
  return {
    type: _actionTypes.HAPPYCHAT_USER_LOCALE_SET,
    locale: locale
  };
}

/**
 * Returns an action object that sets the user eligibility
 *
 * @param  { Boolean } isEligible Whether the user can be offered chat
 * @return { Object } Action object
 */
function setEligibility(isEligible) {
  return {
    type: _actionTypes.HAPPYCHAT_USER_ELIGIBILITY_SET,
    isEligible: isEligible
  };
}