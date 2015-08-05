'use strict';
angular.module('expenseTracker')
    .controller('calendarCtrl', function($state, $scope, localStorage, dateFilter) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {
            
        }
    });
