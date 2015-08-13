'use strict';
angular.module('expenseTracker')
.factory('localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key) {
      return $window.localStorage[key];
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key]);
    },
    remove: function(key) {
      return $window.localStorage.removeItem(key);
    }
  };
}]);