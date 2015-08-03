'use strict';
angular.module('starter')
    .factory('commonCalls', ['$filter', 'constantExpenseTypeURL', 'constantAddExpenseURL', 'constantBankDetailsURL', '$firebaseArray', '$http', function($filter, constantExpenseTypeURL, constantAddExpenseURL, constantBankDetailsURL, $firebaseArray, $http) {

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
            //var returnExpenseType;

            var fbCallURL = new Firebase(constantExpenseTypeURL);
            var expenseType = $firebaseArray(fbCallURL);

            return expenseType;
        };

        factory.bankDetailsFbData = function () {
            var fbCallURL = new Firebase (constantBankDetailsURL);
            var bankDetails = $firebaseArray(fbCallURL);

            return bankDetails;
        }

        factory.addExpenseFbData = function() {
            var fbCallURL = new Firebase(constantAddExpenseURL);
            var addExpense = $firebaseArray(fbCallURL);

            return addExpense;
        }

        return factory;
    }]);
