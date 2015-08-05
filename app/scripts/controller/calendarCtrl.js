'use strict';
angular.module('expenseTracker')
    .controller('calendarCtrl', function($state, $scope, localStorage, dateFilter) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {
            $scope.currentDate = new Date();
            $scope.title = "Calendar";

            $scope.datePickerCallback = function(val) {
                if (typeof(val) === 'undefined') {
                    console.log('Date not selected');
                } else {
                    console.log('Selected date is : ', val);
                }
            };
        }
    });
