'use strict';
angular.module('expenseTracker')
    .controller('viewPreviousExpenseCtrl', function($scope, localStorage, $state) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {
            // CONTROLLER CODE COMES HERE
        }
    });
