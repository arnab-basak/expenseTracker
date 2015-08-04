'use strict';
angular.module('expenseTracker')
    .controller('viewPreviousExpenseCtrl', function($scope) {
        if (sessionStorage.authenticationData === undefined) {
            $state.go('app.login');
        } else {
            // CONTROLLER CODE COMES HERE
        }
    });
