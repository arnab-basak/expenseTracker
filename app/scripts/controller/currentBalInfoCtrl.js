'use strict';
angular.module('expenseTracker')
    .controller('currentBalInfoCtrl', function(commonCalls, $scope) {
        $scope.currentBalInfo = {};

        $scope.currentDate = commonCalls.fetchCurrentDate();
        $scope.previousDate = commonCalls.fetchPreviousDate();

        $scope.currentBalInfo = commonCalls.bankDetailsFbData();
        


    });
