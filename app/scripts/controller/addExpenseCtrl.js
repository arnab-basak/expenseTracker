'use strict';
angular.module('expenseTracker')
    .controller('addExpenseCtrl', function($scope, constantOnlyNumbersRegEx, commonCalls, $filter) {
        $scope.addExpenseError = false;
        $scope.addExpenseSuccess = false;

        $scope.addExpenseTypeData = [];
        $scope.expenseData = {};

        var expenditureDate = '';

        var validateError = true;

        var DBExpenseType;

        $scope.expenseType = commonCalls.expenseTypeFbData();

        $scope.addExpense = commonCalls.addExpenseFbData();

        $scope.onlyNumbers = function() {
            if ($scope.expenseType.expenseType = 'date') {
                return
            } else {
                return constantOnlyNumbersRegEx;
            }
        };

        $scope.addExpenseToDB = function() {

            chkAddExpenseVal();

            if (validateError === true) {
                $scope.addExpenseError = true;
                $scope.addExpenseSuccess = false;
            } else {

                /*for (var i = 0; i < $scope.expenseType.length; i++) {
                    DBExpenseType = $scope.expenseType[i].expenseType;

                    (function() {
                        $scope['expenseData'][DBExpenseType] = $scope.addExpenseTypeData[i];
                        console.log(DBExpenseType, $scope['expenseData'][DBExpenseType]);
                        var fbExpenseType = $scope['expenseData'][DBExpenseType];

                        $scope.addExpense.$add({
                            fbExpenseType: $scope.addExpenseTypeData[i]
                        });
                    })();
                };*/

                $scope.addExpense.$add({
                    'date': expenditureDate,
                    'cashExpense': $scope.addExpenseTypeData[1],
                    'cardExpense': $scope.addExpenseTypeData[2],
                    'otherExpense': $scope.addExpenseTypeData[3],
                    'transferToMom': $scope.addExpenseTypeData[4],
                    'transferToUncle': $scope.addExpenseTypeData[5],
                    'transferToSavings': $scope.addExpenseTypeData[6],
                    'phoneBill': $scope.addExpenseTypeData[7],
                    'internetBill': $scope.addExpenseTypeData[8],
                    'electricityBill': $scope.addExpenseTypeData[9],
                    'CCPayment': $scope.addExpenseTypeData[10],
                    'SIPInstallments': $scope.addExpenseTypeData[11],
                    'petrol': $scope.addExpenseTypeData[12],
                    'totalDayExpense': perDayTotal()

                });

                $scope.addExpenseError = false;
                $scope.addExpenseSuccess = true;
            };

        };

        function chkAddExpenseVal() {

            if (String($scope.addExpenseTypeData[0]) === null || String($scope.addExpenseTypeData[0]) === undefined) {
                validateError = true;
            } else {
                expenditureDate = $filter('date')($scope.addExpenseTypeData[0], 'dd/MMMM/yyyy');
                if (expenditureDate === null || expenditureDate === undefined) {
                    validateError = true;
                } else {
                    validateError = false;
                }
            }

            for (var i = 1; i < $scope.addExpenseTypeData.length; i++) {
                if ($scope.addExpenseTypeData[i] === null || $scope.addExpenseTypeData[i] === undefined || parseInt($scope.addExpenseTypeData[i]) === 0) {
                    $scope.addExpenseTypeData[i] = 0;
                    validateError = false;
                }
            };
        };

        function perDayTotal() {
            var totalExpense=0;
            for (var i = 1; i < $scope.addExpenseTypeData.length; i++) {
                totalExpense = totalExpense + $scope.addExpenseTypeData[i];
            };

            return totalExpense;
        }
    });
