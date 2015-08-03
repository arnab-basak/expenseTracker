'use strict';
angular.module('starter')
    .controller('currentBalInfoCtrl', function(commonCalls, $scope) {
        $scope.currentBalInfo = {};

        $scope.currentDate = commonCalls.fetchCurrentDate();
        $scope.previousDate = commonCalls.fetchPreviousDate();

        $scope.currentBalInfo = commonCalls.bankDetailsFbData();
        


    });
