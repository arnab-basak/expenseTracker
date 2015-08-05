'use strict';
angular.module('expenseTracker')
    .controller('calendarCtrl', function($state, $scope, dateFilter) {
        if (sessionStorage.authenticationData === undefined) {
            $state.go('app.login');
        } else {
            
        }
    });
