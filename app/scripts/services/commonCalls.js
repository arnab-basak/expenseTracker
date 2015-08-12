'use strict';
angular.module('expenseTracker')
    .factory('commonCalls', ['$ionicLoading', '$filter', 'localStorage', 'BASE_URL', 'EXPENSE_TYPE_URL', 'ADD_EXPENSE_URL', 'BANK_DETAILS_URL', 'BANK_TYPE_URL', '$firebaseArray', '$http', function($ionicLoading, $filter, localStorage, BASE_URL, EXPENSE_TYPE_URL, ADD_EXPENSE_URL, BANK_DETAILS_URL, BANK_TYPE_URL, $firebaseArray, $http) {

        var factory = {};
        var todayDate = new Date();

        factory.fetchPreviousDate = function() {

            var previousDate = new Date(todayDate - 86400000); //86400000 = Total MS in a day
            previousDate = $filter('date')(previousDate, 'dd/MMMM/yyyy');

            return previousDate;
        };

        factory.fetchCurrentDate = function() {
            var todayFormatedDate = $filter('date')(todayDate, 'dd/MMMM/yyyy');
            return todayFormatedDate;
        };

        factory.expenseTypeFbData = function() {
            var fbCallURL = new Firebase(BASE_URL + localStorage.get('authenticationData') + EXPENSE_TYPE_URL);
            var expenseType = $firebaseArray(fbCallURL);

            return expenseType;
        };

        factory.bankDetailsFbData = function() {
            var fbCallURL = new Firebase(BASE_URL + localStorage.get('authenticationData') + BANK_DETAILS_URL);
            var bankDetails = $firebaseArray(fbCallURL);

            return bankDetails;
        };

        factory.fetchTotalBankBalance = function() {
            var bankDetails = factory.bankDetailsFbData();
            var totalSalary = 0;

            if (bankDetails.length > 0) {
                for (var i = 0; i < bankDetails.length; i++) {
                    totalSalary = totalSalary + parseFloat(bankDetails[i].currentAmount);
                }
            }

            return totalSalary;
        };

        factory.addExpenseFbData = function() {
            var fbCallURL = new Firebase(BASE_URL + localStorage.get('authenticationData') + ADD_EXPENSE_URL);
            var addExpense = $firebaseArray(fbCallURL);

            return addExpense;
        };

        factory.bankType = function() {
            var bankType={};
            $http.get(BANK_TYPE_URL).success(function(response) {
                bankType.type = response;
                console.log(bankType);
            });


            return bankType;
        };

        return factory;
    }]);
