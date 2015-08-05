'use strict';
angular.module('expenseTracker')
    .controller('salaryDetailsCtrl', function($state, localStorage, commonCalls, constantOnlyNumbersRegEx, $scope) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {
            $scope.salaryDetails = {};
            $scope.totalAmount = 0;

            $scope.salaryDetailsError = false;

            $scope.bankDetails = commonCalls.bankDetailsFbData();
            $scope.totalAmount = commonCalls.fetchTotalBankBalance();

            $scope.onlyNumbers = constantOnlyNumbersRegEx;

            $scope.addSalaryDetailsToDB = function() {

                for (var i = 0; i < $scope.bankDetails.length; i++) {
                    if ($scope.salaryDetails.accountNumber === $scope.bankDetails[i].accountNumber) {
                        var id = $scope.bankDetails[i].$id;

                        var updateItem = $scope.bankDetails.$getRecord(id);

                        if (updateItem !== null || updateItem !== undefined || updateItem !== '') {
                            updateItem.currentAmount = parseFloat(updateItem.currentAmount) + parseFloat($scope.salaryDetails.salaryAmount); // updateItem.currentAmount -----> currentAmount is the field in JSON

                            $scope.bankDetails.$save(updateItem)
                            $scope.salaryDetailsError = false;
                            break;
                        } else {
                            $scope.salaryDetailsError = true;
                        }
                    }
                }

            };
        }
    });
