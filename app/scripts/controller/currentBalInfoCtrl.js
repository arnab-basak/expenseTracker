'use strict';
angular.module('expenseTracker')
    .controller('currentBalInfoCtrl', function(localStorage, $state, commonCalls, $scope) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {
            $scope.currentBalInfo = {};

            $scope.currentDate = commonCalls.fetchCurrentDate();
            $scope.previousDate = commonCalls.fetchPreviousDate();

            $scope.currentBalInfo = commonCalls.bankDetailsFbData();

        }

    });
